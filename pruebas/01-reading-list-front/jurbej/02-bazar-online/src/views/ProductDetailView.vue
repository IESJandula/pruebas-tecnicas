<script setup lang="ts">
import SearchBoxInLine from '@/components/SearchBoxInLine.vue';
import ProductDetailsInfo from '@/components/ProductDetailsInfo.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { Product } from '@/types/types';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const route = useRoute();
const product = ref<Product | null>(null);
const id = ref<string | null>(null);
const cartCount = ref<number>(0)
    const searchTerm = ref<string>('');

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
    console.log('añade');
    cartCount.value++;
}

const performSearch = async (term: string) => {
    if (term.trim() !== '') {
        // Actualizar el término de búsqueda y realizar la búsqueda
        searchTerm.value = term;

        try {
            // Realiza la llamada a la API utilizando searchTerm
            const response = await fetch(`https://api-bazar-online.onrender.com/products/items?q=${searchTerm.value}`);
            const data = await response.json();
            product.value = data.items[0];
            console.log(product.value);
        } catch (error) {
            console.error('Error al llamar a la API:', error);
        }
    } else {
        notify()
    }
};

const notify = () => {
    toast("La búsqueda está vacía", {
        type: 'warning',
        autoClose: 2000,
    });
};
</script>

<template>
    <SearchBoxInLine @search="performSearch" :cartCount="cartCount" v-if="product" :producto="product.title"
        :precio="product.price"></SearchBoxInLine>
    <ProductDetailsInfo @addToCart="addToCart()" v-if="product" :image="product.thumbnail" :title="product.title"
        :description="product.description" :price="product.price" :rating="product.rating" :brand="product.brand"
        :stock="product.stock" :imagesArray="product.images" />
</template>

<style scoped></style>