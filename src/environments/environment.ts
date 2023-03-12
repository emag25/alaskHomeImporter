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
            urlInsertarProductos: "/api/Productos/Get",
            urlModificarProductos: "/api/Productos/Get",
            urlModificarEstadoProductos: "/api/Productos/Get",
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

        }

    }
}