let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json())
 
require('./app/router/router.js')(app);

const db = require('./app/config/db.config.js');

const Role = db.role;
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
});
 
//require('./app/route/project.route.js')(app);
 
// Create a Server
let server = app.listen(9090, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})


function initial(){
	Role.create({
		id: 1,
		name: "USER"
	});
	
	Role.create({
		id: 2,
		name: "ADMIN"
	});
	
	Role.create({
		id: 3,
		name: "PM"
	});
}