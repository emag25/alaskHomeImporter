export class SolicitudProveedor {
    constructor(
        public id: number,
        public ruc: string,
        public nombre: string,
        public email: string,
        public telefono: string,
        public provincia: string,
        public estado: string,
        public fechaEnvio: Date,
    ) { }

}