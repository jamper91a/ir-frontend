import {Company} from '../../pojo/Company';

export class UpdateAdminRequest implements InventarioRealRequest {
    public user: {
        id: number,
        username: string,
        password: string,
        rpassword: string,
        name: string,
        active: boolean
    } = {
        id: 0,
        username: '',
        password: '',
        rpassword: '',
        name: '',
        active: true
    };
    public employee: {
        company: {
            name: string
        }
    } = {
        company: {
            name: ''
        }
    };


    constructor() {
    }

    putData(company: Company) {
        this.user.id = company.user.id;
        this.user.username = company.user.username;
        this.user.password = '';
        this.user.name = company.user.name;
        this.user.active = company.user.active;
        this.employee.company.name = company.name;
    }

    getBody() {
        if (!this.user.password) {
           delete this.user.password;
        }
        return {
            user: this.user,
            employee: this.employee

        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.user.username) {
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
        this.user.id = 0;
        this.user.username = '';
        this.user.password = '';
        this.user.name = '';
        this.employee.company.name = '';
    }


}
