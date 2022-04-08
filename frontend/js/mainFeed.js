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
    // hide and showing arrow icons on click of account dropdown
    $('.header__up-icon').hide();
    $('.header__account-dropdown').click(function(){
        $('.header__up-icon').toggle();
        $('.header__down-icon').toggle();
    });
    // ============ Account dropdown arrow Ends ============

}); //document.ready