var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var mysql = require("mysql");
var cors = require("cors");
const e = require("express");
const fileUpload = require("express-fileupload");
var fs = require("fs");
var InsertQuery = require("mysql-insert-multiple");
var excel = require("excel4node");
var Excl = require("exceljs");

app.use(fileUpload());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gmsecretary",
  multipleStatements: true,
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected");
  }
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.get("/pended", function (req, res) {
  let query = `SELECT * FROM intdocs JOIN intdocs_image ON intdocs.id = intdocs_image.intdocs_id WHERE state = "انتظار" GROUP BY intdocs.id ORDER BY creationdate DESC;
               SELECT * FROM outdocs JOIN outdocs_image ON outdocs.id = outdocs_image.outdocs_id WHERE state = "انتظار" GROUP BY outdocs.id ORDER BY creationdate DESC;
  `;
  db.query(query, function (err, details) {
    if (err) {
      console.log(err);
    } else {
      var waitingPostDetails = details[0].concat(details[1]);

      for (let detail of waitingPostDetails) {
        if (detail.image) {
          detail.image = detail.image.toString("base64");
        }
      }
    }
    res.send(waitingPostDetails);
  });
});

app.get("/outdocs", function (req, res) {
  let query = `SELECT * FROM outdocs
JOIN outdocs_image ON outdocs.id = outdocs_image.outdocs_id WHERE type = "صادر" GROUP BY outdocs.id ORDER BY creationdate DESC;
SELECT * FROM outdocs
JOIN outdocs_image ON outdocs.id = outdocs_image.outdocs_id WHERE type = "وارد" GROUP BY outdocs.id ORDER BY creationdate DESC `;
  db.query(query, (error, details) => {
    if (error) {
      console.log(error);
    } else {
      for (let detail of details[0]) {
        if (detail.image) {
          detail.image = detail.image.toString("base64");
        }
      }
      for (let detail of details[1]) {
        if (detail.image) {
          detail.image = detail.image.toString("base64");
        }
      }
      res.send(details);
    }
  });
});

app.get("/intdocs", function (req, res) {
  let query = `SELECT * FROM intdocs JOIN intdocs_image ON intdocs.id = intdocs_image.intdocs_id WHERE TYPE = "صادر" GROUP BY intdocs.id ORDER BY creationdate DESC;
  SELECT * FROM intdocs JOIN intdocs_image ON intdocs.id = intdocs_image.intdocs_id WHERE TYPE = "وارد" GROUP BY intdocs.id ORDER BY creationdate DESC;
  `;
  db.query(query, (error, details) => {
    if (error) {
      console.log(error);
    } else {
      for (let detail of details[0]) {
        if (detail.image) {
          detail.image = detail.image.toString("base64");
        }
      }
      for (let detail of details[1]) {
        if (detail.image) {
          detail.image = detail.image.toString("base64");
        }
      }
      res.send(details);
    }
  });
});

app.get("/searchEPost/:subject", function (req, res) {
  let subject = req.params.subject;
  let query = `SELECT * FROM outdocs
  JOIN outdocs_image ON outdocs.id = outdocs_image.outdocs_id WHERE subject LIKE '%${subject}%' GROUP BY outdocs.id; `;
  db.query(query, function (err, details) {
    if (err) {
      console.log(err);
    } else {
      for (let detail of details) {
        if (detail.image) {
          detail.image = detail.image.toString("base64");
        }
      }
      res.send(details);
    }
  });
});

app.get("/searchIPost/:subject", function (req, res) {
  let subject = req.params.subject;
  let query = `SELECT * FROM intdocs
  JOIN intdocs_image ON intdocs.id = intdocs_image.intdocs_id WHERE subject LIKE '%${subject}%' GROUP BY intdocs.id; `;
  db.query(query, function (err, details) {
    if (err) {
      console.log(err);
    } else {
      for (let detail of details) {
        if (detail.image) {
          detail.image = detail.image.toString("base64");
        }
      }
      res.send(details);
    }
  });
});

app.get("/detailedPost/:id/:bais", function (req, res) {
  const id = req.params.id;
  const bais = req.params.bais;
  const arrOfData = [];

  let query = `SELECT * FROM outdocs JOIN outdocs_image ON outdocs.id = outdocs_image.outdocs_id  WHERE outdocs.id = ${id} AND bais = "${bais}";
  SELECT * FROM intdocs JOIN intdocs_image ON intdocs.id = intdocs_image.intdocs_id  WHERE intdocs.id = ${id} AND bais = "${bais}";
  `;
  db.query(query, (error, details) => {
    if (error) {
      console.log(error);
    } else {
      if (details[0].length > 0) {
        for (let detail of details[0]) {
          detail.image = detail.image.toString("base64");
        }
        arrOfData.push(details[0]);
        res.send(details[0]);
      } else {
        for (let detail of details[1]) {
          detail.image = detail.image.toString("base64");
        }
        arrOfData.push(details[1]);
        res.send(details[1]);
      }
    }
  });
});

