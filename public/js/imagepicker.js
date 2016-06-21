function ImagePickerController($scope) {

    filepicker.setKey("AeNIdjegwSXSYhQ2xcmojz");

    $scope.browseImage = function () {
        filepicker.pickMultiple(
            {
                mimetype: 'image/*',
                services: ['COMPUTER', 'WEBCAM', 'FACEBOOK', 'IMAGE_SEARCH', 'URL'],
                conversions: ['crop', 'rotate', 'filter']
            },
        function (img)  // image loaded
        {
            imgCtrl.imgList = [];   // list images
            for (var i = 0; i < img.length; ++i)
                imgCtrl.imgList[i] = img[i].url;    // get url of each image

            imgCtrl.$apply();
            console.log(imgCtrl);
        });
    }
}
