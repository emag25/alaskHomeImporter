USE [AlaskHomeImporter]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE SetProveedor
    @i_transaccion VARCHAR(50),
    @i_xml XML
AS
BEGIN
	BEGIN TRY

		----------------------------------------
		DECLARE @id INT, 
				@nombre VARCHAR(150), 
				@email VARCHAR(150), 
				@telefono VARCHAR(10), 
				@provincia VARCHAR(50), 
				@logo VARCHAR(50),
				@estado VARCHAR(10),
				@o_message VARCHAR(200)

		----------------------------------------
		SELECT
			@id = x.value('(Id)[1]', 'INT'),
			@nombre = x.value('(Nombre)[1]', 'VARCHAR(150)'),
			@email = x.value('(Email)[1]', 'VARCHAR(150)'),
			@telefono = x.value('(Telefono)[1]', 'VARCHAR(10)'),
			@provincia = (
						  SELECT p.value('(Id)[1]', 'INT')
						  FROM @i_xml.nodes('/Proveedor/Provincia') AS tt(p)
						 ),
			@logo = x.value('(Logo)[1]', 'VARCHAR(50)'),
			@estado = x.value('(Estado)[1]', 'VARCHAR(10)')
		FROM @i_xml.nodes('/Proveedor') AS t(x)

		----------------------------------------

		DECLARE @msgExiste VARCHAR(200)
		SET @msgExiste = [dbo].[Proveedores_verificarExistencia](@id, 0, @nombre, @email, @telefono)

		
		-- OPERACIONES SEGUN LA TRANSACCION
		
		
		----------------------------------------
		IF (@i_transaccion = 'actualizar_datos')
		BEGIN
			
			---------------------------------------------- Validar que existan los tags
			IF ( (LEN(@nombre)>0)	AND (LEN(@email)>0)		AND (LEN(@telefono)>0) AND 
				 (LEN(@logo)>0)		AND (@provincia > 0)	AND (@id > 0) )
			BEGIN
				
				---------------------------------------------- Validar que provedor NO EXISTA
				IF (@msgExiste = 'OK')
				BEGIN
					BEGIN TRANSACTION
						UPDATE Proveedores
						SET [nombre_proveedor] = @nombre,
							[email_proveedor] = @email,
							[telefono_proveedor] = @telefono,
							[provincia_proveedor] = @provincia,
							[logo_proveedor] = @logo
						WHERE [id_proveedor] = @id
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
			IF ( (@id > 0) AND ( (@estado = 'Activo') OR 
								 (@estado = 'Inactivo') ) )
			BEGIN
				BEGIN TRANSACTION
					UPDATE Proveedores
					SET [estado_proveedor] = @estado
					WHERE [id_proveedor] = @id
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