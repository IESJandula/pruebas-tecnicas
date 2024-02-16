<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SearchBoxInLine from '@/components/SearchBoxInLine.vue';
import ProductCard from '@/components/ProductCard.vue';
import type { Product } from '@/types/types';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const searchTerm = ref<string>('');
const route = useRoute();
const router = useRouter();
const searchResults = ref<Product[]>([]);
const productosPorCategoria = ref<Record<string, number>>({});

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

        generaTarjetasCategoria()
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

const generaTarjetasCategoria = () => {
    productosPorCategoria.value = {};
    searchResults.value.forEach(producto => {
        if (producto.category in productosPorCategoria.value) {
            productosPorCategoria.value[producto.category]++;
        } else {
            productosPorCategoria.value[producto.category] = 1;
        }
    });
}
</script>

<template>
    <main>
        <SearchBoxInLine @search="performSearch"></SearchBoxInLine>
        <section class="container mb-4">
            <h3 class="text-center mb-4">Resultados de la búsqueda para "{{ searchTerm }}": {{ searchResults.length }}</h3>
            <div class="d-flex flex-wrap justify-content-center align-items-center">
                <div class="card-category" v-for="(count, category) in productosPorCategoria" :key="category">
                    <p>{{ category }}: {{ count }}</p>
                </div>
            </div>
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

<style scoped>
.card-category {
    padding: 3px;
    margin-right: 1%;
    margin-bottom: 2%;
    background-color: #2f2ee9;
    color: white;
    border: 2px solid black;
    border-radius: 5%;
}
</style>