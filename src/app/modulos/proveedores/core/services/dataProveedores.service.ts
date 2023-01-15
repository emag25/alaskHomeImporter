import { Injectable } from '@angular/core';
import { Proveedor } from './../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class DataProveedoresService {

  private proveedores: Proveedor[] = [

    // TECHNOLOGY
    {
      id: 1222,
      ruc: '0001234567890',
      nombre: 'LG',
      email: 'anafernandez@lg.com',
      telefono: '0420012345',
      provincia: 'Pichincha',
      logo:'https://www.lg.com/lg5-common-gp/images/common/share/share-default.jpg'
    },     
    {
      id: 1112,
      ruc: '0009876543210',
      nombre: 'Samsung',
      email: 'josegomez@samsung.com',
      telefono: '0421012345',
      provincia: 'Guayas',
      logo: 'https://scontent.fgye1-2.fna.fbcdn.net/v/t39.30808-6/310270146_5889025804509552_2901638897210312390_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=MjkJqAycCW8AX-k6oBC&tn=V42L1Y05VWVL0mSM&_nc_ht=scontent.fgye1-2.fna&oh=00_AfAO7-Q_-l714D0YUQ1b8Lv_LnQtTGBQxIwLLaLF8ZjN4A&oe=63C939B4'
    },
    {
      id: 1122,
      ruc: '0012309876543',
      nombre: 'Epson',
      email: 'leticiamachado@epson.com',
      telefono: '0422123456',
      provincia: 'Los Rios',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT32foV5P6Zgr7PrZg0q116lVIf4zVmVRhYciaKnamN1s8I6ZXzCzvXX6ovJA2eE8gENhc&usqp=CAU'
    },


    // ELECTROHOGAR
    {
      id: 1113,
      ruc: '0019876543210',
      nombre: 'Master Frio',
      email: 'mariaperez@masterfrio.com',
      telefono: '0423234567',
      provincia: 'Guayas',
      logo: 'https://scontent.fgye1-1.fna.fbcdn.net/v/t39.30808-6/255449881_110250858138578_7628066226249627904_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6k8emj765sYAX8lP0pO&tn=V42L1Y05VWVL0mSM&_nc_ht=scontent.fgye1-1.fna&oh=00_AfCqYwoOHfy8tYOf2Z9S987VJN1scV6bh19q71kAb1VPfA&oe=63C98625'
    },
    {
      id: 1133,
      ruc: '0023456789012',
      nombre: 'Mabe',
      email: 'juangonzalez@mabe.com',
      telefono: '0424345678',
      provincia: 'Guayas',
      logo: 'https://pbs.twimg.com/profile_images/479375502109442048/RNrtsl4U_400x400.jpeg'
    },
    {
      id: 1333,
      ruc: '0032109876543',
      nombre: 'Electrolux',
      email: 'alexlopez@electrolux.com',
      telefono: '0425456789',
      provincia: 'Pichincha',
      logo: 'http://cdn.shopify.com/s/files/1/0287/0532/5134/collections/logo_electrolux_1200x1200.png?v=1611178360'
    },


    // HOGAR
    {
      id: 1444,
      ruc: '0043210987654',
      nombre: 'Pintex',
      email: 'lolalizarralde@pintex.com',
      telefono: '0426567890',
      provincia: 'El Oro',
      logo: 'https://pbs.twimg.com/profile_images/768477923649126401/tM52v3u0_400x400.jpg'
    },
    {
      id: 1144,
      ruc: '0054321098765',
      nombre: 'Umco',
      email: 'sarapolit@umco.com',
      telefono: '0427678901',
      provincia: 'Pichincha',
      logo: 'https://bizneshop.ec/wp-content/uploads/2020/06/umco-logo.png'
    },
    {
      id: 1114,
      ruc: '0054321098765',
      nombre: 'Cristar',
      email: 'paulaguillen@cristar.com',
      telefono: '0428789012',
      provincia: 'El Oro',
      logo: 'https://cristalerialamejor.com/web/wp-content/uploads/2017/08/cristar.png'
    },
    {
      id: 1414,
      ruc: '0076543210987',
      nombre: 'Toveco',
      email: 'hernanparraga@toveco.com',
      telefono: '0429801234',
      provincia: 'Pichincha',
      logo: 'https://scontent.fgye1-1.fna.fbcdn.net/v/t39.30808-6/302582059_437841981740955_8639030894551237443_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kjLXfuQtBi4AX8HzEtz&_nc_ht=scontent.fgye1-1.fna&oh=00_AfDnlEHslZ96w_vQfOjf-MlsPjWJBDO1SYOVAGCSIpVBkg&oe=63C88602'
    },


    // MUEBLES
    {
      id: 1555,
      ruc: '0087654321098',
      nombre: 'Megamobilier',
      email: 'alexandervilla@megamobilier.com',
      telefono: '0420901234',
      provincia: 'Guayas',
      logo: 'https://static.wixstatic.com/media/6f7f26_38f0bf05f74c40cabb5366aa7321046d~mv2.png'
    },    
    {
      id: 1155,
      ruc: '0098765432109',
      nombre: 'Chaide&Chaide',
      email: 'mishellsuarez@chaide.com',
      telefono: '0421000123',
      provincia: 'Pichincha',
      logo: 'https://elbosque.com.ec/chaide/wp-content/uploads/sites/34/2020/08/chaide.jpg'
    },
    {
      id: 1115,
      ruc: '0010987654321',
      nombre: 'Debsa',
      email: 'rogeliosolorzano@debsa.com',
      telefono: '0421001234',
      provincia: 'Los Rios',
      logo: 'https://scontent.fgye1-1.fna.fbcdn.net/v/t39.30808-6/291476896_707460250686882_5775602248946080590_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=MLzydM7hLAoAX__IEoO&_nc_oc=AQmKLX6qOycVGfkCsrz2r5O0GdZBe_vxc3OAAzENGsW83m5sQaqfqo5GKzm7hMJycfvW5v6hFCSsZqyR2XVKRidD&tn=V42L1Y05VWVL0mSM&_nc_ht=scontent.fgye1-1.fna&oh=00_AfAfRSTX06VDMI0_s-P7g2D_lHheYMGOwtD0pdiMpKzJ5g&oe=63C9E93D'
    },
    

    // FERRETERIA
    {
      id: 1116,
      ruc: '0021109876543',
      nombre: 'Bosch',
      email: 'bernardoala@bosch.com',
      telefono: '0421002345',
      provincia: 'Azuay',
      logo: 'https://ttwebpagechilebosch.azurewebsites.net/webServices/imagesIndustrial/carousel1.jpg'
    },
    {
      id: 1166,
      ruc: '0031234567890',
      nombre: 'Plastigama',
      email: 'samirkan@plastigama.com',
      telefono: '0421003450',
      provincia: 'Guayas',
      logo: 'https://mariorubio.com.ec/wp-content/uploads/2021/04/platigama.png'
    },
    {
      id: 1666,
      ruc: '0041321098765',
      nombre: 'PTK',
      email: 'clarachia@ptk.com',
      telefono: '0421004506',
      provincia: 'El Oro',
      logo: 'https://scontent.fgye1-2.fna.fbcdn.net/v/t1.6435-9/52657035_2309856629257054_8394332938002497536_n.png?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0FzrvnzLzyEAX84mJbs&_nc_ht=scontent.fgye1-2.fna&oh=00_AfDhuoe9zos5m8gA85RMrBzbXrAzPX0Z4k5n-HwiiT4m3Q&oe=63EBB731'
    },


    // MOVILIDAD    
    {
      id: 1777,
      ruc: '0051432109876',
      nombre: 'Segway',
      email: 'rociolitardo@segway.com',
      telefono: '0421005678',
      provincia: 'Los Rios',
      logo: 'https://b2b.segway.com/wp-content/uploads/2021/11/segway-logo-black.png'
    },
    {
      id: 1177,
      ruc: '0061543210987',
      nombre: 'Lamborghini',
      email: 'carlsmith@lamborghini.com',
      telefono: '0421006789',
      provincia: 'Azuay',
      logo: 'https://i.etsystatic.com/36048535/r/il/363e2b/3996337472/il_fullxfull.3996337472_qifn.jpg'
    }
  ];


  constructor() { }

  setProveedor(proveedor: Proveedor) {
    this.proveedores.push(proveedor);
  }

  editProveedor(proveedor: Proveedor) {
    let obj = this.proveedores.find(p => p.id === proveedor.id);

    if (obj !== undefined) {
      let index = this.proveedores.indexOf(obj);
      this.proveedores[index] = proveedor;
      return true;

    } else {
      return false;
    }
  }


  getProveedores(): Proveedor[] {
    return this.proveedores;
  }


  getProveedorbyRuc(ruc: string) {
    return this.proveedores.find(proveedor => proveedor.ruc === ruc);
  }

  
  getProveedorbyNombre(nombre: string) {
    return this.proveedores.find(proveedor => proveedor.nombre === nombre);
  }


  deleteProveedor(id: number) {

    let obj = this.proveedores.find(proveedor => proveedor.id === id);

    if (obj !== undefined) {
      let index = this.proveedores.indexOf(obj);
      this.proveedores.splice(index, 1);
      return true;

    } else {
      return false;
    }

  }

}
