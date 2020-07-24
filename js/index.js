$(document).ready(function() {
    //'use strict'

    // Init controller
    var controller = new ScrollMagic.Controller();

    // Change behavior of controller
    // to animate scroll instead of jump
    controller.scrollTo(function(target) {
        console.log(target);
        TweenMax.to(window, 0.8, {
            scrollTo: {
                y: target, // scroll position of the target along y axis
                //autoKill: true // allows user to kill scroll action smoothly
            },
            ease: Cubic.easeInOut
        });

    });

    //  Bind scroll to anchor links
    $('.navbar li a').click(function(e) {
        var id = $('#' + $(this).data('scroll')); // grab the href attribute value

        if (id.length > 0) {
            // prevents default behavior of links.
            e.preventDefault();



            // trigger scroll
            controller.scrollTo(id.offset().top);
            //console.log(id);


        }
    });


    /* $('.navbar li a').click(function(e) {
        e.preventDefault();
        //alert('#'+$(this).data('scroll'));
        $('body, html').animate({
            scrollTop: $('#' + $(this).data('scroll')).offset()
                .top - ($('.navbar').innerHeight() + 20)
        }, 1000);

    }); */



    $('body').css('paddingTop', $('.navbar')
        .innerHeight() + 20);


    $('.navbar li a').click(function() {

        // $('.navbar a').removeClass('active');
        $(this).addClass('active').parent().siblings().children('a').removeClass('active');

    });

    /////// change navbar opacity on scroll /////

    $(document).scroll(function() {
        /////// change navbar opacity on scroll /////
        var $nav = $(".navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());

        /////// sync navbar links with section on scroll /////
        $('.section').each(function() {
            if ($(window).scrollTop() >= $(this).offset().top) {
                var blockId = $(this).attr('id');

                //console.log(blockId);

                $('.navbar a').removeClass('active');

                $('.navbar a[data-scroll = "' + blockId + '"]').addClass('active');

            }
        });

        ///// change intro opacity on scroll

        var scrollTop = $(this).scrollTop();

        $('.intro .cover').css({
            opacity: function() {
                var elementHeight = $(this).height();
                return 1 - (elementHeight - scrollTop) / elementHeight - 1.4333;
            }
        });



    });

    ///////////////////////////////////////////////////////////////////







    var scene2 = new ScrollMagic.Scene({
            triggerElement: '.block-main',
            duration: '30%',
            triggerHook: 1
        })
        .setTween(TweenMax.from('.intro', 1, { y: '-1%', ease: Power2.EaseInOut }))

    .setTween(TweenMax.to('.intro', 1, { y: '5%', ease: Power2.EaseInOut }))
        .addTo(controller);




    var section1 = new ScrollMagic.Scene({
            triggerElement: " .services-block .pin-wrapper",
            duration: '100%',
            reverse: true,
            triggerHook: 0

        }).setPin(" .services-block .pin-wrapper", { pushFollowers: false })
        .setClassToggle('.services-block .text', 'text-animate')



    .addTo(controller);
    var tl1 = new TimelineLite();
    tl1.fromTo('.solutions-block .bacc', '1', { y: '-=10%', ease: Power2.EaseInOut, }, { y: '+=3%', ease: Power2.EaseInOut, })
        .fromTo('.solutions-block .middle', '1', { y: '+=10%', ease: Power2.EaseInOut, }, { y: '-=3%', ease: Power2.EaseInOut, }, '-=0.9');

    var section2 = new ScrollMagic.Scene({
            triggerElement: " .solutions-block .pin-wrapper",
            duration: '200%',
            reverse: true,
            triggerHook: 1

        }).setPin(" .solutions-block .pin-wrapper", { pushFollowers: false }).setClassToggle('.solutions-block .text', 'text-animate')
        .setTween(tl1)
        .addTo(controller);

    var tl2 = new TimelineLite();
    tl2.fromTo('.products-block .bacc', '1', { y: '-=10%', ease: Power2.EaseInOut, }, { y: '+=3%', ease: Power2.EaseInOut, })
        .fromTo('.products-block .front', '1', { y: '+=10%', ease: Power2.EaseInOut, }, { y: '-=3%', ease: Power2.EaseInOut, }, '-=0.9');

    var section3 = new ScrollMagic.Scene({
            triggerElement: " .products-block .pin-wrapper",
            duration: '100%',
            reverse: true,
            triggerHook: 1

        }).setPin(" .products-block .pin-wrapper", { pushFollowers: false }).setClassToggle('.products-block .text', 'text-animate')
        .setTween(tl2)
        .addTo(controller);




    function sizeAll() {
        var w = window.innerWidth;

        if (w < 1024) {
            controller.enabled(false);
            controller = controller.destroy(true);

        } else {
            controller.enabled(true);

        }

    }

    $(window).resize(sizeAll);
    sizeAll();




    /// MIB Aliens display



    var template = $('#alien-list-template').html();
    var compiledTemplate = Handlebars.compile(template);
    var aliens;


    function loadAliens(num) {
        $.ajax({
                method: "GET",
                url: "https://meninblack.fandom.com/api/v1/Articles/Top?expand=1&namespaces=14&category=Aliens&limit=" + num + "&baseArticleId=2087",
                data: aliens,
                crossOrigin: true
            })
            .done(function(aliens) {
                var obj = JSON.parse(aliens);
                //console.log(obj.items[0]);
                $('.alien-list').html(compiledTemplate(obj));
            });
    }
    // $('.alien-list').html()

    loadAliens(6);

    $('#load-all').on('click', function() {
        $('.alien-list').html('');
        loadAliens(60);
        $(this).hide();
    })

});