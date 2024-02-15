<template>
    <div class="producto-view" v-if="producto">
        <div class="imagenes">
            <img v-for="(imagen, index) in producto.images" :key="index" :src="imagen" :alt="'Imagen ' + (index + 1)">
        </div>
      <div class="contenido">
        <h2>{{ producto.title }}</h2>
        <p>{{ producto.description }}</p>
        <p class="negrita">{{ producto.price }}€</p>
        <p>Rating: {{ producto.rating }}</p>
        <button @click="agregarAlCarrito">Agregar al carrito</button>
      </div>

      <div class="carrito-container" :class="{ 'carrito-visible': carrito.length > 0 }">
        <div class="carrito">
            <h3>Carrito de compras</h3>
            <ul>
                <li v-for="(item, index) in carrito" :key="index">{{ item.title }} - {{ item.price }}€</li>
            </ul>
            <p class="negrita">Total: {{ totalAPagar }}€</p>
            <button @click="comprar">Comprar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref, onMounted,computed } from 'vue';
    import { useRoute } from 'vue-router';
    import type {Producto} from '@/types/type'
  
    const route = useRoute();
    const producto = ref<Producto>(); // Ajusta el tipo según la estructura de tus productos
    const carrito = ref<Producto[]>([]);
  
    onMounted(async () => {
      const productId = Number(route.params.id); // Obtener la ID del producto desde la ruta
      try {
        const response = await fetch(`https://api-productos-fazq.onrender.com/productos/${productId}`);
        if (!response.ok) {
          throw new Error('No se pudo cargar la información del producto');
        }
        producto.value = await response.json();
      } catch (error) {
        console.error('Error al cargar la información del producto:', error);
      }
    });

    const totalAPagar = computed(() => {
    return carrito.value.reduce((total, item) => total + item.price, 0);
    });

    const agregarAlCarrito = () => {
        if (producto.value) {
            const { id, title, price } = producto.value;
            const nuevoProducto: Producto = { id, title, description: '', price, discountPercentage: 0, rating: 0, stock: 0, brand: '', category: '', thumbnail: '', images: [] };
            carrito.value.push(nuevoProducto);
        }
    }

    const comprar=()=>{
        carrito.value = [];
    }
  
  </script>

<style scoped>

.negrita{
    font-weight: bold;
    font-size: 1.5em;
}
.imagenes {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .imagenes img {
    width: 150px;
    height: auto;
  }

  .carrito-container {
    position: fixed;
    top: 0;
    right: -300px; /* Lo ocultamos inicialmente fuera de la pantalla */
    width: 300px;
    height: 100%;
    background-color: #f2f2f2;
    transition: right 0.3s ease; /* Transición suave al mostrar/ocultar el carrito */
  }

  .carrito-visible {
    right: 0; /* Mostramos el carrito cuando está visible */
  }

  .carrito {
    padding: 20px;
  }

  .carrito button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>