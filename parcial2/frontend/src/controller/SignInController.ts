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
        console.log(response);
        if (response.error == true){
            if(response.message == 'e102'){
                return alert('Contraseña inválida');
            }
            if(response.message == 'e103'){
                return alert('Usuario no registrado');
            }
            if(response.message == 'e101'){
                return alert('No se pudo verificar');
            }
        }else{
            alert('Inicio de sesión exitoso');
            return window.open('../index.html', '_self');
        }
    }
}