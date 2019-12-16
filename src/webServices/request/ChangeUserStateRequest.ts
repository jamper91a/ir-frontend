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
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.username) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
    }



}
