<template>
    <main class="flex flex-col items-center justify-center h-screen">
        <img :src="caravana" alt="Caravana icon">
        <h1 class="text-4xl font-bold mb-4">Bazar Online</h1>
        <div class="flex items-center leading-7 relative max-w-190 m-4">
            
            <input v-model="searchQuery" placeholder="Search" type="search" class="input w-full h-10 leading-10 px-4 pl-10 border-2 border-transparent rounded-md outline-none bg-gray-200 text-gray-800 transition duration-300 ease-in-out">
        </div>
        <button @click="search" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">Buscar</button>
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