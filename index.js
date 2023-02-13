import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import {collection, addDoc, doc, setDoc, getDoc, updateDoc, getDocs, deleteDoc  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
/*  */


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
const providerGithub = new GithubAuthProvider();
////////////////////////////////////////////////////////
const email = document.getElementById('email');
const pass = document.getElementById('pass');
/* formulario */
const NombreCom = document.getElementById('nomCom');
const Edd = document.getElementById('edad');
const genero = document.getElementById('gene');
const numero = document.getElementById('num');
const correo = document.getElementById('correo');
/* inputs utilizados  */
/* const ubicacion = document.getElementById('ubi');
const ubicacion2 = document.getElementById('ubi2');
const IDinput = document.getElementById('IDInput'); */
/* botones */
const crear = document.getElementById('crear');
const logoogle = document.getElementById('logoogle');
const login = document.getElementById('login');
const cerrar = document.getElementById('cerrar');
const facebook = document.getElementById('facebook');
const guardar = document.getElementById('guar');
const modificar = document.getElementById('mod');
const mostrar = document.getElementById('mos');
const STATUS = document.getElementById('verBD');
const crearbtn = document.getElementById('creardn');
const carguar = document.getElementById('car-guar');
const borrar = document.getElementById('borrar');
const ocult_btn = document.getElementById('ocul');
const Github = document.getElementById('git');
const ocultbd = document.getElementById('oculBD')


/* otro elemento */
const tabla_base = document.getElementById('tabla_base');
const divtabla = document.getElementById('tabla_db');

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
    document.getElementById('git').style.visibility  = 'hiden';
    
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
  document.getElementById('git').style.visibility  = 'visible';


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
    document.getElementById('git').style.visibility  = 'hidden';
    

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
    document.getElementById('git').style.visibility  = 'hiden';
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


        Github.addEventListener('click', function(){
        signInWithPopup(auth, providerGithub)
          .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            document.getElementById('regi').style.visibility  = 'visible';
            document.getElementById('cerrar').style.visibility = 'visible';
            document.getElementById('pp').style.visibility  = 'visible';
            document.getElementById('login').style.visibility  = 'hidden';
            document.getElementById('crear').style.visibility  = 'hidden';
            document.getElementById('email').style.visibility  = 'hidden';
            document.getElementById('pass').style.visibility  = 'hidden';
            document.getElementById('logoogle').style.visibility  = 'hidden';
            document.getElementById('facebook').style.visibility  = 'hidden';
            document.getElementById('git').style.visibility  = 'hiden';

            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            // ...
          });
        });

document.getElementById("ocul").style.display = "none";
/* base de datos */
/* guardar.addEventListener("click", async() => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      nombre:'${NombreCom.value}',
      edad:'${Edd.value}',
      sexo:'${genero.value}',
      telefono:'${numero.value}',
      correo:'${correo1.value}'
      });
      document.getElementById('guar').style.display = 'none';

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    alert('error en la base de datos')
  }
});
 */

ocult_btn.addEventListener('click', function (){
  document.getElementById("mos") .style.display = "block"
  document.getElementById("ocul") .style.display = "none"
  document.getElementById("map") .style.display = "none"
  document.getElementById("myInput").value = "";

              
            })




 mostrar.addEventListener("click", function  () {
  document.getElementById("mos") .style.display = "none"
  document.getElementById("ocul") .style.display = "block"
  document.getElementById("map") .style.display = "block"
  document.getElementById('map').style.visibility = "visible";
  mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtY2FybG9zZnQiLCJhIjoiY2xkdnV2cmF5MDE3bDNvanFmcGRqZ2d4cCJ9.ohJtRP33084CwLYUx-NT_w';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [1,1], // starting position [lng, lat]
    zoom: 1 // starting 
   
    

  }); 

  
  


 
     map.on('load', () => {
// Load an image from an external URL.
map.loadImage(
'https://cdn-icons-png.flaticon.com/128/595/595562.png',
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
'coordinates': [1,1]
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
 

 
   crearbtn.addEventListener("click", async () => {
     try {
         await setDoc(doc(db, "users", NombreCom.value),
          {
                    
          nombre:NombreCom.value,
          edad:Edd.value,
          sexo:genero.value,
          telefono:numero.value,
          correo:correo.value
           });
                
             alert(`gracias ${NombreCom.value} ah sido agregado a la base de datos!`);
                } catch (error) {
                    alert('error desconocido');

                   
                }

            });



            ocultbd.addEventListener('click', function () {
              
              document.getElementById('tabla_db').style.display="none"
              document.getElementById('nomCom').value = "";
              document.getElementById('edad').value = "";
              document.getElementById('gene').value = "";
              document.getElementById('num').value = "";
              document.getElementById('correo').value = "";   
                            
            })



            
          STATUS.addEventListener("click", async () => {
            document.getElementById('tabla_db').style.display="block"
            document.getElementById('tabla_base').style.display="block"
            document.getElementById('oculBD').style.display="block"
        
        

         

              tabla_base.innerHTML =
               `<tr>
                    <td>id</td>
                    <td>nombre</td>
                    <td>edad</td>
                    <td>sexo</td>
                    <td>numero</td>
                    <td>correo</td>
                </tr>`;
                
            
    const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            
          console.log(doc.id, " => ", doc.data());
            tabla_base.innerHTML +=
              `<tr>
                  <td>${doc.id}</td>
                  <td>${doc.data().nombre}</td>
                  <td>${doc.data().edad}</td>
                  <td>${doc.data().sexo}</td>
                  <td>${doc.data().telefono}</td>
                  <td>${doc.data().correo}</td>
               </tr>`;
                });

                
            });
            



    cargar.addEventListener("click", async () => {
        const docRef = doc(db, "users", IDInput.value);
        const docSnap = await getDoc(docRef);
            
        if (docSnap.exists()) {
            NombreCom.value = docSnap.data().nombre;
            Edd.value = docSnap.data().edad;
            genero.value = docSnap.data().sexo;
            numero.value = docSnap.data().telefono;
            correo.value = docSnap.data().correo;
              alert("documento encontrado" );
          } 
          
        else {
                    
          alert("este docuemnto no existe en la base de datos");
            }
            
          });




          carguar.addEventListener("click", async() => {
            if (IDInput.value) {
              const elementRef = doc(db, "users", IDInput.value);
              await updateDoc(elementRef, {
                nombre: NombreCom.value,
                edad: Edd.value,
                sexo: genero.value,
                telefono: numero.value,
                correo: correo.value
              });
              alert("Cambios guardados");
            } else {
              alert("Ingrese una ID válida");
            }
          });
          



      


    
 





            



