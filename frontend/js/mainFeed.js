$(document).ready(function() {
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
    let url; //declare url as a variable in es6
    $.ajax({
    url: 'config.json',
    type: 'GET',
    dataType: 'json',
    success: function(configData) {
        console.log(configData.SERVER_URL, configData.SERVER_PORT);
        url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
        console.log(url);

        let testId = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113];

        // Generate all posts when document is ready
        let i;
        document.getElementById('postContainer').innerHTML = '';
        for(i=0; i<testId.length; i++){
        document.getElementById('postContainer').innerHTML +=
        // Adding post elements here
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
                    <img class="card__image" src="./img/tui.jpg" alt="User posted picture">
                </div>

                <div class="card__bottom">
                    <div class="card__bottom-upper">
                        <p class="card__text">Kahurangi National Park</p>
                        <p id="cardText" class="card__text">Kea</p>
                    </div>

                    <div class="card__bottom-lower">
                        <p class="card__caption">Check out this curious fella!</p>
                    </div>

                    <div class="card__comments-master">
                        <div class="card__comments">
                            <p class="card__comments-details">view details</p>
                            <i class="fa-solid fa-comment card__speech"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        } //end of for loop
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

}); //document.ready