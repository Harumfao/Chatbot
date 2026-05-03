const url = "https://openlibrary.org/search.json?q=the+lord+of+the+rings";
//const url = "https://openlibrary.org/search.json?q=test";
const headers = new Headers({
    "usser": "programming (email@gmail.com)"
});

const options = {
    method: 'GET',
    headers: headers}
    
    let devolverLibro = "";

    // Funcion buscar libro en API
    async function getBook(search){
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.docs[0])
        devolverLibro = data.docs[0];
        console.log(devolverLibro)
    }; 
    
    getBook();

//Funcion buscador de géneros disponibles
const devolverGeneros = () => {
    let devolver = `Tenemos libros con los géneros `;
    const listaLibros = Object.values(libros);

    for (let i=0; i < listaLibros.length; i++) {
        devolver += listaLibros[i].generos + `,`;
    }
    return devolver;
} 
const libros = {
  principito: {
    nombre: 'El Principito, el principito',
    autor: 'Antoine de Saint-Exupéry',
    precio: 8500,
    stock: 17,
    generos: 'fábula, literatura infantil, filosófico, fantasía'
  },

  cienAnios: {
    nombre: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
    precio: 12000,
    stock: 16,
    generos: 'realismo mágico, novela literaria, saga familiar'

  },

  milNovecientos84: {
    nombre: '1984',
    autor: 'George Orwell',
    precio: 9800,
    stock: 15,
    generos: 'distopía, ciencia ficción, política, suspenso psicológico'
  },


};

const box = [3];
const intenciones  = [

    {
      tipo: 'saludos',
      palabras: ['hola', 'buenas', 'buen día', 'buen dia', 'qué tal', 'que tal', 'hey', 'que onda','oa','hi'],
      respuestas: [
        `¡Hola! ¿En qué te ayudo?`,
        `Buenas, dime tu consulta.`,
        `Hola, ¿En qué puedo ayudarte?`,
        `Acudí al llamado, ¿Qué necesitas?`,
        `Saludos, ¿En qué puedo guiarte?`

      ]
    },
    {
      tipo: 'cantidadBox',
      palabras: ['box', 'caja'],
      respuestas: [
        `Actualmente disponemos de ${box} boxes.`,
        `Disponemos de ${box} box ahora mismo, ¡pero llegarán más!`,
        `Enviando consulta... bip bip bip... tenemos ${box} box.`
      ]
    },
    {
      tipo: 'cantidadLibros',
      palabras: ['libro', 'libros', 'book', 'books'],
      respuestas:[
        `Actualmente contamos con ${libros.length} libros disponibles en nuestro catálogo.`,
        `Tenemos una escasa cantidad de ${libros.length} libros disponibles para consulta.`,
        `Contamos con ${libros.length} libros disponibles para préstamo o consulta.`
    ]
    },
    {
      tipo: 'El Principito',
      palabras: ['principito, el principito'],
      respuestas: [
        `Actualmente tenemos ${libros.principito.stock} libros a un valor de ${libros.principito.precio}`,
      ]
    },
    {
      tipo: 'Cien años de soledad',
      palabras: ['cien','Cien','Soledad','soledad'],
      respuestas: [
        `Actualmente tenemos ${libros.cienAnios.stock} libros a un valor de ${libros.cienAnios.precio}`,
      ]
    },
    {
      tipo: 'Mil novecientos',
      palabras: ['mil','Mil','novecientos','Novecientos'],
      respuestas: [
        `Actualmente tenemos ${libros.milNovecientos84.stock} libros a un valor de ${libros.milNovecientos84.precio}`,
      ]
    },
    {
      tipo: 'generos',
      palabras: [
          'generos', 'géneros'],
      respuestas: [
          'tenemos libros de realismo mágico, novela literaria, saga familiar, distopía, ciencia ficción, política, suspenso psicológico, fábula, literatura infantil, filosófico, fantasía',
          devolverGeneros(),

      ]
    },
    {
      tipo: 'easteregg',
      palabras: [
          'easteregg'],
      respuestas: [
          'Ella me espera más allá de la niebla. Mi reina, mi amor, mi corazón negro y roto.',
      ]
    },
    {
      tipo: 'search',
      palabras: [
          'search'],
      respuestas: [
        `Libro: ${devolverLibro.title}
Autor: ${devolverLibro.author_name}
Año de publicación: ${devolverLibro.first_publish_year}
Ediciones: ${devolverLibro.edition_count}
Stock: 35`
      ]
    }
];


export  {intenciones};
