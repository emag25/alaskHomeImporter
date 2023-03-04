import { Provincia } from "./provincia.model.ts";

export interface SolicitudProveedor {
   
    id?: number,
    ruc: string,
    nombre: string,
    email: string,
    telefono: string,
    provincia: Provincia,
    estado?: string,
    fechaEnvio?: Date

}