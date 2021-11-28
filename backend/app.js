// Libraries
const fs = require("fs");
const dialer = require("dialer").Dialer;
const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");

// Variables
// If './config/auth.json' doesn't exist, then we're using Fake API.
let configuration;
try {
  configuration = require("./config/auth.json");
} catch (e) {
  configuration = {
    call: null,
    number: 555555555,
  };
}
let db;
try {
  db = require("./files/data.json");
} catch (e) {
  db = {
    lastID: 0,
  };
}

const consultants = require("./files/consultants.json");
let faq = fs.readFileSync("./files/faq.txt", "utf-8");

let _bridge = null;

let currentConnection = db.lastID;
let connections = [];

// Configuration
dialer.configure(configuration.call);

// Backend
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

app.use(bodyParser.text());
app.use(bodyParser.json());

const server = app.listen(3000, function () {
  console.log(`Application is running on port ${server.address().port}`);
});
const socket = new Server(server);

app.post("/call", async function (req, res) {
  let status = null;
  let consultant = consultants[Math.floor(Math.random() * consultants.length)];
  currentConnection++;
  let id = currentConnection;
  let data = req.body;
  _bridge = await dialer
    .call(configuration.number, data.number)
    .catch((err) => {
      console.error(`ERROR: ${err}`);
      status = "FAILED";
    });

  res.json({
    id: id,
    status: status === null ? _bridge.STATUSES.NEW : status,
    consultant: consultant,
  });

  connections.push({
    id: id,
    lastUpdate: new Date().getTime(),
    status: null,
    bridge: _bridge,
    called: new Date().getTime(),
    consultant: consultant,
  });
});

app.get("/consultants", async (req, res) => {
  res.json(consultants);
});

app.get("/faq", async (req, res) => {
  let lines = faq.split(/\r|\n/g);
  let tmp = [];

  for (let i = 0; i < lines.length; i += 2) {
    tmp.push({
      id: i / 2 + 1,
      question: lines[i],
      answer: lines[i + 1],
    });
  }

  lines = tmp;

  res.json(lines);
});

let interval = setInterval(async () => {
  connections.forEach(async (element, index) => {
    let status = null;

    if (!element.bridge) {
      // In case of entering wrong number, drop connection.
      status = "FAILED";
    } else {
      status = await element.bridge
        .getStatus()
        .catch(() => (element.status = "FAILED"));
    }

    if (element.status !== status) {
      element.status = status;
      element.lastUpdate = new Date().getTime();
      socket.emit(`status${element.id}`, status);
    }

    console.log(`Connection ID: ${element.id} > Status: ${element.status}`);

    if (
      element.status === "ANSWERED" ||
      element.status === "FAILED" ||
      element.status === "BUSY" ||
      element.status === "NO ANSWER"
    ) {
      if (db.lastID < element.id) {
        db.lastID = element.id;
        fs.writeFile("./files/data.json", JSON.stringify(db), (err) => {
          if (err) {
            console.error(`ERROR: ${err}!`);
          }
        });
      }
    }
  });

  // TODO: Find better implementation, to always close polling from socket.
  // After 5 seconds, drop all socket connections which were finished.
  connections = connections.filter((elem) => {
    if (
      elem.lastUpdate + 5000 > new Date().getTime() ||
      (elem.status !== "ANSWERED" &&
        elem.status !== "FAILED" &&
        elem.status !== "BUSY" &&
        elem.status !== "NO ANSWER")
    )
      return true;
  });
}, 1000);

/*
-- One of above workarounds
app.get("/status/:callId", (req, res) => {
  let calls = connections.filter((elem) => {
    if (elem.id == req.params.callId) return true;
  });

  res.json({
    id: req.params.callId,
    status: calls.length > 0 ? calls[0].status : "FAILED",
  });
});*/
