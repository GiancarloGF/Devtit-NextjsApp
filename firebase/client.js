import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyB76mU6VoTS2itf9lT4ct-1Fd1GllcDWN0',
	authDomain: 'devter-1e5c1.firebaseapp.com',
	projectId: 'devter-1e5c1',
	storageBucket: 'devter-1e5c1.appspot.com',
	messagingSenderId: '895992773509',
	appId: '1:895992773509:web:ca16d8faf185d127b2e2ec',
	measurementId: 'G-MS2TNVM6JT'
};

!firebase.apps.length &&
  firebase.initializeApp(firebaseConfig);//Si no tenemos otra app de firebase corriendo, entonces inicializa una.

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
	const {displayName, email, photoURL,uid } = user;
    
	return {
		avatar: photoURL,
		username: displayName,
		email,
		uid
	};
};

//Para que firebase sepa cuando se cambia de estado.
export const onAuthStateChanged = (onChange) => {
	return firebase
		.auth()
		.onAuthStateChanged(user => {
			const normalizedUser =user? mapUserFromFirebaseAuthToUser(user): null; //(3)
			onChange(normalizedUser);
		});
};

export const loginWithGitHub = () => { //(2)
	const githubProvider = new firebase.auth.GithubAuthProvider();
	return firebase
		.auth()
		.signInWithPopup(githubProvider);//(1)
	//   .then(mapUserFromFirebaseAuthToUser)
};



export const addDevit = ({ avatar, content, userId, userName }) => { //4
	return db.collection('devits').add({// devuelve una promesa.
		avatar,
		content,
		userId,
		userName,
		createdAt: firebase.firestore.Timestamp.fromDate(new Date()),//Timestamp compatible con firestore con la fecha actual.
		likesCount: 0,
		sharedCount: 0,
	});
};


export const fetchLatestDevits=()=>{
	return db.collection('devits').get().then(({docs})=>{
	
		return docs.map(doc=>{
			const data=doc.data(); //Nos trae la data no procesada. No devuelve el id.
			const id=doc.id; // Nos trae el id que se encuentra solo.
			const {createdAt}=data;
			const date = new Date(createdAt.seconds * 1000)//A new date se le pasan milisegundos. Si tienes segundos, se tiene que convertir.
       		const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(date)

			return {
			...data,
			id,
			createdAt: normalizedCreatedAt,
			}
			})

	})
}

{/** 1
Devuelve una promesa.
La primera vez que alguien se loguea, se llamara el metodo onAuthStateChanged
 desde el useEffect, por lo que este llama a mapUserFromFirebaseAuthToUser. Entonces, ya 
 no es necesario el .then(mapUserFromFirebaseAuthToUser)
*/}

{/** 2
Cuando un usuario se logea, la sesion se guarda en devtoolls/Application/Storage/IndexedDB
*/}

{/** 3

Tenemos que realizar esa validacion para no llamar al evento si es que nos logeamos(user===null). De no hacerlo, se llamara 
mapUserFromFirebaseAuthToUser y no se podra reconocer el null que se le pasa.
*/}

{/**4
db.collection('[nombre de coleccion]').add([objeto a enviar])

 */}

 {/**5
	Nos devuelve una promesa, pero son datos objetos complejos que se deben de procesar.
 */}