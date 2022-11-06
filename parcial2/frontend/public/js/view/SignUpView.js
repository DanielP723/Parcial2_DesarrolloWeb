export class SignUpView {
    constructor() {
        this.getElement = (selector) => document.getElementById(selector);
        this.name = this.getElement('nombreRegistro');
        this.surname = this.getElement('apellidoRegistro');
        this.email = this.getElement('correoRegistro');
        this.password = this.getElement('passwordRegistro1');
        this.password2 = this.getElement('passwordRegistro2');
        this.btnCreateAccount = this.getElement('btnRegistrar');
    }
}
