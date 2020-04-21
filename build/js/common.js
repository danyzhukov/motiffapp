// order counter
$(document).ready(function() {
  $('.minus').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 0 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.plus').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
});

// scroll
$(document).ready(function() {
  $(".tutorial__links").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1000);
  });
});

// mob menu
$(".header label").on("click", function() {
  $(".header .main__menu").toggleClass("open", 1000);
  if ($(".header .main__menu").hasClass("open")) {
    $("body").addClass('no-scroll');
  } else {
    $("body").removeClass('no-scroll');
  }
});
$(".footer label").on("click", function() {
  $(".footer .main__menu").toggleClass("open", 1000);
  if ($(".footer .main__menu").hasClass("open")) {
    $("body").addClass('no-scroll');
  } else {
    $("body").removeClass('no-scroll');
  }
})