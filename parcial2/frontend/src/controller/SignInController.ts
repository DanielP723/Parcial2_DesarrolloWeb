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
        let response = await this.model.signIn(email,password);
        if (response.error == true){
            if(response.message == 'e102' || response.message == 'e103'){
                return alert('Contraseña o correo inválido');
            }
            if(response.message == 'e101'){
                return alert('No se pudo verificar');
            }
        }else{
            alert('Inicio de sesión exitoso');
            localStorage.setItem('token', response.token);
            return window.open('../index.html', '_self');
        }
    }
}