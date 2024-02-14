<template>
    <div>
        <h3>Resultados de búsqueda de {{ props.title }}</h3>
            <div>
                <img :src="props.imagen">
                <h2>{{ props.title }}</h2>
                <p>{{ props.description }}</p>
                <p>{{ props.price }}</p>
                <p>{{ props.rating }}</p>

            </div>
    </div>
</template>

<script setup lang="ts">
    import {defineProps} from 'vue'

    const props=defineProps({
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        rating: {
            type: Number,
            required: true
        },

        imagen: {
            type: String,
            required: true
        },
    })
</script>

<style scoped>

</style>