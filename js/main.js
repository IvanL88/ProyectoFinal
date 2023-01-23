const bitcon = {
    id: 1,
    compra: 8138280.91,
    venta: 8102646.80
}

const ethereum = {
    id:2,
    venta: 611568.92,
    compra: 567460.05
}

const usdc = {
    id: 3,
    compra: 357.17,
    venta: 354.93
}

const arrayCripto = [bitcon,ethereum,usdc];


let user     = null;
let password = null;
let ingreso         = false;

async function getUsuario(email,password){
    let user = '';
    if (email){
        const res = await fetch ('./data/usuarios.json');
        const datos = await res.json();
        user = datos.filter(datos=> ((datos.email==email) && (datos.password==password)));           
    }
    return user;
} 

function login(){
    
    user = document.getElementById('email').value;
    password = document.getElementById('password').value;
    let userObj = ''  ;

    if (!user && !password){
        showAlert('Falta al menos un dato');
    }else{
        let userLogged = null;
        const PromiseuserLogged = getUsuario(user,password);
        PromiseuserLogged.then((response)=>{
            userLogged = response[0];
            if (userLogged!==undefined){
            
                userObj = obtenerStorage();  
                if (userObj){
                    if (userObj.email!=userLogged.email){
                        guardarStorage(userLogged);
                    }
                }else{
                    guardarStorage(userLogged);
                }                      
                window.location.href = "./account.html";
            }else{
                showAlert('Error en credenciales.')
            }           
        });
    }
}

function mostrarPanel(cripto){ 
    ocultarTodasAcciones();
    switch (cripto) {
        case 'btn':
            document.getElementById("btn_panel").classList.remove("d-none");         
            document.getElementById("eth_panel").classList.add("d-none");  
            document.getElementById("usdc_panel").classList.add("d-none");  
            document.getElementById("pesos_panel").classList.add("d-none");              
            break;
        case 'eth':
            document.getElementById("btn_panel").classList.add("d-none");         
            document.getElementById("eth_panel").classList.remove("d-none");  
            document.getElementById("usdc_panel").classList.add("d-none");  
            document.getElementById("pesos_panel").classList.add("d-none");   
            break;
        case 'usdc':
            document.getElementById("btn_panel").classList.add("d-none");         
            document.getElementById("eth_panel").classList.add("d-none");  
            document.getElementById("usdc_panel").classList.remove("d-none");  
            document.getElementById("pesos_panel").classList.add("d-none");   
            break;
        case 'pesos':
            document.getElementById("btn_panel").classList.add("d-none");         
            document.getElementById("eth_panel").classList.add("d-none");  
            document.getElementById("usdc_panel").classList.add("d-none");  
            document.getElementById("pesos_panel").classList.remove("d-none");   
            break;
        default:
            break;
    }
}


function btnAccion(accion){
    document.getElementById("saldo").classList.remove("d-none");   
    let userStorage = obtenerStorage();     
    document.getElementById("saldo").innerHTML = "Tu saldo es: "  + userStorage.bitcon + " BTC";
    switch (accion) {
        case 'comprar':
            document.getElementById("btn_saldo_compra").classList.remove("d-none");   
            document.getElementById("btn_saldo_vender").classList.add("d-none"); 
            document.getElementById("eth_saldo_compra").classList.add("d-none"); 
            document.getElementById("eth_saldo_vender").classList.add("d-none"); 
            document.getElementById("usdc_saldo_compra").classList.add("d-none"); 
            document.getElementById("usdc_saldo_vender").classList.add("d-none"); 
            document.getElementById("pesos_saldo_depositar").classList.add("d-none"); 
            document.getElementById("pesos_saldo_retirar").classList.add("d-none");             
            break;
        case 'vender':
            document.getElementById("btn_saldo_compra").classList.add("d-none");   
            document.getElementById("btn_saldo_vender").classList.remove("d-none"); 
            document.getElementById("eth_saldo_compra").classList.add("d-none"); 
            document.getElementById("eth_saldo_vender").classList.add("d-none"); 
            document.getElementById("usdc_saldo_compra").classList.add("d-none"); 
            document.getElementById("usdc_saldo_vender").classList.add("d-none"); 
            document.getElementById("pesos_saldo_depositar").classList.add("d-none"); 
            document.getElementById("pesos_saldo_retirar").classList.add("d-none"); 
            break;    
        default:
            break;
    }
}

