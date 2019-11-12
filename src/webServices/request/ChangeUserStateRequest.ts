export class LoginRequest implements InventarioRealRequest {
    public username: string;
    public active: boolean;


    constructor() {
        this.username = '';
        this.active = true;
    }

    getBody() {
        return {
            username: this.username,
            active: this.active ? 1 : 0
        };
    }

    validate(): boolean {
        if (!this.username) {
            throw Error ('fields_empty');
        }
        return true;
    }

    clean() {
    }



}
