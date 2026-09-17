const crypto = require("crypto");

function generateRequestId() {
  return crypto.randomUUID();
}

function logEvent({
  level = "info",
  event,
  req = null,
  data = {},
}) {
  const log = {
    timestamp: new Date().toISOString(),
    level,
    event,
    requestId: req?.requestId || null,
    method: req?.method || null,
    path: req?.originalUrl || null,
    userId: req?.user?._id?.toString() || null,
    ...data,
  };

  console.log(JSON.stringify(log));
}

module.exports = {
  generateRequestId,
  logEvent,
};