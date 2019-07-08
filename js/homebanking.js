//Declaración de variables
var nombreUsuario = prompt("Ingrese el nombre de usuario"+"\n Please enter your username.");
var saldoCuenta = 10000;
var limiteExtraccion = 1000;

//servicios (Me gustaría saber como usar el array para que el usuario pueda agregar servicios y cuentas amigas para transferir dinero)
var servicio1 = ["Agua", 350];
var servicio2 = ["Luz", 210];
var servicio3 = ["Internet", 570];
var servicio4 = ["Telefono", 425]; 

//cuentas amigas 
var cuenta1 = ["Cuenta Amiga 1 ", 1234567];
var cuenta2 = ["Cuenta Amiga 2 ", 7654321];


//codigo de seguridad
var clave = "1234";

//función para sumar dinero
function sumarDinero(cantidadDepositado){
    saldoCuenta = cantidadDepositado+saldoCuenta;
}
//función para restar dinero
function restarDinero(cantidadExtraido){
    saldoCuenta = saldoCuenta-cantidadExtraido;
}

//validaciones
   //validación del saldo disponible
   function chequearSaldoSuficiente(monto){
    if(monto<=saldoCuenta && monto>0){
        console.log('validation passed');
        return true;
    }else if(monto>saldoCuenta){
        console.log('validation failed');
        return false;
    }else if(monto<=0){
        return "less than 0";
    }
}
   //validacion que el monto no excede el limte de extracción
function chequearLimiteDeExtraccion(monto){
    if(monto<=limiteExtraccion){
        console.log('validation passed');
        return true;
    }else if(monto>limiteExtraccion){
        console.log('validation failed');
        return false;
    }
}

//validación que el monto que el usuario desea extraer es divisible por 100
function chequeoBilletes100(monto){
    if(monto%100==0){
        console.log('validation passed');
        return true;
    }else if(monto%100>0){
        console.log('validation failed');
        return false;
    }
}
//validar si los numeros de cuenta son validos
function chequearNumeroDeCuenta(numeroCuenta){
    if(numeroCuenta===cuenta1[1]||numeroCuenta===cuenta2[1]){
        console.log("validation passed");
        return true
    }else{
        console.log("validation failed")
        return false
    }
}

//validar clave de seguridad

function chequearClave(codigo){
    if(codigo===clave){
        console.log("validation passed");
        return true
    }else{
        console.log("validation failed");
        return false
    }
}

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion(); //agregué una función que pide al usuario ingresar su nombre de usuario y clave 
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar
/*Funciones para cambiar limite de extracción*/
function cambiarLimiteDeExtraccion() {
    var nuevoLimite= parseInt(prompt("Ingrese el límite de extracción"));
    if(nuevoLimite>=0){
        limiteExtraccion=nuevoLimite;
        alert("el nuevo límite de extracción es: "+nuevoLimite);
        actualizarLimiteEnPantalla(limiteExtraccion);
    }
    else{
        errorDefault();
    }
}

//Funciones para extraer dinero
function extraerDinero() {
    var monto=parseInt(prompt("Ingrese el monto a extraer"));
    var saldoAnterior=saldoCuenta+!monto;

    //Función para validar y extraer dinero
    if(chequearSaldoSuficiente(monto)===true && chequearLimiteDeExtraccion(monto)===true && chequeoBilletes100(monto)===true){
        restarDinero(monto);
        actualizarSaldoEnPantalla();
        alert("Ha extraido: $"+monto+"\n\nSaldo anterior: $"+ saldoAnterior +"\n\nSaldo actual: $"+ saldoCuenta);
    }else if(chequearSaldoSuficiente(monto)===false){
        errorNoHaySaldo();
    }else if(chequearLimiteDeExtraccion(monto)===false){
        errorLimiteExcedido();
    }else if(chequeoBilletes100(monto)===false){
        errorSoloBilletes100();
    }else if (chequearSaldoSuficiente(monto)==="less than 0"){
        errorDefault();
    }else{
        errorDefault();
        
    }
}

