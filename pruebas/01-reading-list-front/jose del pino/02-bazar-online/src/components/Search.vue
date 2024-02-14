<template>
    <div>
        <h2>Resultados de búsqueda</h2>
        <p>Query: {{ query }}</p>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const query = ref('');

    // Obtenemos el valor del parámetro de consulta q al cargar el componente
    onMounted(() => {
        if (typeof route.query.q === 'string') {
        query.value = route.query.q;
    }
    });
</script>

<style scoped>

</style>