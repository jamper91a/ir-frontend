export class LoginRequest implements InventarioRealRequest {
    public username: string;
    public password: string;


    constructor() {
        this.username = '';
        this.password = '';
    }

    getBody() {
        return {
            username: this.username,
            password: this.password
        };
    }

    validate(): boolean {
        if (!this.username && !this.password) {
            throw Error ('fields_empty');
        }
        return true;
    }

    clean() {
        this.username = '';
        this.password = '';
    }



}
