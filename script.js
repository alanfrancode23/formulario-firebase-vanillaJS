//Ejemplo de como debes configurar tu base de datos de firebase.
// const firebaseConfig = {
//     apiKey: "TU_API_KEY",
//     authDomain: "TU_DOMINIO.firebaseapp.com",
//     projectId: "TU_ID_DE_PROYECTO",
//     storageBucket: "TU_BUCKET.appspot.com",
//     messagingSenderId: "TU_SENDER_ID",
//     appId: "TU_APP_ID",
//     measurementId: "TU_MEASUREMENT_ID"
// };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault()

    //Validar  nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por favor, introduce tu nombre'
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //Validar correo
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, introduce un emial válido'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    //Validar contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if(!contrasenaPattern.test(contrasenaEntrada.value)){
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales'
        contrasenaError.classList.add('error-message')
    }else{
        contrasenaError.textContent = ''      
        contrasenaError.classList.remove('error-message')
    }

    //Si todos los campos son correctos se manda el formulario
    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){

        //BACKEND que recibe la información
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            //alert('El formulario se ha enviado con éxito', docRef.id)
            alert('El formulario se ha enviado con éxito. ID del documento: ' + docRef.id);
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });

        
    }

});
