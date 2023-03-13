export const environment = {
    
    urlBAse: "https://localhost:7014",
    
    pathUrl: {

        urlGetCategorias: "/api/Categorias/Get",
        urlSetCategorias: "/api/Categorias/Get",
        urlGetProductos: "/api/Proveedores/Get",
        urlSetProductos: "/api/Productos/Get",
        urlGetFavoritos: "/api/Favoritos/Get",
        urlSetFavoritos: "/api/Favoritos/Get",

        urlProveedores: {

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
        }

    }
}