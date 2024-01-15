firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "./pages/home.html";
    }
})
function OnChangeEmail() {
    ToggleButtonDisabled();
    ToggleEmailErrors();
}
function OnChangePassword() {
    ToggleButtonDisabled();
    TogglePasswordErrors();
}
function Login() {
    ShowLoading();
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value).then(response => {
        HideLoading(); window.location.href = "./pages/home.html";
    }).catch(error => {
        HideLoading(); alert(GetErrorMessage(error));
    });
}
function GetErrorMessage(error) {
    if (error.code == "auth/invalid-credential") {
        return "Usuário não encontrado"
    }
    return error.message
}
function Registrar() {
    window.location.href = "./pages/register.html"
}
function RecoverPassword() {
    ShowLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        HideLoading();
        alert('Email enviado com sucesso')
    }).catch(error => {
        HideLoading();
        alert(GetErrorMessage(error));
    });
}
function IsEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return ValidateEmail(email);
}
function ToggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = ValidateEmail(email) ? "none" : "block";
}
function TogglePasswordErrors() {
    const password = form.password().value;
    form.passwordReqiuiredError().style.display = password ? "none" : "block";
}
function ToggleButtonDisabled() {
    const emailValid = IsEmailValid();
    form.recoverPassword().disabled = !emailValid;
    const passwordValid = IsPassawordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}
function IsPassawordValid() {
    const password = form.password().value;
    if (!password) {
        return false;
    }
    return true;
}
const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById('password'),
    passwordReqiuiredError: () => document.getElementById("password-required-error"),
    recoverPassword: () => document.getElementById("recover-password-button")
}