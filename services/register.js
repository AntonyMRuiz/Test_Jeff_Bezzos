import { create, read } from "./fetch.js";
import { URL_USERS } from "./route.js";

/* Hacer la refencia de los input que contendran la informacion del usuario */
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const dobInput = document.getElementById("dob");
const registerForm = document.getElementById("registerForm");

/* Se agregara el evento submit al formulario, para poder crear el usuario nuevo */
registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    validation();
})

/* Hace es verificar que el email a registrar no exista en la base de datos */
async function validation() {
    /* Un fetch de tipo GET */
    const data = await read(`${URL_USERS}?email=${emailInput.value.toLowerCase()}`);
    /* Si la lista de coincidencias no esta vacia, paramos la creacion
        del nuevo usuario */
    if (data.length > 0) {
        alert("Email already is resgistered");
        return;
    }
    /* Si no hay nadie con ese email, permitir la creacion del usuario */
    createUser();
}

/* Crea un usuario a partir de la informacion de los inputs */
async function createUser() {
    /* yyyy-mm-dd 
    [0]-> year 
    [1]-> month 
    [2]-> day  */
    const dateInput = dobInput.split("-")
    const month = dateInput[1]
    const year = dateInput[0]
    const date = new Date();
    
    if (year > date.getFullYear()-18 || 
    ( year == date.getFullYear()-18 && month > date.getMonth())) {
        alert("Es menor de edad")
        return;
    }

    /* Crea un objeto para facilitar el envio de informacion al funcion Create */
    const user = {
        "name": nameInput.value,
        "email": emailInput.value.toLowerCase(),
        "dob": dobInput.value,
        "password": passwordInput.value,
        "role": "visitor" /* Por defecto todos lo usuarios tendran el rol visitor */
    }

    /* Se envia la informacion a la base de datos */
    const data = await create(URL_USERS, user);

    /* Si todo ocurrio exitosamente, mostrarle una alerta al admin */
    alert(data["name"] + " is already registered");
};
