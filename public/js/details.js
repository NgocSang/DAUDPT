
(function($) {
    $(function() {
        $('ul.tabs').delegate('li:not(.current)', 'click', function() {
            $(this).addClass('current').siblings().removeClass('current')
                .parents('div.section').find('div.box').hide().eq($(this).index()).fadeIn(150);
        })

    })
})(jQuery);


(function($) {
    $(function() {

        $('#zoom_01').elevateZoom({
    zoomType: "inner",
cursor: "crosshair",
zoomWindowFadeIn: 300,
zoomWindowFadeOut: 750
   });
     //initiate the plugin and pass the id of the div containing gallery images
    $("#zoom_01").elevateZoom({
     gallery: 'gal1',
     cursor: 'pointer',
     galleryActiveClass: 'active',
     imageCrossfade: true,
     loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif'
 });
    //pass the images to Fancybox
    $("#zoom_01").bind("click", function (e) { var ez = $('#zoom_01').data('elevateZoom'); $.fancybox(ez.getGalleryList()); return false; });

    })
})(jQuery);

/*function something(data){
  console.log(data);
}*/
function Addcomment(id, avtar, name){
  var content = $('#message').val();
  var rating= $('input[name=rating]:checked').val();
  var review ={
    productID:id,
    comment:{
      avatar:avtar,
      content:content,
      name:name,
      rating:rating
    }

  };
  load_ajax(id, review);
}

function getcomment(data){
  return '<li> <div class="comment-main-level"><div class="comment-avatar"><img src="'+data.avatar+'" alt="Avatar"></div><div class="comment-box"><div class="comment-head"><h6 class="comment-name">'+data.name+'</h6><i class="fa fa-reply"></i><i class="fa fa-heart"></i></div><div class="comment-content"><p>Rating:<span style="color:#e4bb24;">'+data.rating+'</span></p><p>'+ data.content+'</p></div></div></div></li>'
}
function load_ajax(id, object){
  console.log(object);
		$.ajax({
			type: 'POST',
			data: object,
      url: '/' + id,
      success: function(data) {
        var html = getcomment(data.data);
      	$('#review').append(html);
      }
  });
}
