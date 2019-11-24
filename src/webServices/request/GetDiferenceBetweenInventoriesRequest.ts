export class GetDiferenceBetweenInventoriesRequest implements InventarioRealRequest {
    public firstInventory: number;
    public secondInventory: number;


    constructor() {
    }

    getBody() {
        return {
            firstInventory: this.firstInventory,
            secondInventory: this.secondInventory,
        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.firstInventory || !this.secondInventory) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
    }


}
