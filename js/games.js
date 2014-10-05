$(document).ready(function() {

    var GamesCollection = {}

    $.getJSON('games/games.json', function(games) {

        GamesCollection = games;
        
        GamesCtrl.viewTopGames();

    });

    var GamesCtrl = new (function() {
        var templates = [];

        return {
            viewTopGames: function() {
                var $topGames = $('.b-top-games');

                // --- Попытка взять шаблон из кеша ----------------------------- //

                if (!templates['top_games']) {
                    templates['top_games'] = Handlebars.compile($topGames.html());
                }

                // --- Рендеринг шаблона --------------------------------------- //

                $topGames
                    .html(templates['top_games']({ games: _.groupBy(GamesCollection, 'type') }))
                    .addClass('rendered');
            },

            viewGame: function(id) {
                var $game = $('.b-game');

                // --- Попытка взять шаблон из кеша ----------------------------- //

                if (!templates['game']) {
                    templates['game'] = Handlebars.compile($game.html());
                }

                // --- Поиск игры ---------------------------------------------- //

                var game = _.findWhere(GamesCollection, { id: id });

                game.similar = (function(similarGames) {
                    return _.filter(GamesCollection, function(game) {
                        return _.indexOf(similarGames, game.id) > -1 ? true : false; 
                    });
                })(game.similar);

                // --- Рендеринг шаблона --------------------------------------- //

                $game.html(templates['game'](game));

                // --- Открытие fancybox --------------------------------------- //

                $.fancybox($game, {
                    beforeClose: function() {

                        $.each(sliders, function(key, slider) {
                            slider.destroy();
                        });

                        $(window).unbind('resize.slider');

                    }
                });

                // --- Подключение фона игры ----------------------------------- //

                $game.find('[data-bg]').each(function() {
                    var $this = $(this);

                    $this.css('background-image', 'url(' + $this.data('bg') + ')');
                });

                // --- Подключение слайдеров ---------------------------------- //

                var sliders = [];

                $game.find('.js-slider').imagesLoaded(function() {

                    // Вызываем событие установки высоты для слайдеров (находится в main.js)
                    $(window).trigger('setSlidersHeight');

                    $game.find('.js-slider').each(function() {
                        var $this = $(this);

                        sliders.push(new Sly($this.find('.js-slider__wrapper'), {
                            horizontal: true,
                            itemNav: 'basic',
                            touchDragging: true,
                            speed: 400,
                            dynamicHandle: true,
                            nextPage: $this.find('.b-slider-nav__next'),
                            prevPage: $this.find('.b-slider-nav__prev')
                        }).init());

                    });

                    $(window).bind('resize.slider', function() {
                        $.each(sliders, function(key, slider) {
                            slider.reload();
                        })
                    });

                });

                // --- Подключение VK-комментов ---------------------------- //

                $game
                    .find('#vk_comments')
                    .html(VK.Widgets.Comments("vk_comments", {limit: 10, width: "auto", attach: "*"}, game.id));

            }
        }
    });

    /* Заглушка на фильтер
    ---------------------------------------------------------------------- */

    $('.b-sidebar-filter input, button').click(function(e) {
        document.location.href = 'dev.html';

        e.preventDefault();
    });

    /* Обработчик открытия игры
    ---------------------------------------------------------------------- */

    $(document).on('click', '[data-open-game]', function(e) {
        GamesCtrl.viewGame($(this).data('open-game'));

        e.preventDefault();
    });

    /* Реализация адаптивности колонок с топовыми играми
    ---------------------------------------------------------------------- */

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

})