<template>
    <div class="container">
        <div class="producto" @click="verProducto">
            <div class="imagen">
                <img :src="props.imagen">
            </div>
            <div class="contenido">
                <h2>{{ props.title }}</h2>
                <p>{{ props.description }}</p>
                <div class="estrellas">
                    <p class="negrita">{{ props.price }}€</p>
                    <div class="estrellas">
                        <img v-for="n in Math.round(props.rating)" :key="'estrella' + n" src="../../public/estrella.png">
                    </div>
                </div>
            </div>
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

.estrellas{
    display: flex;
}
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100% !important;
    padding: 20px;
}


.producto {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    width: 100%;
}

.producto:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.descripcion{
    margin: 0 0 15px 0;
    color:#666
}

.imagen {
    flex: 0 0 auto;
    margin-right: 20px;
    overflow: hidden;
    border-radius: 10px 0 0 10px;
}

.imagen img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
}

.contenido {
    flex: 1;
    padding: 15px;
}

h2 {
    margin-top: 0;
    font-size: 1.5em;
    color: #333;
}

.negrita {
    font-weight: bold;
    font-size: 1.2em;
}

.estrellas{
    margin-left: auto;
}

.estrellas img{
    width: 20px;
    height: 20px;
}
</style>