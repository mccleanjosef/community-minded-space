console.log('script'); //testing if script.js is working
console.log(sessionStorage);

$(document).ready(function() {

  // ============ Appending Intro into App Starts ============
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
  // ============ Appending Intro into App Ends ============


}); //document.ready