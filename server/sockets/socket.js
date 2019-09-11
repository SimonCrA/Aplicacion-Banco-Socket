const { io } = require('../server');
const { Ticketcontrol } = require('../classes/ticket-control');

const ticketcontrol = new Ticketcontrol();


io.on('connection', (client) => {

    console.log('Usuario conectado');
    

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketcontrol.siguienteTicket();
        console.log('Creado, ', siguiente);
        callback(siguiente);

    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.emit('estadoActual',{
            actual: ticketcontrol.getEstadoActualTicket(),
            ultimos4tickets: ticketcontrol.getUltimos4Tickets()
        });

    
    client.on('atenderTicket', (data, callback)=>{

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'el escritorio es necesario'
            });
        }

        let atenderTicket = ticketcontrol.atenderTicket(data.escritorio);

        callback(atenderTicket);   
        
        //actualizar el view publico automaticamente
        client.broadcast.emit('ultimos4', {
            ultimos4tickets: ticketcontrol.getUltimos4Tickets()
        });

    })

});