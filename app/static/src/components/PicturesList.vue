<template>
    <vk-grid
        gutter="medium"
        class="
            uk-flex-center
            uk-text-center
            uk-child-width-auto"
    >
        <div
            v-for="picture in pictures"
            :key="picture.id"
            class="uk-width-auto@s uk-width-1-3@l uk-width-1-4@xl"
        >
            <picture-card :picture="picture" :editable="editable"/>
        </div>
    </vk-grid>
</template>

<script>
import PictureCard from '@/components/PictureCard';

export default {
    name:'pictures-list',
    components: {
        PictureCard
    },
    props: {
        pictures: Array,
        editable: Boolean,
    }
}
</script>
