console.log('main script is linked'); //testing if script.js is working
console.log(sessionStorage);

$(document).ready(function(){

    // ============ Masonry Layout - Magic Grid Starts ============
    let magicGrid = new MagicGrid({
    container: '#postContainer',
    animate: true,
    gutter: 30,
    // static: true,
    // useMin: true,
    items: 13
    });

    magicGrid.listen();
    // ============ Masonry Layout - Magic Grid Ends ============



    // Session Storage for Profile IMG Start



    // Session Storage for Profile IMG Finished 




    // ============ API Starts ============

    let url;
    $.ajax({
        url: 'config.json',
        type: 'GET',
        dataType: 'json',
        success:function(configData){
            console.log(configData);
            url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
            console.log(url);
            allPosts(url);
        }
    })

    function allPosts(url){
        $.ajax({
            url: `http://${url}/allPostsFromDB`,
            type: 'GET',
            dataType: 'json',
            success:function(postsFromMongo){

                document.getElementById('postContainer').innerHTML = '';
                for(i = 0; i < postsFromMongo.length; i++){
                
                    document.getElementById('postContainer').innerHTML +=
                    `
                    <div id="cardContainer" class="container">
                    <div class="card">
                        <div class="card__top">
                            <div class="card__user-tools">
                                <div class="dropdown">
                                    <button class="card__user-tools--btn" dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis-vertical ellipsis"></i>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item" href="#">Update post</a></li>
                                    <li><a class="dropdown-item" href="#">Delete post</a></li>
                                    </ul>
                                </div>
                            </div>
                            <img id="cardImage" class="card__image" src="${postsFromMongo[i].image_url}" alt="User posted picture">
                        </div>
                        <div class="card__bottom">
                            <div class="card__bottom-upper">
                                <p class="card__text">${postsFromMongo[i].location}</p>
                                <p id="cardText" class="card__text">${postsFromMongo[i].name}</p>
                            </div>
                            <div class="card__bottom-lower">
                                <p class="card__caption">${postsFromMongo[i].description}</p>
                            </div>
                            <div class="card__comments-master">
                                <div class="card__comments">
                                    <button id="${postsFromMongo[i]._id}"  class="card__comments-details" data-bs-toggle="modal" data-bs-target="#postModal">View Details</button>
                                    <i class="fa-solid fa-comment card__speech"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    `


                // View Post Modal

                document.querySelectorAll('.container').forEach(function(card){
                    card.addEventListener('click', function(e) {
                        console.log(e.target.id);
                        let id = e.target.id;
                        
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
                            }
                            })
                    });
                })
                }
            },//success
            error:function(){
                alert('Unable to get posts');
            }//error
        })//ajax


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

    }//view


}); //document.ready