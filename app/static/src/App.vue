<template>
  <div id="app">
    <vk-notification
      :messages="notifications"
      :timeout="2000"
      @update:messages="updateNotifications"
      position="top-right"
    />
    <vk-navbar>
      <vk-navbar-nav slot="center">
        <vk-navbar-logo>Lisariy</vk-navbar-logo>
        <vk-navbar-nav-item
          :active="this.$route.path === '/'"
          href="/"
          title="Работы"
          @click.prevent="pushRoute('/')"/>
        <vk-navbar-nav-item
          v-if="authorized"
          :active="this.$route.path === '/publish'"
          href="/publish"
          :title="'Опубликовать' + (countUnsaved ? ` (${countUnsaved})` : '')"
          @click.prevent="pushRoute('/publish')"/>
        <vk-navbar-nav-item
          v-if="!authorized"
          :active="this.$route.path === '/login'"
          href="/login"
          title="Войти"
          @click.prevent="pushRoute('/login')"/>
        <vk-navbar-nav-item
          v-if="authorized"
          :active="this.$route.path === '/profile'"
          href="/profile"
          title="Мой профиль"
          @click.prevent="pushRoute('/profile')"/>
        <vk-navbar-nav-item
          v-if="authorized"
          title="Выйти"
          @click.prevent="logout"/>
      </vk-navbar-nav>
    </vk-navbar>
      <div class="uk-container">
        <router-view/>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      loading: state => state.loading,
      authorized: state => state.user.key !== undefined,
      notifications: state => state.notifications,
      countUnsaved: state => state.submitedPictures.editable.length,
    })
  },
  created() {
    this.$store.dispatch('getMeInfo');
  },
  methods: {
    pushRoute(route) {
      this.$router.push(route);
    },
    updateNotifications(notifications) {
      this.$store.dispatch('updateNotifications', notifications);
    },
    logout() {
      const router = this.$router;
      this.$store.dispatch('logout').then(function() {
        router.push('home');
      });
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 25px;
}
.uk-notification-message {
  box-shadow: #aaa -1px 1px 4px;
}
</style>
