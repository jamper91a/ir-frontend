import {Product} from '../../pojo/Product';
import {Supplier} from '../../pojo/Supplier';

export class CreateProductRequest implements InventarioRealRequest {
    public product: Product = new Product();
    public photo: File = null;

    constructor() {
        this.product.supplier = new Supplier();
        this.clean();
    }

    getBody() {
        const formData: FormData = new FormData();
        formData.append('ean' , this.product.ean);
        formData.append('plu' , this.product.plu);
        formData.append('plu2' , this.product.plu2);
        formData.append('plu3' , this.product.plu3);
        formData.append('branch' , this.product.branch);
        formData.append('gender' , this.product.gender);
        formData.append('color' , this.product.color);
        formData.append('size' , this.product.size);
        formData.append('category' , this.product.category);
        formData.append('supplier' , this.product.supplier.id + '');
        formData.append('description' , this.product.description);
        formData.append('amount' , this.product.amount + '');
        formData.append('image' , this.product.imagen);
        formData.append('cost_price' , this.product.cost_price + '');
        formData.append('sell_price' , this.product.sell_price + '');
        if (this.photo) {
            formData.append('withPhoto', 'true');
            formData.append('photo', this.photo);
        } else {
            formData.append('withPhoto', 'false');
        }
        return formData;
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.product.ean && !this.product.plu && !this.product.plu2 && !this.product.plu3) {
            error.message = 'identifier_omitted';
            throw error;
        }
        if (!this.product.supplier.id) {
            error.message = 'supplier_required';
            throw error;
        }
        return true;
    }

    clean() {
        this.product.ean = '';
        this.product.plu = '';
        this.product.plu2 = '';
        this.product.plu3 = '';
        this.product.branch = '';
        this.product.gender = '';
        this.product.color = '';
        this.product.size = '';
        this.product.category = '';
        this.product.description = '';
        this.product.amount = 0;
        this.product.imagen = '';
        this.product.cost_price = 0;
        this.product.sell_price = 0;
    }


}
