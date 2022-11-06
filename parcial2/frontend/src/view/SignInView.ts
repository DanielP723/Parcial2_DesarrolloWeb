export class SignInView{

    public email: any;
    public password: any;
    public btnCreateAccount: any;

    constructor(){
        this.email = this.getElement('correo');
        this.password = this.getElement('password');
        this.btnCreateAccount = this.getElement('btnAcceder');
    }

    public getElement = (selector: string): HTMLElement | null => document.getElementById(selector);
}