<template>
  <div class="container">
    <div class="header">
      <Inicio class="nuevas-clases-header" @search="busqueda" :useNewStyles="true"></Inicio>
    </div>
    <div>
      <h2 class="center">Resultados de búsqueda "{{busquedaQuery }}":" {{ productos.length }}</h2>
      <div class="cards-container">
        <div class="card" v-for="(count, category) in dispositivosPorCategoria" :key="category">
          <p>{{ category }}: {{ count }}</p>
        </div>
      </div>
    </div>
    <div class="resultados">
      <div v-for="producto in productos" :key="producto.id">
        <Search
          :id="producto.id"
          :title="producto.title"
          :description="producto.description"
          :price="producto.price"
          :rating="producto.rating"
          :imagen="producto.thumbnail"
        ></Search>
      
      </div>
    </div>
  </div>
  </template>

<script setup lang="ts">
    import Search from '../components/Search.vue'
    import Inicio from '../components/Inicio.vue'

    import type {Producto} from '@/types/type'

    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const productos = ref<Producto[]>([]);
    const busquedaQuery=ref('')
    const dispositivosPorCategoria = ref<Record<string, number>>({});
    

    // Obtenemos el valor del parámetro de consulta q al cargar el componente
    onMounted(async() => {
        const query = route.query.q;
        if (typeof query === 'string' && query.trim() !== '') {
            busquedaQuery.value=query
            await searchProductos(busquedaQuery.value);
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

            contarDispositivosPorCategoria();
        } catch (error) {
            console.error('Error en la búsqueda:', error);
        }
    }

    function contarDispositivosPorCategoria() {
      dispositivosPorCategoria.value = {};
      productos.value.forEach(producto => {
          if (producto.category in dispositivosPorCategoria.value) {
              dispositivosPorCategoria.value[producto.category]++;
          } else {
              dispositivosPorCategoria.value[producto.category] = 1;
          }
      });
    }

    const busqueda =(valor:string)=>{
      if(valor !=''){
        busquedaQuery.value=valor
        searchProductos(busquedaQuery.value)
      }
    }
</script>

<style scoped>

.nuevas-clases-header {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
}

.resultados {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  column-gap: 5px;
}

/* Estilos para cada producto */
.resultados > div {
  width: 800px;
  height: 200px;
}

.center{
  text-align: center;
}

.card{
  margin-right: 10px;
  text-align: center;
  background-color: rgb(0, 16, 67);
  color: white;
}

.cards-container{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>