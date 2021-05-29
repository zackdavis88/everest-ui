const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Disabling https for development purposes.
// const httpsOptions = {
//   key: fs.readFileSync("./config/ssl/key.pem"),
//   cert: fs.readFileSync("./config/ssl/cert.pem")
// };

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);    
  }).listen(3080, (err) => {
    if(err) throw err;
    console.log("Everest UI is listening on port 3080");
  });
});
