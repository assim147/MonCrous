;(function($, undefined){

    $.fn.dragDrop = function(options) {

        $.support.transform = false;

        var initialMouseX = undefined,
            initialMouseY = undefined,
            startX = undefined,
            startY = undefined,
            dragX = 0,
            dragY = 0,
            draggedObject = undefined,
            target = false,
            frame = 0,
            element = null,
            hammertime,
            dX = 0, dY = 0,
            $document,
            $fake;
    
        var setPositionTimeout = 0;
    
        var events = [];
        var maxSpeed = 1;
        
        var x1, x2,
            y1, y2,
            t1, t2;  // Time

        var minDistance = 10; // Minimum px distance object must be dragged to enable momentum.

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            target: false,
            hammer: false,
            minDistance: 10
        }, options );

        function initElement() {
            enableDrag();
        };
        function startDragMouse(e) {
            e = e || window.event;
            initialMouseX = e.clientX;
            initialMouseY = e.clientY;
            $document.on('mousemove', checkDragMouse);
            $document.on('mouseup mouseleave',stopCheckDragMouse);
            return false;
        };
        function checkDragMouse(e){
            e = e || window.event;
            dX = e.clientX - initialMouseX;
            dY = e.clientY - initialMouseY;
            if (Math.abs(dX) > 5 || Math.abs(dY) > 5) {
                e.preventDefault();
                startDrag(target);
                stopCheckDragMouse();
                setPosition(dX, dY);
                events.push(e);
                $document.on('mousemove',dragMouse);
                $document.on('mouseup mouseleave',releaseElement);
            }
        };
        function stopCheckDragMouse(){
            $document.off('mousemove',checkDragMouse);
            $document.off('mouseup mouseleave',stopCheckDragMouse);
        };
        function startDrag(obj) {
            if (draggedObject) { 
//                console.log('releasing element before drag');
                releaseElement();
            }
            $fake.stop(true);
            if ($.support.transform) {                
                startX = $(obj).css('x');
                if (typeof startX === 'string') startX = parseInt(startX.replace(/[^-\d\.]/g, ''));
                startY = $(obj).css('y');
                if (typeof startY === 'string') startY = parseInt(startY.replace(/[^-\d\.]/g, ''));
//                console.log(startX, startY);
            }
            else {
                startX = obj.style.left === '' ? 0 : parseInt(obj.style.left);
                startY = obj.style.top === '' ? 0 : parseInt(obj.style.top);
            }
            draggedObject = obj;
//            console.log('startDrag', draggedObject);
//            element.className += 'dragging';
//            target.className += ' dragged';
            $document.trigger('dragstart');
        };
        function dragMouse(e) {
            e = e || window.event;
            if(e.preventDefault) e.preventDefault();
            dX = e.clientX - initialMouseX;
            dY = e.clientY - initialMouseY;
            setPosition(dX,dY);
             
            if ((e.timeStamp - events[ events.length - 1 ].timeStamp ) > 40){
                // Push the current mouse event.
                events.push(e);
                // Check the number of mouse events. If there
                // are too many, lets remove the oldest one.
                if (events.length > 2){
                    // Remove the oldest event.
                    events.shift();
                }
            }
            
            return false;
        };

        function setPosition(dx,dy) {
            if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
            window.requestAnimationFrame(function(){
                clearTimeout(setPositionTimeout);
                if (!draggedObject)
                    return;
                
                dragX = startX + dx;
                dragY = startY + dy;
                
//                var start = new Date().getTime();

                if (frame === 90) {                    
                    $document.trigger('dragsetpositionxy', [ dragX, dragY ]);
                    frame = 0;
                }
                else {
                    setPositionTimeout = setTimeout(function(){
                        $document.trigger('dragsetpositionxy', [ dragX, dragY ]);
                    }, 1000);
                }
                frame++;
                
//                var end = new Date().getTime();
//                var time = end - start;
//                console.log('Execution time: ' + time);
//                
//              draggedObject.style.left = startX + dx + 'px';
//              draggedObject.style.top = startY + dy + 'px';
//                if ($.support.transform) {
////                    $(draggedObject).css({
////                        x: startX + dx + 'px',
////                        y: startY + dy + 'px'
////                    });
//                    $(draggedObject).stop(true).css({
//                        left: startX + dx,
//                        top: startY + dy
//                    });
//                }
//                else {
//                    $(draggedObject).stop(true).css({
//                        left: startX + dx,
//                        top: startY + dy
//                    });
                    draggedObject.style.left = dragX + 'px';
                    draggedObject.style.top = dragY + 'px';
//                }
            });
        };

        function releaseElement(e) {
            clearTimeout(setPositionTimeout);
            if ($.support.touch) {
                hammertime.off('drag',dragTouch);
                hammertime.off('dragend',releaseElement);
            }
            else {
                $document.off('mousemove',dragMouse);
                $document.off('mouseup mouseleave',releaseElement);
            }
//            draggedObject.className = draggedObject.className.replace(/dragged/,'');
//            element.className = element.className.replace(/dragging/,'');
            if ($.support.transform) {
                var dragX = $(draggedObject).css('x');
                if (typeof dragX === 'string') dragX = parseInt(dragX.replace(/[^-\d\.]/g, ''));
                var dragY = $(draggedObject).css('y');
                if (typeof dragY === 'string') dragY = parseInt(dragY.replace(/[^-\d\.]/g, ''));
//                console.log(startX, startY);
            }
            else {
//                console.log('releaseElement', draggedObject);
                var dragX = parseInt(draggedObject.style.left);
                var dragY = parseInt(draggedObject.style.top);
            }
            
            function complete(){
                draggedObject = null;
                $document.trigger('dragstop', [ dragX, dragY ]);
            };
            
            
             // Get the last stored mouse event.
            var lastEvent = events.shift();

            // Check to see if we have a mouse move event.
            // If we don't we can exit out.
            if (true || !lastEvent || !e) {
                return complete();
            }
    
            x1 = lastEvent.pageX;
            y1 = lastEvent.pageY;
            t1 = lastEvent.timeStamp;
            x2 = e.pageX;
            y2 = e.pageY;
            t2 = e.timeStamp;
    
            // Deltas
            var dX = x2 - x1,
                dY = y2 - y1,
                dMs = Math.max(t2 - t1, 1);

            // Speeds
//            var speedX = Math.max(Math.min(dX/dMs, 1), -1),
//                speedY = Math.max(Math.min(dY/dMs, 1), -1);
        
            var speedXD = (dX / dMs);
            var speedX = Math.max(Math.min(speedXD, maxSpeed),-maxSpeed);

            // Calculate the directional speed Y using a
            // simple (distance / time) forumla.
            var speedYD = (dY / dMs);
            var speedY = Math.max(Math.min(speedYD, maxSpeed),-maxSpeed);
            
            if ((speedX / speedXD) < (speedY / speedYD)) {
                speedY = speedYD * (speedX / speedXD);
            }
            else if ((speedX / speedXD) > (speedY / speedYD)) {
                speedX = speedXD * (speedY / speedYD);
            }

            // Distance moved (Euclidean distance)
            var distance = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));

            if (distance > settings.minDistance) {
                // Momentum
                var lastStepTime = new Date();
                $fake.css("text-indent", 100);
                $fake.animate({ textIndent: 0 }, {
                    duration: Math.max(Math.abs(speedX), Math.abs(speedY)) * 2000,
                    step: function(currentStep){
//                        console.log(currentStep);
                        speedX *= (currentStep / 100);
                        speedY *= (currentStep / 100);

                        var now = new Date();
                        var stepDuration = now.getTime() - lastStepTime.getTime();

                        lastStepTime = now;
                        
                        // Update the image position left.
                        var newLeft = (parseInt(draggedObject.style.left) + (speedX * stepDuration / 2));

                        // Update the image position top.
                        var newTop = (parseInt(draggedObject.style.top) + (speedY * stepDuration / 2));
                        
                        draggedObject.style.left = newLeft +'px';
                        draggedObject.style.top = newTop + 'px';
                    },
                    "complete": complete
                });
            }
            else {
                complete();
            }
        };

        function disable(){
            if ($.support.touch) {
                if (hammertime) {
                    hammertime.off('dragstart', startDragTouch);
                    hammertime.off('drag',dragTouch);
                    hammertime.off('dragend',releaseElement);
                    stopCheckDragTouch();
                }
            }
            else {
                element.onmousedown = null;
                $document.off('mousemove',checkDragMouse);
                $document.off('mouseup mouseleave',stopCheckDragMouse);
                $document.off('mousemove',dragMouse);
                $document.off('mouseup mouseleave',releaseElement);
            }
        };

        function enableDrag(){
            if ($.support.touch) {
                hammertime = settings.hammer || new Hammer(element, { drag_max_touches: 0 });
                hammertime.on("dragstart", startDragTouch);
            }
            else {
                element.onmousedown = startDragMouse;
            }
        };
        
        function startDragTouch(e) {
            e.gesture.preventDefault();
//            console.log(e, e.gesture);
            initialMouseX = e.gesture.center.pageX;
            initialMouseY = e.gesture.center.pageY;
            hammertime.on('drag', checkDragTouch);
            hammertime.on('dragend',stopCheckDragTouch);
            return false;
        };
        function checkDragTouch(e){
            e.gesture.preventDefault();
//            console.log(e, e.gesture);
            dX = e.gesture.center.pageX - initialMouseX;
            dY = e.gesture.center.pageY - initialMouseY;
            if (Math.abs(dX) > 5 || Math.abs(dY) > 5) {
                startDrag(target);
                stopCheckDragTouch();
                setPosition(dX, dY);
                hammertime.on('drag',dragTouch);
                hammertime.on('dragend',releaseElement);
            }
        };
        function stopCheckDragTouch(){
            hammertime.off('drag',checkDragTouch);
            hammertime.off('dragend',stopCheckDragTouch);
        };
        
        function dragTouch(e) {
            e.gesture.preventDefault();
            dX = e.gesture.center.pageX - initialMouseX;
            dY = e.gesture.center.pageY - initialMouseY;
            setPosition(dX,dY);
            return false;
        };

        return this.each(function(){
            element = this;
            $document = $(document);
            if (typeof options === 'string') {
                switch(options) {
                    case 'disable':
                        disable();
                        break;
                    case 'enable':
                        enableDrag();
                        break;
                    case 'destroy':
                        releaseElement();
                        break;
                }
            }
            else {
                target = settings.target ? settings.target : this;
                if (typeof target === 'string')
                    target = document.getElementById(target);
                initElement(this);
                $fake = $('<div id="fake" style="position:absolute;top:0;left:0;width:0;height:0;"></div>').appendTo('body');
            }
        });
    };
})(jQuery);