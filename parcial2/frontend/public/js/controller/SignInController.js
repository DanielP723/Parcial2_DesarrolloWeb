var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class SignInController {
    constructor(view, model) {
        /*
        Crea una cuenta nueva y maneja las excepciones.
        Falta: Encriptar la contraseña y guardarla encriptada en la base de datos
                Generar un token para saber que se ha iniciado sesión
        */
        this.verifyAccount = (email, password) => __awaiter(this, void 0, void 0, function* () {
            if (email.length == 0 || password.length == 0) {
                return alert('Debes rellenar todos los campos');
            }
        });
        this.view = view;
        this.model = model;
        this.addMethodVerifyAccount();
    }
    addMethodVerifyAccount() {
        this.view.btnCreateAccount.addEventListener('click', () => this.verifyAccount(this.view.email.value, this.view.password.value));
    }
}
