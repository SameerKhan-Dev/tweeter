/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const timeDisplay = function (tweetObj) {

  let currentTime = new Date();
  let currentTimeMillisecs = currentTime.getTime();

  let timePostedMillisecs = tweetObj.created_at;

  let postAge = currentTimeMillisecs - timePostedMillisecs;
  
  let tweetPostAge = "Empty";
  
  // milliseconds in a second : 
  if (postAge < 60000 ) {

    let timeSeconds = Math.ceil(postAge / 1000).toFixed(0);
    if (timeSeconds <= 1) {

      tweetPostAge = `${timeSeconds} second ago`;
    }
    else {
      tweetPostAge = `${timeSeconds} seconds ago`;
    }

  } else if (postAge >= 60000 && postAge < 3600000) {
    let timeMinutes = (Math.ceil(postAge / (1000 *60)).toFixed(0));

    if (timeMinutes <= 1) {

      tweetPostAge = `${timeMinutes} minute ago`;
    }
    else {
      tweetPostAge = `${timeMinutes} minutes ago`;
    }

  } else if (postAge >= 3600000 && postAge < 86400000) {

    let totalTime = Math.ceil(postAge / (1000 *60*60)).toFixed(0);
 
      tweetPostAge = `${timeHours} hours ago`;
   
  } else if (postAge >= 86400000) {

    let timeDays = Math.ceil(postAge / (1000 *60*60*24)).toFixed(0);
  
      tweetPostAge = `${timeDays} days ago`;
    
  }
  

  return tweetPostAge;
}

console.log("HELLO FROM CLIENT.JS");

$(document).ready(function() {
  // tweets in this case: is the array of tweets objects
  

  $("#writeTweet").on("click", function (event) {

    if($("#newTweetSection").is(':hidden')) {

      $("#newTweetSection").slideDown("slow");

    } else {

      $("#newTweetSection").hide();
    }

  });


  const renderTweets = function(tweets) {
    // loops through the tweets

    for (let x = 0; x < tweets.length; x++) {
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweets[x]);
      // append the new html element into the html document, under the element with id- tweets-container.
     // console.log("the tweets[x] element is", tweets[x]);
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
    
    let tweetPostAge = timeDisplay(tweetObject);
    
    const tweetTime = new Date(tweetObject["created_at"]).toLocaleString();
    const milliSec = Date.now() - tweetTime;
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
        <span class ="tweetFromUser">${escape(tweetObject.content.text)}</span>
      </section>
      <footer>
        <span>${tweetPostAge}</span>
        <span class = "socialIcons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i><i class="fas fa-heart"></i></span>
      </footer>
    </article>`;
    return $tweet;
  } 

//$("#errorMsg").addClass("errorHidden");
// attach a event handler to handle the submit event that gets fired
// when submitting the form, through use of button for example in this case.
// i.e Using jQuery we can use event handlers to prevent the existing form submission 
// and instead submit the form data using an AJAX request (which will do it asynchronously);

$("#newTweetForm").on("submit", function (event) {

  // Prevents default action of form, which is to perform the submit event.
  event.preventDefault();

  // now form data submission

  /*
    Our server is configured to receive form data formatted as a query string.
    so for example:  field1=value1&field2=value2&field3=value3

    Consider the jQuery .serialize() function, which turns the form data into a query string.
    This serialized data should be sent to the server in the data field of the AJAX POST Request.

    A common alternative to a query string would be to serialize the form data to a JSON string. 
    However, our server is configured to receive the query string format. 
  */


  //To prevent cross site scripting attacks set the data to be in a safe / secure format by using the .text()
  // jquery method that can be used to retrieve or set the value of an element, which internally uses the
  // createTextNode() DOM Method, which escapes unsafe characters, so it is safe to use with untrusted text. 
  // escaping characters is one method to help prevent cross-site scripting attacks where user can put valid html or js code as input

  // unsafe input extracted
  // let originalInput = escape($("#tweet-text").text());
  //$("#tweet-text").val(escape($("#tweet-text").text()));
  //console.log(typeof originalInput);
  //console.log(typeof $("#tweet-text").text());
  //reset the content using .text();
  //$("#tweet-text").text(originalInput);

  //console.log("the value of tweet-text is: ");
  //console.log($("#tweet-text").val());

  // step 1: convert our form submission data into query string format.

  //let dataSecured = $("#tweet-text").text().serialize();
  let serializedInputData = $("#newTweetForm").serialize();
  //console.log("serializedInputData is", serializedInputData);

  let url = "http://localhost:8080/tweets";
  $("#errorMsg").hide();
  /*
  let targetElement = $(this).find("#tweet-text");
  console.log("targetElement is : ", targetElement);
  let data = targetElement.val();
  */ 
 
  // set data to be serialized version
  let data = serializedInputData;
  
  console.log("serializedInputData is: ", data);
  //console.log("data submitted is: ", data);
  
  // implement AJAX Post Request as follows:
  // the $ object's ajax request
  // equivalent to jQuery.ajax()function.
  // $ is shorthand notation for $ object.
  // $() is actually a method named 
  // ajax is a method inside the object $. That method returns a promise and is identified to be an asynchronous function by nature.
  // we pass the values: post -type, url (url sending to) and our data to be posted in this AJAX Post Request.
  // the .ajax function returns a promise (which contains the result or response from the server, and can be accessed
  // through the .then function! amazing!);
  let userTweetInput = $("#tweet-text").val();

  //console.log("userTweetInput is: ", userTweetInput);

  if (userTweetInput.length > 140 ) {
    // by default class is on. when error is there we want to remove the class.
    //$("#errorMsg").removeClass("errorHidden");
    $("#errorMsg").text("Error! Tweet must not exceed maximum characters limit of 140.");
    $("#errorMsg").slideDown("slow");
    //alert ("Error! Tweet content exceed maximum characters limit of 140.")
  }
  else if (userTweetInput === "") {
    $("#errorMsg").text("Error! Tweet content is empty!");
   // $("#errorMsg").removeClass("errorHidden");
    
    $("#errorMsg").slideDown("slow");
    //alert ("Error! Tweet content is empty!");
  }
  else {
   // $(".tweet-error .errorHidden").removeClass("errorHidden");
    $.ajax({
      type: "POST",
      url: url,
      data, data
    }).then((result) => {
      
      // empty the current tweets-container.
      $('#tweets-container').empty();
       // load the tweets page.
      loadtweets();
      $("#tweet-text").val("");
      $("#newTweetForm").find(".counter").val(140);
      //let counter = $(this).parent().find(".counter")
    })
    
    .catch((err) => {
  
      console.log("Error Message from Server: ");
      console.log(err); 
    })

  }

});

/// Create a loadtweets function
/*
  The loadtweets function will use JQUERY to /tweets and receive the array of tweets as JSON.

*/ 
let url = "http://localhost:8080/tweets";

const loadtweets = function () {
  $.ajax({
    type: "GET",
    url: url,
  }).then((result) => {

    // take result JSON Object and console.log it out for now;
    //console.log("the result from get object is: ");
    //console.log(result);
    renderTweets(result);

  }).catch((err) => console.log(err));
};


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

/*
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


*/

//renderTweets(data);
//loadtweets();
  loadtweets();

}); 