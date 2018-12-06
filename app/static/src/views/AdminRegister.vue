<template>
    <div>
        <creds-form :onSubmit="register">
            <span slot="title">Заполни регистрационные данные:</span>
            <span slot="button-text">Зарегистрироваться</span>
        </creds-form>
    </div>

</template>

<script>
import { mapState } from "vuex";
import CredsForm from "@/components/CredsForm.vue";

export default {
    components: {
        CredsForm,
    },
    computed: mapState({
        user: state => state.user
    }),
    methods: {
        register(authData) {
            const router = this.$router;
            this.$store.dispatch("register", authData).then(function() {
                router.push('/');
            })
        }
    },
    beforeCreate() {
        if (this.$store.getters.isLoggedIn) {
            this.$router.replace('/')
        }
    }
}
</script>

<style>

</style>
