$(document).ready(function() {

    var $bToTop = $('.b-to-top');

    /* Кнопка наверх
    ------------------------------------------------------------------------------- */

    $(window).scroll(function() {
        if ($(window).scrollTop() >= window.innerHeight && !$bToTop.is(':visible')) {
            $bToTop.fadeIn(300);
        } else if ($(window).scrollTop() <= window.innerHeight && $bToTop.is(':visible')) {
            $bToTop.fadeOut(300);
        }
    });

    /* Всплывающие окна
    ------------------------------------------------------------------------------- */

    $.extend($.fancybox.defaults, {
        scrollOutside: true,
        scrolling: 'no',
        margin: [0, 0, 0, 0],
        padding: 0,
        autoSize : false,
        width: "100%",
        height: 'auto',
        maxWidth: 1204,
        openEffect : 'none',
        closeEffect: 'none'
    });

    /* Установка высоты слайдеров
    ------------------------------------------------------------------------------- */

    $(window).on('resize setSlidersHeight', function() {
        $('.js-slider').each(function() {
            var height = 0;
            var $this  = $(this);

            $this.find('li').each(function() {
                if ($(this).outerHeight() > height) {
                    height = $(this).outerHeight();
                }
            });
            
            $this.find('.js-slider__wrapper').height(height);
        });
    });

    /*$(window).on('resize', function() {

        $('.js-slider__wrapper').each(function() {
            console.log($(this));
        });

    });*/

    /* Вызываем событие resize
    ------------------------------------------------------------------------------- */

    //$(window).trigger('setSlidersHeight');

});

$(window).load(function() {
    
    $(window).resize();

});