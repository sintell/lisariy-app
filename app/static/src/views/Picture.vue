<template>
    <vk-card v-if="!loading">
        <div slot="header">
            <vk-grid gutter="small" class="uk-flex-middle">
                <div class="uk-width-expand">
                    <vk-card-title class="uk-margin-remove-bottom">{{picture.title || "Без названия"}}</vk-card-title>
                    <p class="uk-text-meta uk-margin-remove-top">
                        <time :datetime="picture.createdAt">{{formatDate(picture.createdAt)}}</time>
                    </p>
                </div>
            </vk-grid>
        </div>
        <div>
            <PictureItem
                :src="picture.processedSrc"
                :srcset="`${picture.pc.x1}, ${picture.pc.x2} 2x`"
                :alt="picture.title"
            />
            <p>{{picture.description}}</p>
        </div>
        <div slot="footer" class="uk-grid uk-flex-center">
            <div class="uk-width-2-3">
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
