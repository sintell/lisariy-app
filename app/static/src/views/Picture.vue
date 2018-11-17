<template>
    <div v-if="!loading">
        <h1>{{picture.description}}</h1>
        <Picture :alt="picture.description" :src="picture.src"/>
        <div>
            <vue-disqus
                shortname="lisariy"
                :identifier="pic_id"
                url="lisariy-ru.disqus.com"/>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Picture from "@/components/Picture";

export default {
    name: 'picture',
    components: {
        Picture
    },
    computed: mapState({
        picture: state => state.pictures.current,
        loading: state => state.loading,
        pic_id: state => `pic_${state.pictures.current.id}`
    }),
    created() {
        this.$store.dispatch('getOnePicture', this.$route.params.id);
    }
}
</script>

<style>

</style>
