<script setup lang="ts">

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
    brand: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    imagesArray: {
        type: Array as () => string[],
        required: true
    }
})

const emit = defineEmits(['addToCart'])

const addToCart = () => {
    emit('addToCart');
}
</script>

<template>
    <article class="container d-flex flex-column align-items-center">
        <div class="d-flex flex-column align-items-center justify-content-center">
            <img :src="image" :alt="title" class="img-principal mb-2">
            <div class="d-flex flex-row justify-content-center other-img">
                <img :src="imagesArray[2]" :alt="title" class="mx-1">
                <img :src="imagesArray[3]" :alt="title">
            </div>
        </div>
        <h5>{{ title }} - {{ brand }}</h5>
        <h6>{{ price }}€</h6>
        <p>{{ stock }} disponibles</p>
        <p>Rating {{ rating }}</p>
        <p>{{ description }}</p>
        <button @click="addToCart" class="boton">Comprar</button>
    </article>
</template>

<style scoped>
.img-principal {
    width: 25%;
    border-radius: 4%;
}

.other-img img {
    width: 8%;
    border-radius: 10%;
}

.boton {
    border-radius: 15px;
    padding: 5px;
    width: 21%;
    background-color: #f18096;
    border: none;
    box-shadow: 0 0 8px rgba(79, 79, 96, 0.8);
}
</style>