function ethAccion(accion){
    document.getElementById("saldo").classList.remove("d-none");   
    let userStorage = obtenerStorage();  
    document.getElementById("saldo").innerHTML = "Tu saldo es: "  + userStorage.ethereum + " ETH";
    switch (accion) {
        case 'comprar':
            document.getElementById("btn_saldo_compra").classList.add("d-none");   
            document.getElementById("btn_saldo_vender").classList.add("d-none"); 
            document.getElementById("eth_saldo_compra").classList.remove("d-none"); 
            document.getElementById("eth_saldo_vender").classList.add("d-none"); 
            document.getElementById("usdc_saldo_compra").classList.add("d-none"); 
            document.getElementById("usdc_saldo_vender").classList.add("d-none"); 
            document.getElementById("pesos_saldo_depositar").classList.add("d-none"); 
            document.getElementById("pesos_saldo_retirar").classList.add("d-none");             
            break;
        case 'vender':
            document.getElementById("btn_saldo_compra").classList.add("d-none");   
            document.getElementById("btn_saldo_vender").classList.add("d-none"); 
            document.getElementById("eth_saldo_compra").classList.add("d-none"); 
            document.getElementById("eth_saldo_vender").classList.remove("d-none"); 
            document.getElementById("usdc_saldo_compra").classList.add("d-none"); 
            document.getElementById("usdc_saldo_vender").classList.add("d-none"); 
            document.getElementById("pesos_saldo_depositar").classList.add("d-none"); 
            document.getElementById("pesos_saldo_retirar").classList.add("d-none"); 
            break;    
        default:
            break;
    }
}

function usdcAccion(accion){
    document.getElementById("saldo").classList.remove("d-none");   
    let userStorage = obtenerStorage();  
    document.getElementById("saldo").innerHTML = "Tu saldo es: "  + userStorage.usdc + " USDC";
    switch (accion) {
        case 'comprar':
            document.getElementById("btn_saldo_compra").classList.add("d-none");   
            document.getElementById("btn_saldo_vender").classList.add("d-none"); 
            document.getElementById("eth_saldo_compra").classList.add("d-none"); 
            document.getElementById("eth_saldo_vender").classList.add("d-none"); 
            document.getElementById("usdc_saldo_compra").classList.remove("d-none"); 
            document.getElementById("usdc_saldo_vender").classList.add("d-none"); 
            document.getElementById("pesos_saldo_depositar").classList.add("d-none"); 
            document.getElementById("pesos_saldo_retirar").classList.add("d-none");             
            break;
        case 'vender':
            document.getElementById("btn_saldo_compra").classList.add("d-none");   
            document.getElementById("btn_saldo_vender").classList.add("d-none"); 
            document.getElementById("eth_saldo_compra").classList.add("d-none"); 
            document.getElementById("eth_saldo_vender").classList.add("d-none"); 
            document.getElementById("usdc_saldo_compra").classList.add("d-none"); 
            document.getElementById("usdc_saldo_vender").classList.remove("d-none"); 
            document.getElementById("pesos_saldo_depositar").classList.add("d-none"); 
            document.getElementById("pesos_saldo_retirar").classList.add("d-none"); 
            break;    
        default:
            break;
    }
}

