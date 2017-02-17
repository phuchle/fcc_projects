function searchWikipedia() {
  var searchTerm = document.getElementById("searchInput").value;
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchTerm + "&callback=?";

  $.getJSON(url, function(response) {
    showResults(response);
  });

}

function detectEnterKeyDown() {
  var searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
      searchWikipedia();
    }
  });
}

function showResults(response) {
  var titleArr = response[1];
  var descriptionArr = response[2];
  var hyperlinkArr = response[3];
  var resultContainer = document.getElementById('results');
  var innerContainer = document.getElementById('inner-container');

  innerContainer.style.alignSelf = "flex-start";
  resultContainer.innerHTML = "";

  for (var i = 0; i < titleArr.length; i++) {
    var newDiv = document.createElement("div");
    var hyperlink = document.createElement("a");
    var title = document.createElement("h3");
    var description = document.createElement("p");

    hyperlink.href = hyperlinkArr[i];
    title.textContent = titleArr[i];
    description.textContent = descriptionArr[i];
    hyperlink.appendChild(title);
    hyperlink.appendChild(description);
    newDiv.appendChild(hyperlink);
    resultContainer.appendChild(newDiv);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  detectEnterKeyDown();
});

$(document).ready(function(){
  $('#go').on("click", function(){
    searchWikipedia();
  });
});
