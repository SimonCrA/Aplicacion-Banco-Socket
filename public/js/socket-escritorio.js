//Comando para establecer la conexion
var socket = io();

socket.on('connect', function () {
    console.log('conectado al servidor');
});
socket.on('disconnect', function () {
    console.log('Servidor desconectado, se perdió conexión con el servidor');

});

var  searchParams = new URLSearchParams( window.location.search );
console.log(searchParams);

if( !searchParams.has('escritorio') ){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
// var label = $('small');

// console.log(escritorio);

$('h1').text('Escritorio '+ escritorio);    
$('button').on('click', function(){
    socket.emit('atenderTicket', {escritorio: escritorio}, function(resp){
        
        if (resp === 'No hay Tickets.') {
            $('small').text(resp);
            alert(resp);
            return;
        };
        
        $('small').text( 'Ticket'+ resp.numero );

        

    });

    socket.emit('conexionViews', 'holaaa te estoy enviando');
});