<template>
    <vk-table :data="categories" :sortedBy="{usages: 'asc'}" narrowed>
        <vk-table-column title="Категория" cell="text" shrinked></vk-table-column>
        <vk-table-column title="Описание" cell="description" shrinked></vk-table-column>
        <vk-table-column-sort title="Количество работ" cell="usages" shrinked></vk-table-column-sort>
    </vk-table>
</template>

<script>

export default {
    name:'categories-list',
    props: {
        categories: Array,
        editable: Boolean,
    }
}
</script>
