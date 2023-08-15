import { Expose, Transform } from 'class-transformer';
import { IsDefined} from 'class-validator';
export class Store {

    @Expose({ name: '_id' })
    @Transform(({ value }) => { if(value) return value ; else 0})
    _id: number;

    @Expose({ name: 'nombre' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El nombre es obligatoria`}}})
    nombre: string;

    @Expose({ name: 'id_responsable' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El id_responsable es obligatoria`}}})
    id_responsable: number;

    @Expose({ name: 'estado' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `La estado es obligatoria`}}})
    estado: number;

    @Expose({ name: 'created_by' })
    @Transform(({ value }) => { if(value) return value ; else 0})
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

    constructor(data:Partial<Store>) {
        Object.assign(this, data);
        this.nombre = "Faker";
        this.id_responsable = 0;
        this.estado = 0;
    }
}