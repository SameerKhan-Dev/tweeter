/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

/* The escape function is used to prevent cross-site-scripting through escaping the input */
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/* The escape function is used to compute how long ago the tweet was created in seconds, hours, mins or days ago*/
const timeDisplay = function(tweetObj) {

  let currentTime = new Date();
  let currentTimeMillisecs = currentTime.getTime();

  let timePostedMillisecs = tweetObj.created_at;
  
  // postAge is how long ago in milliseconds the tweet was created
  let postAge = currentTimeMillisecs - timePostedMillisecs;
  
  let tweetPostAge = "Empty";
  
  // return string describing seconds ago or minutes, or hours or days ago based on how long ago tweet was posted.
  if (postAge < 60000) {

    let timeSeconds = Math.ceil(postAge / 1000).toFixed(0);
    if (timeSeconds <= 1) {

      tweetPostAge = `${timeSeconds} second ago`;
    } else {
      tweetPostAge = `${timeSeconds} seconds ago`;
    }

  } else if (postAge >= 60000 && postAge < 3600000) {
    let timeMinutes = (Math.ceil(postAge / (1000 * 60)).toFixed(0));

    if (timeMinutes <= 1) {

      tweetPostAge = `${timeMinutes} minute ago`;
    } else {
      tweetPostAge = `${timeMinutes} minutes ago`;
    }

  } else if (postAge >= 3600000 && postAge < 86400000) {

    let totalTime = Math.ceil(postAge / (1000 * 60 * 60)).toFixed(0);
 
    tweetPostAge = `${totalTime} hours ago`;
   
  } else if (postAge >= 86400000) {

    let timeDays = Math.ceil(postAge / (1000 * 60 * 60 * 24)).toFixed(0);
  
    tweetPostAge = `${timeDays} days ago`;
    
  }

  return tweetPostAge;
};

// The following jQuery functions execute when the document is ready (i.e all elements loaded).
$(document).ready(function() {

  // To hide and show the new tweet section using the button on the nav-bar, the following on click function is used.
  $("#newTweetSection").hide();

  $("#writeTweet").on("click", function(event) {

    if ($("#newTweetSection").is(':hidden')) {

      $("#newTweetSection").slideDown("slow");

    } else {

      $("#newTweetSection").hide();
      $("#errorMsg").hide();
 
    }
  });

  // This function is used to render tweets by prepending on each tweet to the html document for display.
  const renderTweets = function(tweets) {
    
    for (let x = 0; x < tweets.length; x++) {

      // calls createTweetElement for each tweet and prepend
      let $tweet = createTweetElement(tweets[x]);
      $("#tweets-container").prepend($tweet);

    }
  };

  /*
    This function will take in a tweet Object and is responsible for returning a
    tweet <article> element containing the entire HTML structure of the tweet.
    This function just creates a single new HTML element using JQuery and returns it to the caller.
  */
  const createTweetElement = function(tweetObject) {
   
    let tweetPostAge = timeDisplay(tweetObject);
    
    // html structure to compose for new tweet element.
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
  };

  /* Attach a event handler to handle the submit event that gets fired
   when submitting the form, through use of button for example in this case.
   i.e Using jQuery we can use event handlers to prevent the existing form submission
   and instead submit the form data using an AJAX request (which will do it asynchronously);
*/
  $("#newTweetForm").on("submit", function(event) {

    // Prevents default action of form, which is to perform the submit event.
    event.preventDefault();

    /* Use the jQuery .serialize() function, which turns the form data into a query string.
     This serialized data is sent to the server in the data field of the AJAX POST Request.
  */
    let serializedInputData = $("#newTweetForm").serialize();

    let url = "http://localhost:8080/tweets";
  
    $("#errorMsg").hide();
 
    let data = serializedInputData;
  
    let userTweetInput = $("#tweet-text").val();

    // check if tweet is valid (i.e less than max. 140 characters and not empty).
    if (userTweetInput.length > 140) {

      $("#errorMsg").text("Error! Tweet must not exceed maximum characters limit of 140.");
      $("#errorMsg").slideDown("slow");
  
    } else if (userTweetInput === "") {

      $("#errorMsg").text("Error! Tweet content is empty!");
      $("#errorMsg").slideDown("slow");

    } else {
      // Send AJAX Post request to the server with date being the inputted tweet submitted by user.
      $.ajax({
        type: "POST",
        url: url,
        data, data
      }).then((result) => {
      
        // Empty the current tweets-container html element to avoid repetitive html elements upon loading
        $('#tweets-container').empty();

        // Load the tweets page and empty the tweet input field.
        loadtweets();
        $("#tweet-text").val("");

        // reset the character counter.
        $("#newTweetForm").find(".counter").val(140);
      })
        .catch((err) => {
  
          console.log("Error Message from Server: ");
          console.log(err);
        });
    }
  });

  /*
  The loadtweets function will use JQUERY to /tweets and receive the array of tweets as JSON.
*/
  let url = "http://localhost:8080/tweets";

  const loadtweets = function() {
    $.ajax({
      type: "GET",
      url: url,
    }).then((result) => {

      renderTweets(result);

    }).catch((err) => console.log(err));
  };

  // Load the existing tweets upon initial page load.
  loadtweets();

});