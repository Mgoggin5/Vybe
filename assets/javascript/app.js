$(document).ready(function() {
  var timeoutId = 0;
  var token;

  function authorizeApp() {
    //Grab the hidden elements containing the values of the id and secret
    var a = $('#a').val();
    var b = $('#b').val();

    //if the elements exist then save their values in local storage
    if (a && b) {
      //Use the id and secret to create the base64 string necessary to
      //authenticate
      localStorage.setItem('auth_creds', btoa(a + ':' + b));

      //Remove the elements from the page
      $('#a').remove();
      $('#b').remove();
    }

    //Client Credentials Flow Ajax Request
    $.ajax({
      method: 'POST',
      url:
        'https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token',
      data: {
        grant_type: 'client_credentials'
      },
      headers: {
        Authorization: 'Basic ' + localStorage.getItem('auth_creds')
      }
    }).then(function(response) {
      //Save the token returned into local storage
      localStorage.setItem('token', response.access_token);

      clearTimeout(timeoutId);

      //5 seconds before the token expiration is up, call authorizeApp
      //The token has a 1 hour expiration
      timeoutId = setTimeout(authorizeApp, response.expires_in * 1000 - 5000);
    });
  }

  //Just a function written to test the artist search after I've authenticated
  //and set the token.
  function artistSearch(artist) {
    if (!localStorage.getItem('token')) {
      authorizeApp();
    } else {
      $.ajax({
        url: 'https://api.spotify.com/v1/search?type=artist&q=' + artist,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(function(response) {
        console.log(response);
      });
    }
  }

  //Click function to execute the artist search based on user input
  $('#search').click(function() {
    event.preventDefault();
    var name = $('#artist')
      .val()
      .trim();

    if (name === '') {
      return;
    }

    artistSearch(name);
  });

  //When the page load, execute the authorizeApp function
  authorizeApp();

  // function millisToMinutesAndSeconds(millis) {
  //   var minutes = Math.floor(millis / 60000);
  //   var seconds = ((millis % 60000) / 1000).toFixed(0);
  //   return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  // }

  // millisToMinutesAndSeconds(298999); // "4:59"
  // millisToMinutesAndSeconds(60999); // "1:01"

  function displayPlaylist() {
    if (!localStorage.getItem('token')) {
      authorizeApp();
    } else {
      $.ajax({
        method: 'GET',
        url:
          'https://api.spotify.com/v1/users/12170685583/playlists/3KZ67wlum22eSF3n7jopRV',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(function(response) {
        console.log(response);
        // $('#playlist-display').append(response.tracks.items);
        function millisToMinutesAndSeconds(millis) {
          var minutes = Math.floor(millis / 60000);
          var seconds = ((millis % 60000) / 1000).toFixed(0);
          return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }

        var tracksArray = response.tracks.items;

        for (i = 0; i < tracksArray.length; i++) {
          var track = $('<p>');

          var currentTrack = tracksArray[i];

          // title
          track.append('Song: ' + currentTrack.track.name + ' ');

          // artist
          track.append(
            '<br>' + 'Artist: ' + currentTrack.track.artists[0].name + ' '
          );

          // album
          track.append(
            '<br>' + 'Album: ' + currentTrack.track.album.name + ' '
          );

          // length
          trackTime = currentTrack.duration_ms;

          track.append('<br>' + 'Length: ' + trackTime);

          $('#playlist-display').append(track);
        }
      });
    }
  }

  $('#playlist').click(function() {
    event.preventDefault();
    displayPlaylist();
  });
});

// play
// }

// // on weather section load
// $('#weather-display').hide();

// $('#playlist-display').hide();

// // $('#submit').css('margin', '30px auto')

// $('#submit').click(function() {
//   $('#form').hide();

//   $('#weather-display').fadeIn(1000);

//   $('#playlist-display').fadeIn(1000);

//   $('#submit').css('margin', '20px auto');
// });
