
function getWeather() {
    var city = $("#city").val().trim();
    var state = $("#state").val().trim();;
    var weatherURL = "http://api.wunderground.com/api/22c4d183e8562c2d/conditions/q/" + state + '/' + city + '.json';

    $("#submit").click(function () {
        $.ajax({
            method: "GET",
            url: weatherURL
        }).then(function (response) {
            $("#location-display").append(response.display_location.full);
            $("#temperture-display").append(response.temp_f);
            $("#weather-display").append(response.weather);
            $("#icon-display").append(response.icon_url);
        })
    })
}