// index.js

const passwordInput = document.getElementById("Password");
const loginScrollDestinationY = 650;


function scrollToLogin() {
    if (document.documentElement.scrollTop < 650) {
        window.scrollTo(0, document.documentElement.scrollTop + 10);
    }

    else if (document.documentElement.scrollTop > 650) {
        window.scrollTo(0, document.documentElement.scrollTop - 10);
    }

    if (document.documentElement.scrollTop != 650) {
        setTimeout(login, 1)
    }
}

function login() {
    scrollToLogin();
}

function signUp() {
    scrollToLogin();
}

function revealPassword() {
    passwordInput.type = "text";
}
