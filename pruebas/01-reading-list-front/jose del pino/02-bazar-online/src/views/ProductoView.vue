<template>
  <div class="container">
    <div class="header">
      <Inicio class="nuevas-clases-header" :useNewStyles="true"></Inicio>
    </div>
    <div class="producto-view" v-if="producto">
      <!-- Contenedor de las imágenes y la información del producto -->
      <div class="imagen-info-container">
        <!-- Imagen destacada -->
        <div class="imagen-destacada">
          <img :src="producto.images[0]" :alt="'Imagen 1'">
        </div>
        <!-- Miniaturas -->
        <div class="miniaturas">
          <img v-for="(imagen, index) in producto.images.slice(1)" :key="index" :src="imagen" :alt="'Imagen ' + (index + 2)" class="miniatura">
        </div>
      </div>
        <!-- Información del producto -->
        <div class="contenido">
          <h2>{{ producto.title }}</h2>
          <div class="price-rating">
            <p class="negrita precio">{{ producto.price }}€</p>
            <div class="estrellas">
              <img v-for="n in Math.round(producto.rating)" :key="'estrella' + n" src="../../public/estrella.png">
            </div>
          </div>
          <p class="precio"> {{ producto.stock }} disponibles</p>
          <p class="descripcion">{{ producto.description }}</p>
          <button class="boton-carrito" @click="agregarAlCarrito"><img src="../../public/carrito-de-compras.png" class="imagen-carrito"></button>
        </div>
      

      <!-- Carrito de compras -->
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
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import type { Producto } from '@/types/type';
  import Inicio from '../components/Inicio.vue';

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
  };

  const comprar = () => {
    carrito.value = [];
  };
</script>

<style scoped>
  /* Estilos para la disposición de las imágenes y la información */
  .imagen-info-container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .imagen-destacada img {
    width: 200px; /* Ajusta el tamaño según tus preferencias */
    height: auto;
    border-radius: 50%;
    margin: 20px;
    margin-top: 40px; /* Espacio entre la imagen destacada y las miniaturas */
  }

  .miniaturas {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .miniatura {
    width: 100px; /* Ajusta el tamaño según tus preferencias */
    height: auto;
    border-radius: 50%;
    margin-bottom: 10px; /* Espacio entre las miniaturas */
  }

  .contenido {
    margin-top: 20px; /* Espacio entre las imágenes y la información del producto */
  }

  /* Estilos para el diseño general */
  .producto-view {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .nuevas-clases-header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .negrita {
    font-weight: bold;
    font-size: 1.5em;
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
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }

  h2{
    text-align: center;
  }

.imagen-carrito{
  width: 80px;
}

.boton-carrito{
  border: none;
  margin-top: 20px; 
  margin-left: auto;
  margin-right: auto; 
  display: block;
}

.descripcion{
  margin-top: 30px;
}

.price-rating{
  display: flex;
}

.estrellas img{
  width: 20px;
  height: auto;
  margin-top: 10px;
}

.estrellas{
  margin-left: 250px;
}
.precio{
  margin-left: 150px;
}
</style>