app.get("/newCreatedpost/:id/:bais", function (req, res) {
  const id = req.params.id;
  const bais = req.params.bais;
  const arrOfData = [];

  let query = `SELECT * FROM outdocs  WHERE id = ${id} AND bais = "${bais}";
  SELECT * FROM intdocs WHERE id = ${id} AND bais = "${bais}";
  `;
  db.query(query, (error, details) => {
    if (error) {
      console.log(error);
    } else {
      res.send(details);
    }
  });
});

app.get("/relatedPost/:relate", function (req, res) {
  const relate = req.params.relate;
  let query = `SELECT * FROM outdocs WHERE subject = "${relate}";
  SELECT * FROM intdocs WHERE subject = "${relate}"
  `;
  db.query(query, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.get("/doublequery", function (req, res) {
  db.query(
    `select subject from outdocs; select id from outdocs`,
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    }
  );
});

app.post("/createExcel", (req, res) => {
  var workbook = new Excl.Workbook();
  workbook.xlsx.readFile("./following.xls").then(function () {
    var worksheet = workbook.getWorksheet(1);
    var row1 = worksheet.getRow(1);
    row1.getCell(1).value = new Date();
    var row = worksheet.getRow(5);
    row.getCell(3).value = req.body.arr[0].subject; // A5's value set to 5
    row.commit();
    return workbook.xlsx.writeFile("../../new.xlsx");
  });

  res.send("done");
});

app.post("/intdocspost", (req, res) => {
  let info = {
    subject: req.body.subject,
    type: req.body.type,
    giver: req.body.giver,
    state: req.body.state,
    creationdate: req.body.creationdate,
    required: req.body.required,
    notes: req.body.summary,
    bais: req.body.bais,
  };

  let query = `INSERT INTO intdocs SET ?`;

  db.query(query, info, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.post("/intdocsimage", (req, res) => {
  if (Array.isArray(req.files.image)) {
    // for (let img of req.files.image) {
    for (let i = 0; i < req.files.image.length; i++) {
      const data = {
        image: req.files.image[i].data,
        intdocs_id: req.body.data,
      };
      console.log(data.intdocs_id);

      let query = `INSERT INTO intdocs_image SET ?`;
      db.query(query, data, function (err, data) {
        if (err) {
          console.log("err");
        } else {
          console.log("done");
        }
      });
    }
    res.send(req.files);
  } else {
    const data = { image: req.files.image.data, intdocs_id: req.body.data };
    console.log(data.intdocs_id);
    let query = `INSERT INTO intdocs_image SET ?`;
    db.query(query, data, function (err, data) {
      if (err) {
        console.log("err");
      } else {
        console.log("done");
      }
    });
    res.send(req.files.image);
  }

  const arrOfData = [];
});

app.post("/outdocspost", (req, res) => {
  let info = {
    subject: req.body.subject,
    type: req.body.type,
    giver: req.body.giver,
    state: req.body.state,
    creationdate: req.body.creationdate,
    required: req.body.required,
    notes: req.body.summary,
    bais: req.body.bais,
  };

  let query = `INSERT INTO outdocs SET ?`;

  db.query(query, info, (err, data) => {
    if (err) {
      console.log("err");
    } else {
      res.send(data);
    }
  });
});

app.post("/outdocsimage", (req, res) => {
  if (req.files.image.length > 0) {
    for (let img of req.files.image) {
      const data = { image: img.data, outdocs_id: req.body.data };
      let query = `INSERT INTO outdocs_image SET ?`;
      db.query(query, data, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log("done");
        }
      });
    }
    res.send(req.files);
  } else {
    const data = { image: req.files.image.data, outdocs_id: req.body.data };
    let query = `INSERT INTO outdocs_image SET ?`;
    db.query(query, data, function (err, data) {
      if (err) {
        console.log("err");
      } else {
        console.log("done");
      }
    });
    res.send(req.files);
  }

  const arrOfData = [];
});

app.put("/updatePost/:id/:bais", (req, res) => {
  const updatedVal = req.body.updateVal;
  let query = `UPDATE ${req.params.bais} SET state = "${updatedVal}" WHERE id = ${req.params.id}`;

  db.query(query, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("connected on port");
});
