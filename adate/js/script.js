(function ($) {
    
    function ieFix() {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            if ($(".hasbg").length) {
                $(".hasbg").each(function () {
                    $(this).css({
                        "background-image": function () {
                            var b = $(this).find("img").attr("src");
                            $(this).find("img").remove();
                            return "url(" + b + ")";
                        }
                    });
                });
            }
        }
    }

    function showSlogan() {
        if ($('body .hero').length) {
            setTimeout(function () {
                $('.hero .single-flex').addClass('do');
                setTimeout(function () {
                    $('.hero .hero-txt h3').addClass('do');
                    setTimeout(function () {
                        $('.hero .hero-txt h3').addClass('do');
                    }, 1400);
                }, 1000);
            }, 600);
        }
    }

    function bkt() {
        if ($(window).scrollTop() > 1000) {
            if ($('.bkt').hasClass('show')) {
                window.clearTimeout(this.bkttimer);
                this.bkttimer = window.setTimeout(function () {
                    $('.bkt').removeClass('show');
                }, 5000);
            }
            if (!$('.bkt').hasClass('show')) {
                $('.bkt').addClass('show');
            }
        } else {
            if ($('.bkt').hasClass('show')) {
                $('.bkt').removeClass('show');
            }
        }
        $('.bkt').on('click', function () {
            $('html,body').stop().animate({
                scrollTop: 0
            }, 0, 'easeOutQuint');
        });
    }

    function animateContent() {
        var $object = $(".section-daihatsu .title,.section-daihatsu .inner,.section-service .right,.section-service .title,.section-service .content p,.section-service .content ul,.section-diary .title,.section-diary .content,.section-blog .title,.section-blog .content,.section-gallery ul,.section-recruit .content");
        $object.each(function () {            
            $this = $(this);
            $this.addClass("normalmove");
            if ($this.length) {
                var $a = $(this).offset().top;
                var $b = $(window).scrollTop();
                var $c = $(window).height() * 0.8;
                if ($b > ($a - $c)) {
                    if(!$this.hasClass("normalanimate")){
                    $this.addClass("normalanimate");
                    }
                }
            }
        });
    }

        
    function liscroll() {
        var dis = $(window).scrollTop();
        if (dis >= 800) {
            $(".section-banner").addClass("active");
        } else {
            $(".section-banner").removeClass("active");
        }

    }

    $(function () {
        ieFix();
        showSlogan();
        bkt();
        animateContent();
        liscroll();
        $(".head-menu").on("click", function () {
            var $distance = $(window).scrollTop();
            $(".close-box").toggleClass("open");
            $(".headerhome").toggleClass("headerhome1");
        });

        $(".close-box .left>ul>li>a").on("mouseover",function(){
            $(this).next("ul").addClass("ul-top1");
            $(this).parent("li").siblings("li").children("ul").removeClass("ul-top1");
        });  

        $('.single-item').slick({
            dots: true,
            infinite: true,
            speed: 500,
            autoplay: true,
            fade: true,
            cssEase: 'linear',
            arrows: false
        });
    });

    $(window).on("scroll", function () {
       bkt();
       animateContent();
       liscroll();
    })
})(jQuery)