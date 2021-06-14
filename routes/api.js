const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const hash = require("./crypt.js");

// ******************  Models *********************** //
const User = require("../models/user.js");
const History = require("../models/history.js")

// MongoDB Connection
const uri = "mongodb+srv://KennyWatsu:KennyWatsu@firstcluster.gxsun.mongodb.net/eventsdb?retryWrites=true&w=majority";
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Connected! to MongoDB Atlas");
    }
  }
);

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized Request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.authUser = payload.subject
  next()
}

router.get("/", (req, res) => res.send("Welcome from API endpoint."));

// RegistrationAPI
router.post("/register", (req, res) => {
  let userData = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: hash(req.body.password),
  };
  User.findOne({ email: userData.email }, (error1, user1) => {
    if (error1) {
      console.error("User not found!");
    } else {
      if (!user1) {
        let user2 = new User(userData);
        user2.save((error, registeredUser) => {
          if (error) {
            console.error(error);
          } else {
            res.json(`Successfully Registered! as '${registeredUser.fname}'.`);
          }
        });
      } else {
        res.status(409).send("Email Already exist");
      }
    }
  });
});

// LoginAPI
router.post("/login", (req, res) => {
  let userData = {
    email: req.body.email,
    password: hash(req.body.password),
  };
  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log("User not found!");
    } else {
      if (!user) {
        res.status(401).send("Invalid Email");
      } else {
        if (user.password !== userData.password) {
          res.status(401).send("Invalid Password");
        } else {
          let payload = {
            subject: {
              id: user._id,
              name: `${user.fname} ${user.lname}`,
              email: user.email
            }
          };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token });
        }
      }
    }
  });
});

router.post('/update', verifyToken, (req, res) => {
  User.findOneAndUpdate({ _id: req.authUser.id, password: hash(req.body.oldPassword) }, { password: hash(req.body.newPassword) }, { new: true }, (err, user) => {
    if (err) {
      res.status(500).send("Something went wrong");
    } else if (!user) {
      res.status(401).send("Invalid Old password");
    } else {
      res.json(user);
    }
  })
})

router.post('/terminate', verifyToken, (req, res) => {
  User.deleteOne({ _id: req.authUser.id }, (err) => {
    if (!err) {
      History.deleteMany({ userId: req.authUser.id }, (err) => {
        if (!err) {
          res.status(200).json(`Account with name '${req.authUser.name}' deleted successfully!`)
        }
      })
    } else {
      res.status(500).json("Something went wrong while deleting your acoount!")
    }
  });
})

router.get('/history', verifyToken, (req, res) => {
  History.find({ userId: req.authUser.id }, (error, record) => {
    if (error) {
      console.log("Record not found!");
    } else {
      if (!record) {
        res.status(401).send("No record");
      } else {
        res.json(record);

      }
    }
  });
});

router.post('/history', verifyToken, (req, res) => {
  let data = {
    userId: req.authUser.id,
    date: Date.now(),
    analyzedKeyword: req.body.analyzedKeyword,
    analyzedCount: req.body.analyzedCount,
    positive: req.body.positive,
    negative: req.body.negative,
    neutral: req.body.neutral,
  }
  let record = new History(data);
  record.save((error, record) => {
    if (error) {
      console.error(error)
    } else {
      res.json(record)
    }
  })
});


module.exports = router;
