<template>
    <ul class="pictures-list">
        <li
            v-for="picture in pictures"
            :key="picture.id"
            class="picture-container"
            @click="openPicture(picture.id)"
        >
            <Picture :src="picture.src" :alt="picture.description"/>
            <div class="picture-overlay">{{picture.name}}</div>
        </li>
    </ul>
</template>

<script>
import { mapState } from "vuex";
import Picture from '@/components/Picture';

export default {
    name:'pictures-list',
    components: {
        Picture
    },
    computed: mapState({
        pictures: state => state.pictures.all
    }),
    created() {
        this.$store.dispatch('getAllPictures');
    },
    methods: {
        openPicture(id) {
            this.$router.push({name: 'picture', params: {id}});
        }
    }
}
</script>

<style lang="less" scoped>
    .pictures-list {
        display: flex;
        list-style: none;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0;
        margin: 0 auto;
        justify-content: center;
    }
    .picture-container {
        padding: 5px;
        background: #eee;
        margin: 5px;
        cursor: pointer;
        position: relative;
        transition: all 200ms ease-in;
        &:hover {
            padding: 0;
            margin: 10px;
        }
    }
    .picture-overlay {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 5px;
        margin: 0 auto;
        left: 0;
        box-sizing: border-box;
        background-color: rgba(0, 0, 0, 0.7);
        color: #fff;
    }
</style>

