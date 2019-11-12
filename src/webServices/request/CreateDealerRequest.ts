export class CreateDealerRequest implements InventarioRealRequest {
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
    public dealer: {
        name: string
    } = {
        name: ''
    };
    constructor() {
    }

    getBody() {
        return {
            user: this.user,
            dealer: this.dealer

        };
    }

    validate(): boolean {
        if (!this.user.username || !this.user.password || !this.user.name || !this.dealer.name) {
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
        this.dealer.name = '';
    }


}
