export class SignInModel{

    private URI = 'http://localhost:1802/';

    constructor(){

    }

    addUser = async (name: string, surname: string, email: string, password: string) => {
        let response = await fetch(`${this.URI}api/signIn`, {
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