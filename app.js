const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var usernameGlobal="";
// var firstname ="";
// var occupation ="";
// var location ="";
// var about ="";

const userSchema = new mongoose.Schema({
  username: String,
  mail: String,
  password: String,
  profileImage: Buffer,
  firstname: String,
  lastname: String,
  occupation: String,
  location: String,
  about: String,
});
const User = mongoose.model("User", userSchema);

url = "mongodb://0.0.0.0/rytcrop_db";
mongoose.connect(url);
const con = mongoose.connection;

con.on("open", () => {
  console.log("DB connected");
});

con.on("error", (err) => {
  console.log(err);
});

var idGlobal = "";

app.get("/contactUs.ejs", function (req, res) {
  res.render("contactUs");
});

app.get("/", function (req, res) {
  res.render("mainPage");
});

app.get("/login.ejs", function (req, res) {
  res.render("login");
});

app.post("/login.ejs", function (req, res) {
  usernameGlobal = req.body.un;
  const userName1 = req.body.un;
  const password1 = req.body.ps;

  async function findData() {
    const fetchUser = await User.findOne({ username: userName1 });
    if (fetchUser) {
      bcrypt.compare(password1, fetchUser.password, function (err, result) {
        if (result == true) {
          res.redirect("/room.ejs");
        }
      });
    } else {
      res.redirect("/login.ejs");
    }
  }
  findData();
});

app.get("/signup.ejs", function (req, res) {
  res.render("signup");
});

app.post("/signup.ejs", function (req, res) {
  usernameGlobal = req.body.un;
  bcrypt.hash(req.body.ps, saltRounds, function (err, hash) {
    const newUser = new User({
      username: req.body.un,
      mail: req.body.gm,
      password: hash,
      firstname: "",
      lastname: "",
      occupation: "",
      location: "",
      about: "",
    });
    async function saveData() {
      await newUser.save();
    }
    saveData();
    res.redirect("/form.ejs");
  });
});
app.get("/form.ejs", function (req, res) {
  res.render("form");
});


app.post("/form.ejs", function (req, res) {
  const file = req.body.fil;
  const firstname = req.body.fn;
  const lastname = req.body.ln;
  const occupation = req.body.op;
  const location = req.body.lo;
  const about = req.body.ab;

  async function insertData() {
    try {
      const result = await User.updateOne(
        { username: usernameGlobal },
        {
          $set: {
            firstname: firstname,
            lastname: lastname,
            occupation: occupation,
            location: location,
            about: about,
          },
        }
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  insertData();
  // res.render("room", {
  //   fname: req.body.fn,
  //   occup: req.body.op,
  //   loca: req.body.lo,
  //   abo : req.body.ab,
  // });
  res.redirect(`/room.ejs`);
});

app.get("/room.ejs", function (req, res) {
  // const fname = firstname;
  // const occup = occupation;
  // const loca = location;
  // const abo = about;

  // // Now you can use these variables in your rendering logic
  // res.render("room", {
  //   fname: fname,
  //   occup: occup,
  //   loca: loca,
  //   abo: abo,
  // });
  async function findData() {
    const fetchUser = await User.findOne({ username: usernameGlobal });
    if (fetchUser) {
      res.render("room", {
          fname: fetchUser.firstname,
          occup: fetchUser.occupation,
          loca: fetchUser.location,
          abo: fetchUser.about,
        });
    } 
  }
  findData();
});


app.post("/room.ejs", async function (req, res) {
  const nitrogen = parseFloat(req.body.nitrogen); 
  const phosphorous = parseFloat(req.body.phosphorous);
  const humidity = parseFloat(req.body.humidity);
  const potassium = parseFloat(req.body.potassium);
  const temperature = parseFloat(req.body.temperature);
  const ph = parseFloat(req.body.ph);
  const rainfall = parseFloat(req.body.rainfall);

  const datas = [];
  const sums = [];

  async function findData() {
    try {
      const data = await con.collection("crops_data").find().toArray();
      const fetchUser = await User.findOne({ username: usernameGlobal });
      data.forEach((crop) => {
        const sum =
          Math.abs(nitrogen - parseFloat(crop.nitrogen)) +
          Math.abs(phosphorous - parseFloat(crop.phosphosrous)) +
          Math.abs(humidity - parseFloat(crop.humidity)) +
          Math.abs(potassium - parseFloat(crop.potassium)) +
          Math.abs(temperature - parseFloat(crop.temperature)) +
          Math.abs(ph - parseFloat(crop.ph)) +
          Math.abs(rainfall - parseFloat(crop.rainfall));
        sums.push(sum);
        datas.push(crop);
      });

      const copyArray = [...sums];
      copyArray.sort((a, b) => a - b);
      const smallestThree = copyArray.slice(0, 3);
      const indices = [];
      for (const value of smallestThree) {
        const index = sums.indexOf(value);
        indices.push(index);
      }

      let v = 3;
      while (
        datas[indices[0]].crop === datas[indices[1]].crop ||
        datas[indices[1]].crop === datas[indices[2]].crop ||
        datas[indices[2]].crop === datas[indices[0]].crop
      ) {
        if (datas[indices[0]].crop === datas[indices[1]].crop) {
          indices[1] = sums.indexOf(copyArray[v]);
          v = v + 1;
        }
        if (datas[indices[1]].crop === datas[indices[2]].crop) {
          indices[2] = sums.indexOf(copyArray[v]);
          v = v + 1;
        }
        if (datas[indices[2]].crop === datas[indices[0]].crop) {
          indices[0] = sums.indexOf(copyArray[v]);
          v = v + 1;
        }
      }

      const RecommendedCrops = [];
      const RecommendedCrops1 = [];
      for (const index of indices) {
        RecommendedCrops.push(datas[index]);
      }

      for (const crop of RecommendedCrops) {
        const details = await con
          .collection("crops_details")
          .find({ crop: crop.crop })
          .toArray();
        RecommendedCrops1.push(details);
      }

      res.render("roomOutput.ejs", {
        fname: fetchUser.firstname,
        occup: fetchUser.occupation,
        loca: fetchUser.location,
        abo: fetchUser.about,
        RecommendedCrops1: RecommendedCrops1[0],
        RecommendedCrops2: RecommendedCrops1[1],
        RecommendedCrops3: RecommendedCrops1[2],
      });
    } catch (err) {
      console.log(err);
    }
  }
  await findData();
});

app.post("/submitLocation", async function (req, res) {
  const fetchUser = await User.findOne({ username: usernameGlobal });
  const selectedState = req.body.selectedState;
  const sc = await con
    .collection("state_crop")
    .find({ state: selectedState })
    .toArray();
  const RecommendedCrops1 = [];
  RecommendedCrops1.push(
    await con.collection("crops_details").find({ crop: sc[0].crop1 }).toArray()
  );
  RecommendedCrops1.push(
    await con.collection("crops_details").find({ crop: sc[0].crop2 }).toArray()
  );
  RecommendedCrops1.push(
    await con.collection("crops_details").find({ crop: sc[0].crop3 }).toArray()
  );

  res.render("roomOutput.ejs", {
    fname: fetchUser.firstname,
    occup: fetchUser.occupation,
    loca: fetchUser.location,
    abo: fetchUser.about,
    RecommendedCrops1: RecommendedCrops1[0],
    RecommendedCrops2: RecommendedCrops1[1],
    RecommendedCrops3: RecommendedCrops1[2],
  });
});

app.get("/roomOutput.ejs", function (req, res) {
  res.render("roomOutput");
});

app.get("/submitLocation", function (req, res) {
  res.redirect("room.ejs");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