function pesosAccion(accion){
    document.getElementById("saldo").classList.remove("d-none");
    let userStorage = obtenerStorage();     
    document.getElementById("saldo").innerHTML = "Tu saldo es: "  + userStorage.pesos + " PESOS";
    switch (accion) {
        case 'comprar':
            document.getElementById("btn_saldo_compra").classList.add("d-none");   
            document.getElementById("btn_saldo_vender").classList.add("d-none"); 
            document.getElementById("eth_saldo_compra").classList.add("d-none"); 
            document.getElementById("eth_saldo_vender").classList.add("d-none"); 
            document.getElementById("usdc_saldo_compra").classList.add("d-none"); 
            document.getElementById("usdc_saldo_vender").classList.add("d-none"); 
            document.getElementById("pesos_saldo_depositar").classList.remove("d-none"); 
            document.getElementById("pesos_saldo_retirar").classList.add("d-none");             
            break;
        case 'vender':
            document.getElementById("btn_saldo_compra").classList.add("d-none");   
            document.getElementById("btn_saldo_vender").classList.add("d-none"); 
            document.getElementById("eth_saldo_compra").classList.add("d-none"); 
            document.getElementById("eth_saldo_vender").classList.add("d-none"); 
            document.getElementById("usdc_saldo_compra").classList.add("d-none"); 
            document.getElementById("usdc_saldo_vender").classList.add("d-none"); 
            document.getElementById("pesos_saldo_depositar").classList.add("d-none"); 
            document.getElementById("pesos_saldo_retirar").classList.remove("d-none"); 
            break;    
        default:
            break;
    }
}

function btnAceptar(accion){   
    let userStorage = obtenerStorage();   
    document.getElementById("saldo").innerHTML = "Tu saldo es: " + userStorage.bitcon + " BTC";  
    switch (accion) {
        case 'comprar':
            let compra = parseFloat(document.getElementById('btn_cant_compra').value);
            if (compra>(userStorage.pesos/bitcon.compra)){
                showAlert("Saldo en PESOS insuficiente");
            }else{
                userStorage.bitcon += compra;
                userStorage.pesos -= (compra*bitcon.compra);
                document.getElementById("saldo").innerHTML = "Tu saldo es: " + userStorage.bitcon + " BTC";
                document.getElementById('btn_cant_compra').value = '';
                showSuccess("Compraste nuevos bitcoins", "Tu compra fue exitosa!");
            }      
            break;
        case 'vender':
            let vender = parseFloat(document.getElementById('btn_cant_vender').value);
            if (vender>(userStorage.bitcon)){
                showAlert("Saldo en BTC insuficiente");
            }else{
                userStorage.bitcon -= vender;
                userStorage.pesos += (vender*bitcon.venta);
                document.getElementById("saldo").innerHTML = "Tu saldo es: " + userStorage.bitcon + " BTC";
                document.getElementById('btn_cant_vender').value = '';
                showSuccess("Vendiste bitcoins", "Tu venta fue exitosa!");
            }      
            break;        
        default:
            break;
    }
    guardarStorage(userStorage);
}

function ethAceptar(accion){   
    let userStorage = obtenerStorage();
    document.getElementById("saldo").innerHTML = "Tu saldo es: " + userStorage.ethereum + " ETH";  
    switch (accion) {
        case 'comprar':
            let compra = parseFloat(document.getElementById('eth_cant_compra').value);
            if (compra>(userStorage.pesos/ethereum.compra)){
                showAlert("Saldo en PESOS insuficiente");
            }else{
                userStorage.ethereum += compra;
                userStorage.pesos -= (compra*ethereum.compra);
                document.getElementById("saldo").innerHTML = "Tu saldo es: " + userStorage.ethereum + " ETH";
                document.getElementById('eth_cant_compra').value = '';
                showSuccess("Compraste nuevos etherum","Tu compra fue exitosa!");
            }      
            break;
        case 'vender':
            let vender = parseFloat(document.getElementById('eth_cant_vender').value);
            if (vender>(userStorage.ethereum)){
                showAlert("Saldo en ETH insuficiente");
            }else{
                userStorage.ethereum -= vender;
                userStorage.pesos += (vender*ethereum.venta);
                document.getElementById("saldo").innerHTML = "Tu saldo es: " + userStorage.ethereum + " ETH";
                document.getElementById('eth_cant_vender').value = '';
                showSuccess("Vendiste etherum","Tu venta fue exitosa!");
            }      
            break;        
        default:
            break;
    }
    guardarStorage(userStorage);
}

