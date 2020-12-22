/// this file is responsible for the character counter


/*
  $(document).ready(function() {


  });
  $(document).ready runs a callback when the DOM is ready to be manipulated with JQuery. Without it,
  we might accidently try to access the HTML elements that the browser hasn't had the chance to load, causing
  errors. 
  // code JQuery code goes inside the $(document).ready...


*/
console.log("HELLO THERE!");

$(document).ready(function() {
 
  // our code goes here
  // console.log("DOCUMENT READY FAM!");
  /*
        <main class="container">

      <section class = "new-tweet">

        <h2>Compose tweet</h2>
        <form id = "newTweetForm" action = "/tweets" method = "POST">

          <label for= "tweet-text">What are you humming about?</label>
          <textarea name= "text" id="tweet-text"></textarea>
          <div class="newTweet">
            <button type="submit">Tweet</button>
            <!-- The <output> tag is used to represent the result of a calculation (like one performed by a script)!-->
            <output name ="counter" class="counter" for="tweet-text">140</output>
          </div>
        </form>
      </section>

    </main>

  */

  $("#tweet-text").on("input", function(){

    //console.log("this is: ",this);
    let inputValue = $(this).val();
    let lengthValue = inputValue.length;

    //let form = $(this).parent();
    //console.log(form);

    let counter = $(this).parent().find(".counter")
    counter.val(140-lengthValue);

    if((140-lengthValue)< 0){

     counter.addClass("redCounter");

    } else {

      //$("#errorMsg").addClass("errorHidden");
      $("#errorMsg").hide();
      counter.removeClass("redCounter");

    }
    //let counter = form.children(".counter");
  
    //console.log("counter is: ", counter);
    //counter.val(lengthValue);


    
    //console.log("input length is: ", $(this).val().length);
  });



 
}); 