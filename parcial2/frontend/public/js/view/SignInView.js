export class SignInView {
    constructor() {
        this.getElement = (selector) => document.getElementById(selector);
        this.email = this.getElement('correo');
        this.password = this.getElement('password');
        this.btnCreateAccount = this.getElement('btnAcceder');
    }
}