function usdcAceptar(accion){   
    let userStorage = obtenerStorage();
    document.getElementById("saldo").innerHTML = "Tu saldo es: " + userStorage.usdc + " USDC";
    switch (accion) {
        case 'comprar':
            let compra = parseFloat(document.getElementById('usdc_cant_compra').value);
            if (compra>(userStorage.pesos/usdc.compra)){
                showAlert("Saldo en PESOS insuficiente");
            }else{
                userStorage.usdc += compra;
                userStorage.pesos -= (compra*usdc.compra);
                document.getElementById("saldo").innerHTML = "Tu saldo es: " + userStorage.usdc + " USDC";
                document.getElementById('usdc_cant_compra').value = '';
                showSuccess("Comprado USDC","Tu compra fue exitosa!");
            }      
            break;
        case 'vender':
            let vender = parseFloat(document.getElementById('usdc_cant_vender').value);
            if (vender>(userStorage.usdc)){
                showAlert("Saldo en USDC insuficiente");
            }else{
                userStorage.usdc -= vender;
                userStorage.pesos += (vender*usdc.venta);
                document.getElementById("saldo").innerHTML = "Tu saldo es: " + userStorage.usdc + " USDC";
                document.getElementById('usdc_cant_vender').value = '';
                showSuccess("Vendiste USDC","Tu venta fue exitosa!");
            }      
            break;       
        default:
            break;
    }
    guardarStorage(userStorage);
}

function pesosAceptar(accion){    
    let userStorage = obtenerStorage();
    document.getElementById("saldo").innerHTML = "Tu saldo es: " + userStorage.pesos + " PESOS";
    switch (accion) {
        case 'depositar':
            let deposito = parseFloat(document.getElementById('pesos_cant_deposito').value);           
            userStorage.pesos += deposito;      
            document.getElementById("saldo").innerHTML = "Tu saldo es: " + userStorage.pesos + " PESOS";
            document.getElementById('pesos_depositar').value = '';
            showSuccess("Pesos","Tu deposito fue exitosa!");
               
            break;
        case 'retirar':
            let retirar = parseFloat(document.getElementById('pesos_cant_retiro').value);          
            if (retirar>userStorage.pesos){
                showAlert("Saldo en PESOS insuficiente");
            }else{
                userStorage.pesos -= retirar;    
                document.getElementById("saldo").innerHTML = "Tu saldo es: " + userStorage.pesos + " PESOS";
                document.getElementById('pesos_retirar').value = '';
                showSuccess("Pesos","Tu retiro fue exitosa!");
            }
            
             
            break;       
        default:
            break;
    } 
guardarStorage(userStorage);
}


function ocultarTodasAcciones(){
    document.getElementById("btn_saldo_compra").classList.add("d-none");   
    document.getElementById("btn_saldo_vender").classList.add("d-none"); 
    document.getElementById("eth_saldo_compra").classList.add("d-none"); 
    document.getElementById("eth_saldo_vender").classList.add("d-none"); 
    document.getElementById("usdc_saldo_compra").classList.add("d-none"); 
    document.getElementById("usdc_saldo_vender").classList.add("d-none"); 
    document.getElementById("pesos_saldo_depositar").classList.add("d-none"); 
    document.getElementById("pesos_saldo_retirar").classList.add("d-none");  
    document.getElementById("saldo").classList.add("d-none");    
}

function guardarStorage(userStorage){
    localStorage.setItem("usuario", JSON.stringify(userStorage));
}

function obtenerStorage(){
    return JSON.parse(localStorage.getItem("usuario"));
}

function showSuccess(title, text){
    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        confirmButtonText: 'Ok'
    })
}

function showAlert(text){   
    Swal.fire({
        icon: 'error',
        title: 'Opsss...',
        text: text             
        });    
}
