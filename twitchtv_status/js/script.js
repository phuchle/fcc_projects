function getStreamStatus(name = "freecodecamp") {
  var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
  var url =
  "https://wind-bow.gomix.me/twitch-api/streams/" + name;
  $.getJSON(url, function(response) {
    return response.stream == "null" ? "offline" : "online";
  });
}

// returns object with info
function getChannelInfo(name = "freecodecamp") {
  var url = "https://wind-bow.gomix.me/twitch-api/channels/" + name;
  var channelInfo = {};
  $.getJSON(url, function(response) {
    channelInfo["url"] = response.url;
    channelInfo["name"] = response.display_name;
    channelInfo["logo"] = response.logo;
  });
  return channelInfo;
}

function detectEnterKeyDown() {
  var searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
      showStreamInfo(searchInput.value);
    }
  });
}

function showStreamInfo(name = "freecodecamp") {
  var stream = getChannelInfo(name);
  var status = getStreamStatus(name);
  if (stream.name == undefined) {
    var noUser = "<h4>The account could not be found and may be closed.</h4>";
    $("#twitch-status").html(noUser);
  }
  else if (status == "online") {
    console.log('online');
  }
  else if (status == "offline") {
    console.log('online');
  }
}

document.addEventListener("DOMContentLoaded", function() {
  //do work
  showStreamInfo();
  detectEnterKeyDown();
});
