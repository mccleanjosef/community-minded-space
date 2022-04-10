$(document).ready(function(){


    console.log('main script is linked'); //testing if script.js is working

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
                            <img id="profilePicture" class="" src="" alt="User posted picture">
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
                                    <button class="card__comments-details" data-bs-toggle="modal" data-bs-target="#exampleModal">view details</button>
                                    <i class="fa-solid fa-comment card__speech"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    `  
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