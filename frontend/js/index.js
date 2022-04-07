console.log('script'); //testing if script.js is working
console.log(sessionStorage);

$(document).ready(function() {


    let url; //declare url as a variable in es6
    $.ajax({
      url: 'config.json',
      type: 'GET',
      dataType: 'json',
      success: function(configData) {
        console.log(configData.SERVER_URL, configData.SERVER_PORT);
        url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
        console.log(url);
      },
      error: function(error) {
        console.log(error);
      }
    })


}); //document.ready





// Appending Intro into App

$('#index-btn').click(function(){

  $('#landing-page').empty().append(
    `
    <div class="landing-background-second">
    <div class="landing-section">
    <div class="landing-section--topSecond">
    <h1 class="landing-section--h1">Discover a new world of wildlife</h1>
    <p class="landing-section--p">Join the community documenting wildlife observations that support the research and conservation worldwide</p>
</div>
<div class="landing-section--bottom">
<a href="signIn.html"><button id="index-btn" class="landing-section--button">Get Started</button></a>
    <div class="landing-section--navigation-circles">
        <div class="landing-section--navigation-circles__circle2"></div>
        <div class="landing-section--navigation-circles__circle1"></div>
    </div>
</div>
</div>
</div>

    `
    );
});

