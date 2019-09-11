const fs = require( 'fs');

class Ticket  {

    constructor(numero, escritorio){

        this.numero = numero;
        this.escritorio = escritorio;


    };

}


class Ticketcontrol {

    constructor() {

        this.ultimoTicket = 0;
        this.hoy = new Date().getDate();
        let data = require('../data/data.json');
        this.tickets = [];
        this.ultimos4Tickets = [];
        
        if (data.hoy === this.hoy) {
            this.ultimoTicket = data.ultimoTicket;
            this.tickets = data.tickets;
            this.ultimos4Tickets = data.ultimos4Tickets;
        } else {
            this.reiniciarconteo();
        }
        
    };

    siguienteTicket(){

        this.ultimoTicket += 1;

        let ticket = new Ticket(this.ultimoTicket, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimoTicket }`

    };

    getEstadoActualTicket(){
        return `Ticket ${ this.ultimoTicket }`
    };

    getUltimos4Tickets() {
        return this.ultimos4Tickets;
    };

    atenderTicket( escritorio ){
        if (this.tickets.length === 0){
            return 'No hay Tickets.'
        }
        // this.ultimos4Tickets = [];
        //remover el primer elemento del array, porque este pasará a ser atendido
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        //Permite ir añadiendo nuevos elementos pero al inicio,
        // haciendo que los otros elementos se corran
        // console.log(atenderTicket);
        this.ultimos4Tickets.unshift(atenderTicket);

        if (this.ultimos4Tickets.length >4) {
            //borrar el ultimo elemento del array.
            console.log('hola');
            this.ultimos4Tickets.splice(-1,1);
        }
        console.log('ultimos 4 tickets');
        console.log(this.ultimos4Tickets);
        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarconteo(){
        this.tickets = [];
        this.ultimos4Tickets = [];
        this.ultimo = 0;
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    };

    grabarArchivo(){
        let jsonData = {
            ultimoTicket: this.ultimoTicket,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4Tickets: this.ultimos4Tickets
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
 
    };


};

module.exports = {
    Ticketcontrol
}