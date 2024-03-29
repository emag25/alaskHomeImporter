USE [AlaskHomeImporter]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE GetSolicitudes
	@i_transaccion VARCHAR(50),
    @i_xml XML
AS
BEGIN
	BEGIN TRY

		----------------------------------------
		DECLARE @id INT, 
				@nombre VARCHAR(150),
				@estado VARCHAR(15),
				@o_message VARCHAR(25)

		----------------------------------------
		SELECT
			@id = x.value('(Id)[1]', 'INT'),
			@nombre = x.value('(Nombre)[1]', 'VARCHAR(150)'),
			@estado = x.value('(Estado)[1]', 'VARCHAR(15)')
		FROM @i_xml.nodes('/Solicitud') AS t(x)

		
		----------------------------------------
		IF (@i_transaccion = 'consultar_todo')
		BEGIN	
			SELECT [id_solicitud],
				   [ruc_solicitud],
				   [nombre_solicitud],
				   [email_solicitud],
				   [telefono_solicitud],
				   [id_provincia],
				   [nombre_provincia],
				   [fechaEnvio_solicitud],
				   [estado_solicitud]
			FROM [Solicitudes], [Provincias]
			WHERE (([estado_solicitud] = 'Por revisar') OR ([estado_solicitud] = 'En proceso'))
				  AND ([provincia_solicitud] = [id_provincia])
			SET @o_message = 'EXITO'
		END



		---------------------------------------- 
		ELSE IF (@i_transaccion = 'consultar_porID')
		BEGIN
			----------------------------------------
			IF ( @id > 0 )
			BEGIN
				SELECT [id_solicitud],
					   [ruc_solicitud],
					   [nombre_solicitud],
					   [email_solicitud],
					   [telefono_solicitud],
					   [id_provincia],
					   [nombre_provincia],
					   [fechaEnvio_solicitud],
					   [estado_solicitud]
				FROM [Solicitudes], [Provincias]
				WHERE (([estado_solicitud] = 'Por revisar') OR ([estado_solicitud] = 'En proceso'))
					  AND ([id_solicitud] = @id) 
					  AND ([provincia_solicitud] = [id_provincia])
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
				SELECT [id_solicitud],
					   [ruc_solicitud],
					   [nombre_solicitud],
					   [email_solicitud],
					   [telefono_solicitud],
					   [id_provincia],
					   [nombre_provincia],
					   [fechaEnvio_solicitud],
					   [estado_solicitud]
				FROM [Solicitudes], [Provincias]
				WHERE (([estado_solicitud] = 'Por revisar') OR ([estado_solicitud] = 'En proceso'))
					  AND ([nombre_solicitud] = @nombre) 
					  AND ([provincia_solicitud] = [id_provincia])
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
		ELSE IF (@i_transaccion = 'consultar_porEstado')
		BEGIN
			----------------------------------------
			IF ( LEN(@estado)>0 )
			BEGIN
				SELECT [id_solicitud],
					   [ruc_solicitud],
					   [nombre_solicitud],
					   [email_solicitud],
					   [telefono_solicitud],
					   [id_provincia],
					   [nombre_provincia],
					   [fechaEnvio_solicitud],
					   [estado_solicitud]
				FROM [Solicitudes], [Provincias]
				WHERE (([estado_solicitud] = @estado)
					  AND ([provincia_solicitud] = [id_provincia]))
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