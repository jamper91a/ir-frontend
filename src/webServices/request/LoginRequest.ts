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
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.username && !this.password) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
        this.username = '';
        this.password = '';
    }



}
