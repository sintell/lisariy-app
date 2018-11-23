<template>
    <div class="about">
        <h1>This is login page</h1>
        <div
            v-if="user.key"
        >
            You are logged in as  user with key={{user.key}}
        </div>
        <button
            v-if="!user.key"
            @click="login()"
        >
            Login
        </button>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: mapState({
        user: state => state.user
    }),
    methods: {
        login() {
            this.$store.dispatch("login")
        }
    }
}
</script>

<style>

</style>

