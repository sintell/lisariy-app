<template>
    <vk-card class="uk-flex uk-flex-column uk-flex-center" padding="small" hover>
        <div
            v-if="authorized && editable"
            slot="badge"
        >
            <vk-icon-button
                v-if="!edited && editable"
                v-vk-tooltip="'Редактировать изображение'"
                icon="pencil"
                @click="edited = true"
            />
            <vk-icon-button
                v-if="edited"
                v-vk-tooltip="'Удалить изображение'"
                icon="trash"
                class="uk-button-danger"
                @click="deletePicture(picture.id)"
            />
            &nbsp;
            <vk-icon-button
                v-if="edited &&!picture.isHidden"
                v-vk-tooltip="'Скрыть изображение от пользователей'"
                class="uk-button-danger"
                icon="minus-circle"
                @click="hidePicture(picture.id)"
            />
            <vk-icon-button
                v-if="edited && picture.isHidden"
                v-vk-tooltip="'Показать изображение пользователям'"
                class="uk-button-primary"
                icon="plus-circle"
                @click="showPicture(picture.id)"
            />&nbsp;
            <vk-icon-button
                v-if="edited"
                v-vk-tooltip="'Сохранить изменения'"
                class="uk-button-primary"
                icon="check"
                @click="updatePicture(picture), edited = false"
            />
        </div>
        <a :href="`/picture/${picture.id}`" class="uk-inline" @click.prevent="openPicture(picture.id)">
            <div
                v-if="edited || picture.isHidden"
                class="uk-overlay-default uk-position-cover"
            />
            <PictureItem
                :src="picture.tn.x2"
                :srcset="`${picture.tn.x1}, ${picture.tn.x2} 2x`"
                :alt="picture.title || 'No title' + '. ' + (picture.description || '')"
            />
        </a>
        <div v-if="edited">
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
            <p>
                <vue-tags-input
                    v-model="tag"
                    :tags="picture.tags"
                    :autocomplete-items="tagSuggests"
                    @tags-changed="updatePictureTags"
                />
            </p>
        </div>
    </vk-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import PictureItem from '@/components/PictureItem.vue';
import VueTagsInput from '@johmun/vue-tags-input';
import { UPDATE_PICTURE_TAGS, GET_CATEGORY_SUGGEST } from "@/types";
import axios from "axios";

export default {
    name:'picture-card',
    components: {
        PictureItem,
        VueTagsInput
    },
    data: function() {
        return {
            tag: '',
            showModal: false,
            edited: false,
        }
    },
    watch: {
        'tag': 'getSuggests',
    },

    props: {
        picture: Object,
        editable: Boolean,
    },
    computed: {
        ...mapState({
            tagSuggests: state => state.categories.suggests,
        }),
        ...mapGetters({
            authorized: 'isLoggedIn',
        }),
    },
    methods: {
        openPicture(id) {
            this.$router.push({name: 'picture', params: {id}});
        },
        ...mapActions([
            'hidePicture',
            'showPicture',
            'deletePicture',
            'updatePicture',
        ]),
        updatePictureTags(tags) {
            this.$store.dispatch(UPDATE_PICTURE_TAGS, {pictureId: this.picture.id, tags});
        },
        getSuggests() {
            if (this.tag.length < 2) {
                return;
            }
            this.$store.dispatch(GET_CATEGORY_SUGGEST, this.tag);
        },
    }
}
</script>

<style lang="less">
.label-with-spacer {
    margin: 0 5px;

    &:last-child {
        margin: 0;
    }
}
</style>
