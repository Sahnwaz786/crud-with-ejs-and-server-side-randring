const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const userModel = require("./models/user");

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  const createddata = await userModel.create({
    name,
    email,
    image,
  });
  res.redirect("/show");
});

app.get("/show", async (req, res) => {
  const alluser = await userModel.find();
  res.render("show", { createddata: alluser });
});

app.get("/delete/:id", async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/show");
});

app.get("/edit/:id", async (req, res) => {
  const edituser = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { edituser });
});

app.post("/update/:userid", async (req, res) => {
  const updateuser = await userModel.findOneAndUpdate(
    {
      _id: req.params.userid,
    },
    {
      email: req.body.email,
      image: req.body.image,
      name: req.body.name,
    },

    { new: true }
  );
  res.redirect("/show");
});

app.listen(3000);
