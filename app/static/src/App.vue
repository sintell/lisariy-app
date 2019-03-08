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
        <vk-navbar-logo>
          <img class="nav-logo-icon" src="/fox.svg" alt="Lisariy fox icon"/>
        </vk-navbar-logo>
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
    <hr class="uk-divider-icon"/>
    <div class="uk-container">
      <div class="footer">
        <div>Site created by Antky from <a href="aaleks.ru">antky.ru</a></div>
        <div>
          Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        </div>
        <div>Copyright 2019 Lisariy</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState({
      loading: state => state.loading,
      notifications: state => state.notifications,
      countUnsaved: state => state.submitedPictures.editable.length,
    }),
    ...mapGetters({
      authorized: 'isLoggedIn'
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
        router.push('/');
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

.nav-logo-icon {
  width: 50px;
}

.footer {
  font-size: 10px;
}
</style>
