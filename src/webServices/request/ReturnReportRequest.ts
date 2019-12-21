import {Employee} from '../../pojo/Employee';

export class ReturnReportRequest implements InventarioRealRequest {
    public firstDate: string;
    public secondDate: string;
    public employee: Employee;
    public type: string;


    constructor() {
    }

    getBody() {
        return {
            firstDate: this.firstDate,
            secondDate: this.secondDate,
            employee: this.employee,
            type: this.type,
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
        if (!this.type) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
    }


}
