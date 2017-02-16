function searchWikipedia() {
  var searchTerm = document.getElementById("searchInput").value;
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchTerm;

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

  for (var i = 0; i < titleArr.length; i++) {
    var newDiv = document.createElement("div");
    newDiv.innerHTML = titleArr.shift();
    resultContainer.appendChild(newDiv);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  detectEnterKeyDown();
});
