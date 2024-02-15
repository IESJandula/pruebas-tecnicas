<template>
    <div class="producto" @click="verProducto">
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
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const props=defineProps({
        id:{
            type:Number,
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

        imagen: {
            type: String,
            required: true
        },
    })

    const verProducto = () => {
        router.push({ name: 'producto', params: { id: props.id } })
    }
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