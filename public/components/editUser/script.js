
$(document).ready(function() {
  $('a#editUser.close').on('click', function(){
    $('.modal-bg').fadeOut();
    $('#modal-editUser').fadeOut();
    return false;
  });
});

//button edit account is clicked
$(document).ready(function() {
  $('#editbtn.btn.btn-default').click(function() {
      $('#modal-editUser').css('display', 'block');
      $('.modal-bg').fadeIn();
  });
});
