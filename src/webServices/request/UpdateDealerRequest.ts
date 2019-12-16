import {Dealer} from '../../pojo/Dealer';

export class UpdateDealerRequest implements InventarioRealRequest {
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
    public dealer: {
        name: string
    } = {
        name: ''
    };


    constructor() {
    }

    putData(dealer: Dealer) {
        this.user.id = dealer.user.id;
        this.user.username = dealer.user.username;
        this.user.password = '';
        this.user.name = dealer.user.name;
        this.user.active = dealer.user.active;
        this.dealer.name = dealer.name;
    }

    getBody() {
        if (!this.user.password) {
           delete this.user.password;
        }
        return {
            user: this.user,
            dealer: this.dealer

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
        this.user.username = '';
        this.user.password = '';
        this.user.rpassword = '';
        this.user.name = '';
        this.dealer.name = '';
    }


}
