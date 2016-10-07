$(function () {
     
        var bg = $('#background');
        var plane = $('#plane');
        var obstacles = $('.obstacle');
        var obstacleUp = $('#obstacleUp');
        var obstacleDown = $('#obstacleDown');
        var score = $('#score');
        var gameOver = $('#gameOver');
        var retry = $('#retry');
        var bullet = $('.bullet');

        var bgWidth = parseInt(bg.width());
        var bgHeight = parseInt(bg.height());
        var planeLeft = parseInt(plane.css('left'));
        var planeHeight = parseInt(plane.height());

        var up = false;
        var right = false;
        var left = false;
        var down = false;

        var speed = 10;
        var insSpeed = 0;

        var point = 0;

        var fire = false;
        var over = false;

        var cUp, cDown;

      
        var playGame = setInterval(function () {

                gameOver.hide();
              

                var posPlane = $('#plane').position();
                var planeLeft = ~~(posPlane && posPlane.left);
                var planeTop = ~~(posPlane && posPlane.top);


                var posObstacleUp = $('#obstacleUp').position();
                var obstacleUpLeft = ~~(posObstacleUp && posObstacleUp.left);
                var obstacleUpHeight = ~~($('#obstacleUp').height());
                var obstacleUpTop = ~~($('#obstacleUp').top);


                var posObstacleDown = $('#obstacleDown').position();
                var obstacleDownLeft = ~~(posObstacleDown && posObstacleDown.left);
                var obstacleDownHeight = ~~($('#obstacleDown').height());

                
                var posObstacle = $('.obstacle').position();
                var obstacleTopX = ~~(posObstacle && posObstacle.left); 
                obstacles.css("left", obstacleTopX - speed);            
               

                //var upCrash = ((0 < planeTop && planeTop < 20 * (cUp)) && (planeLeft > (obstacleUpLeft - 110)));
                //var downCrash = (((20 * (cUp) + 115 < planeTop) && planeTop < 1000) && planeLeft > (obstacleDownLeft - 110));


                $('.bullet').each(function () {

                        var posBullet = $(this).position();
                        var bulletLeft = ~~(posBullet && posBullet.left);
                        $(this).css("left", bulletLeft + speed + 10);

                });


                checkBullet();

                obstacles = $('.obstacle');
                var arrOfNotTransparent = obstacles.not('.transparent');

                for (var i = 0; i < arrOfNotTransparent.length; i++) {

                        if (conflict(plane, $(arrOfNotTransparent[i]))) {
                                
                                over = true;
                                gameOver.fadeIn();
                                stopGame();
                                
                        }

                        
                }


                if (!obstacles.length || ((obstacleTopX < 0))) {

                        clearDivs();
                        makeDivs();

                        speed += 0.25;
                        console.log(speed);

                        if (!over) {                                
                                
                                score.text(point);
                                point++;
                        }

                }

                //if (up === false) {

                //        insSpeed += 0.25;
                //        plane.css('top', parseInt(plane.css('top')) + insSpeed);
                //}

                //else {

                //        insSpeed = 0;
                //}

                                                                       
        }, 30);


        function clear(obs) {

                var changed = false;

                var posBullet = $('.bullet').position();
                var bulletLeft = ~~(posBullet && posBullet.left);
                var bulletTop = ~~(posBullet && posBullet.top);
               
                for (var i = 0; i < obs.length; i++) {

                        if (bulletTop < parseInt(obs[i].style.top) && bulletTop < parseInt(obs[i].style.top) + 20 && !changed) {
                                      
                                obs.eq(i).addClass("transparent");
                                changed = true;
                              
                        }

                }

                
        }

                 
        function clearDivs() {

                $("#obstacleUp, #obstacleDown").remove();
            
        }


        function clearUpDiv() {
                
                var upS = $("div[id*='obstacleUp']");
                clear(upS);               
        }


        function clearDownDiv() {

                var downS = $("div[id*='obstacleDown']");
                clear(downS);
                   
        }


        function makeDivs() {

                cUp = Math.floor(Math.random() * 49);
                cDown = 49 - cUp;
                     
                var $upDiv = $("<div class='obstacle' id='obstacleUp'></div>").css({

                        'left': bgWidth + 'px',
                        'top':  0 + 'px',
                        'height': 20 + 'px'

                });
                     
                var $downDiv = $("<div class='obstacle' id='obstacleDown'></div>").css({

                        'left': bgWidth + 'px',
                        'down': 0 + 'px',
                        'height': 20 + 'px'

                });

              
                for (var i = 0; i < cUp; i++) {    
                      
                        $('#background').append($upDiv.clone().css({ 'top': (i * 20) + 'px' }));
                }

              

                for (var i = 0;  i < cDown; i++) {
                        
                        $('#background').append($downDiv.clone().css({ 'top': (i * 20) + 140 + (cUp) * 20 + 'px' }));
                }
      
             
                obstacles = $('.obstacle');
        }


        function makeBullet() {

                var $newBullet = $("<div class='bullet'></div>").css(
                        {
                                'left': (plane.offset().left - plane.width() - 10) + 'px', //this is for 100%
                                'top': parseInt(plane.offset().top + 35) + 'px'
                        }
                );

                $newBullet.appendTo('#background');

                bullet = $('.bullet');
        }


        function checkBullet() {


                $('.bullet').each(function () {
                        

                        var posBullet = $(this).position();
                        var bulletLeft = ~~(posBullet && posBullet.left);
                        var bulletTop = ~~(posBullet && posBullet.top);


                        var posObstacleUp = $('#obstacleUp').position();
                        var obstacleUpLeft = ~~(posObstacleUp && posObstacleUp.left);
                        var obstacleUpHeight = ~~($('#obstacleUp').height());
                        var obstacleUpTop = ~~($('#obstacleUp').top);


                        var posObstacleDown = $('#obstacleDown').position();
                        var obstacleDownLeft = ~~(posObstacleDown && posObstacleDown.left);
                        var obstacleDownHeight = ~~($('#obstacleDown').height());


                        var scenario1 = bulletLeft > bgWidth;

                        var scenario2 = ((0 < bulletTop && bulletTop < 20 * (cUp)) && (bulletLeft > (obstacleUpLeft - 37)));

                        var scenario3 = (((20 * (cUp) + 115 < bulletTop) && bulletTop < 1000) && bulletLeft > (obstacleDownLeft - 37));


                        if (scenario1) {
                                        
                                $(this).get(0).remove();
            
                        }

                        if (scenario2) {
          
                                clearUpDiv();                               
                                $(this).get(0).remove();

                        }

                        if (scenario3) {
                                                                                    
                                clearDownDiv();
                                $(this).get(0).remove();
                        }

                })
              
        }


        function stopGame() {

                clearInterval(playGame);
                gameOver = true;
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
                bullet.css('left', newLeft + 103);
    
        }


        function moveLeft() {

                var newLeft = parseInt(plane.css('left')) - 10;
                plane.css('left', newLeft);
                bullet.css('left', newLeft + 100);

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


        function conflict($first, $second) {

                var firstLeft = $first.offset().left;
                var firstTop = $first.offset().top;

                var firstWidth = $first.outerWidth(true);
                var firstHeight = $first.outerHeight(true);

                var secondLeft = $second.offset().left;
                var secondTop = $second.offset().top;

                var secondWidth = $second.outerWidth(true);
                var secondHeight = $second.outerHeight(true);

                var firstTotalHeight = firstTop + firstHeight;
                var firstTotalWidth  = firstLeft + firstWidth; 

                var secondTotalWidth = secondLeft + secondWidth;
                var secondTotalHeight = secondTop + secondHeight;

                if (firstTotalHeight < secondTop || firstTop > secondTotalHeight || firstTotalWidth < secondLeft || firstLeft > secondTotalWidth )

                        return false;

                else
                        return true;

        }
});