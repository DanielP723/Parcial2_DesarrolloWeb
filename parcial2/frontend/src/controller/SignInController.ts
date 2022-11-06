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

    /*
    Crea una cuenta nueva y maneja las excepciones. 
    Falta: Encriptar la contraseña y guardarla encriptada en la base de datos
            Generar un token para saber que se ha iniciado sesión
    */
    verifyAccount = async (email: string, password: string) => {
        if (email.length == 0 || password.length == 0) {
            return alert('Debes rellenar todos los campos');
        }
    }
}