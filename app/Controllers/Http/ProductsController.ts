import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import ProductValidator from 'App/Validators/ProductValidator';
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class ProductsController {
    public async find({ request, params }: HttpContextContract) {
        //Buscar el elemento dado una condición 
        if (params.id) {
            let theProduct: Product = await Product.findOrFail(params.id)
            await theProduct.load("batch")
            await theProduct.load("client")
            await theProduct.load("productCategory")
            return theProduct;
        } else {
            const data = request.all()
            console.log(data);
            
            if("batch_id" in data){
                return await Product.query().where("batch_id", request.input("batch_id"))
            }
            else if("client_id" in data){
                return await Product.query().where("client_id", request.input("client_id"))
            }
            else if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Product.query().paginate(page, perPage)
            } else {
                return await Product.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(ProductValidator);
        const body = request.body();
        const theProduct: Product = await Product.create(body);
        await theProduct.load("batch")
        await theProduct.load("client")
        await theProduct.load("productCategory")
        return theProduct;
    }

    public async createForBatch({ params, request, response }: HttpContextContract) {
        const batch_id = parseInt(params.batch_id, 10)
        
        // Preparar los datos de validación
        const body = request.body()
        const productData = {
            ...body,
            batch_id: batch_id
        }
              // Llamar a la función de validación
        await this.validateProductData(request, productData);
       
        
        const theProduct: Product = await Product.create(productData)
        await theProduct.load("batch")
        await theProduct.load("client")
        await theProduct.load("productCategory")
        return response.status(201).json(theProduct)
    }

    public async createForClient({ params, request, response }: HttpContextContract) {
        const client_id = parseInt(params.client_id, 10)
        
        // Preparar los datos de validación
        const body = request.body()
        const productData = {
            ...body,
            client_id: client_id
        }

        console.log(productData);
        
              // Llamar a la función de validación
        await this.validateProductData(request, productData);
       
        
        const theProduct: Product = await Product.create(productData)
        await theProduct.load("batch")
        await theProduct.load("client")
        await theProduct.load("productCategory")
        return response.status(201).json(theProduct)
    }
    
    public async update({ params, request }: HttpContextContract) {
        const theProduct: Product = await Product.findOrFail(params.id);
        const body = request.body();
        theProduct.name = body.name;
        theProduct.description = body.description;
        theProduct.expiration_date = body.expiration_date;
        theProduct.client_id = body.client_id;
        theProduct.batch_id = body.batch_id;
        await theProduct.load("batch")
        await theProduct.load("client")
        await theProduct.load("productCategory")
        return await theProduct.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProduct: Product = await Product.findOrFail(params.id);
        await theProduct.delete();
        return response.status(200).json({
            message: "Producto eliminado correctamente"
        }
        );
    }

    private async validateProductData(request: HttpContextContract['request'], data: any) {
        const validationSchema = schema.create({
            name: schema.string({}, [
                rules.required(),
                rules.alphaNum({ allow: ['space', 'underscore', 'dash'] }),
            ]),
            description: schema.string({}, [
                rules.required(),
                rules.alphaNum({ allow: ['space', 'underscore', 'dash'] }),
            ]),
            expiration_date: schema.date({ format: 'yyyy-MM-dd' }, [
                rules.required(),
                rules.after('today'),
            ]),
            client_id: schema.number([
                rules.required(),
                rules.exists({ table: 'clients', column: 'id' }),
            ]),
            batch_id: schema.number([
                rules.required(),
                rules.exists({ table: 'batches', column: 'id' }),
            ]),
        });

        // Usamos request.validate para validar los datos
        return await request.validate({
            schema: validationSchema,
            data,
        });
    }
}
