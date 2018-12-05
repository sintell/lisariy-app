<template>
  <div>
    <pictures-list :pictures="pictures"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PicturesList from "@/components/PicturesList.vue";
import { mapGetters } from "vuex";

export default {
  name: 'home',
  components: {
    PicturesList
  },
  created() {
    this.$store.dispatch('getAllPictures');
  },
  computed: {
    ...mapGetters({
      pictures: 'picturesNewToOld'
    })
  }
}
</script>
