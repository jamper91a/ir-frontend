/* tslint:disable */
import {InventarioRealPojo} from './InventarioRealPojo';
import {Group} from './Group';

export class User extends InventarioRealPojo {
    public name: string;
    public username: string;
    public password: string;
    public rpassword: string;
    public username_rfdi: string;
    public password_rfdi: string;
    public active: boolean;
    public group: Group;



}
