export class SignInModel{

    private URI = 'http://localhost:1802/api/';

    constructor(){

    }

    signIn = async (email: string, password: string) => {
        let response = await fetch(`${this.URI}mysql/signIn`, {
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