$(document).ready(function(){
   

    $("#display-weather").hide();
$("#display-playlist").hide();

$("#add-city").click(function(){
    $("#display-submit").hide();
    $("#display-weather").show();
    $("#display-playlist").show(); 
    
})
$("#add-city").click(function (event) {

    event.preventDefault();
    
    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var weatherURL = "http://api.wunderground.com/api/22c4d183e8562c2d/conditions/geolookup/forecast/hourly10day/q/" + state + "/" + city + ".json"


    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var data = response.current_observation;
       var temp = data.dewpoint_string;

        var p = $("<p>").html(data.display_location.full);
        var temprature = $("<p>").text(temp);

        $("#location-display").append(p, temprature);

    })
});


























})