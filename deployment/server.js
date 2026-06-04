const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const express = require("express");
const dotenv = require("dotenv");

const app = express();
const host = "127.0.0.1";
const port = 8081;
const repoRoot = path.resolve(__dirname, "..");
const envPath = path.join(repoRoot, ".env");
const deployScriptPath = path.join(__dirname, "deploy.sh");
const deployLockPath = path.join(__dirname, ".deploy-lock");

dotenv.config({ path: envPath });

const deployToken = process.env.DEPLOY_TOKEN;

if (!deployToken) {
  throw new Error(`DEPLOY_TOKEN is missing in ${envPath}`);
}

let deploymentInProgress = false;

function releaseLock() {
  deploymentInProgress = false;

  if (fs.existsSync(deployLockPath)) {
    fs.rmdirSync(deployLockPath);
  }
}

app.post("/deploy", (req, res, next) => {
  const requestToken = req.get("X-Deploy-Token");

  if (requestToken !== deployToken) {
    return res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }

  if (deploymentInProgress || fs.existsSync(deployLockPath)) {
    return res.status(409).json({
      success: false,
      message: "Deployment already in progress",
    });
  }

  try {
    fs.mkdirSync(deployLockPath);
    deploymentInProgress = true;
  } catch (error) {
    return res.status(409).json({
      success: false,
      message: "Deployment already in progress",
    });
  }

  const child = spawn("bash", [deployScriptPath], {
    cwd: repoRoot,
    env: {
      ...process.env,
      DEPLOY_LOCK_HELD: "1",
    },
    stdio: "ignore",
  });

  child.on("error", (error) => {
    releaseLock();
    next(error);
  });

  child.on("exit", () => {
    releaseLock();
  });

  child.unref();

  return res.status(200).json({
    success: true,
    message: "Deployment started",
  });
});

app.use((error, _req, res, _next) => {
  console.error("Deployment server error:", error);

  if (res.headersSent) {
    return;
  }

  res.status(500).json({
    success: false,
    message: "Failed to start deployment",
  });
});

app.listen(port, host, () => {
  console.log(`Deployment server listening on http://${host}:${port}`);
});
