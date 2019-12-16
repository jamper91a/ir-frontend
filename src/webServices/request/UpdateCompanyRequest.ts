import {Company} from '../../pojo/Company';

export class UpdateCompanyRequest implements InventarioRealRequest {
    public photo: File = null;
    public name = '';

    constructor() {
    }


    getBody(): FormData {
        const formData: FormData = new FormData();
        formData.append('name', this.name);
        if (this.photo) {
            formData.append('withPhoto', 'true');
            formData.append('photo', this.photo);
        } else {
            formData.append('withPhoto', 'false');
        }
        return formData;
    }

    validate(): boolean {
        return true;
    }

    putData(company: Company) {
        this.name = company.name;
    }

    clean() {
        this.name = '';
        this.photo = null;
    }


}
