$(document).ready(function() {

    var View = new (function() {
        var templates = [];

        return {
            renderTopGames: function(games) {
                var $topGames = $('.b-top-games');

                if (!templates['top_games']) {
                    templates['top_games'] = Handlebars.compile($topGames.html());
                }

                $topGames.html(templates['top_games']({
                    games: _.groupBy(games, 'type'),
                }));

                $topGames.find('.b-game-preview__more').click(function(e) {
                    var game = _.findWhere(games, { name: $(this).parents('[data-game-name]').data('game-name') });

                    View.renderGame(game);

                    e.preventDefault();
                });
                
            },

            renderGame: function(game) {
                var $game = $('.b-game');

                if (!templates['game']) {
                    templates['game'] = Handlebars.compile($game.html());
                }

                $game.html(templates['game'](game));

                $game.find('.b-game__bg').each(function() {
                    var $this = $(this);

                    $this.css('background-image', 'url(' + $this.data('bg') + ')');
                });      

                $.fancybox($game);

                $game.find('.js-slider').each(function() {
                    var $this = $(this);
                    console.log('.js-slider');

                    new Sly($this.find('.js-slider__wrapper'), {
                        horizontal: 1,
                        itemNav: 'basic',
                        touchDragging: 1,
                        speed: 400,
                        dynamicHandle: 1,
                        nextPage: $this.find('.b-slider-nav__next'),
                        prevPage: $this.find('.b-slider-nav__prev')
                    }).init();
                });

            }
        }
    });

    $.get('games/games.json', function(games) {
        
        View.renderTopGames(games);

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

})