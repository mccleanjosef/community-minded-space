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
        <div class="post" id="${testId[i]}">
            <h3>Hi ${testId[i]}</h3>
            <div class="post__btn-ctn">
              <button type="button" class="btn dropdown-toggle post__post-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <img class="post__dropdown-icon" src="./img/post-dropdown-icon.svg" alt="post dropdown icon">
              </button>
              <ul class="dropdown-menu dropdown-menu-end post__dropdown-menu">
                <li><button class="dropdown-item post__dropdown-item" type="button">Update</button></li>
                <li><button class="dropdown-item post__dropdown-item" type="button">Delete</button></li>
              </ul>
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