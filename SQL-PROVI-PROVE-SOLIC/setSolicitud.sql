USE [AlaskHomeImporter]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE SetSolicitud
    @i_transaccion VARCHAR(50),
    @i_xml XML
AS
BEGIN
	BEGIN TRY

		----------------------------------------
		DECLARE @id INT, 
				@ruc VARCHAR(13), 
				@nombre VARCHAR(150), 
				@email VARCHAR(150), 
				@telefono VARCHAR(10), 
				@provincia VARCHAR(50), 
				@logo VARCHAR(50),
				@estado VARCHAR(15),
				@msgExiste VARCHAR(200),
				@o_message VARCHAR(200)

		----------------------------------------
		SELECT
			@id = x.value('(Id)[1]', 'INT'),
			@ruc = x.value('(Ruc)[1]', 'VARCHAR(13)'),
			@nombre = x.value('(Nombre)[1]', 'VARCHAR(150)'),
			@email = x.value('(Email)[1]', 'VARCHAR(150)'),
			@telefono = x.value('(Telefono)[1]', 'VARCHAR(10)'),
			@provincia = (
						  SELECT p.value('(Id)[1]', 'INT')
						  FROM @i_xml.nodes('/Solicitud/Provincia') AS tt(p)
						 ),
			@estado = x.value('(Estado)[1]', 'VARCHAR(15)')
		FROM @i_xml.nodes('/Solicitud') AS t(x)
		----------------------------------------	
		
		SET @msgExiste = [dbo].[Solicitudes_verificarExistencia](@id, @ruc, @nombre, @email, @telefono)

		
		-- OPERACIONES SEGUN LA TRANSACCION
		
		----------------------------------------
		IF (@i_transaccion = 'insertar')
		BEGIN	
			
			---------------------------------------------- Validar que existan los tags
			IF ( (LEN(@nombre)>0)	AND (LEN(@email)>0)		AND (LEN(@telefono)>0) AND 
				 (LEN(@ruc)>0)		AND (@provincia > 0))
			BEGIN
				
				SET @msgExiste = [dbo].[Solicitudes_verificarExistencia](0, @ruc, @nombre, @email, @telefono)
				---------------------------------------------- Validar que solicitud/provedor NO EXISTA
				IF (@msgExiste = 'OK')
				BEGIN
					BEGIN TRANSACTION
						INSERT INTO Solicitudes ([ruc_solicitud], [nombre_solicitud], 
												 [email_solicitud], [telefono_solicitud], 
												 [provincia_solicitud]) 
						VALUES ( @ruc, @nombre, 
								 @email, @telefono, 
								 @provincia)
					COMMIT TRANSACTION
					SET @o_message = 'EXITO'
				END
				----------------------------------------------
				ELSE
				BEGIN
					SET @o_message = @msgExiste
				END
				----------------------------------------------
			END			

			----------------------------------------
			ELSE
			BEGIN
				SET @o_message = 'ERROR'
			END
			----------------------------------------
			
		END


		----------------------------------------
		ELSE IF (@i_transaccion = 'actualizar_datos')
		BEGIN
			
			---------------------------------------------- Validar que existan los tags
			IF ( (LEN(@nombre)>0)	AND (LEN(@email)>0)		AND (LEN(@telefono)>0) AND 
				 (LEN(@ruc)>0)		AND (@provincia > 0)	AND (@id > 0) AND 
				 ( (@estado = 'En proceso') OR (@estado = 'Aprobada')  OR (@estado = 'Por revisar') ) )
			BEGIN
				
				---------------------------------------------- Validar que solicitud/provedor NO EXISTA
				IF (@msgExiste = 'OK')
				BEGIN
					BEGIN TRANSACTION
						UPDATE Solicitudes
						SET [ruc_solicitud] = @ruc,
							[nombre_solicitud] = @nombre,
							[email_solicitud] = @email,
							[telefono_solicitud] = @telefono,
							[provincia_solicitud] = @provincia,
							[estado_solicitud] = @estado
						WHERE [id_solicitud] = @id
					COMMIT TRANSACTION
					SET @o_message = 'EXITO'
				END
				----------------------------------------------
				ELSE
				BEGIN
					SET @o_message = @msgExiste
				END
				----------------------------------------------
								
			END
			----------------------------------------
			ELSE
			BEGIN
				SET @o_message = 'ERROR'
			END
			----------------------------------------

		END

		
		----------------------------------------
		ELSE IF (@i_transaccion = 'actualizar_estado')
		BEGIN

			---------------------------------------------- Validar que existan los tags
			IF ( (@id > 0) AND ( @estado = 'Rechazada') )
			BEGIN
				BEGIN TRANSACTION
					UPDATE Solicitudes
					SET [estado_solicitud] = @estado
					WHERE [id_solicitud] = @id
				COMMIT TRANSACTION
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
		IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION
		SELECT @o_message AS [MENSAJE]

	END CATCH
END