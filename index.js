const express = require("express");
const nunjucks = require("nunjucks");

const app = express();
const checkMiddleware = (req, res, next) => {
  const { age } = req.query;

  console.log(age);

  if (!age) {
    res.redirect("/");
  }

  return next();
};

nunjucks.configure("views", {
  autoscape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");

app.get("/", (req, res) => {
  return res.render("index", {});
});

app.post("/check", (req, res) => {
  const { age } = req.body;

  if (age >= 18) {
    res.redirect(`/major?age=${age}`);
  } else {
    res.redirect(`/minor?age=${age}`);
  }
});

app.get("/major", checkMiddleware, (req, res) => {
  return res.send(`Você é maior de idade e possui ${req.query.age} anos`);
});

app.get("/minor", checkMiddleware, (req, res) => {
  return res.send(`Você é menor de idade e possui ${req.query.age} anos`);
});

app.listen(3000);
