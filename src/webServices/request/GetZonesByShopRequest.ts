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
        if (!this.id) {
            throw Error ('fields_empty');
        }
        return true;
    }

    clean() {
    }



}
