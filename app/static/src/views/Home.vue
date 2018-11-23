<template>
  <div>
    <pictures-list :pictures="pictures"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '../components/HelloWorld.vue'
import PicturesList from "../components/PicturesList.vue";
import { mapGetters } from "vuex";

export default {
  name: 'home',
  components: {
    HelloWorld,
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
