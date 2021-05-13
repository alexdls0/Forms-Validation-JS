(function () {
    'use strict';
    var globalYear=0;
    var globalMonth=0;
    var globalDay=0;
    var num1 = parseInt(numeroAleatorio());
    var num2 = parseInt(numeroAleatorio());
    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;
    var formulario = document.getElementById("fSencillo");
    formulario.addEventListener('submit', validarFormulario); 
    formulario.addEventListener('reset', borrarDatos); 
    var inputs = document.getElementsByTagName("input"); 
        for (var i=0; i<inputs.length; i++){
           inputs[i].onchange = revisar;
        } 
        
    function numeroAleatorio(){
        return Math.random()*10;
    }
    
    function comprobarNombre(elemento){
        var result = false;
        elemento.nextElementSibling.textContent="";
        /*var patron = /^[0-9a-zA-ZÀ-ÿ]{3,15}$/;*/
        var patron = /^[a-zA-Z0-9]{3,15}$/;
        if(patron.test(elemento.value)){
            result = true;
        }else{
            elemento.nextElementSibling.textContent="Incorrecto";
        }
        return result;
    }
    
    function comprobarEmail(elemento) {
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
    
    function comprobarFoto(elemento) {
        var result = false;
        elemento.nextElementSibling.textContent="";
        if(elemento.value == ''){
            elemento.nextElementSibling.textContent="<---Incorrecto";
        }else{
            result = true;
        }
        return result; 
    }
    
    function comprobarContr(elemento) {
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
    
    function comprobarDobleCont(elemento) {
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
    
    function comprobarSuma(elemento) {
        var result = false;
        var contr = document.getElementById('suma').value;
        elemento.nextElementSibling.textContent="";
        if(elemento.value == (num1+num2)){
            result = true;
        }else{
            elemento.nextElementSibling.textContent="Incorrecto";
        }
        return result; 
    }
    
    function comprobarCondiciones(elemento) {
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
    
    /*function comprobarSexo(elementos, mensaje){
        var result = false;
        elementos[elementos.length-1].nextElementSibling.nextElementSibling.textContent="";
        for(var i=0;i<elementos.length;i++){
            if(elementos[i].checked){
                result = true;
                i==elementos.length;
            }
        }
        if(result==false){
            elementos[1].nextElementSibling.nextElementSibling.textContent="Debe seleccionar su género";
        }
        return result;
    }*/
    
    function comprobarSelect(elementos, mensaje){
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
    
    function comprobarFecha(elemento){
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
            año = globalYear;
            mes = globalMonth;
            dia = globalDay;
        }else{
            globalYear = año;
            globalMonth = mes;
            globalDay = dia;
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
    
    function validarFormulario(e) {
        e.preventDefault();
        var siNombre = comprobarNombre(document.getElementById('nombre'));
        var siEmail = comprobarEmail(document.getElementById('email'));
        var siContr = comprobarContr(document.getElementById('contraseña'));
        var siRepContr = comprobarDobleCont(document.getElementById('repcontr'));
        var siFoto = comprobarFoto(document.getElementById('foto'));
        var siSuma = comprobarSuma(document.getElementById('suma'));
        var siCondiciones = comprobarCondiciones(document.getElementById('condiciones'));
        var mensaje = 'Elija su sexo';
        /*var siSexo = comprobarSexo(document.getElementsByName('sexo'), mensaje);*/
        var siSexo = comprobarSelect(document.getElementsByName('sexo'), mensaje);
        var siFecha = comprobarFecha(document.getElementsByName('fecha'));
        
        if(siNombre && siEmail && siContr && siRepContr && siFoto && siSuma && siCondiciones && siSexo && siFecha){
            formulario.submit(); 
        }
    }
    
    function borrarDatos(e){
        if(!confirm("¿Borrar datos del formulario?")){
            e.preventDefault();		
        }	
    }
    
    function revisar(e){
        var id=e.target.getAttribute('id');
        
        if(id == 'nombre'){
            comprobarNombre(document.getElementById('nombre'));
        }
        if(id == 'email'){
            comprobarEmail(document.getElementById('email'));
        }
        if(id == 'contraseña'){
            comprobarContr(document.getElementById('contraseña'));
        }
        if(id == 'repcontr'){
            comprobarDobleCont(document.getElementById('repcontr'));
        }
        if(id == 'foto'){
            comprobarFoto(document.getElementById('foto'));
        }
        if(id == 'suma'){
            comprobarSuma(document.getElementById('suma'));
        }
        if(id == 'condiciones'){
            comprobarCondiciones(document.getElementById('condiciones'));
        }
        if(id == 'fecha'){
            comprobarFecha(document.getElementById('fecha'));
        }
        /*if(id == 'sexo'){
            var mensaje = 'Elija su sexo';
            comprobarSexo(document.getElementsByName('sexo'), mensaje);
        }*/
        if(id == 'sexo'){
            var mensaje = 'Elija su sexo';
            comprobarSelect(document.getElementsByName('sexo'), mensaje);
        }
    }
}());