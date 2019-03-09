<template>
    <vk-card class="uk-flex uk-flex-column" padding="small">
        <div slot="header">
            <vk-grid gutter="collapse">
                <vk-card-title v-if="!edited" class="uk-width-4-5">
                    {{category.text}}
                </vk-card-title>
                <div class="uk-width-1-5"><vk-label class="uk-align-right">{{category.usages}}</vk-label></div>
            </vk-grid>
        </div>
        <div slot="media" v-if="!edited && category.description">
            <p class="uk-padding-small">{{category.description}}</p>
        </div>
        <div v-if="edited" slot="media" class="uk-padding-small">
            <input
                class="uk-input uk-form-blank"
                type="text"
                placeholder="Укажите название"
                v-model="category.text"
            />
            <textarea
                class="uk-textarea uk-form-blank"
                type="text"
                placeholder="Укажите описание"
                v-model="category.description"
            >
            </textarea>
        </div>
        <div
            v-if="authorized && editable"
        >
            <vk-icon-button
                v-if="!edited && editable"
                v-vk-tooltip="'Редактировать категорию'"
                icon="pencil"
                @click="edited = true"
            />
            <vk-icon-button
                v-if="edited"
                v-vk-tooltip="'Удалить категорию'"
                icon="trash"
                class="uk-button-danger"
                @click="deleteCategory(category)"
            />
            &nbsp;
            <vk-icon-button
                v-if="edited"
                v-vk-tooltip="'Сохранить изменения'"
                class="uk-button-primary"
                icon="check"
                @click="updateCategory(category), edited = false"
            />
        </div>
    </vk-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { CATEGORY_DELETE, CATEGORY_UPDATE } from "@/types";
import axios from "axios";

export default {
    name:'category-card',
    data: function() {
        return {
            edited: false,
        }
    },
    created() {
        axios.get(`/api/category/${this.category.id}/pictures`).then(console.dir);
    },
    props: {
        category: Object,
        editable: Boolean,
    },
    computed: {
        ...mapGetters({
            authorized: 'isLoggedIn',
        }),
    },
    methods: {
        ...mapActions([
            CATEGORY_DELETE,
            CATEGORY_UPDATE,
        ])
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

.uk-align-right {
    margin-left: 0;
}
</style>
