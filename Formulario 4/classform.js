(function () {
    'use strict';
    class Formulario{
        
        constructor(formul){
            var that = this;
            this._formulario = formul;
            this._globalYear = 0;
            this._globalMonth = 0;
            this._globalDay = 0;
            this._num1 = parseInt(this.numeroAleatorio());
            this._num2 = parseInt(this.numeroAleatorio());
            document.getElementById('num1').textContent = this._num1;
            document.getElementById('num2').textContent = this._num2;
            this._formulario.addEventListener('submit', function (e){
                that.validarFormulario(e, that);
            }); 
            this._formulario.addEventListener('reset', this.borrarDatos); 
            var inputs = this._formulario.getElementsByTagName("input");
            for (var i=0; i<inputs.length; i++){
               inputs[i].addEventListener("change", function(e){
                    that.revisar(e, that);
               });
            }
        }
        
        numeroAleatorio(){
            return Math.random()*10;
        }
        
        comprobarNombre(elemento){
            var result = false;
            elemento.nextElementSibling.textContent="";
            //var patron = /^[0-9a-zA-ZÀ-ÿ]{3,15}$/;
            var patron = /^[a-zA-Z0-9]{3,15}$/;
            if(patron.test(elemento.value)){
                result = true;
            }else{
                elemento.nextElementSibling.textContent="Incorrecto";
            }
            return result;
        }
        
        comprobarEmail(elemento) {
            var result = false;
            elemento.nextElementSibling.textContent="";
            var patron = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/;
            if(patron.test(elemento.value)){
                result = true;
            }else{
                elemento.nextElementSibling.textContent="Incorrecto";
            }
            return result; 
        }
        
        comprobarFoto(elemento) {
            var result = false;
            elemento.nextElementSibling.textContent="";
            if(elemento.value == ''){
                elemento.nextElementSibling.textContent="<---Incorrecto";
            }else{
                result = true;
            }
            return result; 
        }
        
        comprobarContr(elemento) {
            var result = false;
            elemento.nextElementSibling.textContent="";
            var patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])([^A-Za-z0-9\_]|[^ ]){6,15}$/;
            if(patron.test(elemento.value)){
                result = true;
            }else{
                elemento.nextElementSibling.textContent="Incorrecto";
            }
            return result; 
        }
        
        comprobarDobleCont(elemento) {
            var result = false;
            var contr = document.getElementById('contraseña').value;
            elemento.nextElementSibling.textContent="";
            if(elemento.value == contr){
                result = true;
            }else{
                elemento.nextElementSibling.textContent="Incorrecto";
            }
            return result; 
        }
        
        comprobarSuma(elemento) {
            var result = false;
            var contr = document.getElementById('suma').value;
            elemento.nextElementSibling.textContent="";
            if(elemento.value == (this._num1+this._num2)){
                result = true;
            }else{
                elemento.nextElementSibling.textContent="Incorrecto";
            }
            return result; 
        }
        
        comprobarCondiciones(elemento) {
            var result = false;
            elemento.nextElementSibling.textContent="";
            if(elemento.checked == true){
                document.getElementById('cuenta').disabled=false;
                result = true;
            }else{
                document.getElementById('cuenta').disabled=true;
                elemento.nextElementSibling.textContent="<--Debe aceptar las condiciones para poder crear su cuenta";
            }
            return result; 
        }
        
        comprobarSelect(elementos, mensaje){
            var result = false;
            elementos[elementos.length-1].nextElementSibling.nextElementSibling.textContent="";
            for(var i=0;i<elementos.length;i++){
                if(elementos[i].checked){
                    result = true;
                    i==elementos.length;
                }
            }
            if(result==false){
                elementos[elementos.length-1].nextElementSibling.nextElementSibling.textContent=mensaje;
            }
            return result;
        }
        
        comprobarFecha(elemento){
            var result = false;
            document.getElementById('fechaError').textContent="";
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            
            var fecha = new Date(elemento.value);
            var año = fecha.getFullYear();
            var mes = fecha.getMonth();
            var dia = fecha.getDate();
            if(elemento.value==undefined){
                año = this._globalYear;
                mes = this._globalMonth;
                dia = this._globalDay;
            }else{
                this._globalYear = año;
                this._globalMonth = mes;
                this._globalDay = dia;
            }
            if((año+18)<year){
                result = true;
            }else{
                document.getElementById('fechaError').textContent="Debe ser una fecha correcta ma men y mayor de edad";
                if((año+18)==year){
                    if(mes<=month && dia <= day){
                        result = true;
                        document.getElementById('fechaError').textContent="";       
                    }else{
                        result = false;
                        document.getElementById('fechaError').textContent="Debe ser una fecha correcta y mayor de edad";
                    }
                }
            }
            return result;
        }
        
        validarFormulario(e, contexto) {
            e.preventDefault();
            var siNombre = contexto.comprobarNombre(document.getElementById('nombre'));
            var siEmail = contexto.comprobarEmail(document.getElementById('email'));
            var siContr = contexto.comprobarContr(document.getElementById('contraseña'));
            var siRepContr = contexto.comprobarDobleCont(document.getElementById('repcontr'));
            var siFoto = contexto.comprobarFoto(document.getElementById('foto'));
            var siSuma = contexto.comprobarSuma(document.getElementById('suma'));
            var siCondiciones = contexto.comprobarCondiciones(document.getElementById('condiciones'));
            var mensaje = 'Elija su sexo';
            var siSexo = contexto.comprobarSelect(document.getElementsByName('sexo'), mensaje);
            var siFecha = contexto.comprobarFecha(document.getElementsByName('fecha'));
            
            if(siNombre && siEmail && siContr && siRepContr && siFoto && siSuma && siCondiciones && siSexo && siFecha){
                contexto._formulario.submit(); 
            }
        }
        
        borrarDatos(e){
            if(!confirm("¿Borrar datos del formulario?")){
                e.preventDefault();		
            }	
        }
        
        revisar(e, contexto){
            var id=e.target.getAttribute('id');
            if(id == 'nombre'){
                contexto.comprobarNombre(document.getElementById('nombre'));
            }
            if(id == 'email'){
                contexto.comprobarEmail(document.getElementById('email'));
            }
            if(id == 'contraseña'){
                contexto.comprobarContr(document.getElementById('contraseña'));
            }
            if(id == 'repcontr'){
                contexto.comprobarDobleCont(document.getElementById('repcontr'));
            }
            if(id == 'foto'){
                contexto.comprobarFoto(document.getElementById('foto'));
            }
            if(id == 'suma'){
                contexto.comprobarSuma(document.getElementById('suma'));
            }
            if(id == 'condiciones'){
                contexto.comprobarCondiciones(document.getElementById('condiciones'));
            }
            if(id == 'fecha'){
                contexto.comprobarFecha(document.getElementById('fecha'));
            }
            //if(id == 'sexo'){
            //    var mensaje = 'Elija su sexo';
            //    comprobarSexo(document.getElementsByName('sexo'), mensaje);
            //}
            if(id == 'sexo'){
                var mensaje = 'Elija su sexo';
                contexto.comprobarSelect(document.getElementsByName('sexo'), mensaje);
            }
        }
    }
    
    const instanciaform = new Formulario(document.getElementById("fSencillo"));
}());