console.log('script'); //testing if script.js is working
console.log(sessionStorage);

$(document).ready(function(){

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
          console.log(user); //remove when development is finished

          if (user !== 'username taken already. Please try another name'){
            alert('Thank you for registering. Please login');

          } else {
            alert('username taken already. Please try another name');
            $('#c-username').val('');
            $('#c-password').val('');
            $('#c-profile_img').val('');
          } //else

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
      event.preventDefault();
      let username = $('#s-username').val();
      let password = $('#s-password').val();
      console.log(username, password);
  
      if (username == '' || password == '') {
        alert('Please enter Username and Password');
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
  
            if (user == 'user not found. Please register') {
              alert('User not found. Please Register');
            } else if (user == 'not authorized') {
              alert('Please try with correct details');
              $('#s-username').val('');
              $('#s-password').val('');
            } else {
              sessionStorage.setItem('userID', user['_id']);
              sessionStorage.setItem('userName', user['username']);
              console.log(sessionStorage);
              alert('Welcome back! :)')
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



  // Add a product

  $('#add-sighting-btn').click(function(){
    event.preventDefault();
    let image_url = $('#as-image_url').val();
    let location = $('#as-location').val();
    let name = $('#as-name').val();
    let description = $('#as-description').val();
    let userid = sessionStorage.getItem('userID');

    console.log(userid);
    console.log(image_url, location, name, description);

    if (!userid){
      alert('Please log in to use this feature');
    }

    else if (image_url == '' || location == '' || name == '' || description == ''){
      alert('Please enter all details');
    }
    
    else{
      $.ajax({
        url: `http://${url}/addPost`,
        type: 'POST',
        data: {
          image_url: image_url,
          location: location,
          name: name,
          description: description
        },
        success: function(post) {
          console.log(post);
          alert('post added');
        },
        error: function() {
          console.log('error: cannot call api');
        } //error
      }) //ajax
    } //else
  }); //addProduct




  // Add Sighting Finished














    // Log Out Function

    // $('#logoutClassName').click(function() {
    //   sessionStorage.clear();
    //   alert('You are now logged out');
    //   console.log(sessionStorage);
    // })



}); //document.ready





