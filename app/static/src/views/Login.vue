<template>
    <div>
        <creds-form :onSubmit="login"/>
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
        login(authData) {
            const router = this.$router;
            this.$store.dispatch("login", authData).then(function() {
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
