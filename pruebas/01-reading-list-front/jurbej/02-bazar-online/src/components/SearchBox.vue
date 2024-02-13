<template>
    <div class="box container-fluid">
        <img src="../../public/bazar2.jpg" alt="Bazar Online">
        <h1 class="mb-4">Bazar Online</h1>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2 mb-3" type="search" placeholder="laptops, smartphones, ..." aria-label="Search">
        </form>
        <button class="boton" type="submit">Buscar</button>
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

input {
    width: 103%;
}

.boton {
    border-radius: 15px;
    padding: 2px;
    width: 7%;
    background-color: #f18096 ;
    border: none;
    box-shadow: 0 0 8px rgba(79, 79, 96, 0.8);
}
</style>