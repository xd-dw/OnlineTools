import express from "express";
var jsonService = require('./services/json-service')


const app = express();
const port = process.env.PORT || 80;

// Enable gzip compression for all HTTP responses
import compression from "compression";
app.use(compression());
app.use(express.static('public'));

// Allow all of the generated files to be served up by Express
import serveStatic from "serve-static";
app.use("/static", serveStatic("dist/client"));

// Initialize mock service routes
// import initServices from "./services/routes";
// initServices(app);

// Map the "/" route to the home page
import HomePage from "./pages/home";
app.get("/", HomePage);

app.post('/json/beautify/', function (req, res) {
  req.on('data', function (chunk) {
    console.log('GOT DATA!');
    jsonService.beautifyJson({ jsonStr: chunk })
      .then(function (data) {
        // res.json(data);
        res.end(data);
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send('Unable to process json');
      });
  });
})

// Start the server
app.listen(port, err => {
  if (err) {
    throw err;
  }

  if (port !== "0") {
    console.log(`Listening on port ${port}`);
  }
});
