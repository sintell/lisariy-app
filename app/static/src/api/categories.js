import axios from "axios";

export default {
    loadCategoriesData() {
        return axios.get('/api/categories');
    },
    loadCategoriesSuggest(text) {
        return axios.get(`/api/category?text=${encodeURIComponent(text)}`);
    },
    updateCategory(id, category) {
        return axios.put(`/api/category/${id}`, category);
    },
    deleteCategory(id) {
        return axios.delete(`/api/category/${id}`);
    }
}

