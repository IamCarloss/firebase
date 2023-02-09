import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { collection, addDoc, doc, setDoc  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";


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

/* inputs utilizados  */
const ubicacion = document.getElementById('ubi');
const ubicacion2 = document.getElementById('ubi2');




/* botones */
const crear = document.getElementById('crear');
const logoogle = document.getElementById('logoogle');
const login = document.getElementById('login');
const cerrar = document.getElementById('cerrar');
const facebook = document.getElementById('facebook');
const guardar = document.getElementById('guar');
const modificar = document.getElementById('mod');
const mostrar = document.getElementById('mos');


/* parrafo */
document.getElementById("pp");


/* crear sesion */
crear.addEventListener('click', function () {
    createUserWithEmailAndPassword(auth, email.value, pass.value)
        .then((userCredential) => {
            
            const user = userCredential.user;
            alert ('sesion creada');
            document.getElementById('map').style.display ="none"
   
           
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
    alert('error porfavor vuelva a intentarlo');


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
  document.getElementById('pp').style.visibility  = 'hidden';


}).catch((error) => {
  alert (errorCode + ' + ' + errorMessage);
});


});



/* login de google */
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
    document.getElementById('pp').style.visibility  = 'visible';
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





/* login de facebook */
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
    document.getElementById('pp').style.visibility  = 'visible';
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



/* base de datos */
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


/* modificar.addEventListener(click, async()=> {
await setDoc(doc(db, "users" ), {
  nombre:`${NombreCom.value} `,
  Edad:`${Edd.value} `,
  sexo:`${genero.value} `,
  telefono:`${numero.value} `,
  correo:`${correo1.value} `
});
});
 */


  mostrar.addEventListener("click", function () {
    
  document.getElementById('map').style.visibility = "visible";
  mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtY2FybG9zZnQiLCJhIjoiY2xkdnV2cmF5MDE3bDNvanFmcGRqZ2d4cCJ9.ohJtRP33084CwLYUx-NT_w';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [1,2], // starting position [lng, lat]
    zoom: 1 // starting zoom
    

  });

  const marker1 = new mapboxgl.Marker()
  .setLngLat([1, 40])
  .addTo(map);


  const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
  .setLngLat([1, 40])
  .addTo(map);



 
map.on('load', () => {
// Load an image from an external URL.
map.loadImage(
'https://cdn-icons-png.flaticon.com/512/6830/6830714.png',
(error, image) => {
if (error) throw error;
 
// Add the image to the map style.
map.addImage('cat', image);
 
// Add a data source containing one point feature.
map.addSource('point', {
'type': 'geojson',
'data': {
'type': 'FeatureCollection',
'features': [
{
'type': 'Feature',
'geometry': {
'type': 'Point',
'coordinates': [-77.4144, 25.0759]
}
}
]
}
});
 
// Add a layer to use the image to represent the data.
map.addLayer({
'id': 'points',
'type': 'symbol',
'source': 'point', // reference the data source
'layout': {
'icon-image': 'cat', // reference the image
'icon-size': 0.25
}
});
}
);
});

});











