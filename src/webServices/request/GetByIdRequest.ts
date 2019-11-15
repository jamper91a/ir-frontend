export class GetByIdRequest implements InventarioRealRequest {
    public id: string;


    constructor() {
        this.id = '';
    }

    getBody() {
        return {
            id: this.id
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
