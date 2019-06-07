var http = require('http');

var cron = require('node-cron');

var moment = require('moment');


module.exports.getRegistersByDate = () => {

	var today = moment().format('DD-MM-YYYY');

	var task = cron.schedule('15 02 * * *', () => {
    	http.get( 'http://localhost:3000/register/' + today, (res) => {
		
    		let data = '';

 			// A chunk of data has been recieved.
 			res.on('data', (chunk) => {
 				data += chunk;
 			});
				
 			res.on('end', () => {
				//  console.log(JSON.parse(data).registers[0].street);
				//  console.log(JSON.stringify(JSON.parse(data).registers));

				postData( data );
				 
 			});
 		});
	});
	task.start();

};


function postData( data ) {

	var numNotif = JSON.parse(data).registers;

	numNotif.forEach( (num, i) => {

		const valor = JSON.stringify({
			name: JSON.parse(data).registers[i].name,
			street: JSON.parse(data).registers[i].street
			})

			var options = {
			protocol: 'http:',
			host: '127.0.0.1',
			port: 3000,
			path: '/notification/push',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': valor.length
			}
		};

			const req = http.request(options, (res) => {
			// console.log(`statusCode: ${res.statusCode}`);
		
			res.on('data', (d) => {
				// process.stdout.write(d);
			});
			});

			req.on('error', (error) => {
			console.error(error);
			})
			req.write(valor);
			req.end();

	});

}