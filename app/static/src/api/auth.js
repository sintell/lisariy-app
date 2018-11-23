import axios from "axios";
export default {
    login() {
        return axios.post('/api/login');
    },
    getMe() {
        return axios.get('/api/me');
    }
}
