<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import type { Product } from '@/types/types';

const router = useRouter();
const searchTerm = ref('')

const searchProducts = () => {
    if (searchTerm.value.trim() !== '') {
        // Redirecciona a la ruta 'searchResults' y pasa el término de búsqueda como query param
        router.push({ name: 'searchResults', query: { search: searchTerm.value } });
    } else {
        notify()
    }
};

const notify = () => {
    toast("La búsqueda está vacía", {
        type: 'warning',
        autoClose: 2000,
    });
};
</script>

<template>
    <div class="box container-fluid">
        <img class="mt-5" src="../../public/logo.png" alt="Bazar Online">
        <h1 class="mb-4">Bazar Online</h1>
        <div class="d-flex align-items-center">
            <!-- <i class="bi bi-search fs-3 mb-2 mx-2"></i> -->
            <!-- <form class="form-inline my-2 my-lg-0" @submit.prevent="searchProducts">
                <input v-model="searchTerm" class="form-control mr-sm-2 mb-3" type="search"
                    placeholder="laptops, smartphones, ..." aria-label="Search">
            </form> -->
            <form class="form mb-4" @submit.prevent="searchProducts">
                <button>
                    <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
                        aria-labelledby="search">
                        <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                            stroke="currentColor" stroke-width="1.533" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                    </svg>
                </button>
                <input v-model="searchTerm" class="input" placeholder="Search" type="text">
                <button class="reset" type="reset">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </form>
        </div>
        <button @click="searchProducts" class="boton" type="submit">Buscar</button>
    </div>
</template>

<style scoped>
.box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

img {
    width: 25%;
}

.boton {
    border-radius: 15px;
    padding: 2px;
    width: 7%;
    background-color: #2f2ee9;
    color: white;
    border: none;
    box-shadow: 0 0 8px rgba(79, 79, 96, 0.8);
}

@media (max-width: 767px) {
    .boton {
        width: 30%; /* Ancho completo en tamaños de pantalla inferiores a 768px */
    }
}
</style>

<style>
.form button {
  border: none;
  background: none;
  color: #8b8ba7;
}
/* styling of whole input container */
.form {
  --timing: 0.3s;
  --width-of-input: 200px;
  --height-of-input: 40px;
  --border-height: 2px;
  --input-bg: #fff;
  --border-color: #2f2ee9;
  --border-radius: 30px;
  --after-border-radius: 1px;
  position: relative;
  width: var(--width-of-input);
  height: var(--height-of-input);
  display: flex;
  align-items: center;
  padding-inline: 0.8em;
  border-radius: var(--border-radius);
  transition: border-radius 0.5s ease;
  background: var(--input-bg,#fff);
  border: 2px solid black;
}
/* styling of Input */
.input {
  font-size: 0.9rem;
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding-inline: 0.5em;
  padding-block: 0.7em;
  border: none;
}
/* styling of animated border */
.form:before {
  content: "";
  position: absolute;
  background: var(--border-color);
  transform: scaleX(0);
  transform-origin: center;
  width: 100%;
  height: var(--border-height);
  left: 0;
  bottom: 0;
  border-radius: 1px;
  transition: transform var(--timing) ease;
}
/* Hover on Input */
.form:focus-within {
  border-radius: var(--after-border-radius);
}

input:focus {
  outline: none;
}
/* here is code of animated border */
.form:focus-within:before {
  transform: scale(1);
}
/* styling of close button */
/* == you can click the close button to remove text == */
.reset {
  border: none;
  background: none;
  opacity: 0;
  visibility: hidden;
}
/* close button shown when typing */
input:not(:placeholder-shown) ~ .reset {
  opacity: 1;
  visibility: visible;
}
/* sizing svg icons */
.form svg {
  width: 17px;
  margin-top: 3px;
}
</style>