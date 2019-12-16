export class CreateErpReportRequest implements InventarioRealRequest {
    public products: ProductErp[] = [];

    constructor() {
        this.clean();
    }

    getBody() {
        return {
            products: this.products
        };
    }

    validate(): boolean {
        if (!this.products) {
            throw Error ('fields_empty');
        }
        return true;
    }

    clean() {
        this.products = [];
    }


}

class ProductErp {
    public total: number;
    public ean: string;


    constructor() {
    }
}
