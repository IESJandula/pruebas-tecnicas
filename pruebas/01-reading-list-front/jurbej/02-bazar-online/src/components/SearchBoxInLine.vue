<template>
    <div class="container d-flex align-items-center justify-content-center mt-5 mb-3">
        <img src="../../public/logo.png" alt="Bazar Online" class="mr-3">
        <!-- <i class="bi bi-search fs-3 mb-1 mx-3"></i>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2 mb-1" type="search" placeholder="laptops, smartphones, ..."
                aria-label="Search">
        </form> -->
        <form class="form" @submit.prevent="handleSearch">
            <button>
                <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
                    aria-labelledby="search">
                    <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                        stroke="currentColor" stroke-width="1.533" stroke-linecap="round" stroke-linejoin="round">
                    </path>
                </svg>
            </button>
            <input v-model="searchTerm" class="input" placeholder="Search" type="text">
            <button class="reset" type="reset">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </form>
        <!-- Carrito de compras -->
        <div class="carrito-container" @click="toggleCartMenu">
            <div>
                <i class="bi bi-bag-heart fs-1"></i>
                <span class="ml-2">{{ cartCount !== undefined ? cartCount : 0 }}</span>
            </div>
        </div>
        <!-- Menú del carrito -->
        <transition name="fade">
            <div v-show="showCartMenu" class="cart-menu text-center">
                <h4>Carrito</h4>
                <h6>Artículo: {{ producto }}</h6>
                <p>Cantidad: {{ cartCount }}</p>
                <h5>Total: {{ total }}€</h5>
                <button class="btn btn-pagar">Pagar</button>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const showCartMenu = ref(false);

const toggleCartMenu = () => {
    showCartMenu.value = !showCartMenu.value;
};

const total = computed(() => {
    // Verifica si cartCount y precio existen antes de calcular el total
    if (props.cartCount !== undefined && props.precio !== undefined) {
        return props.precio * props.cartCount;
    }
});

const emit = defineEmits(['search']);
const searchTerm = ref('');

const handleSearch = () => {
    // Emitir el evento 'search' con el término de búsqueda
    emit('search', searchTerm.value);
};

const props = defineProps({
    cartCount: {
        type: Number,
        required: false
    },
    producto: {
        type: String,
        required: false
    },
    precio : {
        type: Number,
        required: false
    }
})

</script>

<style scoped>
.carrito-container {
    position: relative;
  }

  .carrito-container span {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #2f2ee9; /* Color de fondo del globo */
    color: white; /* Color del texto */
    border-radius: 50%; /* Bordes redondeados para formar un círculo */
    padding: 4px 8px; /* Espaciado interno */
  }

/* Estilos del menú del carrito */
.cart-menu {
    position: fixed;
    top: 0;
    right: 0;
    background-color: rgb(34, 33, 33);
    color: white;
    border: 1px solid #ccc;
    padding: 50px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

/* Animación de fade para el menú */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

img {
    width: 10%;
    margin-right: 1%;
}

form {
    margin-right: 4%;
}

.btn-pagar {
    background-color: #2f2ee9;
    color: white;
    border: 1px solid white;
}
</style>