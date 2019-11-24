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
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.code) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
    }



}
