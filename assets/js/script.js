//Global variables
var element;


// Preloader


var loader = document.getElementById("preloader");
window.addEventListener("load", function(){
loader.style.display = "none"; });
 




//Back to Top 


var $toTop = $('#to-top');
var $footer = $('#footer');
if ($(document).scrollTop() > 100) {
  $toTop.removeClass('is-hidden');
}
var prevTop = 0;
$(document).on('scroll', function(e) {
  var currentTop = $(this).scrollTop();
  if (prevTop !== currentTop) {
    prevTop = currentTop;
    // Hide icon in the first 100px from the top.
    if (currentTop < 100) {
      $toTop.addClass('is-hidden');
    }
    else {
      $toTop.removeClass('is-hidden');
    }
    // Park icon above the footer.
    var footerOffset = $footer.offset().top;
    var windowBottomPos = $(window).scrollTop() + $(window).height();
    // If footer is in the window.
    if (windowBottomPos > footerOffset) {
      var translate = Math.floor(windowBottomPos - footerOffset);
      translate = '-' + translate + 'px';
      $toTop.css('transform', 'translatey(' + translate + ')');
    }
    else {
      $toTop.css('transform', 'translatey(0)');
    }
  }
});

// Move the window back to the top of the page.
$(document).on('click', '#to-top', function(e) {
  e.preventDefault();
  $([document.documentElement, document.body]).animate({
    scrollTop: 0
  }, 500);
});







//Event Countdown

var countDownDate = new Date("October 12, 2024 11:30:00").getTime();
var timeClear = setInterval(function() {
    var now = new Date().getTime();
    var timeLeft = countDownDate - now;
    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / (1000));

document.querySelector(".time-d").innerHTML = days;
document.querySelector(".time-h").innerHTML = hours;
document.querySelector(".time-m").innerHTML = minutes;
document.querySelector(".time-s").innerHTML = seconds; 

if (timeLeft < 0) {
    clearInterval(timeClear);
    document.querySelector(".time-d").innerHTML = "0";
    document.querySelector(".time-h").innerHTML = "0";
    document.querySelector(".time-m").innerHTML = "0";
    document.querySelector(".time-s").innerHTML = "0"; 
}

}, 1000);

//Detect onclick event
if (window.matchMedia("(max-width: 920px)").matches === false) {
    $(".ham").on("click", function(){
        $(".side_menu").css("right", "0px");
        $(".overlay").css("opacity","1");
        $(".overlay").css("z-index","99");
    });

    $(".close").on("click", function(){
        $(".contact").css("top") >= "10%" ? $(".contact").hide().css("top","-100%").fadeOut('100') : $(".side_menu").css("right", "-500px");
        $(".overlay").css("opacity","0");
        $(".overlay").css("z-index","-1");
    });

    $(".overlay").on("click", function(){
        $(".contact").css("top") >= "10%" ? $(".contact").hide().css("top","-100%").fadeOut('100') : $(".side_menu").css("right", "-500px");
        $(".overlay").css("opacity","0");
        $(".overlay").css("z-index","-1");
    });
} else {
    $(".ham").on("click", function(){
        $(".side_menu").css("right", "0px");
        $(".overlay").css("opacity","1");
        $(".overlay").css("z-index","9");
    });
    
    $(".close").on("click", function(){
        $(".contact").css("top") >= "10%" ? $(".contact").hide().css("top","-100%").fadeOut('100') : $(".side_menu").css("right", "-120%");
        $(".overlay").css("opacity","0");
        $(".overlay").css("z-index","-1");
    });
    
    $(".overlay").on("click", function(){
        $(".contact").css("top") >= "10%" ? $(".contact").hide().css("top","-100%").fadeOut('100') : $(".side_menu").css("right", "-120%");
        $(".overlay").css("opacity","0");
        $(".overlay").css("z-index","-1");
    });
}


//Scroller Nav
window.onscroll = function() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $("nav").addClass("fixed_nav");
    } else {
        $("nav").removeClass("fixed_nav");
    }
}


//DETECT ESC KEY PRESSED
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        if ($(".overlay").css("opacity") == "1"){
            $(".contact").css("top") >= "10%" ? $(".contact").hide().css("top","-100%").fadeOut('100') : $(".side_menu").css("right", "-120%");
            $(".overlay").css("opacity","0");
            $(".overlay").css("z-index","-1");
        }
    }
};



//Dropdown
$(".dropdown").click(function(){
    if ($(this).children("aside").is(":hidden")){
        $(this).children("aside").show("slow");
        $(this).children("a").css("color","var(--white)");
    } else {
        $(this).children("aside").hide("slow");
        $(this).children("a").css("color","var(--lite)");
    }
});








//Global variables
var slidestoshow, arrowmark;
if (window.matchMedia("(max-width: 920px)").matches === false) {
    slidestoshow = 4;
    arrowmark = true;
} else {
    slidestoshow = 1;
    arrowmark = false;
}

$('.blog-slider').slick({
    slidesToShow: slidestoshow,
    slidesToScroll: 1,
    dots: false,
    arrows: arrowmark,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true
});


$('.event-slider').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	dots: false,
	arrows: false,
	autoplay: true,
	autoplaySpeed: 4000,
	infinite: true
});



//about us counter up //

var a = 0;
$(window).scroll(function() {

  var oTop = $('#counter').offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $('.counter-value').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 2500,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
    a = 1;
  }

});

