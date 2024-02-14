<template>
    <div class="producto">
            <div class="imagen">
                <img :src="props.imagen">
            </div>
            <div class="contenido">
                <h2>{{ props.title }}</h2>
                <p>{{ props.description }}</p>
                <p class="negrita">{{ props.price }}€</p>
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
.negrita{
    font-weight: bold;
    font-size: 1.2em;
}

.producto {
  display: flex; 
  align-items: center;
  margin-bottom: 20px;
}

.imagen {
  flex: 0 0 auto; 
  margin-right: 20px;
}


.contenido {
  flex: 1; /* El contenido ocupará el espacio restante */
}
</style>