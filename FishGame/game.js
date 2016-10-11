var CONSTANTS = Object.create(null);
CONSTANTS.BULLET_HEIGHT = 10;
CONSTANTS.WALL_DIMENTIONS = {
        left: 0,
        top: 0,
        bottom: 500,
        right: 960
}
CONSTANTS.WALL_THICKNESS = 10
Object.freeze(CONSTANTS);

$(function () {
        $('.frame').css({
                width: CONSTANTS.WALL_DIMENTIONS.right,
                height: CONSTANTS.WALL_DIMENTIONS.bottom
        });
        $('.wall.vertical').width(CONSTANTS.WALL_THICKNESS);
        $('.wall.horizontal').height(CONSTANTS.WALL_THICKNESS);

        var plane = $('#plane');
        var retry = $('#retry');

        var bgHeight = parseInt($('#background').height());
        var planeHeight = parseInt(plane.height());

        var up = false;
        var right = false;
        var left = false;
        var down = false;

        var speed = 10;

        var score = 0;

        var fire = false;
        var over = false;

        createNewWall();
        var mainIntervalId = setInterval(function () {



                $('.bullet').not(".hide").each(function () {

                        $(this).css("left", $(this).position().left + (speed * 2));
                });

                //$(".obstacleContainer").not(".hide").css("left", $(".obstacleContainer").position().left - speed);

                // tile collision with plane and bullets
                var rigidTiles = $('.obstacle').not('.space, .hide');

                rigidTiles.each(function () {

                        var tile = $(this);
                        $('.bullet').not(".hide").each(function () {

                                var bullet = $(this);
                                if (isColliding(bullet, tile)) {

                                        tile.addClass("space");
                                        bullet.remove();
                                }
                        });

                        if (isColliding(plane, tile)) {

                                stopGame();
                        }
                });

                // bullet collision with right wall
                checkCollisionWithWall($('.bullet'));

                //plane collision with walls
                checkCollisionWithWall(plane);


                if (!!$(".obstacleContainer").not(".hide").size() && (($(".obstacleContainer").not(".hide").first().position().left < 0))) {

                        clearDivs();
                        createNewWall();

                        //speed += 0.25;
                        $('#score').text(++score);

                }

                $('.bullet').not(".hide").each(function () {

                        $(this).css("left", $(this).position().left + (speed * 2));
                });

        }, 30);

        function checkCollisionWithWall(elements) {
                elements.not(".hide").each(function () {

                        var element = $(this);

                        if (isCollidingWithWall(element)) {

                                element.remove();
                        }
                });
        }


        // supports multiple obstacle containers
        function clearDivs() {

                var removeIndexes = [];

                $(".obstacleContainer").each(function (index, el) {

                        if ($(el).position().left < -CONSTANTS.WALL_DIMENTIONS.right) {

                                removeIndexes.push(index);
                        }
                });

                for (var i = 0; i < removeIndexes.length; i++) {

                        $(".obstacleContainer").eq(removeIndexes[i]).remove();
                }
        }


        function createNewWall() {

                var spaceInTheWall = planeHeight / 2;
                var rnd = Math.random();
                var spacePosition = parseInt((rnd * (CONSTANTS.WALL_DIMENTIONS.bottom - spaceInTheWall)) / $(".obstacle.hide").height());
                var totalNumTiles = ((CONSTANTS.WALL_DIMENTIONS.bottom - spaceInTheWall) / $(".obstacle.hide").height()) - 1;

                var container = createTileContainer();
                container.appendTo("#background");

                var tileNo = 0;
                for (; tileNo < spacePosition; tileNo++) {

                        createTile().appendTo(container);
                }

                var spaceElement = createTile().addClass("space");
                spaceElement.height(spaceInTheWall);
                spaceElement.appendTo(container);

                for (; tileNo < totalNumTiles; tileNo++) {

                        createTile().appendTo(container);
                }

                return container;
        }


        function createTile() {

                return $(".obstacle.hide").clone().removeClass("hide");
        }


        function createTileContainer() {
                var container = $(".obstacleContainer.hide").clone().removeClass("hide");
                container.
                        css("left", CONSTANTS.WALL_DIMENTIONS.right - 3 * CONSTANTS.WALL_THICKNESS).
                        css("height", CONSTANTS.WALL_DIMENTIONS.bottom - 2 * CONSTANTS.WALL_THICKNESS).
                        css("top", CONSTANTS.WALL_THICKNESS);
                return container;
        }


        function createBullet() {

                return $(".bullet.hide").clone().removeClass("hide");
        }


        function makeBullet() {
                //debugger;
                createBullet().css(
                        {
                                'left': (plane.position().left + plane.width() + 10) + 'px', //this is for 100%
                                'top': parseInt(plane.position().top + (plane.height() - $('.bullet').height()) / 2) + 'px'
                        }
                ).appendTo('#background');
        }


        function removeBullet() {

                $('.bullet').not(".hide").each(function () {

                        this.remove();

                });
        }


        function stopGame() {

                over = true;
                removeBullet();
                //clearDivs();
                $('#gameOver').fadeIn();
                clearInterval(mainIntervalId);
                retry.slideDown();
        }


        function moveDown() {

                var newTop = parseInt(plane.css('top')) + 10;
                plane.css('top', newTop);
        }


        function moveUp() {

                var newTop = parseInt(plane.css('top')) - 10;
                plane.css('top', newTop);
        }


        function moveRight() {

                var newLeft = parseInt(plane.css('left')) + 10;
                plane.css('left', newLeft);
        }


        function moveLeft() {

                var newLeft = parseInt(plane.css('left')) - 10;
                plane.css('left', newLeft);
        }


        $(document).on('keydown', function (e) {

                var key = e.keyCode;

                if ((key === 119 || key === 87) && up === false && over === false) { //for MOVE up-> w:119  || 87

                        up = setInterval(moveUp, 50);
                }

                if ((key === 100 || key === 68) && right === false && over === false) { //for MOVE right-> d: 100 || 68

                        right = setInterval(moveRight, 50);
                }

                if ((key === 65 || key === 97) && left === false && over === false) { //for MOVE left-> a: 65 || 97

                        left = setInterval(moveLeft, 50);
                }

                if ((key === 83 || key === 115) && down === false && over === false) { //for MOVE down-> s: 83 || 115

                        down = setInterval(moveDown, 50);
                }

                if (key === 32 && fire === false && over === false) {

                        fire = makeBullet();
                }

        });


        $(document).on('keyup', function (e) {

                var key = e.keyCode;


                if (key === 119 || key === 87) {

                        clearInterval(up);
                        up = false;
                }

                if (key === 100 || key === 68) {

                        clearInterval(right);
                        right = false;

                }

                if (key === 65 || key === 97) {

                        clearInterval(left);
                        left = false;
                }

                if (key === 83 || key === 115) {

                        clearInterval(down);
                        down = false;
                }

                if (key === 32) {

                        fire = false;
                }

        });


        retry.click(function () {

                location.reload();
        });


        function getPositions(elem) {

                var pos = elem.position();
                var width = elem.width();
                var height = elem.height();

                return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
        }

        function comparePositions(p1, p2) {

                var r1, r2;
                r1 = p1[0] < p2[0] ? p1 : p2;
                r2 = p1[0] < p2[0] ? p2 : p1;

                return r1[1] > r2[0] || r1[0] === r2[0];
        }

        function isColliding(elem1, elem2) {

                var pos1 = getPositions(elem1);
                var pos2 = getPositions(elem2);

                return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);

        }

        function isCollidingWithWall(element) {
                var wallDimentions = CONSTANTS.WALL_DIMENTIONS;
                var positions = getPositions(element);
                var pos = {
                        left: positions[0][0],
                        top: positions[1][0],
                        right: positions[0][1],
                        bottom: positions[1][1]
                }
                return pos.left <= wallDimentions.left ||
                        pos.right >= wallDimentions.right ||
                        pos.bottom >= wallDimentions.bottom ||
                        pos.top <= wallDimentions.top;
        }

});
