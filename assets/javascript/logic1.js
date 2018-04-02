$(document).on("click", ".moods1", function(){
    console.log(this)
    $("body").css("background-image", "url('http://www.zingerbug.com/Backgrounds/background_images/blue_christmas_lights_out_of_focus_seamless_texture.jpg')")
    $('#vybe-logo').css('border', '5px solid white');
    $('.navbar').css('background-color', 'white');
    // $('myObject').css('background-image', 'url(' + imageUrl + ')');
})



$(document).on("click", ".moods2", function(){
    console.log(this)
    $("body").css("background-image", "url('https://i.pinimg.com/originals/7e/a3/d8/7ea3d8ecb053f6952f63ca536e65ad13.jpg')")
    $('#vybe-logo').css('border', '5px solid white');
    $('.navbar').css('background-color', 'Crimson');
    // $('myObject').css('background-image', 'url(' + imageUrl + ')');
})


$(document).on("click", ".moods3", function(){
    console.log(this)
    $("body").css("background-image", "url('http://78.media.tumblr.com/bbc196cbb9eaebce474ccb0ff0e6573c/tumblr_nlmg8qVAL01qcdtsho1_400.jpg')")
    $('#vybe-logo').css('border', '5px solid white');
    $('.navbar').css('background-color', 'ForestGreen');
    // $('myObject').css('background-image', 'url(' + imageUrl + ')');
})


$(document).on("click", ".moods4", function(){
    console.log(this)
    $("body").css("background-image", "url('https://github.com/alexscar99/Project1-Group6/blob/regina/assets/images/ampbackground.jpg?raw=true')")
    $('#vybe-logo').css('border', '5px solid white');
    $('.navbar').css('background-color', 'BlueViolet');
    // $('myObject').css('background-image', 'url(' + imageUrl + ')');
})


$(document).on("click", ".moods5", function(){
    console.log(this)
    $("body").css("background-image", "url('https://github.com/alexscar99/Project1-Group6/blob/regina/assets/images/calmbackground.jpg?raw=true')")
    $('#vybe-logo').css('border', '5px solid white');
    $('.navbar').css('background-color', 'Aquamarine');
    // $('myObject').css('background-image', 'url(' + imageUrl + ')');
})

$(document).ready(function(){
    $("#display-weather").hide();
    $("#display-playlist").hide();
    
    $("#add-city").click(function(){
        $("#display-submit").hide();
        $("#display-weather").show();
       $("#display-playlist").show();    
   
      $("#display-playlist").show();  
    })
})

