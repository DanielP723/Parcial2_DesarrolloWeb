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
        this.verifyAccount = (email, password) => __awaiter(this, void 0, void 0, function* () {
            if (email.length == 0 || password.length == 0) {
                return alert('Debes rellenar todos los campos');
            }
            let response = yield this.model.signIn(email, password);
            if (response.error == true) {
                if (response.message == 'e102' || response.message == 'e103') {
                    return alert('Contraseña o correo inválido');
                }
                if (response.message == 'e101') {
                    return alert('No se pudo verificar');
                }
            }
            else {
                alert('Inicio de sesión exitoso');
                localStorage.setItem('token', response.token);
                return window.open('../index.html', '_self');
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
