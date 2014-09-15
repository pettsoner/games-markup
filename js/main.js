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
        scrollOutside: false,
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

    /* Игры
    ------------------------------------------------------------------------------- */

    $('.b-game-preview__more').click(function(e) {
        var $this = $(this);

        $.fancybox($this.parents('.b-games-list__item').find('.b-game'));

        $(window).trigger('resize');

        e.preventDefault();
    });

    $('.b-game__bg').each(function() {
        var $this = $(this);

        $this.css('background-image', 'url(' + $this.data('bg') + ')');
    });

    var $topGames = $('.b-top-games');

    $(window).resize(function() {

        if ($(window).width() < 581) {
            $topGames.find('.b-content__top').hide();
            $('.b-top-games__top .b-top-games__heading').each(function(index) {
                $('.b-top-games__main .b-games-list__col:eq(' + index + ')').prepend($(this));
            });
        } else {
            $topGames.find('.b-content__top').show();
            $topGames.find('.b-top-games__main .b-top-games__heading').each(function(index) {
                $('.b-top-games__top .b-games-list__col:eq(' + index + ')').prepend($(this));
            });
        }

    });

});

$(window).load(function() {
    
    var sliders = [];

    /* Слайдеры
    ------------------------------------------------------------------------------- */

    $('.js-slider').each(function() {
        var $this = $(this);

        sliders.push(new Sly($this.find('.js-slider__wrapper'), {
            horizontal: 1,
            itemNav: 'basic',
            touchDragging: 1,
            speed: 400,
            dynamicHandle: 1,
            nextPage: $this.find('.b-slider-nav__next'),
            prevPage: $this.find('.b-slider-nav__prev')
        }).init());
    });

    /* Установка высоты слайдеров
    ------------------------------------------------------------------------------- */

    $(window).resize(function() {
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

        $.each(sliders, function(key, item) {
            item.reload();
        })
    });

    /* Вызываем событие resize
    ------------------------------------------------------------------------------- */

    $(window).trigger('resize');

});