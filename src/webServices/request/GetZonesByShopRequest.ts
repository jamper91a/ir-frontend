export class GetZonesByShopRequest implements InventarioRealRequest {
    public id: string;


    constructor() {
        this.id = '';
    }

    getBody() {
        return {
            shop: this.id
        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.id) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
    }



}
