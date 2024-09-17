// index.js

const usernameInput = document.getElementById("Username");
const passwordInput = document.getElementById("Password");
const passwordEye = document.getElementById("PasswordEye");
const loginScrollDestinationY = 650; 

let accounts = [{ Username : "Admin", Password : "password" }];
let currentAccount = {};

const LOGIN_MODES = {
    LOGIN : 0,
    SIGNUP : 1
}
let currentLoginMode = LOGIN_MODES.LOGIN;

function scrollToLogin(newLoginMode = null) {
    // if (document.documentElement.scrollTop <= 650) {
    //     window.scrollTo(0, document.documentElement.scrollTop + 10);
    // }

    // else if (document.documentElement.scrollTop > 650) {
    //     window.scrollTo(0, document.documentElement.scrollTop - 10);
    // }

    // if (document.documentElement.scrollTop != 650) {
    //     setTimeout(login, 1)
    // }
    
    window.scrollTo(0, loginScrollDestinationY);

    if (newLoginMode != null) {
        toggleLoginMode(newLoginMode);
    }
}

function togglePasswordVisibility(visible = null) {
    if (visible == true) {
        passwordInput.type = "text";
        passwordEye.src = "images/EyesOpen.png";
    }

    else if (visible == false) {
        passwordInput.type = "password";
        passwordEye.src = "images/EyeClose.png";
    }

    else {
        if (passwordInput.type == "text") {
            passwordInput.type = "password";
            passwordEye.src = "images/EyeClose.png";
        }

        else {
            passwordInput.type = "text";
            passwordEye.src = "images/EyesOpen.png";
        }
    }
}

function toggleLoginMode(loginMode = null) {
    currentLoginMode = loginMode;
    
    if (currentLoginMode == LOGIN_MODES.LOGIN) {
        document.getElementById("LoginLabel").style.display = "block";
        document.getElementById("SignUpLabel").style.display = "none";

        document.getElementById("LoginButton").style.display = "inline";
        document.getElementById("SignUpButton").style.display = "none";

    }

    else if (currentLoginMode == LOGIN_MODES.SIGNUP) {
        document.getElementById("LoginLabel").style.display = "none";
        document.getElementById("SignUpLabel").style.display = "block";

        document.getElementById("LoginButton").style.display = "none";
        document.getElementById("SignUpButton").style.display = "inline";

    }
}

function login() {
    window.location.href = "bank.html";
}

function createAccount(username = usernameInput.value, password = passwordInput.value){
    if (username.trim() == "" || password.trim() == "") {
        alert("No username or password is entered.");
        return;
    }
    
    accounts.forEach(account => {
        if (account.Username == username) {
            alert("Username already exists.");
            return;
        }
    });

    accounts.push({ Username : username, Password : password });
    localStorage.setItem("Accounts", JSON.stringify(accounts));

    window.location.href = "bank.html";
}
