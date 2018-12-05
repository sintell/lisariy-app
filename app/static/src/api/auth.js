import axios from "axios";
export default {
    login(authData) {
        return axios.post('/api/login', authData);
    },
    logout() {
        return axios.post('/api/logout');
    },
    getMe() {
        return axios.get('/api/me');
    }
}
