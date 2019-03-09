import axios from "axios";

export default {
    loadCategoriesData() {
        return axios.get('/api/categories');
    },
    loadCategoriesSuggest(text) {
        return axios.get(`/api/category?text=${encodeURIComponent(text)}`);
    }
}

