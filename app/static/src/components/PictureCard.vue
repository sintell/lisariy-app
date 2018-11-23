<template>
    <vk-card>
        <div
            v-if="authorized"
            slot="badge"
        >
            <vk-icon-button
                v-if="!picture.isHidden && !editable"
                icon="minus-circle"
                @click="hidePicture(picture.id)"
            />
            <vk-icon-button
                v-if="picture.isHidden && !editable"
                icon="trash"
                class="uk-button-danger"
                @click="deletePicture(picture.id)"
            />&nbsp;
            <vk-icon-button
                v-if="picture.isHidden && !editable"
                class="uk-button-primary"
                icon="plus-circle"
                @click="showPicture(picture.id)"
            />
            <vk-icon-button
                v-if="editable"
                class="uk-button-primary"
                icon="check"
                @click="updatePicture(picture)"
            />
        </div>
        <div slot="media-top">
            <div
                v-if="picture.isHidden && !editable"
                class="uk-overlay-default uk-position-cover"
            >
            </div>
            <PictureItem :src="picture.thumbnailSrc" :alt="picture.description"/>
        </div>
        <div v-if="!editable">
            <vk-card-title>{{picture.title || 'Без названия'}}</vk-card-title>
            <p>{{picture.description || '...'}}</p>
        </div>
        <div v-else>
            <vk-card-title>
                <input
                    class="uk-input"
                    type="text"
                    placeholder="Укажите название"
                    v-model="picture.title"
                />
            </vk-card-title>
            <p>
                <textarea
                    class="uk-textarea"
                    type="text"
                    placeholder="Укажите описание"
                    v-model="picture.description"
                >
                </textarea>
            </p>
        </div>
        <div slot="footer" v-if="!editable">
            <vk-button type="text" @click="openPicture(picture.id)">Подробнее...</vk-button>
        </div>
    </vk-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PictureItem from '@/components/PictureItem';

export default {
    name:'picture-card',
    components: {
        PictureItem
    },
    props: {
        picture: Object,
        editable: Boolean,
    },
    computed: mapState({
        authorized: state => state.user.key !== undefined
    }),
    methods: {
        openPicture(id) {
            this.$router.push({name: 'picture', params: {id}});
        },
        ...mapActions([
            'hidePicture',
            'showPicture',
            'deletePicture',
            'updatePicture'
        ])
    }
}
</script>

<style>

</style>
