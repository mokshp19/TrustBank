// index.js

const usernameInput = document.getElementById("Username");
const passwordInput = document.getElementById("Password");
const passwordEye = document.getElementById("PasswordEye");
const loginScrollDestinationY = 700; 

let accounts = [{ Username : "Admin", Password : "password", AccountNo : "", AccountType: "", Balance: 0.00}];
let currentAccount = {};

if (localStorage.getItem("Accounts") != null) {
    accounts = JSON.parse(localStorage.getItem("Accounts"));
}

const LOGIN_MODES = {
    LOGIN : 0,
    SIGNUP : 1
}
let currentLoginMode = LOGIN_MODES.LOGIN;

function scrollToLogin(newLoginMode = null) {
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

function login(username = usernameInput.value, password = passwordInput.value) {
    let accountFound = false;
    
    accounts.forEach(account => {
        if (account.Username == username && account.Password == password) {
            currentAccount = account;
            accountFound = true;
            window.location.href = "bank.html";
            return;
        }
    });

    if (!accountFound) {
        alert("Username or password is incorrect.");
    }
}

 function createAccount(username = usernameInput.value, password = passwordInput.value){
    let accountValid = true;
    
    if (username.trim() == "" || password.trim() == "") {
        accountValid = false;
        alert("No username or password is entered.");
        return;
    }
    
    accounts.forEach(account => {
        if (account.Username == username) {
            accountValid = false;
            alert("Username already exists.");
            return;

        }
    });

    if (accountValid) {
        let accountnum = ""
        for (let i = 0; i < 10; i++)
        {
            accountnum += (Math.random() * 10).toString()
        }

        let accounttype = ""; 

        if (Math.random() == 0){
            accounttype = "Chequing"; 
        }
        else{
            accounttype = "savings";
        }

        
        let newAccount = { Username : username, Password : password, AccountNo : accountnum, AccountType: accounttype, Balance: Math.random() * 1000000};
        accounts.push(newAccount); 
        currentAccount = newAccount;
        localStorage.setItem("Accounts", JSON.stringify(accounts));
        sessionStorage.setItem("CurrentAccount", JSON.stringify(currentAccount))
        window.location.href = "bank.html";
     
        
        // document.getElementById("accountno").innerHTML = accountnum; 
        // document.getElementById("accounttype").innerHTML = accounttype;
        
        // document.getElementById("balance").innerHTML = newAccount.Balance.toString();
    }
}

function removeAccount(accountToDelete = currentAccount) {
    
}

function logout() {
    currentAccount = {};
    window.location.href = "index.html";
    alert("You have successfully logged out!");
}


