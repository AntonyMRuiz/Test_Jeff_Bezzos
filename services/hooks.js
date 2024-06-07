import { read } from "./fetch.js";
import { URL_USERS } from "./route.js";

(() => {

    /* Obtenemos el ID usuario logeado, que debe esta en el LocalStorage */
    const userId = localStorage.getItem("userId");

    /* Verificamos que ese Id, si pertenezca a un usuario */
    const userData = read(`${URL_USERS}/${userId}`)

    /* Si no pertenece a ningun usuario, evitar el acceso a ruta privadas */
    if (userData) {
        alert("NO ESTAS LOGUEADO");
        /* Lo redireccionamos al login */
        window.location.href = "login.html"
    } else {

        /* Es la ruta, sin la ruta raiz, de donde se esta ejecutando */
        const path = window.location.pathname;

        /* Es el nombre del archivo en donde se esta mirando */
        const file = path.substring(path.lastIndexOf("/") + 1);

        /* Metodos de los string */
        /* ("/view/register.html").lastIndexOf("/") */
        /* ("/view/register.html").substring(2) */

        /* Rutas privadas para el admin */
        const routeAdmin = ["admin.html", "register.html"]
        /* Rutas privadas para el visitante */
        const routeVisitor = ["visitor.html"]

        /* Dependiendo al role, se verifica si tiene acceso o no a la ruta donde esta */
        switch (userData["role"]) {
            case "admin":
                if (!routeAdmin.includes(file)) {
                    alert("NO tienes permiso")
                    /* Lo redireccionamos al home */
                    window.location.href = "../index.html"
                }
                break;

            case "visitor":
                if (!routeVisitor.includes(file)) {
                    alert("NO tienes permiso")
                    /* Lo redireccionamos al home */
                    window.location.href = "../index.html"
                }
                break;

            default:
                alert("Permisos invalidos")
                /* Lo redireccinamos al home */
                window.location.href = "../index.html"
                break;
        }
    }

}
)()