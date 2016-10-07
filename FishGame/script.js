$(function () {

        //dom objects
        var bg = $('#background');
        var plane = $('#plane');
        var obstacle = $('.obstacle');
        var obstacleUp = $('#obstacleUp');
        var obstacleDown = $('#obstacleDown');
        var score = $('#score');
        var gameOver = $('#gameOver');
        var retry = $('#retry');
        var bullet = $('#bullet');
        
        var speed = 10;
        var insSpeed = 0;

        var bgWidth = parseInt(bg.width());
        var bgHeight = parseInt(bg.height());
        var planeLeft = parseInt(plane.css('left'));
        var planeHeight = parseInt(plane.height());
        var obstacleInitialPos = parseInt(obstacle.css('right'));
        var obstacleInitialHeight = parseInt(obstacle.css('height'));

        var up = false;
        var right = false;
        var left = false;
        var down = false;

        var fire = false;

        var over = false;
        var updated = false;

        var cUp;
        var cDown;


        var playGame = setInterval(function () {

               
                //gameOver.hide();



                //if ( conflict(plane, obstacleUp) || conflict(plane, obstacleDown)  || parseInt(plane.css('top')) <= 0 || parseInt(plane.css('top')) > bgHeight - planeHeight ) {

                //        over = true;
                //        gameOver.fadeIn();
                //        stopGame();

                      
                //}

                //else if (conflict(bullet, obstacleUp)) {

                //        //bullet.remove();
                //        //this.obstacleUp.remove();
                //        over = true;
                //        gameOver.fadeIn();
                //        stopGame();
                //}

                //else if (conflict(bullet, obstacleDown)) {

                //        //bullet.remove();
                //        //this.obstacleDown.remove();
                //        over = true;
                //        gameOver.fadeIn();
                //        stopGame();
                //}

                //else {

                        
                        //bg.append(gameOver);
                       
                        //bullet.css('top', plane.offset().top + 40);
                        if (!obstacle.length) {
                                
                             bg.append($('<div class="obstacle" id="obstacleUp"></div>'));
                             console.log(obstacle.length);
                        }

                        
                        var obstacleCurrentPos = parseInt(obstacle.css('right')); 
                        

                        if (obstacleCurrentPos > bgWidth - planeLeft )  {

                                if (updated === false) {

                                        score.text(parseInt(score.text()) + 1 );
                                        updated = true;
                                }
                                
                        }

                        if (obstacleCurrentPos > bgWidth) {

                               
                                cUp = Math.floor(Math.random() * 50);
                                cDown = 50 - cUp;
                               
                              
                                //obstacleUp.css('height', cUp * 16);
                                //obstacleDown.css('height', cDown * 16);

                                //bullet.css('top', plane.offset().top + 40);
                                //bullet.css('left', plane.offset().left + 100);
   
                               
                                speed++;
                                
                                updated = false;
                                obstacleCurrentPos = obstacleInitialPos;
                        }


                        obstacle.css('right', obstacleCurrentPos + speed);
                        

                        //for gravity
                        
                        //if (up === false) {

                        //        insSpeed += 0.5;
                        //        plane.css('top', parseInt(plane.css('top')) + insSpeed);
                        //}

                        //else {

                        //        insSpeed = 0;
                        //}

                        
                //}
         


        }, 30);



        //$(document).on('keydown', function (e) {

        //        var key = e.keyCode;
               
        //        if ((key === 119 || key === 87) && up === false && over === false) { //for MOVE up-> w:119  || 87

        //                up = setInterval(moveUp, 50);     
        //        }

        //        if ((key === 100 || key === 68)  &&  right === false && over === false) { //for MOVE right-> d: 100 || 68

        //                right = setInterval(moveRight, 50);
        //        }

        //        if ((key === 65 || key === 97) && left === false && over === false) { //for MOVE left-> a: 65 || 97

        //                left = setInterval(moveLeft, 50);
        //        }

        //        if ((key === 83 || key === 115) && down === false && over === false) { //for MOVE down-> s: 83 || 115

        //                down = setInterval(moveDown, 50);
        //        }

              

        //});

       
        //$(document).on('keydown', function (e) {

        //        var key = e.keyCode;

        //        if (key == 32 && fire === false && over === false) {  //for fire bullet-> space: 32


        //                fire = setInterval(moveBullet, 10);

        //        }

        //});

        //$(document).on('keyup', function (e) {

        //        var key = e.keyCode;


        //        if (key === 119 || key === 87) {

        //                clearInterval(up);
        //                up = false;
        //        }

        //        if (key === 100 || key === 68) {

        //                clearInterval(right);
        //                right = false;
                        
        //        }

        //        if (key === 65 || key === 97) {

        //                clearInterval(left);
        //                left = false;
        //        }

        //        if (key === 83 || key === 115) {

        //                clearInterval(down);
        //                down = false;
        //        }

        //        if (key === 32) {

        //                clearInterval(fire);
        //                fire = false;
        //        }
        //});


      

        //function moveDown() {

        //        var newTop = parseInt(plane.css('top')) + 10;
        //        plane.css('top', newTop);
                

        //}

        //function moveUp() {

        //        var newTop = parseInt(plane.css('top')) - 10;
        //        plane.css('top', newTop);
               
    
        //}

        //function moveRight() {

        //        var newLeft = parseInt(plane.css('left')) + 10;
        //        plane.css('left', newLeft);
        //        bullet.css('left', newLeft + 103);
    
        //}

        //function moveLeft() {

        //        var newLeft = parseInt(plane.css('left')) - 10;
        //        plane.css('left', newLeft);
        //        bullet.css('left', newLeft + 100);

        //}

       
        //function moveBullet() {

                
        //        var newLeft = parseInt(bullet.css('left')) + 10;
        //        bullet.css('left', newLeft);
    
        //}

        

        //function addObstacle(num) {


        //        var topOfObs = obstacleUp.offset().top;
        //        var heightBullet = bullet.height();

        //        for (i = 0; i < num; i++) {

        //                obstacleUp.css('height', 40);
        //                obstacleUp.css('left', 100);
        //                bg.append($('<div class="obstacle" id="obstacleUp"></div>'));
                        
                       
        //        }


        //};

        //function stopGame() {

        //        clearInterval(playGame);
        //        gameOver = true;
        //        retry.slideDown();
               
        //}

        function getRandomInt(min, max) {

                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
        }

        //function getPositions(elem) {

        //        var pos, width, height;
        //        pos = $(elem).position();
        //        width = $(elem).width();
        //        height = $(elem).height();
        //        return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
        //}

      


        //function conflict($first, $second) {

        //        var firstLeft = $first.offset().left;
        //        var firstTop = $first.offset().top;
                
        //        var firstWidth = $first.outerWidth(true);
        //        var firstHeight = $first.outerHeight(true);

        //        var secondLeft = $second.offset().left;
        //        var secondTop = $second.offset().top;

        //        var secondWidth = $second.outerWidth(true);
        //        var secondHeight = $second.outerHeight(true);

        //        var firstTotalHeight = firstTop + firstHeight;
        //        var firstTotalWidth  = firstLeft + firstWidth; 
                
        //        var secondTotalWidth = secondLeft + secondWidth;
        //        var secondTotalHeight = secondTop + secondHeight;


        //        if (firstTotalHeight < secondTop || firstTop > secondTotalHeight || firstTotalWidth < secondLeft || firstLeft > secondTotalWidth )
                 
        //                return false;
                 
        //        else
        //                return true;

        //}

        //retry.click(function () {

        //        location.reload();
        //});
        

        //function createBullet() {

        //        var $newdiv1 = $("<div id='bullet'></div>");
        //        var newTop = parseInt(plane.css('top'));
        //        var newLeft = parseInt(plane.css('left')) + 100;

        //        $newdiv1.css('left', newLeft);
        //        $newdiv1.css('top', newTop);
        //        bg.append($newdiv1);
        //        return $newdiv1;
        //}

});