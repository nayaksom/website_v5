(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

  // Theme switch
  var browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark = localStorage.getItem('darkTheme');
  console.log(isDark);

  if(isDark==null) {
    isDark = browserTheme;
  } else {
    isDark = (isDark === "true");
  }

  if(isDark) {
    dark();
  } else {
    light();
  }

  $('#themeButton').change(function() {
    if($(this).prop('checked')){
      dark();   
    } else {
      light();
    }
  })

  function dark(){
    $('#themeButton').prop('checked',true);
    $('#status').html('Dark');
    $("body").removeClass("light").addClass("dark");
    localStorage.setItem('darkTheme', 'true');
  }

  function light(){
    $('#themeButton').prop('checked',false);
    $('#status').html('Light');
    $("body").removeClass("dark").addClass("light");
    localStorage.setItem('darkTheme', 'false');
  }

  // Project Filter
  $('.projectFilter button').click(function() {
    $('.projectFilter .btn-primary').removeClass('btn-primary').addClass('btn-outline-primary');
    $(this).removeClass('btn-outline-primary').addClass('btn-primary');
    var selected = "." + $(this).attr('data-filter');
    if (selected === ".all") {
      $('.filter').show(500);
    } else {
      $('.filter').not(selected).fadeOut(500);
      $('.filter').filter(selected).fadeIn(500);
    }
  })

  // Bootstrap Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // NavBar Text Rotation
  var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };
  
  TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
  
    var that = this;
    var delta = 200 - Math.random() * 100;
  
    if (this.isDeleting) {
      delta /= 2;
    }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  $(window).on('load', function() {
    for (var i = 0; i < $('.typewrite').length; i++) {
      var el = $('.typewrite').eq(i);
      var toRotate = el.attr('data-type');
      var period = el.attr('data-period');
      if (toRotate) {
        new TxtType(el[i], JSON.parse(toRotate), period);
      }
    }
    $(".typewrite > .wrap").css("border-right", "0.08em solid #fff");
  });

})(jQuery); // End of use strict