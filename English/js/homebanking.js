//Variable declaration
var nombreUsuario = prompt("Please enter your username.");
var saldoCuenta = 10000;
var limiteExtraccion = 1000;

//services (I would like to know how to use an array on this one)
var servicio1 = ["Water", 350];
var servicio2 = ["Electricity", 210];
var servicio3 = ["Internet", 570];
var servicio4 = ["Telephone", 425]; 

//linked accounts
var cuenta1 = ["Linked account 1 ", 1234567];
var cuenta2 = ["Linked account 2 ", 7654321];


//security code 
var clave = "1234";

//function to to add money
function sumarDinero(cantidadDepositado){
    saldoCuenta = cantidadDepositado+saldoCuenta;
}
//function to subract money
function restarDinero(cantidadExtraido){
    saldoCuenta = saldoCuenta-cantidadExtraido;
}

//validations
   //sufficient funds validations
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
   //validation that amount does not exceed withdrawal limit
function chequearLimiteDeExtraccion(monto){
    if(monto<=limiteExtraccion){
        console.log('validation passed');
        return true;
    }else if(monto>limiteExtraccion){
        console.log('validation failed');
        return false;
    }
}

//validation that the amount can be disperesed in multiples of $100
function chequeoBilletes100(monto){
    if(monto%100==0){
        console.log('validation passed');
        return true;
    }else if(monto%100>0){
        console.log('validation failed');
        return false;
    }
}
//validate if linked account numbers are correct 
function chequearNumeroDeCuenta(numeroCuenta){
    if(numeroCuenta===cuenta1[1]||numeroCuenta===cuenta2[1]){
        console.log("validation passed");
        return true
    }else{
        console.log("validation failed")
        return false
    }
}

//validate security code

function chequearClave(codigo){
    if(codigo===clave){
        console.log("validation passed");
        return true
    }else{
        console.log("validation failed");
        return false
    }
}

//functions which update HTML values
window.onload = function() {
    iniciarSesion(); //I added a function which asks the user for their name
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Functions to complete
//Function to change withdrawal limit
function cambiarLimiteDeExtraccion() {
    var nuevoLimite= parseInt(prompt("Please enter your new withdrawal limit."));
    if(nuevoLimite>=0){
        limiteExtraccion=nuevoLimite;
        alert("Your new withdrawal limit is: $"+nuevoLimite);
        actualizarLimiteEnPantalla(limiteExtraccion);
    }
    else{
        errorDefault();
    }
}

//Function to withdraw money
function extraerDinero() {
    var monto=parseInt(prompt("Please enter withdrawal amount."));
    var saldoAnterior=saldoCuenta+!monto;

    //function to validate withdrawal or show an error message
    if(chequearSaldoSuficiente(monto)===true && chequearLimiteDeExtraccion(monto)===true && chequeoBilletes100(monto)===true){
        restarDinero(monto);
        actualizarSaldoEnPantalla();
        alert("Amount withdrawn: $"+monto+"\n\nPrevious account balance: $"+ saldoAnterior +"\n\nCurrent account balance: $"+ saldoCuenta);
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

// Functions to deposit money 
function depositarDinero() {
    var cantidadParaDepositar= parseInt(prompt("Please enter the amount to deposit."));
    if(cantidadParaDepositar>=0){
        sumarDinero(cantidadParaDepositar);
        actualizarSaldoEnPantalla();
        var saldoAnterior = saldoCuenta-cantidadParaDepositar; //un variable para sacar el saldo anterior de la cuenta antes de realizar el depósito 
        alert("Amount deposited: $"+cantidadParaDepositar+"\n\n Previous account balance: $"+saldoAnterior+"\n\nCurrent account balance: $"+ saldoCuenta);
    }else{
        errorDefault();
    }
        
}


//Function to pay for services

function pagarServicio() {
    
//prompt para que el usuario ingrese que servicio quiere pagar 
var servicio = prompt("Please enter the number corresponding to the utility you wish to pay:"+'\n'+
"1. "+servicio1[0]+": $"+servicio1[1]+'\n'+
"2. "+servicio2[0]+": $"+servicio2[1]+'\n'+
"3. "+servicio3[0]+": $"+servicio3[1]+'\n'+
"4. "+servicio4[0]+": $"+servicio4[1]+'\n');

//Switch which changes the number typed by user to the service declared in the variable 
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
//validation to check if balance is sufficient or shows error message
var monto = servicio[1];
if (chequearSaldoSuficiente(monto)===true){
    var monto = servicio[1];
    var saldoAnterior = saldoCuenta; 
    saldoCuenta = saldoCuenta - monto;
    actualizarSaldoEnPantalla();
    alert(servicio[0]+ "is paid "+'\n'+
          "Previous balance: $"+(saldoAnterior)+'\n'+
          "Amount deducted: $"+monto+'\n'+
          "Current balance: $"+saldoCuenta);
}else if(chequearSaldoSuficiente(monto)===false){
    errorNoHaySaldoServicio();
}else {
    errorServicioDefault();
``}
}

//function to transfer money to a linked account. 
function transferirDinero() {
    var monto = parseInt(prompt("Please enter the amount to transfer"));
    if(chequearSaldoSuficiente(monto)===true){
        var numeroCuenta = parseInt(prompt("Please enter the account number of linked account you wish to transfer to."));
        if(chequearNumeroDeCuenta(numeroCuenta)===true){
            saldoCuenta = saldoCuenta - monto;
            actualizarSaldoEnPantalla();
            alert("You have transferred: $ "+monto+'\n'+
                "Transferred to: "+numeroCuenta);
        }else if(chequearNumeroDeCuenta(numeroCuenta)===false){
            errorNroCuentaNoExiste();
        }
    }else if (chequearSaldoSuficiente(monto)===false){
        errorNoHaySaldotransfer();
    }else{
        errorDefault();
    }


}

//function that runs at start up asking for the users pin number and shoes a welcome alert
function iniciarSesion() {
var codigo = prompt("Please enter your pin.");
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
    document.getElementById("nombre").innerHTML = "Welcome " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Your withdrawal limit is: $" + limiteExtraccion;
}

//error messages 
function errorNoHaySaldo(){
    alert("Insufficient funds to complete this withdrawal.");
}
function errorLimiteExcedido(){
    alert("The desired amount exceeeds your withdrawal limit.");
}
function errorSoloBilletes100(){
    alert("Withdrawal must be in multiples of $100.");
}
function errorDefault(){
    alert("Please enter a valid amount");
}
function errorNoHaySaldoServicio(){
    alert("Insuficient funds to pay for this service");
}
function errorServicioDefault(){
    alert("Please enter a valid service.");
}
function errorNoHaySaldotransfer(){
    alert("Inssuficient funds to complete this transfer.");
}
function errorNroCuentaNoExiste(){
    alert("You may only trasnfer to a linked account.");
}
function claveIncorrecto(){
    alert("Incorrect pin: your account has been quarantined for security reasons.");
}
//Mensaje de bienvenido 
function alertBienvenido(nombreUsuario){
    alert("Welcome " + nombreUsuario + ", you may now use your account.");
}
//A function that changes the language to Spanish
function changeLanguage(){
    window.location = "English/index_EN.html";
}