(function () {
    var formulario = document.getElementById("f2");
    formulario.addEventListener('submit', validarTest);
    formulario.addEventListener('reset', borrarDatos);
    var info = document.getElementById('info');
    
    var aciertos = 0;
    var errores = 0;
    var contestadas = 0;
    var noContestadas = 0;
    var totalPreguntas = 10;
    var totalPuntos = 11;
    
    var texto = document.getElementById('texto');
    texto.addEventListener('keypress', limite);
    texto.addEventListener('blur', contar);
    
    var tope = 100;
    
    var todoCorrecto= false;
    var primerIntento = true;
    
    var segundos = 0;
    var cronometro = document.getElementById("tiempo");
    
    function limite(e){
        var caracteres=texto.value.length+1;
        if(caracteres <= tope){
            var codigo = e.charCode || e.keyCode;
    		// Si la tecla es una tecla de función, control, alt o código ASCII < 32 no se filtra
    		if (codigo < 32 || e.charCode == 0 || e.ctrlKey || e.altKey) {
    			return; // No filtramos el evento
    		}else{
    		    texto.nextElementSibling.textContent= tope-caracteres;
    		}
        }else{
            e.preventDefault();
        }
    }
    
    function contar(e){
        var caracteres=texto.value.length;
        if(caracteres <= tope){
            var codigo = e.charCode || e.keyCode;
    		// Si la tecla es una tecla de función, control, alt o código ASCII < 32 no se filtra
    		if (codigo < 32 || e.charCode == 0 || e.ctrlKey || e.altKey) {
    			return; // No filtramos el evento
    		}else{
    		    texto.nextElementSibling.textContent= tope-caracteres;
    		}
        }else{
            e.preventDefault();
        }
    }
    
    function comprobarRadio(elementos){
        var result = false;
        var marcada=false;
        for(var i=0;i<elementos.length;i++){
            if(elementos[i].checked){
                marcada = true;
                if(elementos[i].value=='correcto'){
                    result = true;
                }    
            }
        }
        
        if(marcada){
            contestadas++;
        }else{
            noContestadas++;
        }
        
        if(result){
            aciertos++;
        }
        
        if(marcada){
            if(!result){
                errores++;
            }
        }
    }
    
    function comprobarTexto(elemento){
        var contenido = elemento.value.trim();
        
        if(contenido == ''){
            noContestadas++;
        }else{
            contestadas++;
            if(contenido.toLowerCase() == 'return'){
                aciertos++;
            }else{
                errores++;
            }
        }
    }
    
    function comprobarSelect(elemento){
        if(elemento.value == 'inicio'){
            noContestadas++;    
        }else{
            contestadas++;
            if(elemento.value == 'correcto'){
                aciertos++;
            }else{
                errores++;
            }
        }
    }
    
    function comprobarBoxes(elementos){
        var seleccionada = false;
        for(var i =0;i<elementos.length;i++){
            if(elementos[i].checked){
                seleccionada=true;
                if(elementos[i].value=='correcto'){
                    aciertos++;
                }else{
                    errores++;
                }
            }
        }
        if(seleccionada){
            contestadas++;
        }else{
            noContestadas++;
        }
    }
    
    function validarTest(e) {
        aciertos = 0;
        errores = 0;
        contestadas = 0;
        noContestadas = 0;
        
        e.preventDefault();
        comprobarRadio(document.getElementsByName('p1'));
        comprobarRadio(document.getElementsByName('p2'));
        var siP3 = comprobarBoxes(document.getElementsByName('p3[]'));
        var siP4 = comprobarSelect(document.getElementById('p4'));
        var siP5 = comprobarTexto(document.getElementById('p5'));
        comprobarRadio(document.getElementsByName('p6'));
        comprobarRadio(document.getElementsByName('p7'));
        comprobarRadio(document.getElementsByName('p8'));
        comprobarRadio(document.getElementsByName('p9'));
        comprobarRadio(document.getElementsByName('p11'));
        console.log(aciertos);
        console.log(errores);
        console.log(contestadas);
        console.log(noContestadas);
        var notaAciertos = aciertos/totalPuntos * 100;
        
        if(notaAciertos == 100){
            todoCorrecto = true;
        }else{
            primerIntento = false;   
        }
        
        info.textContent = 'Aciertos: '+aciertos+'/'+ totalPuntos +' Errores: '+errores+' Contestadas: '+contestadas
        +' No contestadas: '+noContestadas+' % Aciertos: '+notaAciertos+'%'
        +' Tiempo empleados: '+Math.trunc(segundos/3600)+'h'+Math.trunc(segundos/60)+'m'+segundos%60+'s';
        
        if(todoCorrecto){
            //formulario.submit(); //He comentado esto para que se vea claramente que es todo correcto
            document.getElementById('evaluar').setAttribute('disabled', true);
        }
        
        if(primerIntento == false){
            document.getElementById('evaluar').setAttribute('value','Reintentar');
        }
    }

        
    function borrarDatos(e){
        if(!confirm("¿Borrar datos del formulario?")){
            e.preventDefault();		
        }	
    }
    
    window.setInterval(function(){
      cronometro.innerHTML = segundos;
      segundos++;
    },1000);
}());