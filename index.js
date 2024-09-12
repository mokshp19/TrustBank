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

function togglePasswordVisibility(visible = null) {
    if (visible == true) {
        passwordInput.type = "text";
    }

    else if (visible == false) {
        passwordInput.type = "password";
    }

    else {
        if (passwordInput.type == "text") {
            passwordInput.type = "password";
        }

        else {
            passwordInput.type = "text";
        }
    }
}
