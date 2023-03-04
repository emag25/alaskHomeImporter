import { Provincia } from "./provincia.model.ts";

export interface Proveedor {

    id?: number,
    ruc?: string,
    nombre: string,
    email: string,
    telefono: string,
    provincia: Provincia,
    logo?: string,
    fechaAprobacion?: Date
}
