create database Proyecto1Semi1;
use Proyecto1Semi1;

create table Usuario(
	id_usuario integer auto_increment primary key,
    nombre_usuario varchar(50),
    correo varchar(50),
    contrasena varchar(50),
    foto varchar(200)
);

create table Archivo(
	id_archivo integer auto_increment primary key,
    nombre_archivo varchar(50),
    ruta_archivo varchar(200),
    tipo varchar(10),
    id_usuario integer,
    foreign key(id_usuario) references Usuario (id_usuario)
    ON DELETE CASCADE ON UPDATE CASCADE
);

create table Amigo(
	id_amigos integer auto_increment primary key,
    id_usuario1 integer,
    id_usuario2 integer,
    foreign key(id_usuario1) references Usuario(id_usuario)
    ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(id_usuario2) references Usuario(id_usuario)
    ON DELETE CASCADE ON UPDATE CASCADE
    
);
delete from usuario where id_usuario >0;
SELECT * FROM USUARIO;
INSERT INTO Usuario (nombre_usuario, correo, contrasena, foto) VALUES ("Gerson123", "gerson@gmail.com", "123", "sdlfksjdflj");

call agregar_usuario("Gerson1883","gerslmlon@gmail.com","123","sdfsdf");

DELIMITER $$
create procedure agregar_usuario 
(in _nombre_usuario varchar(50), _correo varchar(50), _contrasena varchar(50), _foto varchar(200) )
begin
	declare _existe int;
	set _existe = (select count(*) from Usuario where nombre_usuario = _nombre_usuario or correo = _correo);
    if (_existe = 0) then 
    insert into Usuario(nombre_usuario, correo, contrasena, foto)values(_nombre_usuario,_correo,_contrasena,_foto);
    select _existe;
    else select _existe;
    end if;
    
end;
$$

