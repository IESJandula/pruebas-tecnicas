<template>
    <div class="container d-flex align-items-center justify-content-center">
        <img src="../../bazar2.jpg" alt="Bazar Online" class="mr-3">
        <i class="bi bi-search fs-3 mb-1 mx-3"></i>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2 mb-1" type="search" placeholder="laptops, smartphones, ..."
                aria-label="Search">
        </form>
        <!-- Carrito de compras -->
        <div class="carrito-container">
            <div v-show="cartCount > 0">
                <img class="carrito" src="../../public/carrito2.png" alt="Carrito de compras">
                <span class="ml-2">{{ cartCount }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    cartCount: {
        type: Number,
        required: true
    }
})
</script>

<style scoped>
img {
    width: 10%;
    margin-right: 1%;
}

form {
    margin-right: 4%;
}
</style>