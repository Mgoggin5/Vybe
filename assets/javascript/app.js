
$(document).ready(function () {
    var timeoutId = 0;
    var token;

    $('.music-choice-btn').hide();

    $('#display-weather').hide();

    function prepAuthorize() {
        //Grab the hidden elements containing the values of the id and secret
        var a = $('#a').val();
        var b = $('#b').val();

        //if the elements exist then save their values in local storage
        if (!localStorage.getItem('auth_req_url')) {
            //Use the id and secret to create the base64 string necessary to
            //authenticate
            var requestObject =
                'https://accounts.spotify.com/authorize?' +
                $.param({
                    client_id: a,
                    redirect_uri: 'https://alexscar99.github.io/Vybe/',
                    scope: 'user-read-private user-read-email',
                    response_type: 'token',
                    state: 123
                });

            localStorage.setItem('auth_req_url', requestObject);
            localStorage.setItem('auth_creds', btoa(a + ':' + b));
        }

        $('#loginLink').attr('href', localStorage.getItem('auth_req_url'));

        //Remove the elements from the page
        $('#a').remove();
        $('#b').remove();

        getToken();
    }

    function getToken() {
        var params = new URLSearchParams(location.hash.slice(1));

        if (localStorage.getItem('token') !== null) {
            $('.login-btn').hide();

            $('.music-choice-btn').show();
        }

        if (params.get('access_token')) {
            var access_token = params.get('access_token');

            localStorage.setItem('token', access_token);

            if (localStorage.getItem('token') !== null) {
                $('.login-btn').hide();

                $('.music-choice-btn').show();
            }
        }
    }

    function displayPlaylist(playlist) {
        var playlistWidget = $('<iframe>');

        playlistWidget.attr('src', playlist);

        playlistWidget.css('display', 'block');

        playlistWidget.css('margin', '25px auto');

        playlistWidget.css('border-radius', '12px');

        playlistWidget.attr('width', '500');

        playlistWidget.attr('height', '700');

        playlistWidget.attr('frameborder', '0');

        playlistWidget.attr('allowtransparency', 'true');

        playlistWidget.attr('allow', 'encrypted-media');

        $('.display-playlist').append(playlistWidget);
    }

    function makeMoodBtns() {
        var moods = ['happy', 'mellow', 'focus', 'amp', 'calm'];

        var userMoodIDs = [
            'spotify',
            'Tylercoryj',
            'spotify',
            'digster.co.uk',
            '12167594447'
        ];

        var moodPlaylistIDs = [
            '37i9dQZF1DX9u7XXOp0l5L',
            '6V25z3STNb56BsUnO127Kl',
            '37i9dQZF1DZ06evO07w8CY',
            '12R8HZh3GHUw1c4sgPtu6x',
            '5veFroK6xpskEjvhEyqFUM'
        ];

        for (let i = 0; i < moods.length; i++) {
            var btnWrapper = $("<div class='col-xs-2'>");
            var moodBtn = $('<img>');

            moodBtn.addClass('mood-img');

            moodBtn.attr('src', 'assets/images/' + moods[i] + '.png');

            moodBtn.attr('alt', moods[i]);

            moodBtn.attr(
                'data-playlist',
                'https://open.spotify.com/embed?uri=spotify:user:' +
                userMoodIDs[i] +
                ':playlist:' +
                moodPlaylistIDs[i] +
                '&theme=white'
            );

            moodBtn.attr('data-styling', moods[i]);

            btnWrapper.append(moodBtn);
            $('.mood-row').append(btnWrapper);
        }
    }

    $('#display-weather').hide();
    $('#display-playlist').hide();

    $('#add-city').click(function () {
        $('#display-submit').hide();
        $('#display-weather').show();
        $('#display-playlist').show();
    });

    $('#add-city').click(function (event) {
        event.preventDefault();

        var city = $('#city')
            .val()
            .trim();
        var state = $('#state')
            .val()
            .trim();
        var weatherURL =
            'http://api.wunderground.com/api/22c4d183e8562c2d/conditions/geolookup/forecast/hourly10day/q/' +
            state +
            '/' +
            city +
            '.json';

        $.ajax({
            url: weatherURL,
            method: 'GET'
        }).then(function (response) {
            var data = response.current_observation;

            var forecast = response.forecast.simpleforecast.forecastday[0];

            var highTemp = forecast.high.fahrenheit;

            var lowTemp = forecast.low.fahrenheit;

            var conditions = forecast.conditions;

            var iconURL = forecast.icon_url;

            var p = $('<p style="color: white; text-align: center;">').html(
                data.display_location.full
            );
            var highTemperature = $(
                '<p style="color: white; text-align: center;">'
            ).text('High: ' + highTemp + '° F');
            var lowTemperature = $(
                '<p style="color: white; text-align: center;">'
            ).text('Low: ' + lowTemp + '° F');

            var weather = $('<p style="color: white; text-align: center;">').text(
                'Conditions: ' + conditions
            );
            var weatherIcon = $('<img style="display: block; margin: 0 auto;">').attr(
                'src',
                iconURL
            );

            $('#location-display').append(
                p,
                highTemperature,
                lowTemperature,
                weather,
                weatherIcon
            );

            if (conditions === 'Clear') {
                displayPlaylist(
                    'https://open.spotify.com/embed?uri=spotify:user:viandante:playlist:4UjQw5dn0x8AFCsNRe8NCO&theme=white'
                );
            } else if (
                conditions === 'Overcast' ||
                conditions === 'Chance of Rain' ||
                conditions === 'Thunderstorm' ||
                conditions === 'Heavy Thunderstorm' ||
                conditions === 'Light Thunderstorm' ||
                conditions === 'Rain' ||
                conditions === 'Light Rain' ||
                conditions === 'Heavy Rain' ||
                conditions === 'Drizzle' ||
                conditions === 'Light Drizzle' ||
                conditions === 'Heavy Drizzle' ||
                conditions === 'Rain Showers' ||
                conditions === 'Light Rain Showers' ||
                conditions === 'Heavy Rain Showers'
            ) {
                displayPlaylist(
                    'https://open.spotify.com/embed?uri=spotify:user:1189531262:playlist:68PSpHS62kdrc0sPRsA3pM&theme=white'
                );
            } else if (
                conditions === 'Snow' ||
                conditions === 'Light Snow' ||
                conditions === 'Heavy Snow' ||
                conditions === 'Snow Showers' ||
                conditions === 'Light Snow Showers' ||
                conditions === 'Heavy Snow Showers'
            ) {
                displayPlaylist(
                    'https://open.spotify.com/embed?uri=spotify:user:1215363058:playlist:4TL2cI15HGzIrnYH6p4HBu&theme=white'
                );

                $('display-playlist');
            } else if (
                conditions === 'Cloudy' ||
                conditions === 'Partly Cloudy' ||
                conditions === 'Scattered Clouds' ||
                conditions === 'Mostly Cloudly'
            ) {
                displayPlaylist(
                    'https://open.spotify.com/embed?uri=spotify:user:kalynnicholsonn:playlist:2ufHhQrXKqZw7qAZ506Qbn&theme=white'
                );

                $('display-playlist');
            } else {
                displayPlaylist(
                    'https://open.spotify.com/embed?uri=spotify:user:x40fn74nzd798rvmpy6o5vue7:playlist:5oxZIYU1L9N1CczN0C4JkM&theme=white'
                );
            }
        });
    });

    $('#add-city').click(function () {
        $('#display-submit').hide();
        $('#display-weather').show();
        $('#display-playlist').show();
    });

    // if on mood page:
    if ($('.mood-background').length > 0) {
        makeMoodBtns();

        $(document.body).on('click', '.mood-img', function () {
            $('.display-playlist').empty();

            var playlistID = $(this).attr('data-playlist');

            displayPlaylist(playlistID);

            var styling = $(this).attr('data-styling');

            if (styling === 'focus') {
                $('body').css(
                    'background-image',
                    "url('http://www.zingerbug.com/Backgrounds/background_images/blue_christmas_lights_out_of_focus_seamless_texture.jpg')"
                );
                $('#vybe-logo, .playlist-display').css('border', '5px solid white');
                $('.navbar').css('background-color', 'white');
            } else if (styling === 'happy') {
                $('body').css(
                    'background-image',
                    "url('https://i.pinimg.com/originals/7e/a3/d8/7ea3d8ecb053f6952f63ca536e65ad13.jpg')"
                );
                $('#vybe-logo, .playlist-display').css('border', '5px solid white');
                $('.navbar').css('background-color', 'Crimson');
            } else if (styling === 'mellow') {
                $('body').css(
                    'background-image',
                    "url('http://78.media.tumblr.com/bbc196cbb9eaebce474ccb0ff0e6573c/tumblr_nlmg8qVAL01qcdtsho1_400.jpg')"
                );
                $('#vybe-logo, .playlist-display').css('border', '5px solid white');
                $('.navbar').css('background-color', 'ForestGreen');
            } else if (styling === 'amp') {
                $('body').css(
                    'background',
                    "url('https://github.com/alexscar99/Project1-Group6/blob/regina/assets/images/ampbackground.jpg?raw=true') no-repeat center center fixed"
                );
                $('body').css('background-size', 'cover');
                $('body').css('-webkit-background-size', 'cover');
                $('body').css('-moz-background-size', 'cover');
                $('body').css('-o-background-size', 'cover');
                $('#vybe-logo, .playlist-display').css('border', '5px solid white');
                $('.navbar').css('background-color', 'BlueViolet');
            } else {
                $('body').css(
                    'background-image',
                    "url('https://github.com/alexscar99/Project1-Group6/blob/regina/assets/images/calmbackground.jpg?raw=true')"
                );
                $('#vybe-logo, .playlist-display').css('border', '5px solid white');
                $('.navbar').css('background-color', 'Aquamarine');
            }

            $('html,body').animate(
                {
                    scrollTop: $('.playlist-display').offset().top
                },
                'slow'
            );
        });
    }

    prepAuthorize();
});
