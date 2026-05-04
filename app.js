const url = "https://openlibrary.org/search.json?q=the+lord+of+the+rings";
//const url = "https://openlibrary.org/search.json?q=test";
const headers = new Headers({
    "usser": "programming (email@gmail.com)"
});

const options = {
    method: 'GET',
    headers: headers}

import {intenciones} from "./intenciones.js";

let lastResp = "";

// Funcion buscar libro en API
    async function getBook(search){
        const res = await fetch(url);
        const data = await res.json();
        return data.docs[0];
    };

// Abrir chatbot
const btnChat = document.querySelector('#btn-chat');
const chatContainer = document.querySelector('.chat-container');

btnChat.addEventListener('click', () => {
    chatContainer.classList.toggle('abierto');
});
//Cerrar btn
const btnClose = document.querySelector('#close');

btnClose.addEventListener('click', () => {
    chatContainer.classList.remove('abierto');
});


const input = document.querySelector('#user-ask');
const form = document.querySelector('form');
const chat = document.querySelector('#chat');



//Entrada y salida de mensaje
form.addEventListener('submit', async (e)=> {
    console.log("SE ENVIO EL FORM");
    e.preventDefault();  
    const texto = input.value;
    lastResp = texto;

    if (texto.trim() === '') return;

    responder('Usuario', texto);

    const mensaje = texto.toLowerCase();

    // Coordenadas
if (
    mensaje.includes("coordenadas") ||
    mensaje.includes("ubicacion") ||
    mensaje.includes("ubicación") ||
    mensaje.includes("donde estoy") ||
    mensaje.includes("mi ubicacion")
) {
console.log("ENTRO A COORDENADAS");

    responder('Bot', "Obteniendo tu ubicación... "); // 

    setTimeout(() => {
        obtenerCoordenadas();
    }, 1000);


    } else {
        const respuesta = await obtenerRespuesta(texto);

        setTimeout(() => {
            responder('Bot', respuesta);
        }, 1300);
    }

    input.value = '';
});

//Funciones

const responder = (remitente, mensaje) => {
    const tipo = remitente === 'Usuario' ? 'user' : 'bot';

    const msg = document.createElement('div');
    msg.classList.add('message', tipo);
    msg.textContent = mensaje;

    chat.appendChild(msg);

    chat.scrollTop = chat.scrollHeight;
}

// const responder = (remitente, mensaje) =>{
//     const clase = remitente === `Usuario` ? `usser_message` : `bot_message`;
//     chat.innerHTML += `<p class= ${clase} ><strong>${remitente}:</strong> ${mensaje} </p>`;
//     chat.scrollTop = chat.scrollHeight;
// }

const obtenerRespuesta = async (texto) => {
    const mensaje = texto.toLowerCase().trim();

    for (let intencion of intenciones) {
        for (let palabra of intencion.palabras) {
          if (mensaje.includes(palabra)) {
            if (intencion.tipo === `search`){
                const libros = await getBook();
                return `Libro: ${libros.title} \n
                Autor: ${libros.author_name} \n
                Año de publicación: ${libros.first_publish_year} \n
                Ediciones: ${libros.edition_count} \n
                Stock: 35`;
            }
            const indice = Math.floor(Math.random() * intencion.respuestas.length);
              return intencion.respuestas[indice];
          }
        }
    }

    input.value = '';
    return 'No entendí tu consulta. ¿Qué buscas?';

}

function obtenerCoordenadas() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                responder('Bot', `Tus coordenadas son:
Latitud: ${lat}
Longitud: ${lon}`);
            },
            (error) => {
                responder('Bot', "No pude obtener tu ubicación");
                console.error(error);
            }
        );
    } else {
        responder('Bot', "Tu navegador no soporta geolocalización");
    }
}