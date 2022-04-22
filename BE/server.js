require('dotenv').config()
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const PouchDB = require("pouchdb");

const app = express();
app.use(helmet());

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

const db = PouchDB.defaults({ prefix: ".data/"});
app.use("/", require("express-pouchdb")(db));
const port = process.env.PORT || 5984;
const listener = app.listen(port, () => console.log("Your PouchDB is listening on port " + listener.address().port));
