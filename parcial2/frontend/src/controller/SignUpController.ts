import { SignUpView } from "../view/SignUpView.js";
import { SignUpModel } from "../model/SignUpModel.js";

export class SignUpController {

    private view: SignUpView;
    private model: SignUpModel;

    constructor(view: SignUpView, model: SignUpModel) {
        this.view = view;
        this.model = model;
        this.addMethodCreateAccount();
    }

    addMethodCreateAccount() {
        this.view.btnCreateAccount.addEventListener('click', () =>
            this.createAccount(this.view.name.value, this.view.surname.value, this.view.email.value, this.view.password.value, this.view.password2.value))
    }

    /*
    Crea una cuenta nueva y maneja las excepciones. 
    Falta: Encriptar la contraseña y guardarla encriptada en la base de datos
            Generar un token para saber que se ha iniciado sesión
    */
    createAccount = async (name: string, surname: string, email: string, password: string, password2: string) => {
        if (name.length == 0 || surname.length == 0 || email.length == 0 || password.length == 0 || password2.length == 0) {
            return alert('Debes rellenar todos los campos');
        }
        let emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let alfabeto = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z", "w", " "
        ];
        let numeros = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
        ];
        let entrar = false;
        let warnings = "";
        for (let i = 0; i < name.length; i++) {
            if(alfabeto.includes(name[i].toLowerCase()) == false) {
                warnings +=
                    "Nombre no válido. Solo se permiten caracteres alfabéticos\n";
                entrar = true;
                break;
            }
        }
        for (let i = 0; i < surname.length; i++) {
            if(alfabeto.includes(surname[i].toLowerCase()) == false) {
                warnings +=
                    "Apellido no válido. Solo se permiten caracteres alfabéticos\n";
                entrar = true;
                break;
            }
        }
        if (!emailValidator.test(email)) {
            warnings += "Email no válido\n";
            entrar = true;
        }
        if (password != password2) {
            warnings += "Las contraseñas no coinciden\n";
            entrar = true;
        }
        if (password.length < 8) {
            warnings += "Contraseña debe tener mínimo 8 caracteres\n";
            entrar = true;
        }
        let contNumber = 0;
        let contEspeciales = 0;
        let contMayus = 0;
        let contMinus = 0;
        for (let i = 0; i < password.length; i++) {
            if (numeros.includes(password[i])) {
                contNumber += 1
            } else if (!alfabeto.includes(password[i].toLowerCase())) {
                contEspeciales += 1
            } else if (!alfabeto.includes(password[i])) {
                contMayus += 1;
            } else {
                contMinus += 1;
            }
        }
        if (contNumber == 0) {
            warnings += "La cotraseña debe tener mínimo un número\n";
            entrar = true;
        }
        if (contEspeciales == 0) {
            warnings += "La cotraseña debe tener mínimo un caracter especial\n";
            entrar = true;
        }
        if (contMayus == 0) {
            warnings += "La cotraseña debe tener mínimo una mayúscula\n";
            entrar = true;
        }
        if (contMinus == 0) {
            warnings += "La cotraseña debe tener mínimo una minúscula\n";
            entrar = true;
        }
        if (entrar) {
            alert(warnings);
        } else {
            let response = await this.model.addUser(name, surname, email, password);
            if(response.error == true){
                if(response.message == 'e103'){
                    alert('Email ya registrado');
                    return;
                }else{
                    alert('No se pudo registrar el usuario');
                    return window.location.reload();
                }
            }
            if(response.insertId != 0){
                alert('Usuario exitosamente registrado');
                return window.open('../index.html', '_self');
            }
            alert('No se pudo registrar el usuario');
            return window.location.reload();
        }

    }
}