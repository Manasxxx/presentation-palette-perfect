#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUNTIME_DIR="$ROOT/.codex-runtime"
PID_FILE="$RUNTIME_DIR/dev-server.pid"
LOG_FILE="$RUNTIME_DIR/dev-server.log"
PORT="${PORT:-8080}"
HOST="${HOST:-0.0.0.0}"

mkdir -p "$RUNTIME_DIR"

is_alive() {
  local pid="${1:-}"
  [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null
}

if [[ -f "$PID_FILE" ]]; then
  old_pid="$(cat "$PID_FILE" 2>/dev/null || true)"
  if is_alive "$old_pid"; then
    if curl -fsS --max-time 2 "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
      echo "Dev server already running: http://localhost:$PORT/ (pid $old_pid)"
      exit 0
    fi
    kill "$old_pid" 2>/dev/null || true
    sleep 1
  fi
fi

# Clear stale listeners on the expected port before starting Vite.
if command -v lsof >/dev/null 2>&1; then
  stale_pids="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -n "$stale_pids" ]]; then
    echo "$stale_pids" | xargs kill 2>/dev/null || true
    sleep 1
  fi
fi

: > "$LOG_FILE"
pid="$(python3 - "$ROOT" "$HOST" "$LOG_FILE" <<'PYLAUNCH'
import os
import sys

root, host, log_file = sys.argv[1:4]

first = os.fork()
if first:
    os.waitpid(first, 0)
    with open(log_file + ".pidtmp", "r", encoding="utf-8") as fh:
        print(fh.read().strip())
    os.unlink(log_file + ".pidtmp")
    raise SystemExit(0)

os.setsid()
second = os.fork()
if second:
    with open(log_file + ".pidtmp", "w", encoding="utf-8") as fh:
        fh.write(str(second))
    os._exit(0)

os.chdir(root)
fd = os.open(log_file, os.O_WRONLY | os.O_CREAT | os.O_APPEND, 0o644)
os.dup2(fd, 1)
os.dup2(fd, 2)
os.close(fd)
null = os.open(os.devnull, os.O_RDONLY)
os.dup2(null, 0)
os.close(null)
os.execvp("npm", ["npm", "run", "dev", "--", "--host", host])
PYLAUNCH
)"
echo "$pid" > "$PID_FILE"

for _ in {1..40}; do
  if curl -fsS --max-time 2 "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
    echo "Dev server ready: http://localhost:$PORT/"
    ip="$(ipconfig getifaddr en0 2>/dev/null || true)"
    if [[ -n "$ip" ]]; then
      echo "Network: http://$ip:$PORT/"
    fi
    exit 0
  fi
  if ! is_alive "$pid"; then
    echo "Dev server exited early. Log:" >&2
    tail -n 80 "$LOG_FILE" >&2 || true
    exit 1
  fi
  sleep 0.5
done

echo "Dev server did not become ready. Log:" >&2
tail -n 80 "$LOG_FILE" >&2 || true
exit 1
