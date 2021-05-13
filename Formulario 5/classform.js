(function () {
    'use strict';
    class Formulario{
        
        constructor(formul){
            var that = this;
            this._formulario = formul;
            
            this._formulario.addEventListener('submit', function (e){
                that.validarFormulario(e, that);
            }); 
            
            this._formulario.addEventListener('reset', this.borrarDatos); 
            
            var inputs = this._formulario.getElementsByTagName("input");
        }
        
        comprobarNombre(elemento){
            var result = 1;
            elemento.nextElementSibling.textContent="";
            var patron = /^[a-zA-Z0-9]{3,15}$/;
            if(patron.test(elemento.value)){
                result = 0;
            }else{
                elemento.nextElementSibling.textContent="<---Nombre incorrecto";
            }
            return result;
        }
        
        comprobarEmail(elemento) {
            var result = 1;
            elemento.nextElementSibling.textContent="";
            var patron = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/;
            if(patron.test(elemento.value)){
                result = 0;
            }else{
                elemento.nextElementSibling.textContent="<---Email incorrecto";
            }
            return result; 
        }
        
        comprobarFoto(elemento) {
            var result = 1;
            elemento.nextElementSibling.textContent="";
            if(elemento.value == ''){
                elemento.nextElementSibling.textContent="<---Selecciona un archivo";
            }else{
                result = 0;
            }
            return result; 
        }
        
        comprobarContr(elemento) {
            var result = 1;
            elemento.nextElementSibling.textContent="";
            var patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])([^A-Za-z0-9\_]|[^ ]){6,15}$/;
            if(patron.test(elemento.value)){
                result = 0;
            }else{
                elemento.nextElementSibling.textContent="<--Clave incorrecta";
            }
            return result; 
        }
        
        comprobarCheckbox(elemento) {
            var result = 1;
            elemento.nextElementSibling.textContent="";
            if(!elemento.checked){
                elemento.nextElementSibling.textContent="<---Seleccioina para continuar";
            }else{
                result = 0;
            }
            return result; 
        }
        
        validarRadio(elemento){
            var nombre = elemento.name;
            var listaradios = this._formulario.querySelectorAll("input[type=radio][name="+nombre+"]");
            var result = 1;
            for(var i = 0 ; i < listaradios.length ; i++){
                if(listaradios[i].checked){
                    result = 0;
                }
            }

            if(result>0){
                listaradios[listaradios.length-1].nextElementSibling.textContent="<-----Selecciona al menos un elemento";
            }else{
                listaradios[listaradios.length-1].nextElementSibling.textContent="";
            }

            return result;
        }
        
        validarFormulario(e, contexto) {
            e.preventDefault();
            var seguir = 0;
            var inputs = this._formulario.getElementsByTagName("input");
            var selects = this._formulario.getElementsByTagName("select");
            
            for(var j = 0 ; j < inputs.length ; j++){
                if(inputs[j].type == 'text'){
                   seguir += contexto.comprobarNombre(inputs[j]);
                }
                
                if(inputs[j].type == 'file'){
                   seguir += contexto.comprobarFoto(inputs[j]);
                }
                
                if(inputs[j].type == 'password'){
                   seguir += contexto.comprobarContr(inputs[j]);
                }
            
                if(inputs[j].type == 'email'){
                   seguir += contexto.comprobarEmail(inputs[j]);
                }
                
                if(inputs[j].type == 'checkbox'){
                   seguir += contexto.comprobarCheckbox(inputs[j]);
                }
                
                if(inputs[j].type == 'radio'){
                   seguir += contexto.validarRadio(inputs[j]);
                }
                
            }
            
            for(var k = 0 ; k < selects.length ; k++){
                if(selects[k].value != ''){
                   seguir += 0;
                }else{
                    seguir +=1;
                }
            }
            
            console.log(seguir);
            
            if(seguir ==0){
                contexto._formulario.submit();
            }
        }
        
        borrarDatos(e){
            if(!confirm("¿Borrar datos del formulario?")){
                e.preventDefault();		
            }	
        }
    }
    
    const instanciaform = new Formulario(document.getElementById("fSencillo"));
}());