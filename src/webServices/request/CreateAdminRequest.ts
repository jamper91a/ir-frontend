export class CreateAdminRequest implements InventarioRealRequest {
    public user: {
        username: string,
        password: string,
        rpassword: string,
        name: string
    } = {
        username: '',
        password: '',
        rpassword: '',
        name: ''
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
        if (!this.user.username || !this.user.password || !this.user.name || !this.employee.company) {
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
        this.employee.company.name = '';
    }


}