/*Funciones para hacer el deposito*/ 
function depositarDinero() {
    var cantidadParaDepositar= parseInt(prompt("Ingrese el monto para depositar"));
    if(cantidadParaDepositar>=0){
        sumarDinero(cantidadParaDepositar);
        actualizarSaldoEnPantalla();
        //un variable para sacar el saldo anterior de la cuenta antes de realizar el depósito 
        var saldoAnterior = saldoCuenta-cantidadParaDepositar; 
        alert("Ha depositado: "+cantidadParaDepositar+"\n\nSaldo anterior: "+saldoAnterior+"\n\nSaldo actual: "+ saldoCuenta);
    }else{
        errorDefault();
    }
        
}
//Función para pagar servicios declarados en variables arriba
function pagarServicio() { 
//prompt para que el usuario ingrese qué servicio quiere pagar 
var servicio = prompt("Ingrese el numero que corresponda con el servicio que quiere pagar"+'\n'+
"1. "+servicio1[0]+": $"+servicio1[1]+'\n'+
"2. "+servicio2[0]+": $"+servicio2[1]+'\n'+
"3. "+servicio3[0]+": $"+servicio3[1]+'\n'+
"4. "+servicio4[0]+": $"+servicio4[1]+'\n');
//traducción del numero que ingresa el usuario al variable del servicio eligido
switch (servicio) {
    case "1":
        servicio = servicio1;
        break;
    case "2":
        servicio = servicio2;
        break;
    case "3":
        servicio = servicio3;
        break;
    case "4":
        servicio = servicio4;
        break ; 
    default:
        errorServicioDefault();

}
//función que valida si hay saldo suficiente, si no, tira alerta
var monto = servicio[1];
if (chequearSaldoSuficiente(monto)===true){
    var monto = servicio[1];
    var saldoAnterior = saldoCuenta; 
    saldoCuenta = saldoCuenta - monto;
    actualizarSaldoEnPantalla();
    alert("Has pagado el servicio de "+servicio[0]+'\n'+
          "Saldo anterior: $"+(saldoAnterior)+'\n'+
          "Dinero descontado: $"+monto+'\n'+
          "Saldo actual: $"+saldoCuenta);
}else if(chequearSaldoSuficiente(monto)===false){
    errorNoHaySaldoServicio();
}else {
    errorServicioDefault();
``}
}

//función que transfiere dinero a una cuenta amiga 
function transferirDinero() {
    var monto = parseInt(prompt("Ingrese el monto que desea transferir."));
    if(chequearSaldoSuficiente(monto)===true){
        var numeroCuenta = parseInt(prompt("Ingrese el número de la cuenta a la que desea transferir"));
        if(chequearNumeroDeCuenta(numeroCuenta)===true){
            saldoCuenta = saldoCuenta - monto;
            actualizarSaldoEnPantalla();
            alert("Se han transferido: $ "+monto+'\n'+
                "Cuenta destino: "+numeroCuenta);
        }else if(chequearNumeroDeCuenta(numeroCuenta)===false){
            errorNroCuentaNoExiste();
        }
    }else if (chequearSaldoSuficiente(monto)===false){
        errorNoHaySaldotransfer();
    }else{
        errorDefault();
    }


}

//función que pide el pin del usuario. 
function iniciarSesion() {
    //el prompt está escrito en inglés porque el usuario no puedo elegir el idioma hasta que llegue al interfaz del homebanking
var codigo = prompt("Ingrese su código de seguridad." +"\n Please enter your pin.");
if (chequearClave(codigo)===true){
    alertBienvenido(nombreUsuario);
}else{
    saldoCuenta=0;
    actualizarSaldoEnPantalla()
    claveIncorrecto();
    }

}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

//error messages 
function errorNoHaySaldo(){
    alert("No hay saldo disponible para extraer esa cantidad de dinero.");
}
function errorLimiteExcedido(){
    alert("La cantidad de dinero que desea extraer es mayor a su límite de extracción.");
}
function errorSoloBilletes100(){
    alert("Sólo puede extraer billetes de $100.");
}
function errorDefault(){
    alert("No ha ingresado un monto válido.");
}
function errorNoHaySaldoServicio(){
    alert("No hay saldo disponible para pagar este servicio.");
}
function errorServicioDefault(){
    alert("Intente con un servicio valido");
}
function errorNoHaySaldotransfer(){
    alert("No hay saldo disponible para transferirse esa cantidad de dinero.");
}
function errorNroCuentaNoExiste(){
    alert("Solo puede transferirse dinero a una cuenta amiga.");
}
function claveIncorrecto(){
    alert("Código incorrecto: Su dinero ha sido retenido por cuestiones de seguridad");
}
//Mensaje de bienvenido 
function alertBienvenido(nombreUsuario){
    alert("Bienvenido/a " + nombreUsuario + " ya puede comenzar a realizar operaciones");
}
//Cambiar el idioma al inglés
function changeLanguage(){
    window.location = "English/index_EN.html";
}