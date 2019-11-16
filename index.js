const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(express.json());
const port = process.env.PORT || 4000;

const { users } = require("./state");

function getUser(userId) {
  let targetUser;
  for (i = 0; i < users.length; i++) {
    if (users[i]._id === userId) {
      targetUser = users[i];
    }
  }
  return targetUser;
}

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:userId", (req, res) => {
  let targetId = Number(req.params.userId);
  console.log(targetId);
  let targetUser = getUser(targetId);
  res.json(targetUser);
});

app.post("/users", (req, res) => {
  let newUser = {
    _id: 6,
    name: "Charlie",
    occupation: "Bartender",
    avatar: "https://www.fillmurray.com/200/200"
  };
  users.push(newUser);
  res.json(users);
});

app.put("/users/:userId", (req, res) => {
  let targetId = Number(req.params.userId);
  let targetUser = getUser(targetId);
  targetUser.occupation = "Kung Fu Fighter";
  res.json(users);
});

app.delete("/users/:userId", (req, res) => {
  let targetId = Number(req.params.userId);
  let targetUser = getUser(targetId);
  targetUser.isActive = false;
  res.send("deleted");
  console.log(users);
});

var counter = 7;
app.post("/addusers", (req, res) => {
  req.body._id = counter;
  counter += 1;
  console.log(req.body);
  users.push(req.body);
  res.json(req.body);
  console.log(users);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
