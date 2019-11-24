import {Employee} from '../../pojo/Employee';

export class UpdateEmployeeRequest implements InventarioRealRequest {
    public user: {
        username: string,
        password: string,
        rpassword: string,
        name: string,
        group: number,
        active: boolean
    } = {
        username: '',
        password: '',
        rpassword: '',
        name: '',
        group: 0,
        active: false
    };
    public employee: {
        shop: number,
        company: number
    } = {
        shop: 0,
        company: 0
    };
    constructor() {
    }

    putData(employee: Employee) {
        this.user.username = employee.user.username;
        this.user.name = employee.user.name ;
        this.user.group = employee.user.group.id;
        this.user.active = employee.user.active;
        this.employee.shop = employee.shop.id;
        this.employee.company = employee.company.id;
    }

    getBody() {
        return {
            user: this.user,
            employee: this.employee

        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.user.username || !this.user.password || !this.user.name || !this.employee.shop) {
            error.message = 'fields_empty';
            throw error;
        }
        if (this.user.password !== this.user.rpassword) {
            error.message = 'password_do_not_match';
            throw error;
        }
        return true;
    }

    clean() {
        this.user.username = '';
        this.user.password = '';
        this.user.rpassword = '';
        this.user.name = '';
    }


}
