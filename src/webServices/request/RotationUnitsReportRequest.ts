import {Employee} from '../../pojo/Employee';

export class RotationUnitsReportRequest implements InventarioRealRequest {
    public firstDate: string;
    public secondDate: string;
    public employee: Employee;


    constructor() {
    }

    getBody() {
        return {
            firstDate: this.firstDate,
            secondDate: this.secondDate,
            employee: this.employee,
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
