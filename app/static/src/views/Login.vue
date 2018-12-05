<template>
    <div>
        <login-form :onSubmit="login"/>
    </div>
</template>

<script>
import { mapState } from "vuex";
import LoginForm from "@/components/LoginForm.vue";

export default {
    components: {
        LoginForm,
    },
    computed: mapState({
        user: state => state.user
    }),
    methods: {
        login(authData) {
            const router = this.$router;
            this.$store.dispatch("login", authData).then(function() {
                router.push('home');
            })
        }
    },
    beforeCreate() {
        if (this.$store.getters.isLoggedIn) {
            this.$router.replace('home')
        }
    }
}
</script>

<style>

</style>

