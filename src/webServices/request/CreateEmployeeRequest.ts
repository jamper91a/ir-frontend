export class CreateEmployeeRequest implements InventarioRealRequest {
    public user: {
        username: string,
        password: string,
        rpassword: string,
        name: string,
        group: number
    } = {
        username: '',
        password: '',
        rpassword: '',
        name: '',
        group: 0
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

    getBody() {
        return {
            user: this.user,
            employee: this.employee

        };
    }

    validate(): boolean {
        if (!this.user.username || !this.user.password || !this.user.name || !this.employee.shop) {
            throw Error ('fields_empty');
        }
        if (this.user.password !== this.user.rpassword) {
            throw Error ('password_do_not_match');
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
