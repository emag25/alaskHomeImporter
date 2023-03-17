export const environment = {
    urlBAse: "https://localhost:7014",

    pathUrl: {
        urlFavoritos:{
            urlGetFavoritos: "/api/Favoritos/Get",
            urlSetFavoritos: "/api/Favoritos/Get",
        },
        urlCategorias:{
            urlObtenerCategorias: "/api/Categorias/ObtenerCategorias",
            urlInsertarCategorias: "/api/Categorias/InsertarCategoria",
            urlModificarCategorias: "/api/Categorias/ModificarCategoria",
            urlModificarEstadoCategoria: "/api/Categorias/ModificarEstadoCategoria",
        },
        urlProductos:{
            urlObtenerProductos: "/api/Productos/ConsultarProductos",
            urlInsertarProductos: "/api/Productos/AgregarNuevoProducto",
            urlModificarProductos: "/api/Productos/ModificarDatos",
            urlModificarEstadoProductos: "/api/Productos/ModificarEstado",
        },
        urlProveedores: {
            SetProveedor: "",
            GetProveedores: "/api/Proveedores/Get",
            UpdateProveedor: "/api/Proveedores/Update",
            DeleteProveedor: "/api/Proveedores/Delete"

        },

        urlSolicitudes: {

            GetSolicitudes: "/api/Solicitudes/Get",
            SetSolicitud: "/api/Solicitudes/Set",
            UpdateSolicitud: "/api/Solicitudes/Update",
            DeleteSolicitud: "/api/Solicitudes/Delete"

        },

        urlProvincias: {

            GetProvincias: "/api/Provincias/Get"
        },
        urlUsuarios:{
            GetUsuarios: '/api/Usuarios/GetUsuarios/',//"/api/Usuarios/GetUsuarios?nombreprocedimiento=",//para pasar parámetro por ruta
            SetUsuarios: "/api/Usuarios/Set",
        },
        urlVentas: {
            GetVentas: '/api/Ventas/Get',
            GetCarritos: '/api/Carritos/Get'
        }

    }
}