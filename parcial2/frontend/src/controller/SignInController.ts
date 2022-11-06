import { SignInView } from "../view/SignInView.js";
import { SignInModel } from "../model/SignInModel.js";

export class SignInController {

    private view: SignInView;
    private model: SignInModel;

    constructor(view: SignInView, model: SignInModel) {
        this.view = view;
        this.model = model;
        this.addMethodVerifyAccount();
    }

    addMethodVerifyAccount() {
        this.view.btnCreateAccount.addEventListener('click', () =>
            this.verifyAccount(this.view.email.value, this.view.password.value))
    }

    verifyAccount = async (email: string, password: string) => {
        if (email.length == 0 || password.length == 0) {
            return alert('Debes rellenar todos los campos');
        }
        let response = await this.model.signIn(email,password)
        if (response.error == true){
            alert('Error al iniciar sesión');
        }else{
            alert('Inicio de sesión exitoso');
        }
    }
}