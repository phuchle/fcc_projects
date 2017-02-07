function getQuote(){
    $.ajax({
      url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
      success: makeQuote,
      cache: false
    });
 }

function makeQuote(response) {
  var result = response[0];
  if ((result.content + " " + result.title).length > 140) {
    getQuote();
  }
  else {
    var html = "";

    html += "<blockquote id='quote'>";
    html +=  result.content;
    html += "<footer class='blockquote-footer pull-right'>"
         + result.title + "</footer";
    html += "</blockquote>";

    // fade out prev quote and then fade in new
    $("#quote").fadeOut(1500, function(){
      $("#quote").html(html);
      $("#quote").fadeIn(1500);
    })

    var quoteForTweet = $("#quote p").text();
    makeTweetURL(quoteForTweet, result.title);
  }
}

function makeTweetURL(quote, author){
  var tweet_url = "https://twitter.com/intent/tweet?text=" + quote + " - " + author;
   $("#tweet-button").attr("href", tweet_url);
}

$("#getQuote").on("click", function(){
    getQuote();
});

getQuote();
