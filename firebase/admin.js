
var admin = require('firebase-admin'); //Instalarlo previamente. npm i firebase admin

var serviceAccount = require('./firebase-keys.json'); //Objetos con muchos keys, hay encriptados, etc.



try {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: process.env.FIREBASE_DATABASE_URL,
	});
  
} catch (e) {

	console.log(e);
}


  


export const firestore=admin.firestore(); //Nos exporta solo el servicio de fs.





