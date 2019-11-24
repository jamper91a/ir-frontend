export class CreateShopRequest implements InventarioRealRequest {
    public name;
    constructor() {
    }

    getBody() {
        return {
            name: this.name
        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.name) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
        this.name = '';
    }


}
