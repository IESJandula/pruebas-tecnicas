<template>
  <div class="book" @click="handleClick">
    <img :src="book.cover" alt="Portada del libro" class="book-image">
    <h3 class="book-title">{{ book.title }}</h3>
  </div>
</template>
  
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  book: Object
});

const emits = defineEmits(['click']);

const handleClick = () => {
  emits('click');
};
</script>
  
  <style scoped>
  
  .book {
  text-align: center;
  margin-bottom: 20px;
}

.book-image {
  width: 100%;
  height: auto;
  margin: 5px;
}

.book-title {
  margin-top: 5px;
}

  </style>
  