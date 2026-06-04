#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
LOG_DIR="${SCRIPT_DIR}/logs"
LOG_FILE="${LOG_DIR}/deploy.log"
LOCK_DIR="${SCRIPT_DIR}/.deploy-lock"
LOCK_ACQUIRED=0

mkdir -p "${LOG_DIR}"

exec > >(
  awk '{ print strftime("[%Y-%m-%d %H:%M:%S]"), $0; fflush(); }' | tee -a "${LOG_FILE}"
) 2>&1

log() {
  echo "$1"
}

cleanup() {
  if [[ "${LOCK_ACQUIRED}" -eq 1 && -d "${LOCK_DIR}" ]]; then
    rmdir "${LOCK_DIR}"
  fi
}

trap cleanup EXIT
trap 'log "Deployment failed"' ERR

if [[ "${DEPLOY_LOCK_HELD:-0}" == "1" ]]; then
  LOCK_ACQUIRED=1
elif mkdir "${LOCK_DIR}" 2>/dev/null; then
  LOCK_ACQUIRED=1
else
  log "Deployment already in progress"
  exit 1
fi

log "Deployment started"
log "Repository root: ${REPO_ROOT}"

cd "${REPO_ROOT}"

log "Running: git fetch origin"
git fetch origin

log "Running: git reset --hard origin/main"
git reset --hard origin/main

log "Running: npm ci"
npm ci

log "Running: npm run build"
npm run build

log "Running: pm2 restart heyowlsurf"
pm2 restart heyowlsurf

log "Deployment completed successfully"
