import { Expose, Transform } from 'class-transformer';
import { IsDefined} from 'class-validator';
export class Product {
    @Expose({ name: 'id' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `La id es obligatoria`}}})
    id: number;

    @Expose({ name: 'nombre' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El nombre es obligatoria`}}})
    nombre: string;

    @Expose({ name: 'descripcion' })
    @Transform(({ value }) => { if(value) return value ; else "faker"})
    descripcion: string;

    @Expose({ name: 'estado' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `La estado es obligatoria`}}})
    estado: number;

    @Expose({ name: 'created_by' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `La created_by es obligatoria`}}})
    created_by: number;

    @Expose({ name: 'update_by' })
    @Transform(({ value }) => { if(value) return value ; else 0})
    update_by: number;

    @Expose({ name: 'created_at' })
    @Transform(({ value }) => { if(value) return value ; else "faker"})
    created_at: string;

    @Expose({ name: 'updated_at' })
    @Transform(({ value }) => { if(value) return value ; else "faker"})
    updated_at: string;

    @Expose({ name: 'deleted_at' })
    @Transform(({ value }) => { if(value) return value ; else "faker"})
    deleted_at: string;

    constructor(data:Partial<Product>) {
        Object.assign(this, data);
        this.id = 0;
        this.nombre = "Faker";
        this.estado = 0;
        this.created_by = 0;
    }
}