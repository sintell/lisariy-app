<template>
    <vk-card
        class="uk-width-1-3@m uk-width-1-1 uk-align-center"
        padding="small"
    >
        <vk-card-title><slot name="title">Добро пожаловать!</slot></vk-card-title>
        <form @submit.prevent="submitData">
            <div class="uk-margin">
                <input
                    class="uk-input"
                    type="email"
                    placeholder="Логин (например e-mail)"
                    v-model="login"
                    @keyup.enter="submitData"
                />
            </div>
            <div class="uk-margin">
                <div class="uk-inline uk-display-block">
                    <vk-icon-link
                        class="uk-form-icon uk-form-icon-flip"
                        :icon="passwordVisible ? 'unlock' : 'lock'"
                        @click="togglePasswordVisible"
                    />
                    <input
                        class="uk-input"
                        :type="passwordVisible ? 'text' : 'password'"
                        placeholder="Пароль (8-32 символа)"
                        v-model="password"
                        @keyup.enter="submitData"
                        @blur="hidePassword"
                    />
                </div>
            </div>
            <vk-button
                type="primary"
                @click="submitData"
            >
                <slot name="button-text">Войти</slot>
            </vk-button>
        </form>
    </vk-card>
</template>

<script>
export default {
    name: 'creds-form',
    props: {
        onSubmit: Function,
    },
    data: function() {
        return {
            login: '',
            password: '',
            passwordVisible: false,
        }
    },
    methods: {
        submitData() {
            this.onSubmit({ login: this.login, password: this.password })
        },
        togglePasswordVisible() {
            this.passwordVisible = !this.passwordVisible;
        },
        hidePassword() {
            this.passwordVisible = false;
        }
    }
}
</script>
