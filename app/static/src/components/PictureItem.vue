<template>
    <img :src="src" :alt="alt"/>
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
        width: 100%;
        height: auto;
    }
</style>
