export class SignUpModel{

    private URI = 'http://localhost:1802/api/';

    constructor(){

    }

    addUser = async (name: string, surname: string, email: string, password: string) => {
        let response = await fetch(`${this.URI}mysql/addUser`, {
            method: 'POST',
            body: JSON.stringify({ name: name, surname: surname, email: email, password: password }),
            headers: {
                "Content-type": "application/json"
            }
        });
        let res = await response.json();
        return res;
    }

    generateToken = async (email: string, password: string) => {
        let response = await fetch(`${this.URI}mysql/generateToken`, {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: {
                "Content-type": "application/json"
            }
        });
        let res = await response.json();
        return res;
    }
}