import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDXvnbUi0N_Y-rWdc8hqBreQ1FfW969P3E",
    authDomain: "practica-7def9.firebaseapp.com",
    projectId: "practica-7def9",
    storageBucket: "practica-7def9.appspot.com",
    messagingSenderId: "578046887384",
    appId: "1:578046887384:web:4077df8728def6981e5ead",
    measurementId: "G-4FXGTJWG76"
  };

  


/* firebase */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();



const email = document.getElementById('email');
const pass = document.getElementById('pass');
/* const cerr = document.getElementById('cerrr'); */

/* formulario */
const NombreCom = document.getElementById('nomCom');
const Edd = document.getElementById('edad');
const genero = document.getElementById('gene');
const numero = document.getElementById('num');
const correo1 = document.getElementById('correo');


/* botones */
const crear = document.getElementById('crear');
const logoogle = document.getElementById('logoogle');
const login = document.getElementById('login');
const cerrar = document.getElementById('cerrar');
const facebook = document.getElementById('facebook');
const guardar = document.getElementById('guar');



document.getElementById("pp");


/* crear sesion */
crear.addEventListener('click', function () {
    createUserWithEmailAndPassword(auth, email.value, pass.value)
        .then((userCredential) => {
            
            const user = userCredential.user;
            alert ('sesion creada');
   
           
        })


        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
           
            if (error.code === 'auth/invalid-email') {
              alert ('el email es inavlido ')
              
            }
            else if(error.code === 'auth/weak-password'){
              alert('el password debe de contener al menos 6 digitos pendejo')}
        
           
        });
          });




/* iniciar sesion */
login.addEventListener("click", function(){
signInWithEmailAndPassword(auth, email.value, pass.value)
  .then((userCredential) => {
  
    const user = userCredential.user;
    alert ('sesion iniciada');
    document.getElementById('regi').style.visibility  = 'visible';
    document.getElementById('cerrar').style.visibility = 'visible';
    document.getElementById('login').style.visibility  = 'hidden';
    document.getElementById('crear').style.visibility  = 'hidden';
    document.getElementById('email').style.visibility  = 'hidden';
    document.getElementById('pass').style.visibility  = 'hidden';
    document.getElementById('logoogle').style.visibility  = 'hidden';
    document.getElementById('facebook').style.visibility  = 'hidden';
    document.getElementById('pp').style.visibility  = 'visible';
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;


    if (errorCode === auth/invalid-email) {
      alert('el email no valido debe de contener "@" ".com"')
      
    }
    else if(errorCode === auth/weak-password ){
      alert('el password debe de contener al menos 6 digitos')
    }


  });

    });
  
  
/* cerrar sesion */

cerrar.addEventListener("click", function() {
signOut(auth).then(() => {
  alert('sesion cerrada perfectamente')
  document.getElementById('regi').style.visibility  = 'hidden';
  document.getElementById('cerrar').style.visibility  = 'hidden';
  document.getElementById('login').style.visibility  = 'visible';
  document.getElementById('crear').style.visibility  = 'visible';
  document.getElementById('email').style.visibility  = 'visible';
  document.getElementById('pass').style.visibility  = 'visible';
  document.getElementById('logoogle').style.visibility  = 'visible';
  document.getElementById('facebook').style.visibility  = 'visible';


}).catch((error) => {
  alert (errorCode + ' + ' + errorMessage);
});


});





logoogle.addEventListener('click', function(){
signInWithPopup(auth, providerGoogle)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    document.getElementById('regi').style.visibility  = 'visible';
    document.getElementById('cerrar').style.visibility = 'visible';
    document.getElementById('login').style.visibility  = 'hidden';
    document.getElementById('crear').style.visibility  = 'hidden';
    document.getElementById('email').style.visibility  = 'hidden';
    document.getElementById('pass').style.visibility  = 'hidden';
    document.getElementById('logoogle').style.visibility  = 'hidden';
    document.getElementById('facebook').style.visibility  = 'hidden';

    // ...
    alert('sesion creada')
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    
    // ...
    alert('error al intentar iniciar sesion')
  });

});


guardar.addEventListener("click", async() => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      nombre:`${NombreCom.value} `,
      Edad:`${Edd.value} `,
      sexo:`${genero.value} `,
      telefono:`${numero.value} `,
      correo:`${correo1.value} `
      });
      document.getElementById('guar').style.display = 'none';

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    alert('no jalo')
  }
});



facebook.addEventListener('click', function(){
  signInWithPopup(auth, providerFacebook)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    document.getElementById('regi').style.visibility  = 'visible';
    document.getElementById('cerrar').style.visibility = 'visible';
    document.getElementById('login').style.visibility  = 'hidden';
    document.getElementById('crear').style.visibility  = 'hidden';
    document.getElementById('email').style.visibility  = 'hidden';
    document.getElementById('pass').style.visibility  = 'hidden';
    document.getElementById('logoogle').style.visibility  = 'hidden';
    document.getElementById('facebook').style.visibility  = 'hidden';

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
})








