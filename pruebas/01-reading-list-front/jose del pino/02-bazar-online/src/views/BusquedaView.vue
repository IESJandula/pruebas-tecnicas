<template>
    <div>
      <h2>Resultados de búsqueda "{{busquedaQuery }}":" {{ productos.length }}</h2>
      <div v-for="producto in productos" :key="producto.id">
        <Search
          :title="producto.title"
          :description="producto.description"
          :price="producto.price"
          :rating="producto.rating"
          :imagen="producto.thumbnail"
        ></Search>
      </div>
    </div>
  </template>

<script setup lang="ts">
    import Search from '../components/Search.vue'

    import type {Producto} from '@/types/type'

    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const productos = ref<Producto[]>([]);
    const busquedaQuery=ref('')
    

    // Obtenemos el valor del parámetro de consulta q al cargar el componente
    onMounted(() => {
        const query = route.query.q;
        if (typeof query === 'string' && query.trim() !== '') {
            busquedaQuery.value=query
            searchProductos(busquedaQuery.value);
        }
    });

    async function searchProductos(query: string) {
        try {
            const response = await fetch(`https://api-productos-fazq.onrender.com/products/items?q=${query}`);
            if (!response.ok) {
            throw new Error('Error al obtener los productos');
            }
            const data = await response.json();
            productos.value = data.items;
        } catch (error) {
            console.error('Error en la búsqueda:', error);
        }
    }
</script>

<style scoped>

</style>