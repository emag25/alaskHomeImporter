USE [AlaskHomeImporter]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE GetProvincias
	@i_transaccion VARCHAR(50),
    @i_xml XML
AS
BEGIN
	BEGIN TRY

		----------------------------------------
		DECLARE @id     AS INT, 
				@nombre AS VARCHAR(50),
				@o_message VARCHAR(25)

		----------------------------------------
		SELECT
			@id		=	x.value('(Id)[1]', 'INT'),
			@nombre =	x.value('(Nombre)[1]', 'VARCHAR(50)')
		FROM @i_xml.nodes('/Provincia') AS t(x)

		
		
		----------------------------------------
		IF (@i_transaccion = 'consultar_todo')
		BEGIN	
			SELECT [id_provincia], [nombre_provincia]
			FROM [Provincias];
			SET @o_message = 'EXITO'
		END

		
		
		----------------------------------------
		ELSE IF (@i_transaccion = 'consultar_porID')
		BEGIN
			----------------------------------------
			IF ( @id > 0 )
			BEGIN
				SELECT [id_provincia], [nombre_provincia]
				FROM [Provincias]
				WHERE [id_provincia] = @id;
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
				SELECT [id_provincia], [nombre_provincia]
				FROM [Provincias]
				WHERE [nombre_provincia] = @nombre;
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