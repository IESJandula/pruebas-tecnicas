<template>
    <div>
      <h1>Libros de lectura</h1>
      <div class="filters">
        <label for="pages-filter">Filtrar por número de páginas:</label>
        <select id="pages-filter" v-model="selectedPages" @change="filterBooks">
          <option value="">Todos</option>
          <option v-for="pages in pageOptions" :value="pages">{{ pages }} páginas o más</option>
        </select>
        <label for="genre-filter">Filtrar por género:</label>
        <select id="genre-filter" v-model="selectedGenre" @change="filterBooks">
          <option value="">Todos</option>
          <option v-for="genre in uniqueGenres" :value="genre">{{ genre }}</option>
        </select>
      </div>
      <div class="container">
        <div class="left-column">
          <h2>Disponibles</h2>
          <div class="books-container">
            <Book v-for="(book, index) in filteredAvailableBooks" :key="'available-' + index" :book="book" @click="moveToReading(index)"/>
          </div>
        </div>
        <div class="right-column">
          <h2>Leyendo actualmente</h2>
          <div class="books-container">
            <Book v-for="(book, index) in filteredReadingBooks" :key="'reading-' + index" :book="book" @click="moveToAvailable(index)"/>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Book from '../components/Book.vue';
  import { ref, onMounted, watch } from 'vue';
  import booksData from '../books.json';
  
  const availableBooks = ref([]);
  const readingBooks = ref([]);
  const selectedPages = ref('');
  const selectedGenre = ref('');
  const pageOptions = ref([]);
  const uniqueGenres = ref([]);
  
  const loadAvailableBooks = () => {
    const storedAvailableBooks = localStorage.getItem('availableBooks');
    if (!storedAvailableBooks) {
      availableBooks.value = booksData.library.map(item => item.book);
    } else {
      availableBooks.value = JSON.parse(storedAvailableBooks);
    }
  }
  
  const moveToReading = (index) => {
    const bookToMove = availableBooks.value[index];
    readingBooks.value.push(bookToMove);
    availableBooks.value.splice(index, 1);
    updateLocalStorage();
    // Después de actualizar, también debes llamar a filterBooks() para refrescar los libros filtrados
    filterBooks();
}
  
const moveToAvailable = (index) => {
    const bookToMove = readingBooks.value[index];
    availableBooks.value.push(bookToMove);
    readingBooks.value.splice(index, 1);
    updateLocalStorage();
    // Después de actualizar, también debes llamar a filterBooks() para refrescar los libros filtrados
    filterBooks();
}
  
  
  const updateLocalStorage = () => {
    localStorage.setItem('readingBooks', JSON.stringify(readingBooks.value));
    localStorage.setItem('availableBooks', JSON.stringify(availableBooks.value));
  }
  
  const filterBooks = () => {
    filteredAvailableBooks.value = availableBooks.value.filter(book => {
      return (!selectedPages.value || book.pages >= parseInt(selectedPages.value)) &&
             (!selectedGenre.value || book.genre === selectedGenre.value);
  });
  
    filteredReadingBooks.value = readingBooks.value.filter(book => {
      return (!selectedPages.value || book.pages >= parseInt(selectedPages.value)) &&
             (!selectedGenre.value || book.genre === selectedGenre.value);
  });
  
  }
  
  onMounted(() => {
    loadAvailableBooks();
    const storedReadingBooks = localStorage.getItem('readingBooks');
    if (storedReadingBooks) {
      readingBooks.value = JSON.parse(storedReadingBooks);
    }
  
    // Crear opciones de páginas
    const allPages = booksData.library.map(item => item.book.pages);
    const maxPages = Math.max(...allPages);
    for (let i = 100; i <= maxPages; i += 100) {
      pageOptions.value.push(i);
    }
  
    // Crear lista de géneros únicos
    uniqueGenres.value = Array.from(new Set(booksData.library.map(item => item.book.genre)));
  
    // Inicializar los libros filtrados
    filterBooks();
  });
  
  watch(readingBooks, (newValue) => {
    updateLocalStorage();
  });
  
  watch([selectedPages, selectedGenre], () => {
    filterBooks();
  });
  
  const filteredAvailableBooks = ref([]);
  const filteredReadingBooks = ref([]);
  </script>
  
  <style scoped>
  .container {
    display: flex;
  }
  
  .left-column, .right-column {
    flex: 1;
    padding: 0 10px;
  }
  
  .books-container {
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(4,1fr);
  }
  
  h1, h2 {
    text-align: center;
  }
  
  h2 {
    margin-top: 20px;
  }
  
  .filters {
    text-align: center;
    margin-bottom: 10px;
  }
  
  #pages-filter, #genre-filter {
    margin: 0 auto;
    display: block;
  }
  </style>
  