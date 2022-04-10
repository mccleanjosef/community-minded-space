$(document).ready(function() {
    console.log('main script is linked'); //testing if script.js is working

    // ============ Masonry Layout - Masonry init Starts ============
    // init Masonry
    $('.grid').masonry({
        // options
        itemSelector: ".grid-item",
        columnWidth: ".grid-item",
        gutter: 10,
        horizontalOrder: true,
        fitWidth: true
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
        console.log(url);
        viewProjects(); //called here to use url in allProjectsFromDB on page load

        let testId = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113];

        // Generate all posts when document is ready
        let i;
        document.getElementById('postContainer').innerHTML = '';

        for(i=0; i<testId.length; i++){
        document.getElementById('postContainer').innerHTML +=
        // Adding post elements here
        `
        <div class="post" id="${testId[i]}">
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
                <img class="post__image" src="./img/tui.jpg" alt="User posted picture">
            </div>
            <div class="post__bottom">
                <div class="post__bottom-upper">
                    <p class="post__text">Kahurangi National Park</p>
                    <p class="post__text">Kea</p>
                </div>

                <div class="post__bottom-lower">
                    <p class="post__caption">Check out this curious fella!</p>
                </div>

                <div class="post__comments">
                    <p class="post__comments-details">view details</p>
                    <img class="post__speech" src="./img/comments-icon.svg" alt="comments icon">
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



    //============ Posts Starts ============
  
    // View all cards when document is ready
    function viewProjects(){
        $.ajax({
            url: `http://${url}/allProjectsFromDB`,
            type: 'GET',
            datatype: 'json',
            success: function(projectsFromMongo){
                // console.log(projectsFromMongo);
                
                let i;
                document.getElementById('result').innerHTML = '';
                for(i=0; i<projectsFromMongo.length; i++){
                    document.getElementById('result').innerHTML +=
                    // Adding project-card elements here
                    `
                    <div id="${projectsFromMongo[i]._id}" class="projects__card">
                        <button class="projects__project-options"></button>
                        <div class="projects__dropdown-content">
                            <a class="updateBtn">Update</a>
                            <a class="deleteBtn">Delete</a>
                        </div>
                        <a class="projects__portfolio-link" href="${projectsFromMongo[i].project_url}"  target="blank">
                            <div class="projects__image-wrap">
                                <img class="projects__img" src="${projectsFromMongo[i].image_url}" alt="project image">
                            </div>
                        </a>
                        <h1 class="projects__heading hide">${projectsFromMongo[i].name}</h1>
                        <a class="projects__small-screen-link hide" href="${projectsFromMongo[i].project_url}"  target="blank">Go to project<img class="projects__link-icon" src="../frontend/assets/click-screen-link-icon.svg" alt="project link icon"></a>
                        <h3 class="projects__author hide">${projectsFromMongo[i].username}</h3>
                        <div class="projects__description-wrap hide">
                            <p class="projects__description" id="123${projectsFromMongo[i]._id}">${projectsFromMongo[i].description}</p>
                        </div>
                    </div>
                    `;
                } //end of for loop

                // following runs in success function so elements can be selected afterwards

            },
            error:function(){
              alert('unable to get projects');
            }
        }) //ajax
    }
    //------- project cards ends ---------

}); //document.ready