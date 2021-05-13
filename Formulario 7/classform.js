(function () {
    'use strict';
    class Formulario{
        
        constructor(formul){
            var that = this;
            this._formulario = formul;
            
            this._formulario.addEventListener('submit', function (e){
                that.validarFormulario(e, that);
            }); 
            
        }
        
        comprobarNombre(elemento){
            var min = 5;
            if(elemento.getAttribute('data-min') != null){
                var min = parseInt(elemento.getAttribute('data-min'));    
            }
            
            var max = 30;
            if(elemento.getAttribute('data-max') != null){
                var max = parseInt(elemento.getAttribute('data-max'));
            }
            
            var valor = elemento.value;
            var longitud = parseInt(elemento.value.length);
            
            if(max<min){
                var aux = min;
                min = max;
                max = aux;
            }
            
            var result = 1;
            
            var patron = /^[A-Za-z\sÁÉÍÓÚñáéíóúÑ]+$/
            
            if(elemento.previousElementSibling.tagName =="SPAN"){
                elemento.previousElementSibling.textContent="";    
            }
            
            if(patron.test(elemento.value) && (longitud <= max) && (longitud >=min)){
                if(elemento.previousElementSibling.tagName =="SPAN"){
                    elemento.previousElementSibling.textContent="";    
                }
                result = 0;
            }else{
                var x = document.createElement("SPAN");
                var t = document.createTextNode('El nombre puede terner minúsculas, mayúsculas o espacios y de entre '+min+' y '+max+' caracteres.');
                x.appendChild(t);
                elemento.parentNode.insertBefore(x, elemento);
            }
            return result; 
        }
        
        comprobarApellidos(elemento){
            var min = 5;
            if(elemento.getAttribute('data-min') != null){
                var min = parseInt(elemento.getAttribute('data-min'));    
            }
            
            var max = 30;
            if(elemento.getAttribute('data-max') != null){
                var max = parseInt(elemento.getAttribute('data-max'));
            }
            
            var valor = elemento.value;
            var longitud = parseInt(elemento.value.length);
            
            if(max<min){
                var aux = min;
                min = max;
                max = aux;
            }
            
            var result = 1;
            
            var patron = /^[A-Za-z\sÁÉÍÓÚñáéíóúÑ]+$/
            
            if(elemento.previousElementSibling.tagName =="SPAN"){
                elemento.previousElementSibling.textContent="";    
            }
            
            if(patron.test(elemento.value) && (longitud <= max) && (longitud >=min)){
                if(elemento.previousElementSibling.tagName =="SPAN"){
                    elemento.previousElementSibling.textContent="";    
                }
                result = 0;
            }else{
                var x = document.createElement("SPAN");
                var t = document.createTextNode('Los apellidos pueden terner minúsculas, mayúsculas o espacios y de entre '+min+' y '+max+' caracteres.');
                x.appendChild(t);
                elemento.parentNode.insertBefore(x, elemento);
            }
            return result; 
        }
        
        comprobarAlias(elemento){
            var min = 5;
            if(elemento.getAttribute('data-min') != null){
                var min = parseInt(elemento.getAttribute('data-min'));    
            }
            
            var max = 30;
            if(elemento.getAttribute('data-max') != null){
                var max = parseInt(elemento.getAttribute('data-max'));
            }
            
            var valor = elemento.value;
            var longitud = parseInt(elemento.value.length);
            
            if(max<min){
                var aux = min;
                min = max;
                max = aux;
            }
            
            var result = 1;
            
            var patron = /^[A-Za-z0-9]+$/
            
            if(elemento.previousElementSibling.tagName =="SPAN"){
                elemento.previousElementSibling.textContent="";    
            }
            
            if(patron.test(elemento.value) && (longitud <= max) && (longitud >=min)){
                if(elemento.previousElementSibling.tagName =="SPAN"){
                    elemento.previousElementSibling.textContent="";    
                }
                result = 0;
            }else{
                var x = document.createElement("SPAN");
                var t = document.createTextNode('El alias puede terner minúsculas, mayúsculas y números y entre '+min+' y '+max+' caracteres.');
                x.appendChild(t);
                elemento.parentNode.insertBefore(x, elemento);
            }
            return result; 
        }
        
        comprobarDireccion(elemento){
            var min = 15;
            if(elemento.getAttribute('data-min') != null){
                var min = parseInt(elemento.getAttribute('data-min'));    
            }
            
            var max = 40;
            if(elemento.getAttribute('data-max') != null){
                var max = parseInt(elemento.getAttribute('data-max'));
            }
            
            var valor = elemento.value;
            var longitud = parseInt(elemento.value.length);
            
            if(max<min){
                var aux = min;
                min = max;
                max = aux;
            }
            
            var result = 1;
            
            var patron = /^[A-Za-z0-9\sÁÉÍÓÚñáéíóúÑñºª]+$/
            
            if(elemento.previousElementSibling.tagName =="SPAN"){
                elemento.previousElementSibling.textContent="";    
            }
            
            if(patron.test(elemento.value) && (longitud <= max) && (longitud >=min)){
                if(elemento.previousElementSibling.tagName =="SPAN"){
                    elemento.previousElementSibling.textContent="";    
                }
                result = 0;
            }else{
                var x = document.createElement("SPAN");
                var t = document.createTextNode('La dirección puede terner minúsculas, mayúsculas, espacios y números y entre '+min+' y '+max+' caracteres.');
                x.appendChild(t);
                elemento.parentNode.insertBefore(x, elemento);
            }
            return result; 
        }
        
        comprobarEmail(elemento) {
            var result = 1;
            
            if(elemento.previousElementSibling.tagName =="SPAN"){
                elemento.previousElementSibling.textContent="";    
            }
            
            var patron = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/;
            if(patron.test(elemento.value)){
                if(elemento.previousElementSibling.tagName =="SPAN"){
                    elemento.previousElementSibling.textContent="";    
                }
                result = 0;
            }else{
                var x = document.createElement("SPAN");
                var t = document.createTextNode('Correo no válido.');
                x.appendChild(t);
                elemento.parentNode.insertBefore(x, elemento);
            }
            return result; 
        }
        
        comprobarContr(elemento) {
            var result = 1;
            
            if(elemento.previousElementSibling.tagName =="SPAN"){
                elemento.previousElementSibling.textContent="";    
            }
            
            var patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])([^A-Za-z0-9\_]|[^ ]){6,15}$/;
            if(patron.test(elemento.value)){
                if(elemento.previousElementSibling.tagName =="SPAN"){
                    elemento.previousElementSibling.textContent="";    
                }
                result = 0;
            }else{
                var x = document.createElement("SPAN");
                var t = document.createTextNode('La clave debe contener al menos minúsculas, mayúsculas y números y de entre 6 a 15 caracteres.');
                x.appendChild(t);
                elemento.parentNode.insertBefore(x, elemento);
            }
            return result; 
        }
        
        comprobarClaveRep(elemento, parejaP) {
            var result = 1;
            
            var coincide = false;
            
            if(parejaP[0].value != null && parejaP[1].value == parejaP[0].value){
                coincide = true;
            }
            
            if(elemento.previousElementSibling.tagName =="SPAN"){
                elemento.previousElementSibling.textContent="";    
            }
            
            var patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])([^A-Za-z0-9\_]|[^ ]){6,15}$/;
            if(patron.test(elemento.value) && coincide){
                if(elemento.previousElementSibling.tagName =="SPAN"){
                    elemento.previousElementSibling.textContent="";    
                }
                result = 0;
            }else{
                var x = document.createElement("SPAN");
                var t = document.createTextNode('No cumple el patrón o no coincide.');
                x.appendChild(t);
                elemento.parentNode.insertBefore(x, elemento);
            }
            return result; 
        }
        
        comprobarFoto(elemento){
            var result = 1;
            
            if(elemento.previousElementSibling.tagName =="SPAN"){
                elemento.previousElementSibling.textContent="";    
            }
            
            if(elemento.value != ''){
                if(elemento.previousElementSibling.tagName =="SPAN"){
                    elemento.previousElementSibling.textContent="";    
                }
                result = 0;
            }else{
                var x = document.createElement("SPAN");
                var t = document.createTextNode("Foto requerida, asegurese de que tiene formato jpg, png o jpeg.");
                x.appendChild(t);
                elemento.parentNode.insertBefore(x, elemento);
            }
            return result; 
        }
        
        validarFormulario(e, contexto) {
            
            var seguir = 0;
            var inputs = this._formulario.getElementsByTagName("input");
            var botones = this._formulario.getElementsByClassName("validarbutton");
            var parejaclave = this._formulario.getElementsByClassName("parclave");

            for(var j = 0 ; j < inputs.length ; j++){
                
                if(inputs[j].classList.contains("validemail")){
                   seguir += contexto.comprobarEmail(inputs[j]);
                }
                
                if(inputs[j].classList.contains("validpass")){
                   seguir += contexto.comprobarContr(inputs[j]);
                }
                
                if(inputs[j].classList.contains("validname")){
                   seguir += contexto.comprobarNombre(inputs[j]);
                }
                
                if(inputs[j].classList.contains("validsurname")){
                   seguir += contexto.comprobarApellidos(inputs[j]);
                }
                
                if(inputs[j].classList.contains("validaslias")){
                   seguir += contexto.comprobarAlias(inputs[j]);
                }
                
                if(inputs[j].classList.contains("validaddress")){
                   seguir += contexto.comprobarDireccion(inputs[j]);
                }
                
                if(inputs[j].classList.contains("validpassrep")){
                   seguir += contexto.comprobarClaveRep(inputs[j], parejaclave);
                }
                
                if(inputs[j].type == 'file'){
                   seguir += contexto.comprobarFoto(inputs[j]);
                }
                
            }
            
            console.log(seguir);
            
            if(seguir !=0){
                
                e.preventDefault();
            }else{
                for(var x = 0 ; x < botones.length ; x++){
                    botones[x].disabled=false;
                }
            }
        }
    }
    
    var formularios = document.getElementsByClassName('validarForm');

    for (var i = 0; i < formularios.length; i++) {
        var instancia = new Formulario(formularios[i]);
    }
}());