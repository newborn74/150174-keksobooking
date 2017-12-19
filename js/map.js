'use strict';


(function () {

  // Constants
  var MIN_Y_COORD = 100;
  var MAX_Y_COORD = 500;
  var DEFAULT_X = 470;
  var DEFAULT_Y = 455;
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 80;

  // DOM-elements
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFieldsets = noticeForm.querySelectorAll('fieldset');
  var inputAddress = noticeForm.querySelector('#address');

  // Variables
  var pageWidth;
  var bodyWidth;
  var bodyOffset;

  // Add draggable Main pin and activate map

  mainPin.style.zIndex = '100';

  mainPin.addEventListener('mousedown', function (mouseDownEvt) {
    mouseDownEvt.preventDefault();

    var mainPinMouseMoveHandler = function (evt) {
      evt.preventDefault();

      // Compensation offset on fullscreen
      pageWidth = document.querySelector('html').clientWidth;
      bodyWidth = document.querySelector('body').clientWidth;
      bodyOffset = pageWidth - bodyWidth;

      mainPin.style.left = evt.pageX - (bodyOffset / 2) + 'px';
      mainPin.style.top = evt.pageY + 'px';

      // Set vertical limits
      if (evt.pageY < MIN_Y_COORD) {
        mainPin.style.top = MIN_Y_COORD + 'px';
      } else if (evt.pageY > MAX_Y_COORD) {
        mainPin.style.top = MAX_Y_COORD + 'px';
      }
    };

    var mainPinMouseUpHandler = function (evt) {
      evt.preventDefault();

      // Map and form activation

      if (map.classList.contains('map--faded')) {
        map.classList.remove('map--faded');
        noticeForm.classList.remove('notice__form--disabled');
        window.utils.removeElementsAttribute(noticeFieldsets, 'disabled');
        window.data.fillMap();
      }

      // Set adress value
      var leftCoord = (parseInt(mainPin.style.left, 10));
      var topCoord = (parseInt(mainPin.style.top, 10));
      var adressX = leftCoord + (MAIN_PIN_WIDTH / 2);
      var adressY = topCoord + MAIN_PIN_HEIGHT;

      // Check main pin position values
      if (isNaN(leftCoord) && isNaN(topCoord)) {
        inputAddress.value = 'x: ' + DEFAULT_X + ', y: ' + DEFAULT_Y;
      } else if (isNaN(leftCoord)) {
        inputAddress.value = 'x: ' + DEFAULT_X + ', y: ' + adressY;
      } else if (isNaN(topCoord)) {
        inputAddress.value = 'x: ' + adressX + ', y: ' + DEFAULT_Y;
      } else {
        inputAddress.value = 'x: ' + adressX + ', y: ' + adressY;
      }

      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      mainPin.removeEventListener('mouseup', mainPinMouseUpHandler);
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    mainPin.addEventListener('mouseup', mainPinMouseUpHandler);
  });

})();
