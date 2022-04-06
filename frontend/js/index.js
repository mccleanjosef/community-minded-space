console.log('script'); //testing if script.js is working
console.log(sessionStorage);

$(document).ready(function() {

  // ============ Masonry Layout - Magic Grid Starts ============
  let magicGrid = new MagicGrid({
    container: '.container',
    animate: true,
    gutter: 30,
    static: true,
    useMin: true
  });

  magicGrid.listen();
  // ============ Masonry Layout - Magic Grid Ends ============


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
  })

  


}); //document.ready