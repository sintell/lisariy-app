<template>
    <vk-card v-if="!loading" class="uk-width-1-2@s uk-width-3-4@m uk-width-1-1@xl uk-align-center">
        <vk-grid gutter="small" class="uk-flex-middle">
            <PictureItem
                :src="picture.processedSrc"
                :srcset="`${picture.pc.x1}, ${picture.pc.x2} 2x`"
                :alt="picture.title"
                class="uk-width-1-2@m uk-width-auto"
            />
            <vk-grid gutter="small" class="uk-text-center uk-width-1-2@m">
                <div class="uk-width-1-1">
                    <vk-card-title class="uk-margin-remove-bottom">{{picture.title || "Без названия"}}</vk-card-title>
                    <p class="uk-text-meta uk-margin-remove-top">
                        <time :datetime="picture.createdAt">{{formatDate(picture.createdAt)}}</time>
                    </p>
                </div>
                <p class="uk-width-1-1">{{picture.description}}</p>
                <p class="uk-width-1-1">
                    <vk-label
                        v-for="picture in picture.tags"
                        :key="picture.id"
                        class="label-with-spacer"
                    >
                    {{picture.text}}
                    </vk-label>
                </p>
            </vk-grid>
        </vk-grid>
        <div slot="footer" class="uk-grid uk-flex-center">
            <div class="uk-width-1-1 uk-width-2-3@m">
                <vue-disqus
                    shortname="lisariy-ru"
                    :identifier="pic_id"
                    :url="'http://lisariy.ru' + this.$route.path"/>
            </div>
        </div>
    </vk-card>
</template>

<script>
import { mapState } from "vuex";
import PictureItem from "@/components/PictureItem";

export default {
    name: 'pictureItem',
    components: {
        PictureItem
    },
    computed: mapState({
        picture: state => state.pictures.current,
        loading: state => state.loading,
        pic_id: state => `pic_${state.pictures.current.id}`
    }),
    created() {
        this.$store.dispatch('getOnePicture', this.$route.params.id);
    },
    methods: {
        formatDate(ts) {
            let date = new Date(ts);
            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        }
    }
}
</script>
