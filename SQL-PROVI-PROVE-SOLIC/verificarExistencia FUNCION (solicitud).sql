USE [AlaskHomeImporter]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
	
CREATE OR ALTER FUNCTION [dbo].[Solicitudes_verificarExistencia] (
	@i_id INT, 
	@i_ruc VARCHAR(13), 
	@i_nombre VARCHAR(150), 
	@i_email VARCHAR(150), 
	@i_telefono VARCHAR(10)
)
RETURNS VARCHAR(200)
AS
BEGIN

	---------------------------------------------------
    DECLARE @o_message VARCHAR(200) = '',
			@rowsRuc INT,
			@rowsNombre INT,
			@rowsEmail INT,
			@rowsTelefono INT,
			@msgProveedor VARCHAR(200)
    
	---------------------------------------------------
    SELECT @rowsRuc =  COUNT(*)
	FROM [Solicitudes]
	WHERE ( ([ruc_solicitud] = @i_ruc) AND 
			(id_solicitud <> @i_id) AND 
			( ([estado_solicitud] = 'En proceso') OR 
			  ([estado_solicitud] = 'Por revisar') 
			)
		  )

	SELECT @rowsNombre = COUNT(*)
	FROM [Solicitudes]
	WHERE ( ([nombre_solicitud] = @i_nombre) AND 
			(id_solicitud <> @i_id) AND 
			( ([estado_solicitud] = 'En proceso') OR 
			  ([estado_solicitud] = 'Por revisar') 
			)
		  )

	SELECT @rowsEmail = COUNT(*)
	FROM [Solicitudes]
	WHERE ( ([email_solicitud] = @i_email) AND
			(id_solicitud <> @i_id) AND 
			( ([estado_solicitud] = 'En proceso') OR 
			  ([estado_solicitud] = 'Por revisar') 
			)
		  )

	SELECT @rowsTelefono = COUNT(*)
	FROM [Solicitudes]
	WHERE ( ([telefono_solicitud] = @i_telefono) AND
			(id_solicitud <> @i_id) AND 
			( ([estado_solicitud] = 'En proceso') OR 
			  ([estado_solicitud] = 'Por revisar') 
			)
		  )

	---------------------------------------------------
	IF (@rowsRuc > 0)
	BEGIN
		SET @o_message = 'Existe una solicitud registrada con ese RUC. '
	END
	
	---------------------------------------------------
	IF (@rowsNombre > 0) 
	BEGIN
		SET @o_message = @o_message + 'Existe una solicitud registrada con ese nombre. '
	END
	
	---------------------------------------------------
	IF (@rowsEmail > 0) 
	BEGIN
		SET @o_message = @o_message + 'Existe una solicitud registrada con ese email. '
	END
	
	---------------------------------------------------
	IF (@rowsTelefono > 0) 
	BEGIN
		SET @o_message = @o_message + 'Existe una solicitud registrada con ese teléfono. '
	END

	---------------------------------------------------
	SET @msgProveedor = [dbo].[Proveedores_verificarExistencia](0, @i_ruc, @i_nombre, @i_email, @i_telefono)

	IF (@msgProveedor = 'OK') 
	BEGIN
		SET @o_message = @o_message
	END
	ELSE
	BEGIN
		SET @o_message = @o_message + @msgProveedor
	END

	
	---------------------------------------------------
	IF (@o_message = '') 
	BEGIN
		SET @o_message = 'OK'
	END
		
	---------------------------------------------------
    RETURN @o_message
END