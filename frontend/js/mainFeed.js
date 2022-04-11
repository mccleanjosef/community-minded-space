$(document).ready(function() {
    console.log('main script is linked'); //testing if script.js is working
    console.log(sessionStorage);

    // ============ Masonry Layout - Masonry init Starts ============
    // init Masonry
    $( function() {
        $('.grid').masonry({
            // options
            itemSelector: ".post",
            columnWidth: 341,
            gutter: 10,
            horizontalOrder: true,
            fitWidth: true
        });
    });

    // layout Masonry after each image loads
    $('.grid').imagesLoaded().progress(function() {
        $('.grid').masonry("layout");
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


    // ============ Update Post Starts ============
    $('#updatePostSubmitBtn').click(function() {
        event.preventDefault();
        console.log("yes");

        let id = $('#updatePostId').val();
        let imgUrl = $('#updatePostImage').val();
        let location = $('#updatePostLocation').val();
        let name = $('#updatePostName').val();
        let description = $('#updatePostDescription').val();

        console.log(id, imgUrl, location, name, description);

        if(id == "") {
            alert("please enter project ID");
        } else {
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
                },
                error: function() {
                    console.log('error: cannot update');
                }
            }); // end of ajax
        } // end of if statement
    });
    // ============ Update Post Ends ============



    //============ All Posts Starts ============
    // Getting all posts once main-feed is ready
    function allPosts(url){
        $.ajax({
            url: `http://${url}/allPostsFromDB`,
            type: 'GET',
            dataType: 'json',
            success:function(postsFromMongo){
                console.log(postsFromMongo);
                document.getElementById('postContainer').innerHTML = '';
                for(i = 0; i < postsFromMongo.length; i++){
                    
                    document.getElementById('postContainer').innerHTML +=
                    `
                    <div class="post" id="${postsFromMongo[i]._id}" data-bs-toggle="modal" data-bs-target="#postModal">
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
                        <div class="post__bottom">
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
                }

                // Masonry init destory and reinit for ajax posts Starts
                $('.grid').masonry('destroy'); 
                $( function() {
                    $('.grid').masonry({
                        // options
                        itemSelector: ".post",
                        columnWidth: 341,
                        gutter: 10,
                        horizontalOrder: true,
                        fitWidth: true
                    });
                });

                // layout Masonry after each image loads
                $('.grid').imagesLoaded().progress(function() {
                    $('.grid').masonry("layout");
                });
                // Masonry init destory and reinit for ajax posts Ends

                
                // View Post Modal
                $('.post').click(function () {
                    let id = this.id;
                    console.log(id);

                    $.ajax({
                        url: `http://${url}/allPostsFromDB/${id}`,
                        type: 'GET',
                        dataType: 'json',
                        success:function(singleProject){
                            console.log(singleProject.name);
                            $('#post-modal-content').empty().append(

                            `
                            <div class="post-modal__img-container" style="background: url('${singleProject.image_url}'); background-size: cover; background-position: center;">
                            </div>
                
                            <div class="post-modal__location-container">
                                <p class="card__text">${singleProject.location}</p>
                                <p id="cardText" class="card__text">${singleProject.name}</p>
                            </div>
                
                            <div class="post-modal__description-container">
                                <p class="post-modal__description">${singleProject.description}</p>
                            </div>
                
                            <div class="post-modal__comments-container">
                                <div class="post-modal__comments-top">
                                </div>
                
                                <div class="post-modal__comments-bottom">
                                    <input placeholder="Comment here..." class="post-modal__comments-input" type="text">
                                    <button class="post-modal__comment-btn">
                                    </button>
                                </div>
                            </div>
                            `
                            );
                        },
                        error:function(){
                            alert('Unable to get posts');
                        }//error
                    })
                })


            },//success
            error:function(){
                alert('Unable to get posts');
            }//error
        })//ajax
    }//view
    //------- All Posts Ends ---------

}); //document.ready