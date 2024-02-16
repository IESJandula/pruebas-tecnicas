<script setup lang="ts">
import type { Product } from '@/types/types';
import { ref, computed } from 'vue';

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

const rating = ref(props.rating);
const stars = computed(() => {
    const roundedRating = Math.floor(rating.value);
    return Array.from({ length: roundedRating }, (_, index) => index + 1);
});

const emit = defineEmits(['showDetails'])
const showDetails = () => {
    emit('showDetails');
}
</script>

<template>
    <!-- <div class="product-container mb-5" @click="showDetails">
        <img class="product-image" :src="image" :alt="title">
        <div class="product-details">
            <h5>{{ title }}</h5>
            <p>{{ description }}</p>
            <div class="d-flex">
                <h5>€{{ price }}</h5>
                <div class="mx-2">
                    <span v-for="star in stars" :key="star" class="star">★</span>
                </div>
            </div>
        </div>
    </div> -->
    <div class="card text-center height d-flex flex-column justify-content-between" @click="showDetails">
        <div class="mt-3">
            <h4>{{ title }}</h4>
        </div>
        <div class="d-flex justify-content-center mt-2 mb-2">
            <img :src="image" :alt="title">
        </div>
        <div>
            <p>{{ description }}</p>
        </div>
        <div class="mx-2">
            <span v-for="star in stars" :key="star" class="star">★</span>
        </div>
        <div class="mb-2 mt-2">
            <h4>{{price}}€</h4>
        </div>
    </div>
</template>

<style scoped>
.height {
    height: 100%;
}

img {
    width: 60%;
}

.card {
    background-color: rgb(36, 35, 35);
    color: white;
    box-shadow: 0 0px 10px rgba(47, 46, 233, 0.7);
}
</style>

<style>
.star {
    font-size: 20px;
    color: gold;
}
</style>