function OnChangeEmail() {
    ToggleButtonDisabled();
    ToggleEmailErrors();
}
function OnChangePassword() {
    ToggleButtonDisabled()
    TogglePasswordErrors();
}
function IsEmailValid() {
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return ValidateEmail(email);
}
function ToggleEmailErrors() {
    const email = document.getElementById("email").value;
    if (!email) {
        document.getElementById("email-required-error").style.display = "block";
    } else {
        document.getElementById("email-required-error").style.display = "none";
    }
    if (ValidateEmail(email)) {
        document.getElementById("email-invalid-error").style.display = "none";
    } else {
        document.getElementById("email-invalid-error").style.display = "block";
    }
}
function TogglePasswordErrors() {
    const password = document.getElementById('password').value;
    if (!password) {
        document.getElementById("password-required-error").style.display = "block";
    } else {
        document.getElementById("password-required-error").style.display = "none";
    }
}
function ToggleButtonDisabled() {
    const emailValid = IsEmailValid();
    document.getElementById('recover-password-button').disabled = !emailValid;
    const passwordValid = IsPassawordValid();
    document.getElementById('login-button').disabled = !emailValid || !passwordValid;
}
function IsPassawordValid() {
    const password = document.getElementById('password').value;
    if (!password) {
        return false;
    }
    return true;
}
function ValidateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}