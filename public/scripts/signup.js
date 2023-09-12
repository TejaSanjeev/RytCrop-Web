
function validate() {
    var username = document.querySelector(".user").value;
    var email = document.querySelector(".mail").value;
    var password = document.querySelector(".password").value;
    var confirmPassword = document.querySelector(".ConfirmPass").value;

    var usernamePattern = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/;
    var emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    var passwordPattern = /^(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (password === confirmPassword) {
        if (!usernamePattern.test(username)) {
            // alert("Invalid username format \nMust be 3-16 characters long");
            document.getElementById("content").innerHTML="*Invalid username format \nMust be 3-16 characters long";
            return false;
        }

        if (!emailPattern.test(email)) {
            // alert("Invalid email format");
            document.getElementById("content").innerHTML="*Invalid email format";
            return false;
        }

        if (!passwordPattern.test(password)) {
            // alert("Invalid password format \n\n Format should be :\n1)Must be at least 8 characters long\n2)Must contain at least one uppercase letter, one lowercase letter, and one digit");
            document.getElementById("content").innerHTML="*Password must be at least 8 characters with 1 digit";
            return false;
        }

        return true;
    } 
    else 
    {
        // alert("Enter the same input in both password and confirm password fields");
        document.getElementById("content").innerHTML="*Enter the same input in both password fields";
        return false;
    }
}

var form = document.getElementById("bor");
form.addEventListener("submit", function(event) 
{
    event.preventDefault(); 
    var isValid = validate();
    if (isValid) {
        form.submit();
    }
});

function checkUsername() {
    var usernameInput = document.querySelector(".user");
    var username = usernameInput.value;
    if (username.trim().length <3 )
    {
        usernameInput.classList.add("userError"); 
    } 
    else 
    {
        usernameInput.classList.remove("userError");
    }
}
function checkEmail() {
    var emailInput = document.querySelector(".mail");
    var email = emailInput.value;
    count=count+1;
    if (email.includes('@'))
    {
        emailInput.classList.remove("mailError");
    } 
    else 
    {
        emailInput.classList.add("mailError"); 
    }
}
function checkPassword() {
    var passwordInput = document.querySelector(".pass")
    var password = passwordInput.value;
    if (password.trim().length <= 7 || !/\d/.test(password))
    {
        passwordInput.classList.add("passwordError"); 
    } 
    else 
    {
        passwordInput.classList.remove("passwordError");
    }
}

function checkSame() {
    var passwordInput = document.querySelector(".ConfirmPass")
    var password = passwordInput.value;
    var password1 = document.querySelector(".pass").value;

    if (password === password1)
    {
        passwordInput.classList.remove("passwordError");
    } 
    else 
    {
        passwordInput.classList.add("passwordError"); 
    }
}


