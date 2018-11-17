<template>
    <img class="picture" :src="src" :alt="alt"/>
</template>

<script>
export default {
    props: {
        src: String,
        alt: String
    }
}
</script>

<style>
    .picture {
        width: 400px;
        height: 400px;
        display: block;
    }
</style>
