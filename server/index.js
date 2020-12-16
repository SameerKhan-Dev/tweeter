"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/*
  


*/
// The in-memory database of tweets. It's a basic object with an array in it.
const db = require("./lib/in-memory-db");
console.log("db is :", db);
// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
//const DataHelpers = require("./lib/data-helpers.js")(db);

// DataHelpers is the returned value when you call the function exported by ./lib/data-helpers.js) and send in parameter db , whatever that evaluates to.
const DataHelpersFunction = require("./lib/data-helpers.js");
/*DataHelpers is: 
 { saveTweet: [Function: saveTweet],
  getTweets: [Function: getTweets] }
  i.e dataHelpers is an object representing two methods: saveTweet and getTweets.
  // saveTweet: is actually a key methid: that takes in a newTweet and also a callback.   1
  -- saveTweet saves a tweet into the database.
  saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
  -- getTweet is:
     // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, db.tweets.sort(sortNewestFirst));
      });


*/
// DataHelpers is an object of key-method pairs
const DataHelpers = DataHelpersFunction(db);



console.log("DataHelpers is: ", DataHelpers);
// Update the dates for the initial tweets (data-files/initial-tweets.json).
require("./lib/date-adjust")();


/* tweetsRoutes is :
      tweetsRoutes is:  function router(req, res, next) {
    router.handle(req, res, next);
  }


*/


// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.

/*

tweetsRoutes is:  function router(req, res, next) {
    router.handle(req, res, next);
  }

*/

const tweetsRoutes = require("./routes/tweets")(DataHelpers);
console.log("tweetsRoutes is: ", tweetsRoutes);
// what does app.use do: 
/*
  app.use is a function requires middleware. For example:

 app.use('/user/:id', function (req, res, next) {
       console.log('Request Type:', req.method);
        next();
     });
This example shows the middleware function installed in the /user/:id path. This function is executed for any type of HTTP request in the /user/:id path.
// any requests to the /tweets path gets handled by tweetsRoutes ------------------------ function;
*/
// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
