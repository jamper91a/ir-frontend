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
        if (!this.name) {
            throw Error ('fields_empty');
        }
        return true;
    }

    clean() {
        this.name = '';
    }


}
