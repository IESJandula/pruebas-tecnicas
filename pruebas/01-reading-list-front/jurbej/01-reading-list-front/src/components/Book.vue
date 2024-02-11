<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    imagen: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['anadirLibro'])

const anadirLibro = () => {
    emit('anadirLibro');
};
</script>

<template>
    <img :src="imagen" :alt="title" @click="anadirLibro">
</template>

<style scoped>
img {
    width: 90%;
}
</style>
