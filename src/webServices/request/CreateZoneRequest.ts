export class CreateZoneRequest implements InventarioRealRequest {
    public name: string;
    public shop: number;
    constructor() {
    }

    getBody() {
        return {
            name: this.name,
            shop: this.shop
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
