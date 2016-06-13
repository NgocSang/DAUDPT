// Button login is clicked
$(document).ready(function(e) {
  $('#loginbtn.btn.btn-primary').click(function() {
      $('#modal-login').css('display', 'block');
      $('.modal-bg').fadeIn();
  });
});

// close symbol of login form is clicked
$(document).ready(function() {
  $('a#login-page.close').on('click', function(){
    $('.modal-bg').fadeOut();
    $('#modal-login').fadeOut();
    return false;
  });
});

// close symbol of signup form is clicked
$(document).ready(function() {
  $('a#signup-page.close').on('click', function(){
    $('.modal-bg').fadeOut();
    $('#modal-signup').fadeOut();
    return false;
  });
});

//<a> tag reference to signup form is checked
$(document).ready(function() {
  $('a#refSignUp').on('click', function(){
    $('#modal-signup').css('display', 'block');
    $('#modal-login').css('display', 'none');
    $('.modal-bg').fadeIn();
    return false;
  });
});

//<a> tag reference to login form is checked
$(document).ready(function() {
  $('a#refLogin').on('click', function(){
    $('#modal-login').css('display', 'block');
    $('#modal-signup').css('display', 'none');
    $('.modal-bg').fadeIn();
    return false;
  });
});
