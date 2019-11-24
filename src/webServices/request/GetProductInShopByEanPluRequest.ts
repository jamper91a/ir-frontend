export class GetProductInShopByEanPluRequest implements InventarioRealRequest {
    public product: string;


    constructor() {
        this.product = '';
    }

    getBody() {
        return {
            product: this.product
        };
    }

    validate(): boolean {
        if (!this.product) {
            throw Error ('fields_empty');
        }
        return true;
    }

    clean() {
    }



}
