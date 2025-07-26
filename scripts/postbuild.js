const fs = require("fs");
const path = require("path");

const redirectHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Redirecting...</title>
  <link rel="canonical" href="./zh/" />
  <meta http-equiv="refresh" content="0; url=./zh/" />
  <script>window.location.href = './zh/';</script>
</head>
<body></body>
</html>`;

const outDirPath = path.join(__dirname, "..", "out");
const indexPath = path.join(outDirPath, "index.html");

// 确保 out 目录存在
if (fs.existsSync(outDirPath)) {
  fs.writeFileSync(indexPath, redirectHtml);
  console.log("Created redirect index.html for static export.");
} 