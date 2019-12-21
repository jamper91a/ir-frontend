import {Employee} from '../../pojo/Employee';

export class GetByEmployeeRequest implements InventarioRealRequest {
    public employee: Employee;


    constructor() {
        this.employee = null;
    }

    getBody() {
        return {
            employee: this.employee
        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.employee) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
    }


}
