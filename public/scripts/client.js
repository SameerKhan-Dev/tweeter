/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

console.log("HELLO FROM CLIENT.JS");

$(document).ready(function() {
  // tweets in this case: is the array of tweets objects

  const renderTweets = function(tweets) {
    // loops through the tweets

    for (let x = 0; x < tweets.length; x++) {
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweets[x]);
      // append the new html element into the html document, under the element with id- tweets-container.
      $("#tweets-container").prepend($tweet);

    }
    // takes return value and appends it to the tweets container.

  }

  /*
    This function will take in a tweet Object and is responsible for returning a 
    tweet <article> element containing the entire HTML structure of the tweet.
  */ 
  // this function just creates a single new HTML element using JQuery and returns it to the caller

  const createTweetElement = function (tweetObject) {

  /* Your code for creating the tweet element */
    //
    // the tweet object will be in the form shown below from server (in this example look at the structure of tweetData).
    // you can use the $() JQuery function to create new HTML element or structure etc, even if its nested etc.
    let $tweet =  
    `<article>
      <header>
        <img src=${tweetObject.user.avatars} alt ="User Image">
        <div>
          <span class ="userName">${tweetObject.user.name}</span> 
          <span class ="tweeterTagName">${tweetObject.user.handle}</span>
        </div> 
      </header>
      <section>
        <span class ="tweetFromUser">${tweetObject.content.text}</span>
      </section>
      <footer>
        <span>10 days ago</span>
        <span><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i><i class="fas fa-heart"></i></span>
      </footer>
    </article>`;
    return $tweet;
  } 

// attach a event handler to handle the submit event that gets fired
// when submitting the form, through use of button for example in this case.
// i.e Using jQuery we can use event handlers to prevent the existing form submission 
// and instead submit the form data using an AJAX request (which will do it asynchronously);

$("#newTweetForm").on("submit", function (event) {

  // Prevents default action of form, which is to perform the submit event.
  event.preventDefault();

})




// implement renderTweets function:

/*
  Define another function renderTweets. Thsi function can be responsible for taking in an array of
  tweet objects and then appending each one to the #tweets-container. In order to do this,
  the renderTweets will In order to do this, the renderTweets will need to leverage the createTweetElement function you wrote 
  earlier by passing the tweet object to it, then using the returned jQuery object by appending it to the #tweets-container 
  section.
*/


/*
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
//$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

*/

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]




renderTweets(data);


}); 