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
        if (!this.user.username) {
            throw Error ('fields_empty');
        }
        if (this.user.password !== this.user.rpassword) {
            throw Error ('password_do_not_match');
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
