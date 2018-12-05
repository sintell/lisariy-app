<template>
    <img :src="src" :alt="alt" :srcset="srcset"/>
</template>

<script>
export default {
    props: {
        srcset: String,
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
