// index.js

const passwordInput = document.getElementById("Password");
const loginScrollDestinationY = 650;
const passwordEye = document.getElementById("PasswordEye"); 

 
let accounts = [{Username : "Admin", Password : "password"}]





function scrollToLogin() {
    // if (document.documentElement.scrollTop <= 650) {
    //     window.scrollTo(0, document.documentElement.scrollTop + 10);
    // }

    // else if (document.documentElement.scrollTop > 650) {
    //     window.scrollTo(0, document.documentElement.scrollTop - 10);
    // }

    // if (document.documentElement.scrollTop != 650) {
    //     setTimeout(login, 1)
    // }
    window.scrollTo(0,loginScrollDestinationY )
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

function createAccount(username, password){
    accounts.push({Username : username, Password : password})
    localStorage.setItem("Accounts", JSON.stringify(accounts))

}
