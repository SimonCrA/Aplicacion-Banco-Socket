
//Comando para establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function(){
    console.log('conectado al servidor');
});
socket.on('disconnect', function(){
    console.log('Servidor desconectado, se perdió conexión con el servidor');

});

socket.on('estadoActual', function(mensaje){
    console.log(mensaje);
    // let estado = mensaje.actual;
    label.text(mensaje.actual);
});



$('button').on('click', function(){
    console.log('clicked');
    socket.emit('siguienteTicket', null, function(dataTicket){

        label.text(dataTicket);

    });
});
