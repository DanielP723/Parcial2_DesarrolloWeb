export class SignUpView{

    public name: any;
    public surname: any;
    public email: any;
    public password: any;
    public password2: any;
    public btnCreateAccount: any;

    constructor(){
        this.name = this.getElement('nombreRegistro');
        this.surname = this.getElement('apellidoRegistro');
        this.email = this.getElement('correoRegistro');
        this.password = this.getElement('passwordRegistro1');
        this.password2 = this.getElement('passwordRegistro2');
        this.btnCreateAccount = this.getElement('btnRegistrar');
    }

    public getElement = (selector: string): HTMLElement | null => document.getElementById(selector);
}