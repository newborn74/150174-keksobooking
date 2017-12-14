'use strict';

(function () {

  window.lib = {

    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    getRandomValue: function (array) {
      var randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    },

    getValueInRange: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },

    getUniqueValues: function (array) {
      var filteredArray = array.filter(function (it, i) {
        return array.indexOf(it) === i;
      });
      return filteredArray;
    },

    getOptionValuesInSelect: function (select) {
      var selectOptions = select.querySelectorAll('option');
      var optionValue = null;
      var optionValues = [];
      for (var i = 0; i < selectOptions.length; i++) {
        optionValue = selectOptions[i].getAttribute('value');
        optionValues[i] = optionValue;
      }
      return optionValues;
    },

    syncValues: function (elem, val) {
      elem.value = val;
    },

    syncValueWithMin: function (elem, val) {
      elem.min = val;
    },

    getPinPositionX: function (houseX, width) {
      return (houseX - (width / 2)) + 'px';
    },

    getPinPositionY: function (houseY, height) {
      return (houseY - height) + 'px';
    },

    findClass: function (element, className) {
      return element.classList.contains(className);
    },

    addClassToAll: function (array, className) {
      array.forEach(function (elem) {
        elem.classList.add(className);
      });
    },

    addClassToRandom: function (array, className, number) {
      for (var i = 0; i < number; i++) {
        var randomIndex = Math.floor(Math.random() * array.length);
        array[randomIndex].classList.add(className);
      }
    },

    removeClassFromAll: function (array, className) {
      array.forEach(function (elem) {
        elem.classList.remove(className);
      });
    },

    removeClassFromRandom: function (array, className, number) {
      for (var i = 0; i < number; i++) {
        if (i < array.length) {
          var randomIndex = Math.floor(Math.random() * array.length);
          if (array[randomIndex].classList.contains(className)) {
            array[randomIndex].classList.remove(className);
          } else {
            --i;
          }
        } else {
          break;
        }

      }
    },

    removeElementsAttribute: function (array, attribute) {
      array.forEach(function (elem) {
        elem.removeAttribute(attribute);
      });
    },

    checkRequiredField: function (element, event) {
      if (!element.value) {
        event.preventDefault();
        element.focus();
      }
    },

    fieldReset: function (field, val) {
      field.value = val || '';
    },

    checkboxListReset: function (array) {
      array.forEach(function (it) {
        it.checked = false;
      });
    },

    filterArrayByValue: function (array, option, value) {
      return array.filter(function (it) {
        return it.querySelector(option).textContent === value;
      }).map(function (it) {
        it.filtered = true;
        return it.getAttribute('id');
      });
    },

    filterArrayByRange: function (array, option, min, max) {
      return array.filter(function (it) {
        var value = parseInt(it.querySelector(option).textContent, 10);
        return value > min && value <= max;
      }).map(function (it) {
        return it.getAttribute('id');
      });
    },

    // checkElementId: function (array, element) {
    //   array.map(function (it) {
    //     var elementId = element.getAttribute('id');
    //     if (elementId === it) {
    //       element.filtered = true;
    //       if (element.classList.contains('hidden')) {
    //         element.classList.remove('hidden');
    //       }
    //     } else if (elementId !== it && element.filtered !== true) {
    //       element.filtered = false;
    //       if (!element.classList.contains('hidden')) {
    //         element.classList.add('hidden');
    //       }
    //     }
    //   });
    // },

    checkElementId: function (array, element) {
      return array.some(function (it) {
        return it === element;
      });
    },

    addFilteredProperty: function (array) {
      array.map(function (it) {
        it.filtered = null;
      });
    },

    compareArraysById: function (inputArr, filteredArr) {

      var output = inputArr.filter(function (it) {
        // it.classList.add('hidden');
        var itId = it.getAttribute('id');
        // var checkResult = filteredArr.some(function (item) {
        //   return item === itId;
        // });
        // console.log(checkResult);
        if (window.lib.checkElementId(filteredArr, itId)) {
          if (it.filtered === false) {
            return false;
          } else {
            it.filtered = true;
            if (it.classList.contains('hidden')) {
              it.classList.remove('hidden');
            }
            return it;
          }
        } else {
          it.filtered = false;
          if (!it.classList.contains('hidden')) {
            it.classList.add('hidden');
          }
          return false;
        }
      });
      console.dir(output);
    },

    generateFilteredArray: function (array) {
      array = window.lib.compareArraysById();
      return array;
    }
  };
})();
