# Manual Tecnico


## Descripción
Para realizar esta aplicación web se utilizaron distintos servicios de AWS, los cuales se aprenderan a configurar a continuación, posteriormente se realizó un servidor utilizando Node js express y mysql para la base de datos y Angular para la parte de usuario.

### Arquitectura del sistema

Para la realización de este programa se utilizaron distintos servicios de AWS entre los cuales podemos mencionar S3 que se utilzó para almacenar los archivos, RDS para la base de datos, EC2 para crear dos instancias de ubuntu, el balanceador de carga, entre otros. Estos servicios se conectan como muestra la siguiente imagen.

Podemos observar que el usuario interactra con una instancia de S3 donde se publica el frontend de la aplicación, este por medio de una URL accede al balanceador de carga, que distribuye las peticiones http a las dos ec2, las cuales consultan la base de datos de rds y el bucket de ser necesario.

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/arq.PNG)

### Configuración de AWS

#### VPC

Las vpc proporcionan una red privada virtual, dentro de ella se crean distintas subnets de manera privada o publica.

para crear na vpc bscaos el servicio de vpc  posteriorente ingresaos en la opcion create vpc
![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/vpc.PNG)

A continuacion procedemos a colocar el nombre de la VPC y el rango de ip que tendrá

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/vpccrear.PNG)

Posteriormente se crearon las subnets, 2 publicas y una privada, para ello búscamos en el panel lateral la opción subnets y accedemos a la opción create subnet

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/vpcsubnets.PNG)

En esta opción lo primero que debemos hacer es seleccionar la vpc que creamos anteriormente

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/vpcsubnetcrear.PNG)


Procedemos a colocar el nombre de la subnet y el rango de ip, el cual debe estar dentro del rango de ip de la vpc, seleccionamos una zona de disponibilidad
![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/vpcsubnetcrear2.PNG)

Posteriormente creamos una internet gateway para poder conectar las subnets publicas a internet
![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/vpcigateway.PNG)

por ultimo creamos una route table 

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/vpcroutetable.PNG)


#### BUCKET DE S3

Es un servicio de AWS qe nos permite almacenar archivos en la nube, esto lo utilizamos para guardar las fotos de usuario y los archivos subidos.

para crear un bucket buscamos el servicio de S3  en el panel lateral, buscamos la opcion bucket  presionamos la opción crear bucket. 

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/bucket.PNG)

Colocamos el nombre del bucket y la region de AWS

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/crearbucket.PNG)

Para poder ver los archivos subidos al bucket debemos configurar las pólictas para que el acceso sea publico.

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/bucketbloqueo.PNG)

Para este proyecto creamos dos carpetas, una para almacenar las fotos de usario y otra para los archivos.

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/bucketcarpetas.PNG)





#### RDS

RDS es un servicio de AWS que nos permite crear una base de datos relacional, utilizando distintos DBMS, para este caso utilizaos MYSQL. Buscamos el servicio RDS y seleccionaos databases y crear base de datos.

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/rds.PNG)

Selecionamos el motor de base de datos que deseamos utilizar, en este caso MYSQL.


![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/rdscrear.PNG)

Seleccionamos la capa gratuita, colocamos el nombre de la base de datos, el nombre de usuario y contraseña.


![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/rdscrear2.PNG)



![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/rdscrear3.PNG)

En la parte de conectividad seleccionamos nuestra VPC Y en las subredes colocamos la única opción, ya que al no permitir el acceso público el sistema asume que debe seleccionar la subred privada. Es importante mencionar que para eso creamos dos subredes publicas en zonas distintas, ya que si creamos solo una RDS puede generar un error.

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/rdscrear4.PNG)

#### SECURITY GROUP

Es una configuración que nos permite determinar que ips y puertos pueden acceder a nuestros servicios de AWS, en este caso se utilzó unicamente un security group y seleccionamos unicamente el puerto 3000 de nuestro servidor de node, 80 http, 3306 de la base de datos, 22 para acceder por medio de SSH

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/securitygroup.PNG)

#### EC2

Es un servicio de AWS que utilizamos para crear una instancia de ubuntu, en la cual creamos un servidor de node js que recibira las peticiones http. Buscamos el servicio EC2 t damos clic en lanzae instancia.

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/ec2.PNG)


Seleccionamos la AMI de ubuntu 20.04
![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/ec2ami.PNG)

Al crear la instancia debemos seleccionar la VPC y subred, en este caso seleccionamos la vpc qe creamos y una de las subredes publicas.

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/ec2vpc.PNG)

Creamos pares de claves para poder acceder a nuestra instancia de modo remoto por SSH.
![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/ec2keypairs.PNG)




#### IAM

Son usarios que tendran acceso restringido a los servicios de AWS, para este caso unicamente creamos un usuario IAM y fue para acceder mediante programación al servicio de S3.
![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/iamusuarios.PNG)

colocamos el nombre de usuario.

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/iamcrearusuario.PNG)

Seleccionamos la clave de acceso por programación

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/iamclavesacceso.PNG)



Accedemos a politcas existentes y buscamos S3FullAccess

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/iamusuariopoliticas.PNG)

#### BALANCEADOR DE CARGA

El balanceador de carga es un servicio de AWS que nos permite alternar las peticiones http en varias instancias de forma aleatoria, esto con el obejtivo de generar menos carga en una solo EC2. Para crearlo lo buscamos en el servicio EC2 en el panel lateral y seleccionamos crear balanceador de carga.

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/lb.PNG)

Seleccionaos el balanceador de carga clásico

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/lb2.PNG)

Seleccionamos nuestra VPC,  posteriormente seleccionamos las subredes en las cuales nos direccionará el balanceador. Por ultimo seleccionamos las instancias EC2.

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/lb3.PNG)

#### ENTIDAD RELACION

Este es el modelo entidad relación que se utilizó para la base de datos. 

![web 1](https://s3.us-east-2.amazonaws.com/tarea2.201807228/mtimagenes/ER.PNG)
