<script setup lang="ts">
import type { Product } from '@/types/types';

const props = defineProps({
    image: {
        type: String,
        required: true
    },
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
})

const emit = defineEmits(['showDetails'])

const showDetails = () => {
    emit('showDetails');
}
</script>

<template>
    <div class="product-container" @click="showDetails">
        <img class="product-image" :src="image" :alt="title">
        <div class="product-details">
            <h5>{{ title }}</h5>
            <p>{{ description }}</p>
            <h5>€{{ price }}</h5>
            <p>Rating: {{ rating }}</p>
        </div>
    </div>
</template>

<style scoped>
.product-container {
    display: flex;
    align-items: center;
}

.product-image {
    margin-right: 20px;
    width: 13%;
    border-radius: 10%;
}

.product-details {
    flex-grow: 1;
}</style>