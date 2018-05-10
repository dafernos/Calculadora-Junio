/*
falta controlar que despues del igual si pulsas un boton se borre el acumulado y la pantalla
faltan operaciones de 3 numeros (3+3+3) si haces 3+3 y pulsas + debe aparecer un 6 ya en pantalla 
*/
{
var calculadora={
	acumulado:0,
	operador: "",
	contador:0,
	paso:false,
	//if si es suma multiplicacion etc cambia
	//if operador sumarestadivmult
	pulsar: function (event){
		let value= event.target.value;
		switch(value){
			case "/":
			case "*":
			case "-":
			case "+":
				calculadora.operador=value;
				calculadora.acumulado=calculadora.pantalla.value;
				calculadora.contador=1;
			case "=":
			console.log(calculadora.paso);
				if (calculadora.paso){
					switch(calculadora.operador){
						case "/":
						if(calculadora.pantalla.value!='0'){
							calculadora.acumulado=parseFloat(calculadora.acumulado)/parseFloat(calculadora.pantalla.value);
						}
						break;
					case "*":
						calculadora.acumulado=parseFloat(calculadora.acumulado)*parseFloat(calculadora.pantalla.value);
						break;
					case "-":
						calculadora.acumulado=parseFloat(calculadora.acumulado)-parseFloat(calculadora.pantalla.value);
						break;
					case "+":
						calculadora.acumulado=parseFloat(calculadora.acumulado)+parseFloat(calculadora.pantalla.value);
						break;
					}
				}
				calculadora.operador=value;
				calculadora.pantalla.value=calculadora.acumulado;
				calculadora.paso=true;
				console.log(calculadora.paso);
				break
			case "%":
				if (calculadora.acumulado===0) calculadora.acumulado=1;
				calculadora.pantalla.value=(parseFloat(calculadora.acumulado)*parseFloat(calculadora.pantalla.value)/100);
				calculadora.acumulado=calculadora.pantalla.value;
				break;
			case "+-":
				if (parseFloat(calculadora.pantalla.value)<0) {
					calculadora.pantalla.value=Math.abs(calculadora.pantalla.value);
				} else if(parseFloat(calculadora.pantalla.value)>0){
					calculadora.pantalla.value=-(calculadora.pantalla.value);
				}
				break;
			case "ce":
				calculadora.acumulado=0;
				calculadora.operador='';
				calculadora.pantalla.value=0;
				calculadora.paso=false
				break;
			case "<-":
				if (calculadora.pantalla.value>0){
					if (calculadora.pantalla.value.length>=2) calculadora.pantalla.value=calculadora.pantalla.value.substr(0, calculadora.pantalla.value.length-1);
					else calculadora.pantalla.value=0;
				}else{
					if (calculadora.pantalla.value.length>2) calculadora.pantalla.value=calculadora.pantalla.value.substr(0, calculadora.pantalla.value.length-1);
					else calculadora.pantalla.value=0;
				}
				break;
			case ".":
				if(calculadora.pantalla.value.indexOf('.')<0){
					calculadora.pantalla.value+=value;
				}
				break;
			default:
				if (calculadora.acumulado!=0 && calculadora.contador===1){
					calculadora.pantalla.value=value;
					calculadora.contador=0;
				}else if (pantalla.value==='0'){
					calculadora.pantalla.value=value;
				}else if (calculadora.operador==='='){
					calculadora.pantalla.value=value;
				}else {
					calculadora.pantalla.value+=value;
				}
			break;
		}
		
	},
	estructura:function () {
		//creamos el div que va a contener el formulario
		let estcalculadora = document.createElement('div');
		//le añadimos el css como queramos
		estcalculadora.style.width = "300px";
		estcalculadora.style.height = "300px";
		estcalculadora.style.background = '#EEE';
		estcalculadora.style.border = '2px solid #CCC';
		estcalculadora.style.padding = '20px';
		//creamos el formulario que va a contener los botones
		let formulario = document.createElement('form');
		//creamos el primer input que es el que va a contener las cuentas
		let boton = document.createElement('input');
		//le añadimos el css y el atributo con el que va a empezar
		boton.setAttribute('id','pantalla');
		boton.setAttribute('value',calculadora.acumulado);
		boton.setAttribute('readonly','readonly');
		boton.style.padding = '0 15px ';
		boton.style.height = '50px';
		boton.style.width = '85%';
		boton.style.textAlign = 'right';
		//metemos el primer input al formulario
		formulario.appendChild(boton);
		//array con los signos para los botones
		let signos=["ce","<-","%","+",7,8,9,"-",4,5,6,"*",1,2,3,"/",0,"+-",".","="];
		//for que nos crea los botones con el texto del array
		for(let i = 0; i < signos.length; i++){
			//se crea un input
			boton = document.createElement('input');
			//se le dice que es de tipo boton
			boton.setAttribute("type","button");
			//se le asigna el valor de la posicion de signos
			boton.setAttribute("value", signos[i]);
			boton.onclick=calculadora.pulsar;
			//se le añade el css
			boton.style.width = '21%';
			boton.style.height = '40px';
			boton.style.margin = '5px 7px 5px 5px';
			//se introduce el boton creado en el formulario por orden de creacion
			formulario.appendChild(boton);
		}
		//se inserta el formulario creado con todos los botones en el div
		estcalculadora.appendChild(formulario);
		//insertamos el div creado en el body de la pagina
		document.body.appendChild(estcalculadora);
		calculadora.pantalla=document.getElementById('pantalla');
	},
	pantalla:"",
}

document.body.onload=calculadora.estructura;
}
