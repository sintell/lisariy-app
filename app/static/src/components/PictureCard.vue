<template>
    <vk-card class="uk-flex uk-flex-column">
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
        <div slot="media-top">
            <div class="uk-inline">
                <div
                    v-if="edited || picture.isHidden"
                    class="uk-overlay-default uk-position-cover"
                ></div>
                <PictureItem
                    :src="picture.tn.x2"
                    :srcset="`${picture.tn.x1}, ${picture.tn.x2} 2x`"
                    :alt="picture.title || 'No title' + '. ' + (picture.description || '')"
                    @click="showModal = true"
                />
            </div>
            <vk-modal-full :show.sync="showModal" @keyup.esc="showModal = false">
                <vk-modal-full-close large @click="showModal = false"></vk-modal-full-close>
                <vk-grid collapse class="uk-child-width-1-2@s uk-flex-middle">
                    <div :style="`background: url(${picture.pc.x2}) center / contain no-repeat;`" v-vk-height-viewport></div>
                    <div class="uk-padding-large" >
                        <h1>{{picture.title}}</h1>
                        <p>{{picture.description}}</p>
                        <p>
                            <vk-label
                                v-for="picture in picture.tags"
                                :key="picture.id"
                                class="label-with-spacer"
                            >
                            {{picture.text}}
                            </vk-label>
                        </p>
                    </div>
                </vk-grid>
            </vk-modal-full>
        </div>
        <div v-if="!edited">
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
            <p>
                <vue-tags-input
                    v-model="tag"
                    :tags="picture.tags"
                    :autocomplete-items="tagsSuggest"
                    @tags-changed="updatePictureTags"
                />
            </p>
        </div>
        <div slot="footer" v-if="!edited">
            <vk-button type="text" @click="showModal = true">Подробнее...</vk-button>
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
        'tag': 'getSuggest',
    },

    props: {
        picture: Object,
        editable: Boolean,
    },
    computed: {
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
        getSuggest() {
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
