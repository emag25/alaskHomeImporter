USE [AlaskHomeImporter]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
	
CREATE OR ALTER FUNCTION Proveedores_verificarExistencia (
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
			@rowsTelefono INT
    
	---------------------------------------------------
    SELECT @rowsRuc =  COUNT(*)
	FROM [Proveedores]
	WHERE ( ([ruc_proveedor] = @i_ruc) AND 
			(id_proveedor <> @i_id) AND 
			([estado_proveedor] = 'Activo') )

	SELECT @rowsNombre = COUNT(*)
	FROM [Proveedores]
	WHERE ( ([nombre_proveedor] = @i_nombre) AND 
			(id_proveedor <> @i_id) AND 
			([estado_proveedor] = 'Activo') )

	SELECT @rowsEmail = COUNT(*)
	FROM [Proveedores]
	WHERE ( ([email_proveedor] = @i_email) AND
			(id_proveedor <> @i_id) AND 
			([estado_proveedor] = 'Activo') )

	SELECT @rowsTelefono = COUNT(*)
	FROM [Proveedores]
	WHERE ( ([telefono_proveedor] = @i_telefono) AND
			(id_proveedor <> @i_id) AND 
			([estado_proveedor] = 'Activo') )

	---------------------------------------------------
	IF (@rowsRuc > 0)
	BEGIN
		SET @o_message = 'Existe un proveedor registrado con ese RUC. '
	END
	
	---------------------------------------------------
	IF (@rowsNombre > 0) 
	BEGIN
		SET @o_message = @o_message + 'Existe un proveedor registrado con ese nombre. '
	END
	
	---------------------------------------------------
	IF (@rowsEmail > 0) 
	BEGIN
		SET @o_message = @o_message + 'Existe un proveedor registrado con ese email. '
	END
	
	---------------------------------------------------
	IF (@rowsTelefono > 0) 
	BEGIN
		SET @o_message = @o_message + 'Existe un proveedor registrado con ese teléfono. '
	END

	---------------------------------------------------
	IF (@o_message = '') 
	BEGIN
		SET @o_message = 'OK'
	END
		
	---------------------------------------------------
    RETURN @o_message
END