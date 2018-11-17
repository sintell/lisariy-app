<template>
  <div>
    <h1>Lisariy</h1>
    <pictures-list/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '../components/HelloWorld.vue'
import PicturesList from "../components/PicturesList.vue";

export default {
  name: 'home',
  components: {
    HelloWorld,
    PicturesList
  }
}
</script>
