let jugar = document.querySelector("#iniciar-juego");
let agregarPalabra = document.querySelector("#nueva-palabra");
let palabraNueva = document.querySelector("#input-nueva-palabra");
let error = document.querySelector("#error");
let repetida = document.querySelector("#repetida");

document.querySelector(".titulo").scrollIntoView({block: "start", behavior: "smooth"});

var letrasErradas = []; //Array donde se guardan las letras erradas
var letrasEncontradas = []; //Array donde se guardan las letras que van equivocadas
var palabra = "";
jugar.addEventListener("click",comenzar);

/*Inicia el juego */
function comenzar(event){
    palabraNueva.value="";
    jugar.blur(); 
    palabra = listaPalabras[Math.floor(Math.random()*listaPalabras.length)] 
    letrasErradas = [];
    letrasEncontradas = [];
    event.preventDefault();
    pantalla.scrollIntoView({block: "end", behavior: "smooth"}); 
    dibujarAhorcado(letrasErradas.length);
    dibujarLineas(palabra);
    escribirPalabraChica("Ingrese las letras con el teclado",600,250,"Black");
    document.addEventListener("keypress",teclado);
};
function teclado(event){
    var letraNoEncontrada = true;
    var letraIngresada = event.key.toLocaleUpperCase()
    if ((letrasEncontradas.length<palabra.length)&&(letrasErradas.length<9)){
        if(validacionLetraIngresada(letraIngresada)){
            for(var z=0;z<palabra.length;z++){
                if (letraIngresada == palabra[z]){
                    letraNoEncontrada = false;
                    escribirLetra(palabra[z],z,"blue");
                    letrasEncontradas.push(letraIngresada);

                };
            };
            if ((letraNoEncontrada) && (!validacionLetraError(letraIngresada))){
                letrasErradas.push(letraIngresada);
                dibujarAhorcado(letrasErradas.length);
                escribirLetraError(letraIngresada,letrasErradas.length);
            }
        }
    }

    finDelJuego();
    
}
function finDelJuego(){
    if(letrasEncontradas.length==palabra.length){
        escribirPalabra("¡GANASTE!",600,400,"blue");
        crearBotonVolver();
        document.removeEventListener("keypress",teclado);
    }else{
        if (letrasErradas.length==9){
            escribirPalabra("¡FIN DEL JUEGO!",600,400,"RED");
            crearBotonVolver();
            document.removeEventListener("keypress",teclado);
            for(var t in palabra){
                escribirLetra(palabra[t],t,"red");
            }
        }
    }
    pantalla.onclick = inicio;
    function inicio(evento){
        var x = evento.pageX - pantalla.offsetLeft;
        var y = evento.pageY - pantalla.offsetTop;
        if ((x<630)&&(x>480)&&(y<770)&&(y>725)){
            document.querySelector(".titulo").scrollIntoView({block: "start", behavior: "smooth"});
        }
    }
}

agregarPalabra.addEventListener("click",function(event){
    let palabraIngresada = palabraNueva.value.toLocaleUpperCase();

    if (!validarPalabraNueva(palabraIngresada)){
        error.classList.remove("invisible");
        palabraNueva.focus();
        setTimeout(function(){
            error.classList.add("invisible");
        },2000);
        
    }else{
        if(validarPalabraRepetida(palabraIngresada)){
            repetida.classList.remove("invisible");
            palabraNueva.focus();
            setTimeout(function(){
            repetida.classList.add("invisible");
            },2000);
        }else{
            listaPalabras.push(palabraIngresada);
                agregada.classList.remove("invisible");
            setTimeout(function(){
                agregada.classList.add("invisible");
            },2000);
            palabraNueva.value="";
        }
    }
});