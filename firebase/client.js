import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
      apiKey: "AIzaSyB76mU6VoTS2itf9lT4ct-1Fd1GllcDWN0",
      authDomain: "devter-1e5c1.firebaseapp.com",
      projectId: "devter-1e5c1",
      storageBucket: "devter-1e5c1.appspot.com",
      messagingSenderId: "895992773509",
      appId: "1:895992773509:web:ca16d8faf185d127b2e2ec",
      measurementId: "G-MS2TNVM6JT"
};

!firebase.apps.length &&
  firebase.initializeApp(firebaseConfig)//Si no tenemos otra app de firebase corriendo, entonces inicializa una.


const mapUserFromFirebaseAuthToUser = (user) => {
      const {displayName, email, photoURL } = user
    
      return {
        avatar: photoURL,
        username: displayName,
        email
      }
}

  //Para que firebase sepa cuando se cambia de estado.
  export const onAuthStateChanged = (onChange) => {
      return firebase
        .auth()
        .onAuthStateChanged(user => {
          const normalizedUser = mapUserFromFirebaseAuthToUser(user)
          onChange(normalizedUser)
        })
}

export const loginWithGitHub = () => { //(2)
      const githubProvider = new firebase.auth.GithubAuthProvider()
      return firebase
        .auth()
        .signInWithPopup(githubProvider)//(1)
      //   .then(mapUserFromFirebaseAuthToUser)
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