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

$(document).on("click", ".moods1", function(){
    console.log(this)
    $("body").css("background-image", "url('http://www.zingerbug.com/Backgrounds/background_images/blue_christmas_lights_out_of_focus_seamless_texture.jpg')")
    // $('myObject').css('background-image', 'url(' + imageUrl + ')');
})



$(document).on("click", ".moods2", function(){
    console.log(this)
    $("body").css("background-image", "url('https://i.pinimg.com/originals/7e/a3/d8/7ea3d8ecb053f6952f63ca536e65ad13.jpg')")
    // $('myObject').css('background-image', 'url(' + imageUrl + ')');
})


$(document).on("click", ".moods3", function(){
    console.log(this)
    $("body").css("background-image", "url('http://78.media.tumblr.com/bbc196cbb9eaebce474ccb0ff0e6573c/tumblr_nlmg8qVAL01qcdtsho1_400.jpg')")
    // $('myObject').css('background-image', 'url(' + imageUrl + ')');
})


$(document).on("click", ".moods4", function(){
    console.log(this)
    $("body").css("background-image", "url('https://github.com/alexscar99/Project1-Group6/blob/regina/assets/images/ampbackground.jpg?raw=true')")
    // $('myObject').css('background-image', 'url(' + imageUrl + ')');
})


$(document).on("click", ".moods5", function(){
    console.log(this)
    $("body").css("background-image", "url('https://github.com/alexscar99/Project1-Group6/blob/regina/assets/images/calmbackground.jpg?raw=true')")
    // $('myObject').css('background-image', 'url(' + imageUrl + ')');
})
























})