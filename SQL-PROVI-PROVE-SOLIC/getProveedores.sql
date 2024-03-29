USE [AlaskHomeImporter]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE GetProveedores    
	@i_transaccion VARCHAR(50),
    @i_xml XML
AS
BEGIN
	BEGIN TRY

		----------------------------------------
		DECLARE @id INT, 
				@nombre VARCHAR(150),
				@o_message VARCHAR(25)

		----------------------------------------
		SELECT
			@id = x.value('(Id)[1]', 'INT'),
			@nombre = x.value('(Nombre)[1]', 'VARCHAR(150)')
		FROM @i_xml.nodes('/Proveedor') AS t(x)

		
		
		----------------------------------------
		IF (@i_transaccion = 'consultar_todo')
		BEGIN	
			SELECT [id_proveedor],
				   [ruc_proveedor],
				   [nombre_proveedor],
				   [email_proveedor],
				   [telefono_proveedor],
				   [id_provincia],
				   [nombre_provincia],
				   [logo_proveedor],
				   [fechaAprobacion_proveedor],
				   [estado_proveedor]
			FROM [Proveedores], [Provincias]
			WHERE ([estado_proveedor] = 'Activo') 
				  AND ([provincia_proveedor] = [id_provincia])
			SET @o_message = 'EXITO'
		END


		
		---------------------------------------- 
		ELSE IF (@i_transaccion = 'consultar_porID')
		BEGIN
			----------------------------------------
			IF ( @id > 0 )
			BEGIN
				SELECT [id_proveedor],
					   [ruc_proveedor],
					   [nombre_proveedor],
					   [email_proveedor],
					   [telefono_proveedor],
					   [id_provincia],
					   [nombre_provincia],
					   [logo_proveedor],
					   [fechaAprobacion_proveedor],
					   [estado_proveedor]
				FROM [Proveedores], [Provincias]
				WHERE ([estado_proveedor] = 'Activo') 
					  AND ([id_proveedor] = @id) 
					  AND ([provincia_proveedor] = [id_provincia])
				SET @o_message = 'EXITO'
			END
			----------------------------------------
			ELSE
			BEGIN
				SET @o_message = 'ERROR'
			END
			----------------------------------------
		END

		

		---------------------------------------- 
		ELSE IF (@i_transaccion = 'consultar_porNombre')
		BEGIN
			----------------------------------------
			IF ( LEN(@nombre)>0 )
			BEGIN
				SELECT [id_proveedor],
					   [ruc_proveedor],
					   [nombre_proveedor],
					   [email_proveedor],
					   [telefono_proveedor],
					   [id_provincia],
					   [nombre_provincia],
					   [logo_proveedor],
					   [fechaAprobacion_proveedor],
					   [estado_proveedor]
				FROM [Proveedores], [Provincias]
				WHERE ([estado_proveedor] = 'Activo') 
					  AND ([nombre_proveedor] = @nombre) 
					  AND ([provincia_proveedor] = [id_provincia])
				SET @o_message = 'EXITO'
			END
			----------------------------------------
			ELSE
			BEGIN
				SET @o_message = 'ERROR'
			END
			----------------------------------------
		END

		----------------------------------------
		ELSE
		BEGIN
			SET @o_message = 'ERROR'
		END


		SELECT @o_message AS [MENSAJE]
	
	END TRY

	----------------------------------------
	BEGIN CATCH
		SET @o_message = 'ERROR'
		SELECT @o_message AS [MENSAJE]
	END CATCH
END