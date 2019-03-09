<template>
    <vk-grid
        gutter="medium"
        class="
            uk-flex-center
            uk-child-width-auto"
    >
        <div
            v-for="category in categories"
            :key="category.id"
            class="uk-width-auto@s uk-width-1-4@l uk-width-1-5@xl"
        >
            <category-card :category="category" :editable="editable"/>
        </div>
    </vk-grid>
    <!-- <vk-table :data="categories" :sortedBy="{usages: 'asc'}" narrowed justified>
        <vk-table-column title="Категория" cell="text" shrinked/>
        <vk-table-column title="Описание" cell="description" shrinked/>
        <vk-table-column-sort title="Количество работ" cell="usages" shrinked width="small"/>
        <vk-table-column-sort headless shrinked>
            <div slot="default">
                <vk-icon-button icon="pencil"/>&nbsp;
                <vk-icon-button icon="trash" class="uk-button-danger"/>
            </div>
        </vk-table-column-sort>
    </vk-table> -->
</template>

<script>
import CategoryCard from "@/components/CategoryCard";

export default {
    name:'categories-list',
    components: {
        CategoryCard,
    },
    props: {
        categories: Array,
        editable: Boolean,
    }
}
</script>
