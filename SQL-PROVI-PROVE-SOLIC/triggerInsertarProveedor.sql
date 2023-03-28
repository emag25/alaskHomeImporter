USE [AlaskHomeImporter]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
------------------------------------------------------------------------------------------------------------------
CREATE TRIGGER insertar_proveedor 
ON Solicitudes 
AFTER UPDATE
AS
BEGIN
  IF UPDATE(estado_solicitud) 
  BEGIN
    DECLARE @id_solicitud int;
    SELECT @id_solicitud = id_solicitud FROM inserted WHERE estado_solicitud = 'Aprobada';

    IF @id_solicitud IS NOT NULL
    BEGIN
      INSERT INTO Proveedores (ruc_proveedor, nombre_proveedor, email_proveedor, telefono_proveedor, provincia_proveedor)
      SELECT ruc_solicitud, nombre_solicitud, email_solicitud, telefono_solicitud, provincia_solicitud
      FROM Solicitudes
      WHERE id_solicitud = @id_solicitud;
    END
  END
END