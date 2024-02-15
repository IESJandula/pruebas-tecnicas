<template>
    <main class="">
        <img :src="caravana" alt="Caravana icon" class="mb-1">
        <h1 class="text-4xl font-bold mb-4">Bazar Online</h1>
        <div class="search-container">
            <input v-model="searchQuery" placeholder="laptos, smartphones, ..." type="search" class="search-input">
        </div>
        <div class="button-borders">
            <button class="primary-button" @click="search"> BUSCAR </button>
        </div>
    </main>
</template>

<script setup lang="ts">
import caravana from '../../public/caravana.png'
import { useRouter } from 'vue-router'
import { ref } from 'vue';

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
.primary-button {
 font-family: 'Ropa Sans', sans-serif;
    /* font-family: 'Valorant', sans-serif; */
 color: white;
 cursor: pointer;
 font-size: 13px;
 font-weight: bold;
 letter-spacing: 0.05rem;
 border: 1px solid #79bcff;
 padding: 0.8rem 2.1rem;
 background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cdefs%3E%3Cstyle%3E .shape %7B fill: %23FF4655 /* fill: %230E1822; */ %7D %3C/style%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cpolygon class='shape' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
 background-color: #78bbff;
 background-size: 200%;
 background-position: 200%;
 background-repeat: no-repeat;
 transition: 0.3s ease-in-out;
 transition-property: background-position, border, color;
 position: relative;
 z-index: 1;
}

.primary-button:hover {
 border: 1px solid #FF4655;
 color: white;
 background-position: 40%;
}

.primary-button:before {
 content: "";
 position: absolute;
 background-color: #6ab5ff;
 width: 0.2rem;
 height: 0.2rem;
 top: -1px;
 left: -1px;
 transition: background-color 0.15s ease-in-out;
}

.primary-button:hover:before {
 background-color: white;
}

.primary-button:hover:after {
 background-color: white;
}

.primary-button:after {
 content: "";
 position: absolute;
 background-color: #79b7ff;
 width: 0.3rem;
 height: 0.3rem;
 bottom: -1px;
 right: -1px;
 transition: background-color 0.15s ease-in-out;
}

.button-borders {
 position: relative;
 width: fit-content;
 height: fit-content;
 margin: 30px;
 margin-left: 80px;
}

.button-borders:before {
 content: "";
 position: absolute;
 width: calc(100% + 0.5em);
 height: 50%;
 left: -0.3em;
 top: -0.3em;
 border: 1px solid #0E1822;
 border-bottom: 0px;
    /* opacity: 0.3; */
}

.button-borders:after {
 content: "";
 position: absolute;
 width: calc(100% + 0.5em);
 height: 50%;
 left: -0.3em;
 bottom: -0.3em;
 border: 1px solid #0E1822;
 border-top: 0px;
    /* opacity: 0.3; */
 z-index: 0;
}

.shape {
 fill: #0E1822;
}


</style>