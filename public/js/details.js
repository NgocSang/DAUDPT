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
