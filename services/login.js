import { read } from "./fetch.js";
import { URL_USERS } from "./route.js";

/* Seleccionamos los inputs y el formulario */
const email = document.getElementById("email1");
const password = document.getElementById("password1");
const loginForm = document.getElementById("loginForm");

/* Escuchamos el evento submit del formulario para iniciar sesion */
loginForm.addEventListener("submit", async (event)=>{
    /* Prevenimos que la pagina se recarge cada vez que le den al
        boton de login */
    event.preventDefault();

    /* Verificamos que exista un usuario con ese email */
    const user = await read(URL_USERS+"?email="+email.value.toLowerCase());

    /* Si no existe nadie con ese correo, darle una alerta y no hacer nada */
    if (user.length > 0) {
        /* Si existe alguien que tenga ese correo,
         Hay que validar que la contraseña sea misma a la guardada
         de lo contrario darle alerta y no hacer nada */
        if (user[0]["password"] == password.value) {

            /* SI pasa todas las validaciones, darle un mensaje y
                redireccionar dependiendo su rol */
            alert("Pasaste las credenciales");

            /* Para la session activa, toca guardar el id de el 
            usuario que se acaba de logear */
            localStorage.setItem("userId",user[0]["id"])

            /* Dependiendo al rol se manda a la pagina correspondiente */
            switch (user[0]["role"]) {
                case "admin":
                        window.location.href = "admin.html"
                    break;
            
                case "visitor":
                        window.location.href = "visitor.html"
                    break;

            }
            
        } else {
            alert("Contraseña invalida")
        }
    }else {
        alert("Usuario not found")
    }
})