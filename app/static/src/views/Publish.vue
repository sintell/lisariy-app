<template>
    <div >
      <vk-grid
        matched
        gutter="medium"
      >
        <div
          v-for="(file, idx) in files"
          :key="file.name + idx"
        >
          <vk-card class="uk-width-medium">
            <div slot="badge"><vk-icon-button icon="trash" @click="removeFile(idx)"/></div>
            <div slot="media-top">
              <img :src="getImgSrc(file)" :alt="file.name"/>
              <div
                v-if="isSubmiting"
                class="uk-overlay-default uk-position-cover"
              >
                <vk-spinner class="uk-position-center" ratio="2"/>
              </div>
            </div>
            <vk-card-title>{{file.name}}</vk-card-title>
          </vk-card>
        </div>
        <div>
          <vk-card class="uk-width-medium">
            <div>
              <div class="uk-placeholder uk-text-center">
                  <vk-icon icon="cloud-upload"/>&nbsp;
                  <span class="uk-text-middle">Перетащи изображение сюда или</span>
                  <div class="uk-form-custom">
                    <input id="files" ref="files" type="file" multiple @change="handleFilesUpload()">
                    <span class="uk-link">&nbsp;воспользуйся формой</span>
                  </div>
              </div>
            </div>
          </vk-card>
        </div>
      </vk-grid>

      <hr class="uk-divider-icon">
      <vk-button v-on:click="submitPictures()" :disabled="isSubmiting">Отправить</vk-button>
    </div>
</template>

<script>
import { mapState } from "vuex";
import PicturesList from "@/components/PicturesList"

export default {
  components: {
    PicturesList,
  },
  computed: mapState({
    isSubmiting: state => state.submitedPictures.loading,
    files: state => state.submitedPictures.all,
    pictures: state => state.submitedPictures.editable,
    count: state => state.submitedPictures.editable.length,
  }),
  methods: {
    addFiles(){
      this.$refs.files.click();
    },
    submitPictures(){
        this.$store.dispatch('submitPictures');
    },
    handleFilesUpload() {
      this.$store.dispatch('addPicturesToSubmit', this.$refs.files.files)
    },
    removeFile( key ){
      this.$store.dispatch('removePictureFromSubmit', key)
    },
    getImgSrc(file) {
      return window.URL.createObjectURL(file);
    }
  }
}
</script>
