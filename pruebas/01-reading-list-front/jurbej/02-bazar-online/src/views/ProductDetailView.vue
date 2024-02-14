<script setup lang="ts">
import SearchBoxInLine from '@/components/SearchBoxInLine.vue';
import ProductDetailsInfo from '@/components/ProductDetailsInfo.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Product } from '@/types/types';

const route = useRoute();
const product = ref<Product | null>(null);
const id = ref<string | null>(null);
const cartCount = ref<number>(1)

const fetchDataProduct = async () => {
    try {
        // Realiza la llamada a la API utilizando searchTerm
        const response = await fetch(`https://api-bazar-online.onrender.com/products/${id.value}`);
        const data = await response.json();
        product.value = data;
        console.log(product.value);
    } catch (error) {
        console.error('Error al llamar a la API:', error);
    }
};

onMounted(async () => {
    // Accede al valor de la query 'search' desde la ruta
    id.value = route.params.id as string || '';
    await fetchDataProduct();
});

const addToCart = () => {
    cartCount.value = cartCount.value++
}

</script>

<template>
    <SearchBoxInLine :cartCount="cartCount"></SearchBoxInLine>
    <ProductDetailsInfo @addToCart="addToCart()" v-if="product" :image="product.thumbnail" :title="product.title"
        :description="product.description" :price="product.price" :rating="product.rating" :brand="product.brand"
        :stock="product.stock" :imagesArray="product.images" />
</template>

<style scoped>

</style>