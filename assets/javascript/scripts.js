$(document).ready(function() {
  var appId = '262375a7aef9447c9eecb14c996c2909'; // client id
  var appSecret = '5aa1b6948b0f4563945ed6d1fcc6cf11'; // client secret
  var appURI = 'http://localhost:8080'; // our uri

  var spotifyURL =
    'https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=' +
    appId +
    '&redirect_uri=' +
    appURI +
    '&scope=user-read-private%20user-read-email&response_type=token&state=123&show_dialog=true';

  $('#signIn').click(function() {
    $.ajax({
      method: 'GET',
      url: spotifyURL,
      success: function(result) {
        console.log(result);
      }
    });
  });
});
