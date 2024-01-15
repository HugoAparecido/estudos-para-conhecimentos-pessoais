firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "home.html";
    }
})
function OnChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = ValidateEmail(email) ? "none" : "block";
    ToggleRegisterButtonDisabled();
}
function OnChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.passwordMinLenghtError().style.display = password.length >= 6 ? "none" : "block";
    ValidatePasswordMatch();
    ToggleRegisterButtonDisabled();
}
function OnChangeConfirmPassword() {
    ValidatePasswordMatch();
    ToggleRegisterButtonDisabled();
}
function Register() {
    ShowLoading();
    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        HideLoading();
        window.location.href = "home.html";
    }).catch(error => {
        HideLoading();
        alert(GetErrorMessage(error));
    })
}
function GetErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    return error.message;
}
function ValidatePasswordMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;
    form.confirmPasswordDoesntMatchError().style.display = password == confirmPassword ? "none" : "block";
}
function ToggleRegisterButtonDisabled() {
    form.registerButton().disabled = !IsFormValid();
}
function IsFormValid() {
    const email = form.email().value;
    if (!email || !ValidateEmail(email)) {
        return false;
    }
    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }
    return true;
}
const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLenghtError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById("register-button")
}