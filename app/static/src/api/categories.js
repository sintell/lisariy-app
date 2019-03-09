import axios from "axios";

export default {
    loadCategoriesData() {
        return axios.get('/api/categories');
    },
}

