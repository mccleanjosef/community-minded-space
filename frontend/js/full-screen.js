$(document).ready(() => {

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
        allPostFromDB(url);
    },
    error: function(error) {
        console.log(error);
    }
    })
    // ============ API Ends ============

    // ============ Fullscreen append starts ============
    const allPostFromDB = () => {
    $.ajax({
        url: `http://${url}/allPostsFromDB`,
        type: 'GET',
        dataType: 'json',
        success:function(postsFromMongo){
            let i;
            for(i=0; i < postsFromMongo.length; i++){
            $('#fullscreenInner').append(

            `
            <div class="carousel-item  ${i === 0 ? 'active' : ''} test" >

              <div class="fullscreen__user-container">
                <img class="fullscreen__user-image" src="${postsFromMongo[i].profile_img}" alt="Author profile image">
                <p class="fullscreen__username">${postsFromMongo[i].username}</p>
              </div>

              <div class="fullscreen__img-container">
                <img src="${postsFromMongo[i].image_url}" class="fullscreen__image" alt="...">
              </div>
          
              
              <div class="fullscreen__body">
                <p class="fullscreen__text">${postsFromMongo[i].location}</p>
                <p class="fullscreen__text">${postsFromMongo[i].name}</p>
              </div>

              <div class="fullscreen__description-container">
                <p class="fullscreen__description">${postsFromMongo[i].description}</p>
              </div>
            </div>
          
            `
            );
          }
        },
        error:function(){
            alert('Unable to view fullscreen');
        }//error
    })
}
// ============ Fullscreen append ends ============
})