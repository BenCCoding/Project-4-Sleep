const Post = require("../models/post");

const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); // initate the S3 constructor which can talk to aws/s3 our bucket!
// import uuid to help generate random names
const { v4: uuidv4 } = require("uuid");
// since we are sharing code, when you pull you don't want to have to edit the
// the bucket name, thats why we're using an environment variable
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

module.exports = {
  create,
  index,
};

function create(req, res) {
  console.log(req.body, req.file, req.user); // < req.user comes the config/auth middleware that is mounted before our controllers in the server.js
  const key = `pupstagram/posts/${uuidv4()}-${req.file.originalname}`; //Change pupstagram to sleeptracker
  const params = { Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer };

  s3.upload(params, async function (err, data) {
    console.log("=======================");
    console.log(err, " err from aws");
    console.log("=======================");
    if (err) return res.status(400).json({ err: "Check Terminal error with AWS" });
    try {
      // Using our model to create a document in the posts collection in mongodb
      const post = await Post.create({
        caption: req.body.caption,
        user: req.user,
        photoUrl: data.Location, // < this is from aws
      });
      // respond to the client!
      res.status(201).json({ data: post });
    } catch (err) {
      res.status(400).json({ err });
    }
  });
}

async function index(req, res) {
  try {
    // this populates the user when you find the posts
    // so you'll have access to the users information
    // when you fetch teh posts
    const posts = await Post.find({}).populate("user").exec();
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(400).json({ err });
  }
}
