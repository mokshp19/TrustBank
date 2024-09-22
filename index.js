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

if (sessionStorage.getItem("CurrentAccount") != null && document.getElementById("accountno") != null) {
    currentAccount = JSON.parse(sessionStorage.getItem("CurrentAccount"));
    
    document.getElementById("accountno").innerHTML = "Account #: " + currentAccount.AccountNo; 
    document.getElementById("accounttype").innerHTML = "Account Type: " +currentAccount.AccountType;
    document.getElementById("balance").innerHTML = "Balance: $" + getFormattedMoneyString(currentAccount.Balance);
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
            sessionStorage.setItem("CurrentAccount", JSON.stringify(currentAccount));
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
            accountnum += (Math.floor(Math.random() * 10)).toString()
        }

        let accounttype = ""; 

        if (Math.random() == 0){
            accounttype = "Chequing"; 
        }
        else{
            accounttype = "Savings";
        }

        
        let newAccount = { Username : username, Password : password, AccountNo : accountnum, AccountType: accounttype, Balance: Math.floor(Math.random() * 1000000) };
        accounts.push(newAccount); 
        currentAccount = newAccount;
        localStorage.setItem("Accounts", JSON.stringify(accounts));
        sessionStorage.setItem("CurrentAccount", JSON.stringify(currentAccount))
        window.location.href = "bank.html";
    }
}

function removeAccount(accountToDelete = currentAccount) {
    
}

function logout() {
    currentAccount = {};
    window.location.href = "index.html";
    alert("You have successfully logged out!");
}

function getFormattedMoneyString(money = 0.00) {
    let formattedMoneyString = "";
    let numberOfDigitsUntilComma = 3;

    for (let i = money.toString().length - 1; i > -1; i--) {
        if (numberOfDigitsUntilComma == 0 && i != 0) {
            formattedMoneyString = "," + formattedMoneyString;
            numberOfDigitsUntilComma = 3;
        }

        formattedMoneyString = money.toString()[i] + formattedMoneyString;
        numberOfDigitsUntilComma--;
    }

    return formattedMoneyString;
}

function Deposit(){
    let addition = prompt("Enter the amount to deposit: ", "0")
    if (!isNaN(addition) && addition != null) {
        accounts.forEach(account => {
            if (account.Username == currentAccount.Username) {
                account.Balance += parseFloat(addition); 
                currentAccount = account;

                localStorage.setItem("Accounts", JSON.stringify(accounts));
                sessionStorage.setItem("CurrentAccount", JSON.stringify(currentAccount));

                document.getElementById("balance").innerHTML = "Balance: $" + getFormattedMoneyString(currentAccount.Balance);
            }
        });
    }
    else{
        alert("Invalid input, please try again.")
    }
}

function Withdraw(){
    let subtraction = prompt("Enter the amount to withdraw: ", "0")
    if (!isNaN(subtraction) && subtraction != null) {
        accounts.forEach(account => {
            if (account.Username == currentAccount.Username) {
                if (account.Balance - parseFloat(subtraction) >= 0.0) {
                    account.Balance -= parseFloat(subtraction); 
                    currentAccount = account;

                    localStorage.setItem("Accounts", JSON.stringify(accounts));
                    sessionStorage.setItem("CurrentAccount", JSON.stringify(currentAccount));

                    document.getElementById("balance").innerHTML = "Balance: $" + getFormattedMoneyString(currentAccount.Balance);
                }

                else {
                    alert("You are withdrawing more than your balance has, please try again.");
                }
            }
        });
    }
    else{
        alert("Invalid input, please try again.")
    }
}

