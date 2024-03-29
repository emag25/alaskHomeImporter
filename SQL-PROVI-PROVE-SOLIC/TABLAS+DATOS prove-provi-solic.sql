--CREATE DATABASE AlaskHomeImporter
USE AlaskHomeImporter
GO

DROP TABLE IF EXISTS Proveedores;
DROP TABLE IF EXISTS Solicitudes;
DROP TABLE IF EXISTS Provincias;


CREATE TABLE Provincias
(
    id_provincia int IDENTITY(1,1) PRIMARY KEY,
    nombre_provincia varchar(50) NOT NULL UNIQUE
);

INSERT INTO Provincias (nombre_provincia) VALUES 
    ('Esmeraldas'),
    ('Carchi'),
    ('Imbabura'),
    ('Sucumbios'),
    ('Azuay'),
    ('Bolívar'),
    ('Canar'),
    ('Chimborazo'),
    ('Cotopaxi'),
    ('El Oro'),
    ('Galápagos'),
    ('Guayas'),
    ('Loja'),
    ('Los Ríos'),
    ('Manabí'),
    ('Morona Santiago'),
    ('Napo'),
    ('Orellana'),
    ('Pastaza'),
    ('Pichincha'),
    ('Santa Elena'),
    ('Santo Domingo de los Tsáchilas'),
    ('Tungurahua'),
    ('Zamora Chinchipe');


------------------------------------------------------------------------------------------------------------------

CREATE TABLE Proveedores (
    id_proveedor INT IDENTITY(1,1) PRIMARY KEY, 
    ruc_proveedor VARCHAR(13) NOT NULL, 
    nombre_proveedor VARCHAR(150) NOT NULL, 
    email_proveedor VARCHAR(150) NOT NULL, 
    telefono_proveedor VARCHAR(10) NOT NULL,
    provincia_proveedor int FOREIGN KEY REFERENCES Provincias(id_provincia) NOT NULL,
    logo_proveedor VARCHAR(50) NOT NULL DEFAULT 'https://bit.ly/3WsWcY9',
    fechaAprobacion_proveedor DATE NOT NULL DEFAULT getDate(),
    estado_proveedor VARCHAR(10) NOT NULL DEFAULT 'Activo' CHECK (estado_proveedor IN('Activo', 'Inactivo'))
);

INSERT INTO Proveedores(ruc_proveedor, nombre_proveedor, email_proveedor, telefono_proveedor, provincia_proveedor, 
						logo_proveedor, fechaAprobacion_proveedor) VALUES 
('0001234567890', 'LG', 'anafernandez@lg.com', '0420012345', 20, 'https://bit.ly/3J0Kp0u', '2021-09-01'),
('0009876543210', 'Samsung', 'josegomez@samsung.com', '0421012345', 12, 'https://bit.ly/3GKlhbq', '2021-09-01'),
('0012309876543', 'Epson', 'leticiamachado@epson.com', '0422123456', 14, 'https://bit.ly/3ktkwvW', '2021-09-01'),
('0019876543210', 'Master Frio', 'mariaperez@masterfrio.com', '0423234567', 12, 'https://bit.ly/3kn3zTL', '2021-09-01'),
('0023456789012', 'Mabe', 'juangonzalez@mabe.com', '0424345678', 12, 'https://bit.ly/3ZKP78l', '2021-09-01'),
('0032109876543', 'Electrolux', 'alexlopez@electrolux.com', '0425456789', 20, 'http://bit.ly/3QQdIV8', '2021-09-01'),
('0043210987654', 'Pintex', 'lolalizarralde@pintex.com', '0426567890', 10, 'https://bit.ly/3GQKzos', '2021-09-01'),
('0054321098765', 'Umco', 'sarapolit@umco.com', '0427678901', 20, 'https://bit.ly/3R5ZShP', '2021-09-01'),
('0033354253810', 'Cristar', 'paulaguillen@cristar.com', '0428789012', 10, 'https://bit.ly/3ZKzxcN', '2021-09-01'),
('0076543210987', 'Toveco', 'hernanparraga@toveco.com', '0429801234', 20, 'https://bit.ly/3Hgs4uK', '2021-09-01'),
('0087654321098', 'Megamobilier', 'alexandervilla@megamobilier.com', '0420901234', 12, 'https://bit.ly/3GR10Rp', '2021-09-01'),
('0098765432109', 'Chaide&Chaide', 'mishellsuarez@chaide.com', '0421000123', 20, 'https://bit.ly/3wllb53', '2003-9-01'),
('0010987654321', 'Debsa', 'rogeliosolorzano@debsa.com', '0421001234', 14, 'https://bit.ly/3wdfu9l', '2005-09-01'),
('0021109876543', 'Bosch', 'bernardoala@bosch.com', '0421002345', 5, 'https://bit.ly/3J17L66', '2011-05-31'),
('0031234567890', 'Plastigama', 'samirkan@plastigama.com', '0421003450', 12, 'https://bit.ly/3ktfxvh', '2001-09-19'),
('0041321098765', 'PTK', 'clarachia@ptk.com', '0421004506', 10, 'https://bit.ly/3J0dOYl', '2021-05-01'),
('0051432109876', 'Segway', 'rociolitardo@segway.com', '0421005678', 14, 'https://bit.ly/3ZQU3IL', '2000-09-11'),
('0061543210987', 'Lamborghini', 'carlsmith@lamborghini.com', '0421006789', 5, 'https://bit.ly/3XC4XjC', '2002-10-01');




------------------------------------------------------------------------------------------------------------------

CREATE TABLE Solicitudes (
    id_solicitud INT IDENTITY(1,1) PRIMARY KEY, 
    ruc_solicitud VARCHAR(13) NOT NULL, 
    nombre_solicitud VARCHAR(150) NOT NULL, 
    email_solicitud VARCHAR(150) NOT NULL, 
    telefono_solicitud VARCHAR(10) NOT NULL,
    provincia_solicitud int FOREIGN KEY REFERENCES Provincias(id_provincia) NOT NULL,
    fechaEnvio_solicitud DATE NOT NULL DEFAULT getDate(),
	estado_solicitud VARCHAR(15) NOT NULL DEFAULT 'Por revisar' CHECK(estado_solicitud IN('Por revisar', 'En proceso', 'Aprobada', 'Rechazada'))
);

INSERT INTO Solicitudes (ruc_solicitud, nombre_solicitud, email_solicitud, telefono_solicitud, 
						provincia_solicitud, fechaEnvio_solicitud, estado_solicitud) VALUES 
('0004541118097', 'Genius', 'leonardocarapaz@genius.com', '0421007890', 10, '2023-01-01', 'En proceso'),
('0033254356867', 'Innova', 'pamelacortes@innova.com', '0429896678', 14, '2022-12-12', 'En proceso'),
('0009321650475', 'Antartic Star', 'tiniyisu@antarticstar.com', '0429213658', 10, '2023-01-09', 'Por revisar'),
('0071246315501', 'Adara Home', 'santiagolopez@adarahome.com', '0422296685', 12, '2023-01-15', 'Por revisar'),
('0068974513477', 'Mega Hierro', 'marthasisug@megahierro.com', '0426642688', 12, '2023-01-17', 'En proceso'),
('0089555412348', 'Corporación Favorita', 'hildasolano@corporacionfavorita.com', '0421249611', 21, '2023-01-06', 'Por revisar');
