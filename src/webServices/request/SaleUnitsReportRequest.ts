export class SaleUnitsReportRequest implements InventarioRealRequest {
    public firstDate: string;
    public secondDate: string;


    constructor() {
    }

    getBody() {
        return {
            firstDate: this.firstDate,
            secondDate: this.secondDate,
        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.firstDate || !this.secondDate) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
    }


}
