export class CreateZoneRequest implements InventarioRealRequest {
    public name;
    constructor() {
    }

    getBody() {
        return {
            name: this.name
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
