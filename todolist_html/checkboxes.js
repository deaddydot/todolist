window.addEventListener("DOMContentLoaded", domLoaded);

// this button tells whether the button is in show all checkboxes mode or hide
var show_all_enabled = false;

function domLoaded() {
    console.log("connected");

    var checkbox = document.getElementsByClassName('form-check-input');

    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('click', function() { dissapear_if_checked(); });
    }

    var show_all_button = document.getElementById('show-all');

    show_all_button.addEventListener('click', function() { show_all(); });
}

function dissapear_if_checked() {
    var checkbox = document.getElementsByClassName('form-check-input');
    var task = document.getElementsByClassName('task');

    if (!show_all_enabled) {
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                task[i].style.display = 'none';
            }
        }
    }
}

function show_all () {
    show_all_enabled = !show_all_enabled;

    var show_all_button = document.getElementById('show-all');

    var checkbox = document.getElementsByClassName('form-check-input');
    var task = document.getElementsByClassName('task');

    if (show_all_enabled) {
        show_all_button.innerHTML = "Hide checked checkboxes";
        for (var i = 0; i < task.length; i++) {
            task[i].style.display = 'block';
        }
    }
    else {
        show_all_button.innerHTML = "Show checked checkboxes";
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                task[i].style.display = 'none';
            }
        }
    }
}