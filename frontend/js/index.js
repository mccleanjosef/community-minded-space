console.log('script'); //testing if script.js is working
console.log(sessionStorage);

$(document).ready(function(){

  $("#alertError").hide();
  $("#alertError2").hide();
  $("#alertError3").hide();
  $("#asAlertError").hide();
  $("#asAlertError2").hide();

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
    });


    
  // Appending Intro next page on App start

  $('#index-btn').click(function(){

    $('#landing-page').empty().append(
      `
      <div class="landing-background-second">
      <div class="landing-section">
      <div class="landing-section--topSecond">
      <h1 class="landing-section--h1">Discover a new world of wildlife</h1>
      <p class="landing-section--p">Join the community documenting wildlife observations that support the research and conservation across New Zealand</p>
      </div>
      <div class="landing-section--bottom">
      <a href="signIn.html"><button id="index-btn" class="landing-section--button">Get Started</button></a>
        <div class="landing-section--navigation-circles__second">
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

  // Appending Intro next page on App finished



  // User Registration Starts

  $('#createAccount').click(function() {
    event.preventDefault() //this prevents code breaking when no data is found

    let username = $('#c-username').val();
    let password = $('#c-password').val();
    let profile_img = $('#c-profile_img').val();
    console.log(username, password, profile_img);

    if (username == '' || password == '' || profile_img == '') {
      alert('Please enter all details');

    } else {
      $.ajax({
        url: `http://${url}/registerUser`,
        type: 'POST',
        data: {
          username: username,
          password: password,
          profile_img: profile_img
        },
        success: function(user) {

          if (user !== 'username taken already. Please try another name'){

            // if register is successful - log user in Starts
            let username = $('#c-username').val();
            let password = $('#c-password').val();
            console.log(username, password); //remove when development is finished

            $.ajax({
              url: `http://${url}/loginUser`,
              type: 'POST',
              data: {
                username: username,
                password: password
              },
              success: function(user) {
                console.log(user);

                sessionStorage.setItem('userID', user['_id']);
                sessionStorage.setItem('userName', user['username']);
                sessionStorage.setItem('profileImg', user['profile_img']);
                console.log(sessionStorage);
                // document.location.href = 'main-feed.html';
                // alert('Welcome')

                // go to main-feed
                location.href='./main-feed.html'

              }, //success
              error: function() {
                console.log('error: cannot call api');
                alert('Unable to login - unable to call api');
              } //error
            }) //end of ajax

          } else {
            alert('username taken already. Please try another name');
            $('#r-username').val('');
            $('#c-password').val('');
            $('#c-profile_img').val('');
          } //else
          // if register is successful - log user in Ends

        }, //success
        error: function() {
          console.log('error: cannot call api');
        } //error
      }) //ajax post
    } //if
  }) //r-submit click

  // User Registration Finished




  // Login User Starts

  $('#signInBtn').click(function(){

    $("#alertError").hide();
    $("#alertError2").hide();
    $("#alertError3").hide();

    event.preventDefault();
    let username = $('#s-username').val();
    let password = $('#s-password').val();
    console.log(username, password);

    if (username == '' || password == '') {
      // alert('Please enter all details');
      $("#alertError").show();
    } else {
      $.ajax({
        url: `http://${url}/loginUser`,
        type: 'POST',
        data: {
          username: username,
          password: password
        },
        success: function(user) {
          console.log(user);

          if (user == 'user not found. Please register'){

            // alert('User not found. Please Register');
            $("#alertError2").show();

          } else if (user == 'not authorized'){
            alert('Please try with correct details');
            $("#alertError3").show();


            $('#s-username').val('');
            $('#s-password').val('');
          } else {
            sessionStorage.setItem('userID', user['_id']);
            sessionStorage.setItem('userName', user['username']);
            sessionStorage.setItem('profileImg', user['profile_img']);
            console.log(sessionStorage);
            document.location.href = 'main-feed.html';
            // alert('Welcome back! :)')
          } // end of ifs
        }, //success
        error: function() {
          console.log('error: cannot call api');
          alert('Unable to login - unable to call api');
        } //error
      }) //end of ajax
    } //end of else
  }); //end of login click function
  
  // Login User Finished
    

  


  // Add Sighting Start

  $('#add-sighting-btn').click(function(){
    event.preventDefault();
    let image_url = $('#as-image_url').val();
    let location = $('#as-location').val();
    let name = $('#as-name').val();
    let description = $('#as-description').val();
    let userid = sessionStorage.getItem('userID');
    let user_image = sessionStorage.getItem('profileImg');
    let username = sessionStorage.getItem('userName');

    console.log(userid);
    console.log(image_url, location, name, description);

    if(!userid){
      // alert('Please Login to make a post');
      $("#asAlertError").show();
    }

    else if (image_url == '' || location == '' || name == '' || description == ''){
      alert('Please enter all details');
      $("#asAlertError2").show();
    }

    else {
      $.ajax({
        url: `http://${url}/addPost`,
        type: 'POST',
        data: {
          image_url: image_url,
          location: location,
          name: name,
          description: description,
          profile_img: user_image,
          user_id: userid,
          username: username
        },
        success: function(post) {
          document.location.href = 'main-feed.html';
        },
        error: function() {
          console.log('error: cannot call api');
        } //error
      }) //ajax
    } //else
  }); //Add Sighting








}); //document.ready





