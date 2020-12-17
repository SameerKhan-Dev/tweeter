/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

console.log("HELLO FROM CLIENT.JS");




const renderTweets = function(tweets) {
  // loops through the tweets
  
  // calls createTweetElement for each tweet

  // takes return value and appends it to the tweets container.

}









/*
  This function will take in a tweet Object and is responsible for returning a 
  tweet <article> element containing the entire HTML structure of the tweet.
*/ 

const createTweetElement = function (tweetObject) {

 /* Your code for creating the tweet element */
  //
  // the tweet object will be in the form shown below from server (in this example look at the structure of tweetData). 
  let $tweet = 


  return $tweet;



} 


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.