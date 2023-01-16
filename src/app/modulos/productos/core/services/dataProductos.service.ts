import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';


@Injectable({
  providedIn: 'root'
})
export class DataProductosService {

  private productos: Producto[] = [
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
      proveedorId: 0      
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
      proveedorId: 0
    },
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
      proveedorId: 1222
    },
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
      proveedorId: 0
    },
    {
      id: '6',
      nombre: 'Alicate',
      descripcion: 'Alicate doble servicio 7 pulgadas Jonnesway',
      imagen: '../assets/img/alicate.png',
      precio: 25.00,
      stock: 100,      
      categoriaId: 5,
      carrito: false,
      fav: false,
      proveedorId: 0
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
      proveedorId: 0
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
      proveedorId: 0
    },
    //TECHNOLOGIA
    {
      id: '9',
      nombre: 'Epson L3250',
      descripcion: 'Este modelo es compatible con la aplicación Epson Smart Panel, la cual le permite realizar operaciones de la impresora o del escáner fácilmente desde dispositivos iOS y Android.',
      imagen: 'https://mediaserver.goepson.com/ImConvServlet/imconv/19149835d19c96e7a8926f68cbf4822e506a73c2/515Wx515H?use=productpictures&hybrisId=B2C&assetDescr=L3250_SPT_C11CJ67301_384x286',
      precio: 450.00,
      stock: 100,      
      categoriaId: 1,
      carrito: false,
      fav: false,
      proveedorId: 1122
    },
    {
      id: '10',
      nombre: 'Samsung Galaxy S21',
      descripcion: 'El Samsung Galaxy S21 es una serie de teléfonos inteligentes con sistema operativo Android 12 diseñados, desarrollados, fabricados y comercializados por Samsung Electronics como parte de su serie Samsung Galaxy S.',
      imagen: 'https://m.media-amazon.com/images/I/41puyo+i8bL._SL500_.jpg',
      precio: 799.00,
      stock: 100,      
      categoriaId: 1,
      carrito: false,
      fav: false,
      proveedorId: 1112
    },
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
      proveedorId: 1112
    },
    {
      id: '12',
      nombre: 'Samsung Galaxy Watch smartwatch',
      descripcion: 'El Samsung Galaxy Watch es un reloj inteligente desarrollado por Samsung Electronics. Se anunció el 9 de agosto de 2018.',
      imagen: 'https://m.media-amazon.com/images/I/61mg2rs3BqL.jpg',
      precio: 340.00,
      stock: 100,      
      categoriaId: 1,
      carrito: false,
      fav: false,
      proveedorId: 1112
    },
    {
      id: '13',
      nombre: 'Samsung QLED TV',
      descripcion: 'Una pantalla de puntos cuánticos es un tipo experimental de tecnología en pantallas. Los puntos cuánticos (Quantum Dot , QD por sus siglas en inglés) o nanocristales semiconductores podrían proporcionar una alternativa para aplicaciones comerciales como las tecnologías en monitores. Esta tecnología sería similar a las pantallas OLED (diodo orgánico emisor de luz), en la que la luz sería suministrada bajo demanda, lo cual habilitaría dispositivos más eficientes.',
      imagen: 'https://shop.samsung.com/latin/pub/media/catalog/product/cache/a69170b4a4f0666a52473c2224ba9220/q/a/qa55q60bakxxd_011_front3_black_1.png',
      precio: 679.00,
      stock: 100,      
      categoriaId: 1,
      carrito: false,
      fav: false,
      proveedorId: 1112
    },
    {
      id: '14',
      nombre: 'Samsung Frame TV',
      descripcion: 'Disfruta de The Frame como un televisor innovador de tus obras de arte favoritas. Su diseño refinado lo convierte en una obra maestra visual con un diseño aún más elegante. Y mejora mucho más con opciones adicionales de estilos, colores, obras de arte y complementos para personalizar y realzar, por completo, tus espacios y experiencias diarias. Descubre cómo The Frame te ofrece más maneras para permitir que la experiencia con el televisor sea personal.',
      imagen: 'https://images.samsung.com/is/image/samsung/latin-the-frame-ls03t-qn65ls03tapxpa-frontblack-229130684?$650_519_PNG$',
      precio: 379.00,
      stock: 100,      
      categoriaId: 1,
      carrito: false,
      fav: false,
      proveedorId: 1112
    },
    {
      id: '15',
      nombre: 'Proyector Epson PowerLite',
      descripcion: 'Con una gran conectividad y una calidad de imagen sorprendente, el PowerLite X17 es la herramienta ideal para hacer presentaciones persuasivas. Todo a un precio asequible. Ofrece colores hasta 3x mas brillante que otros modelos de la competencia*. Con 2.700 lúmenes en color y 2.700 lúmenes de blanco, además de resolución XGA, el PowerLite X17 es capaz de seducir a su audiencia.',
      imagen: 'https://mediaserver.goepson.com/ImConvServlet/imconv/93ca5c94893d43c0e0512ff54ce6f5b624db3707/1200Wx1200H?use=banner&hybrisId=B2C&assetDescr=V11H569020_Proyectores_Epson%20PowerLite%20X17_ES',
      precio: 979.00,
      stock: 100,      
      categoriaId: 1,
      carrito: false,
      fav: false,
      proveedorId: 1122
    },
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
      proveedorId: 1122
    },
    {
      id: '18',
      nombre: 'Refrigerador',
      descripcion: 'Refrigerador grande con 4 pisos en la parte media y 2 pisos en la hielera',
      imagen: 'http://bellnovainser.ec/wp-content/uploads/2022/08/REFRIGERADORA-INDURAMA-309-LITROS10.91-PIES-CROMADA-RI-425-BellNovainser-Babahoyo.png',
      precio: 350.00,
      stock: 100,      
      categoriaId: 2,      
      carrito: false,
      fav: false,
      proveedorId: 1113     
    },
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
      proveedorId: 1113      
    },
    {
      id: '20',
      nombre: 'Lavavajillas',
      descripcion: 'Un lavavajillas, lavaplatos o lavatrastes es un aparato electromecánico para limpiar los restos de la comida de la vajilla, cubertería, cristalería y utensilios de cocina. Se encuentra en restaurantes y también en domicilios particulares.',
      imagen: 'https://www.pngall.com/wp-content/uploads/5/Dishwasher-PNG-Free-Image.png',
      precio: 100.00,
      stock: 100,      
      categoriaId: 2,      
      carrito: false,
      fav: false,
      proveedorId: 1133      
    },
    {
      id: '21',
      nombre: 'Microonda',
      descripcion: 'Las microondas son una forma de radiación electromagnética o de ondas de energía eléctrica y magnética que se mueven juntas en el espacio. La radiación electromagnética se genera durante la creación, la trasmisión y el uso de energía eléctrica y aparatos eléctricos. No se deben confundir las microondas con los rayos X.',
      imagen: 'https://w7.pngwing.com/pngs/255/596/png-transparent-microwave-oven-convection-microwave-home-appliance-barbecue-grill-microwave-electronics-kitchen-appliance-cooking.png',
      precio: 450.00,
      stock: 200,      
      categoriaId: 2,      
      carrito: false,
      fav: false,
      proveedorId: 1133     
    },
    {
      id: '22',
      nombre: 'Aspiradora',
      descripcion: 'Una aspiradora, se utiliza para aspirar el polvo y otras partículas pequeñas de suciedad, generalmente del suelo. Hoy en día es un equipo indispensable para el mantenimiento y limpieza tanto para el hogar, como para oficina y escuelas.',
      imagen: 'https://assets.stickpng.com/images/5c2f2944a97bc40295eb83d3.png',
      precio: 150.00,
      stock: 100,      
      categoriaId: 2,      
      carrito: false,
      fav: false,
      proveedorId: 1133   
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
      proveedorId: 1133    
    },
    {
      id: '24',
      nombre: 'Tostadora',
      descripcion: 'Una tostadora o tostador es un pequeño aparato, habitualmente un electrodoméstico, que sirve para tostar rebanadas de pan. A una rebanada de pan sometida a la acción de una tostadora se le llama una tostada.',
      imagen: 'https://www.pngmart.com/files/7/Toaster-PNG-Clipart.png',
      precio: 120.00,
      stock: 100,      
      categoriaId: 2,      
      carrito: false,
      fav: false,
      proveedorId: 1333      
    },
    {
      id: '25',
      nombre: 'Freidora de aire',
      descripcion: 'Una freidora de aire es un electrodoméstico que te permite cocer o freír los alimentos sin necesidad de sumergirlos en aceite, este proceso de cocción se consigue a través de un sistema de circulación de aire caliente que logra obtener ese resultado dorado y crujientes parecido al de las comidas cocidas en aceite.',
      imagen: 'https://www.kalley.com.co/medias/7705946460118-001-820Wx820H?context=bWFzdGVyfGltYWdlc3wxNzExNjF8aW1hZ2UvanBlZ3xpbWFnZXMvaDA0L2gzMy8xMDUyOTcxODMwNDc5OC5qcGd8NWE4YTlmMDYwMTI1ODcyZmJkNTY0N2U1OGE5ZTExNDIwMmQ0Zjg2YjU3YzQ1YWVjZTJmMjgwNzI4MTAwYTU5MA',
      precio: 75.00,
      stock: 100,      
      categoriaId: 2,      
      carrito: false,
      fav: false,
      proveedorId: 1333
    },
    {
      id: '26',
      nombre: 'Batidora',
      descripcion: 'Una batidora o batidora mezcladora, es un electrodoméstico que permite batir o mezclar alimentos blandos, esponjar y emulsionar mezclas y salsas, y montar claras de huevo a punto de nieve.',
      imagen: 'https://assets.stickpng.com/images/5b99603a196573108b203b35.png',
      precio: 30.00,
      stock: 100,      
      categoriaId: 2,      
      carrito: false,
      fav: false,
      proveedorId: 1333
    },
    //HOGAR//
    {
      id: '27',
      nombre: 'Cantina Gourmet Kitchen 3 Litros',
      descripcion: 'Vasija metálica de forma cilíndrica, provista de tapa y agarraderas, que se utiliza para guardar y transportar leche recién ordeñada.',
      imagen: 'https://pycca.vteximg.com.br/arquivos/ids/167402-600-600/Cantina-A92243-1.jpg?v=636679605065400000',
      precio: 10.00,
      stock: 100,      
      categoriaId: 3,
      carrito: false,
      fav: false,
      proveedorId: 1444
    },
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
      proveedorId: 1444
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
      proveedorId: 1444
    },
    {
      id: '30',
      nombre: 'Paila Bordeada Umco 20 cm',
      descripcion: 'Es utensilio grande, redondo y poco profunda. Este utensilio tiene diferente uso en los diferentes países, sirve para calentar, de sartén para freír, fuente plana para asar alimentos o servir en mesa.',
      imagen: 'https://pycca.vteximg.com.br/arquivos/ids/201426-600-600/A66159.png?v=637590301277700000',
      precio: 4.50,
      stock: 100,      
      categoriaId: 3,
      carrito: false,
      fav: false,
      proveedorId: 1144
    },
    {
      id: '31',
      nombre: 'Perol Octagonal 16 cm',
      descripcion: 'Vasija de barro o metal, de forma hemisférica, usada para cocer, guisar y hervir alimentos. Sinónimos: hidria, marmita, metreta, pota, pote, puchero, terraza, zaque.',
      imagen: 'https://pycca.vteximg.com.br/arquivos/ids/220510-600-600/A03897.png?v=637926353959170000',
      precio: 25.50,
      stock: 100,      
      categoriaId: 3,
      carrito: false,
      fav: false,
      proveedorId: 1144
    },
    {
      id: '32',
      nombre: 'Refractaria Rectangular Grande  3.5 Litros',
      descripcion: 'Una freidora es un pequeño electrodoméstico, perfecto para freír patatas, croquetas o cualquier otro alimento de forma segura, rápida y fácil. Por eso se ha convertido en un gran aliado en la cocina de muchos hogares.',
      imagen: 'https://pycca.vteximg.com.br/arquivos/ids/167370-600-600/Refractarea-l81231.jpg?v=636675362586800000',
      precio: 30.00,
      stock: 100,      
      categoriaId: 3,
      carrito: false,
      fav: false,
      proveedorId: 1144
    },
    {
      id: '33',
      nombre: 'Lámpara de Mesa Champagne',
      descripcion: 'Las lámparas de sobremesa son, como su nombre indica, aquellas luminarias que se sitúan encima de cualquier tipo de superficie considerada como una mesa, mueble o mobiliario. Estos receptores eléctricos y luminosos son ideales tanto para alumbrar como para ser el objeto de decoración perfecto.',
      imagen: 'https://pycca.vteximg.com.br/arquivos/ids/164451-600-600/Lampara-E13024.jpg?v=636583593608200000"',
      precio: 15.00,
      stock: 100,      
      categoriaId: 3,
      carrito: false,
      fav: false,
      proveedorId: 1144
    },
    {
      id: '34',
      nombre: 'Platera Plastica Gris',
      descripcion: 'Platera para mueble de cocina fabricada en acero inoxidable cromo brillo compuesta por un escurreplatos y una vasera. Disponible en varios anchos.',
      imagen: 'https://pycca.vteximg.com.br/arquivos/ids/228150-600-600/N00662.png?v=638043868615500000',
      precio: 9.99,
      stock: 100,      
      categoriaId: 3,
      carrito: false,
      fav: false,
      proveedorId: 1144
    },
    {
      id: '35',
      nombre: 'Espejo Decorativo Cobre',
      descripcion: ' más que un Objeto Decorativo, un Accesorio de uso Cotidiano. En los tiempos en los que vivimos el Espejo se ha convertido en un Accesorio de uso Cotidiano, sin embargo hace apenas un par de Siglos, se le consideraba una pieza rara y por ende, un objeto de alto valor.',
      imagen: 'https://pycca.vteximg.com.br/arquivos/ids/167912-600-600/Espejo-O01329.jpg?v=636710598265670000',
      precio: 29.50,
      stock: 100,      
      categoriaId: 3,
      carrito: false,
      fav: false,
      proveedorId: 1114
    },
    {
      id: '36',
      nombre: 'Adorno Caballo de Ajedrez Plata 16.6 cm',
      descripcion: 'Aromatizante Glade Paraíso Azul automático',
      imagen: 'https://pycca.vteximg.com.br/arquivos/ids/223056-600-600/G02802.png?v=637968906108900000',
      precio: 14.99,
      stock: 100,      
      categoriaId: 3,
      carrito: false,
      fav: false,
      proveedorId: 1114
    }
  ];  
  
  constructor() { }

  getProductos(): Producto[] {
    return this.productos;
  }

  findProductosbyCategoria(categoria: number): Producto[] {
    if (categoria == 0) {
      return this.productos;
    } else {
      return this.productos.filter(producto => producto.categoriaId == categoria);
    }
  }

  findProductobyID(id: string) {
    return this.productos.find(producto => producto.id == id);
  }
  deleteProducto(id: string) {
    
    let obj = this.productos.find(producto => producto.id === id);

    if (obj !== undefined) {
      let index = this.productos.indexOf(obj);
      this.productos.splice(index, 1);
      return true;
      
    } else {
      return false;
    }
      
  }


}