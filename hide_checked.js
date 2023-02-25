window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    console.log("connected");

    var checkbox = document.getElementsByClassName('form-check-input');

    for (var i = 0; i < checkbox.length; i++) {
        console.log('checkbox selected');
        checkbox[i].addEventListener('click', function() { dissapear_if_checked(); });
    }
}

function dissapear_if_checked() {
    var checkbox = document.getElementsByClassName('form-check-input');
    var task = document.getElementsByClassName('task');

    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            console.log("checked");
            checkbox[i].style.display = 'none';
            task[i].style.display = 'none';
        }
    }
}