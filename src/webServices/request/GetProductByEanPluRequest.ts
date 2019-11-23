export class GetProductByEanPluRequest implements InventarioRealRequest {
    public code: string;


    constructor() {
        this.code = '';
    }

    getBody() {
        return {
            code: this.code
        };
    }

    validate(): boolean {
        if (!this.code) {
            throw Error ('fields_empty');
        }
        return true;
    }

    clean() {
    }



}
