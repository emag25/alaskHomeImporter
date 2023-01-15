export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    telefono: string;
    direccion: string;
    rol: string;

    constructor(id: number, nombre: string, apellido: string, email: string, password: string, telefono: string, direccion: string, rol: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.direccion = direccion;
        this.rol = rol;
    }

}

