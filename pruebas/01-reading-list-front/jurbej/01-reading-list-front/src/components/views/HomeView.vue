<script setup>
import Book from '../Book.vue';
import booksData from './books.json';
import { onMounted, ref, watch } from 'vue';

const arrayLibros = booksData.library.map((data) => data.book)
const libros = ref(arrayLibros)
const listaLectura = ref([])
const generoSeleccionado = ref('todos');
const paginasSeleccionadas = ref('cualquiera');

const addListaLectura = (libroPulsado) => {
    if (listaLectura.value.includes(libroPulsado)) {
        listaLectura.value = listaLectura.value.filter(libro => libro.ISBN !== libroPulsado.ISBN)
        libros.value.push(libroPulsado)
        localStorage.setItem('listaLectura', JSON.stringify(listaLectura.value))
    } else {
        libros.value = libros.value.filter(libro => libro.ISBN !== libroPulsado.ISBN)
        listaLectura.value.push(libroPulsado)
        localStorage.setItem('listaLectura', JSON.stringify(listaLectura.value))
    }
}

const cargarListaDesdeLocalStorage = () => {
    const listaGuardada = localStorage.getItem('listaLectura');
    if (listaGuardada) {
        listaLectura.value = JSON.parse(listaGuardada);
        console.log(listaLectura.value);
        libros.value = arrayLibros.filter(libro => !listaLectura.value.some(libroLectura => libroLectura.ISBN === libro.ISBN));
    }
};

watch([generoSeleccionado, paginasSeleccionadas], ([nuevoGenero, nuevasPaginas]) => {
    // Muestra todos, quitando los que hay en listaLectura
    if (nuevoGenero === 'todos' && nuevasPaginas === 'cualquiera') {
        // Si se selecciona 'Todos' y 'Cualquiera', mostrar todos los libros
        libros.value = arrayLibros.filter(libro => !listaLectura.value.some(libroLectura => libroLectura.ISBN === libro.ISBN));
    } else {
        // Filtrar por el género y el filtro de páginas seleccionados
        libros.value = arrayLibros.filter(libro =>
            (nuevoGenero === 'todos' || libro.genre === nuevoGenero) &&
            (nuevasPaginas === 'cualquiera' || cumplirCriterioPaginas(libro, nuevasPaginas)) &&
            !listaLectura.value.some(libroLectura => libroLectura.ISBN === libro.ISBN)
        );
    }
})

const cumplirCriterioPaginas = (libro, criterio) => {
    // Lógica para verificar si el libro cumple con el criterio de páginas
    // En este caso, el criterio es el número de páginas o menos

    if (criterio === 'cualquiera') {
        // Si el criterio es 'cualquiera', se considera que cumple
        return true;
    }

    const limitePaginas = parseInt(criterio);

    // Comparar con el límite de páginas
    return libro.pages <= limitePaginas;
};

onMounted(() => {
    cargarListaDesdeLocalStorage();
})

// Escuchar cambios en el LocalStorage en todas las pestañas
window.addEventListener('storage', (event) => {
    if (event.key === 'readList') {
        readList.value = JSON.parse(event.newValue || '[]');
    }
    if (event.key === 'booksList') {
        booksList.value = JSON.parse(event.newValue || '[]');
    }
});
</script>

<template>
    <main>
        <div class="disponibles">
            <h2>{{ libros.length }} libros disponibles</h2>
            <h4 v-if="listaLectura.length > 0">{{ listaLectura.length }} en la lista de lectura</h4>
            <label for="genero">Filtrar por género</label>
            <select v-model="generoSeleccionado" name="genero" id="genero">
                <option value="todos">Todos</option>
                <option value="Fantasía">Fantasía</option>
                <option value="Ciencia ficción">Ciencia ficción</option>
                <option value="Zombies">Zombies</option>
                <option value="Terror">Terror</option>
            </select>

            <label for="paginas">Filtrar por número de páginas</label>
            <select v-model="paginasSeleccionadas" name="paginas" id="paginas">
                <option value="cualquiera">Cualquiera</option>
                <option value="300">300 páginas o menos</option>
                <option value="400">400 páginas o menos</option>
                <option value="1200">1200 páginas o menos</option>
            </select>
            <div class="libros container">
                <div v-for="libro in libros" :key="libro.ISBN">
                    <Book :imagen="libro.cover" :title="libro.title" @anadirLibro="addListaLectura(libro)"></Book>
                </div>
            </div>

        </div>
        <div class="lista-lectura" v-if="listaLectura.length > 0">
            <h2>Lista de lectura</h2>
            <div class="libros container">
                <div v-for="libro in listaLectura" :key="libro.ISBN">
                    <Book :imagen="libro.cover" :title="libro.title" @anadirLibro="addListaLectura(libro)"></Book>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    color: white;
}
</style>

<style>
body {
    background-color: black;
    font-family: Arial, sans-serif;
    padding: 1%;
}

.libros {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1%;
    row-gap: 1%;
}

.disponibles {
    float: left;
    width: 60%;
    border: 1px solid white;
    padding: 1%;
    padding-bottom: 3%;
}

.lista-lectura {
    float: right;
    width: 38%;
    border: 1px solid white;
    padding: 1%;
}
</style>