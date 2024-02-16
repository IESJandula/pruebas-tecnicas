<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SearchBoxInLine from '@/components/SearchBoxInLine.vue';
import ProductCard from '@/components/ProductCard.vue';
import type { Product } from '@/types/types';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const searchTerm = ref('');
const route = useRoute();
const router = useRouter();
const searchResults = ref<Product[]>([]);

onMounted(async () => {
    // Accede al valor de la query 'search' desde la ruta
    searchTerm.value = route.query.search as string || '';
    await fetchDataProduct();
});

const performSearch = (term: string) => {
    // Actualizar el término de búsqueda y realizar la búsqueda
    if (term.trim() !== '') {
        searchTerm.value = term;
        fetchDataProduct();
    } else {
        notify();
    }
};

const notify = () => {
    toast("La búsqueda está vacía", {
        type: 'warning',
        autoClose: 2000,
    });
};

const fetchDataProduct = async () => {
    try {
        // Realiza la llamada a la API utilizando searchTerm
        const response = await fetch(`https://api-bazar-online.onrender.com/products/items?q=${searchTerm.value}`);
        const data = await response.json();
        searchResults.value = data.items;
    } catch (error) {
        console.error('Error al llamar a la API:', error);
    }
};

const showDetails = (productID: number) => {
    if (productID) {
        // Redirecciona a la ruta 'searchResults' y pasa el término de búsqueda como query param
        router.push({ name: 'productDetail', params: { id: productID } });
    }
}
</script>

<template>
    <main>
        <SearchBoxInLine @search="performSearch"></SearchBoxInLine>
        <section class="container mb-4">
            <h3 class="text-center mb-4">Resultados de la búsqueda para "{{ searchTerm }}": {{ searchResults.length }}</h3>
            <div class="row g-4">
                <div v-for="product in searchResults" :key="product.id" class="col-md-6">
                    <ProductCard @showDetails="showDetails(product.id)" :image="product.thumbnail" :title="product.title"
                        :description="product.description" :price="product.price" :rating="product.rating">
                    </ProductCard>
                </div>
            </div>
        </section>
    </main>
</template>