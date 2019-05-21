const express = require("express");
const nunjucks = require("nunjucks");

const app = express();
const checkMiddleware = (req, res, next) => {
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
  console.log(req.body.age);

  return res.redirect("/major");
});

app.get("/major", checkMiddleware, (req, res) => {
  return res.send("major", {});
});

app.get("/minor", checkMiddleware, (req, res) => {
  return res.send("minor", {});
});

app.listen(3000);
