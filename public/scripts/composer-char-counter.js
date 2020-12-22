// this file is responsible for maintaining the character counter

$(document).ready(function() {

  /* Attach event handler to new tweet text-area. This event handler converts
     the character count display to red if input character count exceeds limit of 140 chars.
  */
  $("#tweet-text").on("input", function() {
    
    let inputValue = $(this).val();
    let lengthValue = inputValue.length;

    let counter = $(this).parent().find(".counter");
    counter.val(140 - lengthValue);

    if ((140 - lengthValue) < 0) {

      counter.addClass("redCounter");

    } else {

      $("#errorMsg").hide();
      counter.removeClass("redCounter");

    }
  });
});