// array of buttons
var button = document.querySelectorAll('button');

// for display Box
var input = document.querySelector('input');

// addOrReplace used to check if we need to add new value to input or Replace last value from input
var addOrReplace = true;

// hold used for asynchronous calling
var hold;

// replace all variables to its original position
var is_busy;

// on long press we will add number to our input box
var delay = 1000;

// keep a track of index in text array
var index = -1;

// to check if new event happened or not.
var click = null;

for (var i = 0, len = button.length; i < len; ++i) {
    // onmousedown event
    button[i].onmousedown = function (e) {
        var text = this.getAttribute('data-text').split(""),
            number = this.getAttribute('data-number');
        addOrReplace = true;

        // clear old stored value
        clearTimeout(is_busy);

        // to check if we are on the same button or new one
        if (click !== e.target) {
            addOrReplace = false;
        }

        /* to check if we reached at the last index of array or not 
        and if we clicked new button then we set our index to zero again
        */
        if (index >= text.length - 1 || click !== e.target) {
            index = 0;
            click = e.target;
        } else {
            index = index + 1;
        }

        // if long press happens then we call setTimeout web api to add number in input Box
        hold = setTimeout(function () {
            if (number) {
                input.value = input.value.slice(0, -1) + number;
            }
        }, delay);

        // with the help of busy variable we can decide weather to add new character at last or replace the last one
        
        input.value = addOrReplace ? input.value.slice(0, -1) + text[index] : input.value + text[index];

    };


    button[i].onmouseup = function (e) {
        // clear all the values after user removed the mouse from the button
        clearTimeout(hold);
        addOrReplace = true;
        is_busy = setTimeout(function () {
            index = -1;
            addOrReplace = false;
            e.target = null;
        }, delay);
        input.focus();
        input.selectionStart = input.selectionEnd = input.value.length;
    };
}