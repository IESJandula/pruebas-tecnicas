<template>
    <main class="container" :class="{ 'nuevas-clases-header': useNewStyles }">
        <div>
            <img :src="caravana" alt="Caravana icon" class="mb-1">
            <h1 v-if="!useNewStyles" class="text-4xl font-bold mb-4">Bazar Online</h1>
        </div>
        <div class="search-container">
            <input v-model="searchQuery" placeholder="laptos, smartphones, ..." type="search" class="search-input">
        </div>
        <div>
            <button class="btn" @click="search">BUSCAR</button>
        </div>
    </main>
</template>

<script setup lang="ts">
import caravana from '../../public/caravana.png'
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  useNewStyles: Boolean
});

const route = useRouter()
const searchQuery = ref('')
const search = () => {
    if (searchQuery.value.trim() !== ''){
        // Navegar a la vista de resultados de búsqueda y pasar el texto de búsqueda como parámetro
        route.push({ path: '/search', query: { q: searchQuery.value } })
    }
}
</script>

<style scoped>

.search-input {
    width: 300px;
    height: 40px;
    padding: 0.5rem 1rem 0.5rem 3rem; /* Agregamos padding a la izquierda para el icono */
    border: 2px solid #ccc;
    border-radius: 20px;
    outline: none;
    font-size: 1rem;
    transition: border-color 0.3s ease-in-out;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
    background-repeat: no-repeat;
    background-position: 10px center; /* Ajustamos la posición del icono */
}

main{
    text-align: center;
}

.search-input:focus {
    border-color: #79bcff;
}

.btn {
 padding: 1.1em 2em;
 background: none;
 border: 2px solid #fff;
 font-size: 15px;
 color: #ffffff;
 cursor: pointer;
 position: relative;
 overflow: hidden;
 transition: all 0.3s;
 border-radius: 12px;
 background-color: #0f014b;
 font-weight: bolder;
 box-shadow: 0 2px 0 2px #000;
 margin: 20px;
}

.btn:before {
 content: "";
 position: absolute;
 width: 100px;
 height: 120%;
 background-color: #ff6700;
 top: 50%;
 transform: skewX(30deg) translate(-150%, -50%);
 transition: all 0.5s;
}

.btn:hover {
 background-color: #ecd448;
 color: #fff;
 box-shadow: 0 2px 0 2px #0d3b66;
}

.btn:hover::before {
 transform: skewX(30deg) translate(150%, -50%);
 transition-delay: 0.1s;
}

.btn:active {
 transform: scale(0.9);
}

</style>