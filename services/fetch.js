/* Logica del CRUD

C-> Create : POST
R-> Read : GET
U-> Update : PUT/PATCH
D-> Delete : DELETE
*/

/* El metodo GET (Obtener informacion de un endpoint)
Informacion que viene desde el db.json*/
export async function read(URL) {
    const data = await fetch(URL);
    return await data.json();
}

/* El metodo POST (Enviar nueva informacion mediante un endpoint) 
Informacion que sera almacenada en el db.json*/
export async function create(URL, data){
    const response = await fetch(URL,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    return await response.json();
}