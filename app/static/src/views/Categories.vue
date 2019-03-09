<template>
  <categories-list :categories="categories" :editable="authorized"/>
</template>

<script>
// @ is an alias to /src
import CategoriesList from "@/components/CategoriesList.vue";
import { mapGetters, mapState } from "vuex";

export default {
  name: 'categories',
  components: {
    CategoriesList
  },
  created() {
    this.$store.dispatch('getAllCategories');
  },
  computed: {
    ...mapState({
        categories: state => state.categories.all,
    }),
    ...mapGetters({
      authorized: 'isLoggedIn'
    })
  }
}
</script>
