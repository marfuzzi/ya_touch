// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);
    var buttons = [
        this.popup.querySelector('.door-riddle__button_r'),
        this.popup.querySelector('.door-riddle__button_v'),
        this.popup.querySelector('.door-riddle__button_q')
    ];

    var code = ['q', 'r', 'v'];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        if (e.target.classList.contains('door-riddle__button_'+code[0])) {
            checkCondition.apply(this);
        }
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
        code = ['q', 'r', 'v'];
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        code.shift();
        if (!code.length) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var pointers = {},
        circles = [
            this.popup.querySelector('.door-riddle__circle_0'),
            this.popup.querySelector('.door-riddle__circle_1'),
            this.popup.querySelector('.door-riddle__circle_2')
        ],
        dest = this.popup.querySelector('.door-riddle__circle_destination');

    circles.forEach(function(r) {
        r.addEventListener('pointerdown', _onCirclePointerDown.bind(this));
        r.addEventListener('pointerup', _onCirclePointerUp.bind(this));
        r.addEventListener('pointercancel', _onCirclePointerUp.bind(this));
        r.addEventListener('pointerleave', _onCirclePointerUp.bind(this));
        r.addEventListener('pointermove', _onCirclePointerMove.bind(this));
    }.bind(this));

    function getPointer(e) {
        return pointers[e.pointerId];
    }

    function _onCirclePointerDown(e) {
        e.target.classList.add('door-riddle__circle_pressed');

        pointers[e.pointerId] = {
            x: e.clientX,
            y: e.clientY,
            currentPosX: e.clientX,
            currentPosY: e.clientY,
            isMoved: false
        }
    }

    function _onCirclePointerUp(e) {
        delete pointers[e.pointerId];

        if (e.target.classList.contains('door-riddle__circle')) {
            requestAnimationFrame(function() {
                e.target.style.transform = 'translateY(0)';
            });
        }

        e.target.classList.remove('door-riddle__circle_pressed');
    }

    function _onCirclePointerMove(e) {
        if (e.target.classList.contains('door-riddle__circle_pressed')) {
            var startPositionX = getPointer(e).x,
                startPositionY = getPointer(e).y,
                currentPositionX = e.clientX,
                currentPositionY = e.clientY;

            requestAnimationFrame(function() {
                var diffX = currentPositionX - startPositionX + 'px',
                    diffY = currentPositionY - startPositionY + 'px';
                    if (diffX*diffY !== 0) {
                        getPointer(e).isMoved = true;
                        getPointer(e).currentPosX = currentPositionX;
                        getPointer(e).currentPosY = currentPositionY;
                    }

                e.target.style.transform = `translate(${diffX}, ${diffY})`;
            });
            checkCondition.apply(this);
        }
    }

    function checkCondition(g) {
        var isOpened = true,
            points = Object.keys(pointers),
            startWebX = dest.offsetLeft,
            endWebX = dest.offsetLeft + dest.offsetWidth,
            startWebY = dest.offsetTop,
            endWebY = dest.offsetTop + dest.offsetHeight;

        if (points.length === 3) {
            points.forEach(function(id) {
                webAreaX = (pointers[id].currentPosX > startWebX) && (pointers[id].currentPosX < endWebX),
                webAreaY = (pointers[id].currentPosY > startWebY) && (pointers[id].currentPosY < endWebY);

                if ( !(pointers[id].isMoved && webAreaX && webAreaY) ) {
                    isOpened = false;
                }
            });

            // Если все три паука попадают в паутину, то откроем эту дверь
            if (isOpened) {
                this.unlock();
            }
        }
    }
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия третей двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия сундука здесь ====
    // Для примера сундук откроется просто по клику на него
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
