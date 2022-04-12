$(document).ready(function() {
    console.log('main script is linked'); //testing if script.js is working
    console.log(sessionStorage);



    // Posting comment to Mongo DB Backend

    function postComment(){

        let saveComs = document.querySelector('#saveComment');
        let id = saveComs.value;
        let userId = sessionStorage.getItem('userID');
        let profile = sessionStorage.getItem('profileImg');

        let comment = document.querySelector('#commentText');
        console.log(id);

        console.log(comment.value);
        if (!userId){
          alert('Please login to comment')
        } else {
          $.ajax({
            url: `http://${url}/createComment`,
            type: 'POST',
            data: {
              text: comment.value,
              user_id: userId,
              profile_img: profile,
              post_id: id,
            },
            success: function(comment) {
              alert('Comment posted');
              console.log(comment);
            },
            error: function() {
              alert('unable to post comment');
            } // end of error
          })//end of ajax
        }//end of if
      };



   // Get Comments

   function getComments() {
    let openComs = document.querySelector('#saveComment');
    let id = openComs.value;

    $.ajax({
      url: `http://${url}/seeComments/${id}`,
      type: 'GET',
      success: function(commentsFromMongo) {
        console.log("hello");
        console.log(commentsFromMongo);
        let i;
        // document.getElementById('commentAppend').innerHtml = "";

        $('#commentAppend').empty().append(
          ``
        );


        for (i = 0; i < commentsFromMongo.length; i++) {

          $('#commentAppend').append(
            `
            <div class="appendContainer">

            <div class="appendContainer__profileContainer">

            <img class="appendContainer__profileContainer--img" src="${commentsFromMongo[i].profile_img}" alt="Profile Image">

            </div>



            <p class="appendContainer--text">${commentsFromMongo[i].text}</p>

            </div>
              `
          );
        }
      },
      error: function() {
        console.log('error: cannot retreive comments');
      } //error
    }) //ajax
  };




    // global variables
    let postId = '';

    // ============ Masonry Layout - Masonry init Starts ============
    // init Masonry
    const $grid = $('.grid').masonry({
        itemSelector: ".post",
        columnWidth: 341,
        gutter: 10,
        horizontalOrder: true,
        fitWidth: true
    });

    // layout Masonry after each image loads
    $grid.imagesLoaded().progress(function() {
        $grid.masonry("layout");
    });
    // ============ Masonry Layout - Masonry init Ends ============

    


    // ============ API Starts ============
    let url; //declare url as a variable in es6
    $.ajax({
    url: 'config.json',
    type: 'GET',
    dataType: 'json',
    success: function(configData) {
        console.log(configData.SERVER_URL, configData.SERVER_PORT);
        url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
        // console.log(url);
        allPosts(url);
    },
    error: function(error) {
        console.log(error);
    }
    })
    // ============ API Ends ============
    

    // ============ Account dropdown arrow Starts ============
    // hide and showing arrow icons based on if dropdown menu is visible
    $('.header__up-icon').hide();
    $(window).click(function(){
        if($('.header__dropdown-menu').is(':visible')){
            $('.header__down-icon').hide();
            $('.header__up-icon').show();

        } else{
            $('.header__down-icon').show();
            $('.header__up-icon').hide();
        }
    });
    // ============ Account dropdown arrow Ends ============


    // ============ User Account Profile Img and Dropdown options Starts ============
    // based on if signed in
    if(sessionStorage.getItem('userName') == null){
        $('#signOutBtn').hide();

    } else{
        $('#signInBtn').hide();
        $('#createAccountBtn').hide();

        // append user profile image from session storage
        let profileImgUrl = sessionStorage.getItem('profileImg');
        $('.header__profile-icon-wrap').empty().append(
            `
            <img class="header__profile-image" src="${profileImgUrl}" alt="User profile Image">
            `
        );
    }
    // ============ User Account Profile Img and Dropdown options in Ends ============


    // ============ Log Out User Starts ============
    $('#signOutBtn').click(function() {
        sessionStorage.clear();
        console.log(sessionStorage);

        // go to sign in page
        location.href='./signIn.html'
    })
    // ============ Log Out User Ends ============



    // ============ User Registration Starts ============
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
                    // alert('Welcome')

                    location.reload();

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
    // ============ User Registration Ends ============
    


    //============ All Posts Starts ============
    // Getting all posts once main-feed is ready
    function allPosts(url){
        $.ajax({
            url: `http://${url}/allPostsFromDB`,
            type: 'GET',
            dataType: 'json',
            success:function(postsFromMongo){
                console.log(postsFromMongo);

                let i;
                for(i = 0; i < postsFromMongo.length; i++){
                    // create new item elements
                    var $items = $(
                        `
                        <div class="post" id="${postsFromMongo[i]._id}">
                            <div class="post__top">
                                <div class="post__author-img-wrap">
                                    <img class="post__author-image" src="https://images.unsplash.com/photo-1482046187924-50f27dc64333?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Author profile image">
                                </div>
                                <div class="post__btn-ctn">
                                    <button type="button" class="btn dropdown-toggle post__post-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img class="post__dropdown-icon" src="./img/post-dropdown-icon.svg" alt="post dropdown icon">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end post__dropdown-menu">
                                        <li><button class="dropdown-item post__dropdown-item" type="button" data-bs-toggle="modal" data-bs-target=".main-feed-update-post-modal">Update</button></li>
                                        <li><button class="dropdown-item post__dropdown-item" type="button" data-bs-toggle="modal" data-bs-target=".main-feed-delete-post-modal">Delete</button></li>
                                    </ul>
                                </div>
                                <img class="post__image" src="${postsFromMongo[i].image_url}" alt="User posted picture">
                            </div>
                            <div class="post__bottom" data-bs-toggle="modal" data-bs-target="#postModal">
                                <div class="post__bottom-upper">
                                    <p class="post__text">${postsFromMongo[i].location}</p>
                                    <p class="post__text">${postsFromMongo[i].name}</p>
                                </div>
                                <div class="post__bottom-lower">
                                    <p class="post__caption">${postsFromMongo[i].description}</p>
                                </div>
                                <div class="post__comments">
                                    <p class="post__comments-details">view details</p>
                                    <img class="post__speech" src="./img/comments-icon.svg" alt="comments icon">
                                </div>
                            </div>
                        </div>
                        `
                    );
                     // append items to grid
                    $grid.prepend( $items )
                    // add and lay out newly prepended items
                    .masonry( 'prepended', $items );

                    // layout Masonry after each image loads
                    $grid.imagesLoaded().progress(function() {
                        $grid.masonry("layout");
                    });
                }


                // setting postId global variable for update and delete modals
                //  on click of post dropdown
                $('.post__post-dropdown').click(function() {
                    postId = $(this).parent().parent().parent().attr('id');
                    console.log(postId);
                });



                
                // ============ View Post Modal Starts ============
                $('.post__bottom').click(function () {
                    let id = $(this).parent().attr('id');
                    console.log(id);

                    $.ajax({
                        url: `http://${url}/allPostsFromDB/${id}`,
                        type: 'GET',
                        dataType: 'json',
                        success:function(singleProject){
                            console.log(singleProject.name);

                            console.log(singleProject._id);

                            $('#post-modal-content').empty().append(

                            `
                            <div class= "modal-post__header">
                                <img class="modal-post__profile" src="#" alt="User posted picture">
                                <button type="button" class="btn-close modal-post__close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div class="modal-post__img-container">
                                <img class="modal-post__image" src="${singleProject.image_url}" alt="User posted picture">
                            </div>

                            <div class="modal-post__locationName-container">
                                <p class="modal-post__text">${singleProject.location}</p>
                                <p class="modal-post__text">${singleProject.name}</p>
                            </div>

                            <textarea class="modal-post__description" type="text" spellcheck="false">${singleProject.description}</textarea>



                            <div class="modal-post__comments-container">

                                <div class="modal-post__comments">


                                    <div id="commentAppend" class="modal-post__comments-top">

                                    <p id="viewComments">View Comments</p>

                                    </div>


                                    <div class="modal-post__comments-bottom">

                                        <input id="commentText" class="modal-post__input" type="text" placeholder="Add a comment">

                                        <button id="saveComment" class="modal-post__comments-btn" value=${singleProject._id}><img  class="modal-post__comments-btn" src="./img/postComment.png"></button>

                                    </div>
                                </div>
                            </div>
                            `
                            );

                            $('#viewComments').click(function(){
                                getComments();
                              });

                            $('#saveComment').click(function(){
                                postComment();
                              });

                        },
                        error:function(){
                            alert('Unable to view post modal');
                        }//error
                    })
                })
                // ============ View Post Modal Ends ============

                    // Post Comment Function




                // ============ Update Post Starts ============
                $('#updatePostSubmitBtn').click(function() {
                    event.preventDefault();
                    console.log(postId);

                    let id = postId;
                    let imgUrl = $('#updatePostImage').val();
                    let location = $('#updatePostLocation').val();
                    let name = $('#updatePostName').val();
                    let description = $('#updatePostDescription').val();

                    console.log(id, imgUrl, location, name, description);

                    $.ajax({
                        url: `http://${url}/updatePost/${id}`,
                        type: 'PATCH',
                        data: {
                            image_url: imgUrl,
                            location: location,
                            name: name,
                            description: description
                        },
                        success: function(data) {
                            console.log(data);

                            $('#updatePostId').val('');
                            $('#updatePostImage').val('');
                            $('#updatePostLocation').val('');
                            $('#updatePostName').val('');
                            $('#updatePostDescription').val('');

                            $('.grid').masonry('reloadItems'); // NOT WORKING HERE
                        },
                        error: function() {
                            console.log('error: cannot update');
                        }
                    }); // end of ajax
                    
                });
                // ============ Update Post Ends ============


            },//success
            error:function(){
                alert('Unable to update');
            }//error
        })//ajax
    }//view
    //------- All Posts Ends ---------


  
}); //document.ready