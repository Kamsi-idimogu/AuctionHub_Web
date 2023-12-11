const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const path = require("path");
const { join } = path;

// const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const options = {
    key: fs.readFileSync(join(__dirname, "localhost+2-key.pem")),
    cert: fs.readFileSync(join(__dirname, "localhost+2.pem")),
  };

  createServer(options, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, () => {
    console.log("> Ready on https://localhost:3000");
  });
});
