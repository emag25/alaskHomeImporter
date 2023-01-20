import { Injectable } from '@angular/core';
import { Venta } from '../models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class DataVentasService {

  private ventas: Venta[] = [
    {
      id: 1,
      cliente: 'Arturo Villavicencio',
      email: 'arturovillavicencio@gmail.com',
      telefono: '0979685446',
      provincia: 'Guayas',
      direccion: 'Caraguay',
      productos: [
        {
          id: '1',
          nombre: 'Lavadora',
          descripcion: 'Cosas que poca gente sabe es que tiene un tambor central grande con orificios, dentro de otro tambor cerrado, mientras entra agua, haciendo que se mezcle el (detergente) con la ropa sucia. ​ El tambor se mueve con un motor eléctrico.',
          imagen: '../assets/img/lavadora.png',
          precio: 450.00,
          stock: 100,
          categoriaId: 2,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1113
        },
        {
          id: '2',
          nombre: 'Mesa Extra Grande',
          descripcion: 'Una mesa es un mueble compuesto por un mínimo de una tabla lisa que es sostenida por una o más patas (también llamadas pies).',
          imagen: '../assets/img/mesagrande.png',
          precio: 300.00,
          stock: 100,
          categoriaId: 4,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1555
        }
      ],
      total: 750.00
    },
    {
      id: 2,
      cliente: 'Emely Apraez',
      email: 'emelyapraez@gmail.com',
      telefono: '0912345678',
      provincia: 'Guayas',
      direccion: 'Calle 123',
      productos: [
        {
          id: '4',
          nombre: 'Olla Freidora Umco Cuadrada',
          descripcion: 'Una freidora es un pequeño electrodoméstico, perfecto para freír patatas, croquetas o cualquier otro alimento de forma segura, rápida y fácil. Por eso se ha convertido en un gran aliado en la cocina de muchos hogares.',
          imagen: 'https://pycca.vteximg.com.br/arquivos/ids/223006-600-600/A03892-1.png?v=637968850039570000',
          precio: 40.00,
          stock: 100,
          categoriaId: 3,
          carrito: false,
          fav: false,
          cantidad: 10,
          proveedorId: 1444
        }
      ],
      total: 400.00
    },
    {
      id: 3,
      cliente: 'Paula Yanez',
      email: 'paulayanez@gmail.com',
      telefono: '0934345678',
      provincia: 'Guayas',
      direccion: 'Guasmo',
      productos: [
        {
          id: '2',
          nombre: 'Mesa Extra Grande',
          descripcion: 'Una mesa es un mueble compuesto por un mínimo de una tabla lisa que es sostenida por una o más patas (también llamadas pies).',
          imagen: '../assets/img/mesagrande.png',
          precio: 300.00,
          stock: 100,
          categoriaId: 4,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1555
        },
        {
          id: '5',
          nombre: 'Sofá Grande',
          descripcion: 'Sillón familiar para 9 personas color gris, incluye 2 cogines',
          imagen: '../assets/img/sofa.png',
          precio: 1200.00,
          stock: 100,
          categoriaId: 4,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1555
        },
        {
          id: '7',
          nombre: 'Bicicleta montañera',
          descripcion: 'Bicicleta montañera 29 GER STAGE 7.2',
          imagen: '../assets/img/bicicleta.png',
          precio: 900.00,
          stock: 100,
          categoriaId: 6,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1555
        },
        {
          id: '8',
          nombre: 'Mesa Rústica',
          descripcion: 'Mesa para 8 personas colo café oscuro, no incluye sillas',
          imagen: '../assets/img/mesa.png',
          precio: 900.00,
          stock: 100,
          categoriaId: 4,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1777
        },
      ],
      total: 3300.00
    },
    {
      id: 4,
      cliente: 'Maria Gomez',
      email: 'mariagomez@gmail.com',
      telefono: '0978906554',
      provincia: 'Guayas',
      direccion: 'Argentina y la 11',
      productos: [
        {
          id: '11',
          nombre: 'Samsung Galaxy Tab S7 tablet',
          descripcion: 'Samsung Galaxy Tab S7 , Galaxy Tab S7+ ( Galaxy Tab S7 Plus ) y Galaxy Tab S7 FE (también conocido como Galaxy Tab S7 Lite , Galaxy Tab S7 Fan Edition ) son tabletas basadas en Android diseñadas, desarrolladas y comercializadas por Samsung Electronics . ',
          imagen: 'https://images.samsung.com/common/galaxy-note20/feature/galaxy-tab-s7/images/galaxy-tab-s7-s7plus-keyboard-spen-mystic-bronze-mo.jpg',
          precio: 60.00,
          stock: 100,
          categoriaId: 1,
          carrito: false,
          fav: false,
          cantidad: 4,
          proveedorId: 1112
        }
      ],
      total: 240.00
    },
    {
      id: 5,
      cliente: 'Martha Lopez',
      email: 'marthalopez@gmail.com',
      telefono: '0911249050',
      provincia: 'Carchi',
      direccion: 'Portete y la 6ta',
      productos: [
        {
          id: '16',
          nombre: 'Logitech G Pro Wireless',
          descripcion: 'Logitech G colaboró ​​con más de 50 jugadores profesionales para encontrar la forma, el peso y la sensación perfectos combinados con la tecnología inalámbrica LIGHTSPEED y el sensor HERO 25K. El resultado: es uno de los ratones más populares en los deportes electrónicos.',
          imagen: 'https://resource.logitech.com/content/dam/gaming/en/products/pro-wireless-gaming-mouse/pro-wireless-carbon-gallery-1.png',
          precio: 99.00,
          stock: 100,
          categoriaId: 1,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1222
        },
        {
          id: '17',
          nombre: 'Galaxy A51',
          descripcion: 'La pantalla Infinity-O Display del Samsung Galaxy A51 optimiza la simetría visual. Ahora puedes jugar, mirar, navegar y realizar múltiples tareas sin interrupciones con una pantalla FHD+ de 6,5”, todo con tecnología Super AMOLED. Disfruta una experiencia de teléfono inteligente que minimiza el bisel y maximiza cada pulgada en la pantalla.',
          imagen: 'https://images.samsung.com/is/image/samsung/ph-galaxy-a51-a515-sm-a515fzbhxtc-front-thumb-204731256',
          precio: 250.00,
          stock: 100,
          categoriaId: 1,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1122
        }
      ],
      total: 349.00
    },
    {
      id: 5,
      cliente: 'John Nieve',
      email: 'johnnieve@gmail.com',
      telefono: '0966227788',
      provincia: 'Guayas',
      direccion: 'Noguchi 1234',
      productos: [
        {
          id: '19',
          nombre: 'Aire acondicionado',
          descripcion: 'Equipo ideal para recamaras, estancias, recepciones y oficinas. Diseñado para áreas que requieren confort en modo Frio/Calor',
          imagen: 'https://static.wixstatic.com/media/f8a5da_83f70ea1959b4c00b3587d9db2ad43cb~mv2.png/v1/fill/w_560,h_560,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/aire-acondicionado.png',
          precio: 500.00,
          stock: 100,
          categoriaId: 2,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1113
        },
        {
          id: '1',
          nombre: 'Lavadora',
          descripcion: 'Cosas que poca gente sabe es que tiene un tambor central grande con orificios, dentro de otro tambor cerrado, mientras entra agua, haciendo que se mezcle el (detergente) con la ropa sucia. ​ El tambor se mueve con un motor eléctrico.',
          imagen: '../assets/img/lavadora.png',
          precio: 450.00,
          stock: 100,
          categoriaId: 2,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1113
        }
      ],
      total: 950.00
    },
    {
      id: 6,
      cliente: 'Pedro Gonzalez',
      email: 'pedrogonzalez@gmail.com',
      telefono: '0912340998',
      provincia: 'Manabí',
      direccion: 'Calle Paraguay',
      productos: [
        {
          id: '3',
          nombre: 'Televisor LG',
          descripcion: 'Televisor LG de 86 pulgadas, 4K Full HD',
          imagen: '../assets/img/televisor.png',
          precio: 750.00,
          stock: 100,
          categoriaId: 1,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1222
        },
        {
          id: '29',
          nombre: 'Juego de Ollas Tramontina París Granito 9 Piezas',
          descripcion: 'Este juego de ollas y sartén está elaborado en aluminio, un metal muy ligero, que retiene y conduce el calor y es resistente a la oxidación. Además, son totalmente libres de PFOA, por lo que protegen la salud de toda la familia, y al tener una estructura de aluminio disipan mejor el calor.',
          imagen: 'https://pycca.vteximg.com.br/arquivos/ids/174880-600-600/Juego-Ollas-A00151.png?v=636991604269930000',
          precio: 134.00,
          stock: 100,
          categoriaId: 3,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1444
        }
      ],
      total: 884.00
    },
    {
      id: 7,
      cliente: 'Kate Sharma',
      email: 'katesharma@gmail.com',
      telefono: '0933459874',
      provincia: 'Chimborazo',
      direccion: 'Eloy Alfaro',
      productos: [
        {
          id: '28',
          nombre: 'Sartén de Inducción Gourmet Kitchen 26 Cm.',
          descripcion: 'Recipiente de cocina , generalmente de metal , de forma circular , poco hondo y con mango largo , que sirve sobre todo para freír .',
          imagen: 'https://pycca.vteximg.com.br/arquivos/ids/158508-600-600/sarten-A28905.jpg?v=636300424844600000',
          precio: 20.00,
          stock: 100,
          categoriaId: 3,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1444
        }
      ],
      total: 20.00
    },
    {
      id: 8,
      cliente: 'Mario Quijije',
      email: 'marioquijije@gmail.com',
      telefono: '0955124569',
      provincia: 'Morona Santiago',
      direccion: 'Argentina y la c',
      productos: [
        {
          id: '3',
          nombre: 'Televisor LG',
          descripcion: 'Televisor LG de 86 pulgadas, 4K Full HD',
          imagen: '../assets/img/televisor.png',
          precio: 750.00,
          stock: 100,
          categoriaId: 1,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1222
        },
        {
          id: '8',
          nombre: 'Mesa Rústica',
          descripcion: 'Mesa para 8 personas colo café oscuro, no incluye sillas',
          imagen: '../assets/img/mesa.png',
          precio: 900.00,
          stock: 100,
          categoriaId: 4,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1777
        },
        {
          id: '7',
          nombre: 'Bicicleta montañera',
          descripcion: 'Bicicleta montañera 29 GER STAGE 7.2',
          imagen: '../assets/img/bicicleta.png',
          precio: 900.00,
          stock: 100,
          categoriaId: 6,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1555
        }
      ],
      total: 2550.00
    },
    {
      id: 9,
      cliente: 'Beatriz Pinzon',
      email: 'betty@gmail.com',
      telefono: '0955123506',
      provincia: 'El Oro',
      direccion: 'Venezuela y av.Quito',
      productos: [
        {
          id: '2',
          nombre: 'Mesa Extra Grande',
          descripcion: 'Una mesa es un mueble compuesto por un mínimo de una tabla lisa que es sostenida por una o más patas (también llamadas pies).',
          imagen: '../assets/img/mesagrande.png',
          precio: 300.00,
          stock: 100,
          categoriaId: 4,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1555
        }
      ],
      total: 300.00
    },
    {
      id: 10,
      cliente: 'Emely Apraez',
      email: 'emelyapraez@gmail.com',
      telefono: '0912345678',
      provincia: 'Guayas',
      direccion: 'Calle 123',
      productos: [
        {
          id: '4',
          nombre: 'Olla Freidora Umco Cuadrada',
          descripcion: 'Una freidora es un pequeño electrodoméstico, perfecto para freír patatas, croquetas o cualquier otro alimento de forma segura, rápida y fácil. Por eso se ha convertido en un gran aliado en la cocina de muchos hogares.',
          imagen: 'https://pycca.vteximg.com.br/arquivos/ids/223006-600-600/A03892-1.png?v=637968850039570000',
          precio: 40.00,
          stock: 100,
          categoriaId: 3,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1444
        },
        {
          id: '5',
          nombre: 'Sofá Grande',
          descripcion: 'Sillón familiar para 9 personas color gris, incluye 2 cogines',
          imagen: '../assets/img/sofa.png',
          precio: 1200.00,
          stock: 100,
          categoriaId: 4,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1555
        },
        {
          id: '23',
          nombre: 'Procesador de alimentos',
          descripcion: 'Un procesador de alimentos es un pequeño electrodoméstico que sirve para transformar los alimentos. ¡Nuestro ayudante en la cocina! Un procesador no cocina pero tritura, bate, amasa, ralla, lamina o rebana.',
          imagen: 'https://whirlpool-cdn.thron.com/delivery/public/thumbnail/whirlpool/pi-d3ec2da6-c375-4a3d-8ea6-a22cdf451d94/jsind9/std/1000x1000/859720301230.jpg?fill=zoom&fillcolor=rgba:255,255,255&scalemode=product',
          precio: 190.00,
          stock: 100,
          categoriaId: 2,
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 1133
        }
      ],
      total: 1430.00
    }
  ];

  constructor() { }

  setVentas(venta: Venta) {
    this.ventas.push(venta);
  }

  editVenta(venta: Venta) {
    let obj = this.ventas.find(p => p.id === venta.id);

    if (obj !== undefined) {
      let index = this.ventas.indexOf(obj);
      this.ventas[index] = venta;
      return true;

    } else {
      return false;
    }
  }

  getVentas(): Venta[] {
    return this.ventas;
  }

  getVentabyID(id: number) {
    return this.ventas.find(venta => venta.id === id);
  }

  getVentabyCliente(nombre: string, apellido: string) {
    return this.ventas.find(venta => venta.cliente === nombre || venta.cliente === apellido);
  }

  deleteVenta(id: number) {

    let obj = this.ventas.find(venta => venta.id === id);

    if (obj !== undefined) {
      let index = this.ventas.indexOf(obj);
      this.ventas.splice(index, 1);
      return true;

    } else {
      return false;
    }

  }
}
