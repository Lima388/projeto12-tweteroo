import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];
let sessionId = -1;

function signUpUser(user) {
  sessionId++;
  users.push(user);
}

function sendTweet(tweet) {
  let newTweet = tweet;
  newTweet.userId = sessionId;
  tweets.push(newTweet);
}

function getTweets() {
  let toSend = [];
  for (let i = 0; i < tweets.length; i++) {
    const j = tweets.length - 1 - i;
    if (i > 9) {
      break;
    }
    const user = users[tweets[j].userId];
    const temp = {
      username: tweets[j].username,
      avatar: user.avatar,
      tweet: tweets[j].tweet,
    };
    toSend.push(temp);
  }
  return toSend;
}

app.post("/sign-up", (req, res) => {
  signUpUser(req.body);
  res.sendStatus(200);
});

app.post("/tweets", (req, res) => {
  sendTweet(req.body);
  res.sendStatus(200);
});

app.get("/tweets", (req, res) => {
  res.send(getTweets());
});

app.listen(5000, () => console.log("Server running in port 5000"));
