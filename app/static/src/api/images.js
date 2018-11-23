import axios from "axios";

export default {
    loadImagesData() {
        return axios.get('/api/pictures');
    },
    loadImageData(id) {
        return axios.get(`/api/picture/${id}`);
    },
    saveImages(files) {
        const formData = files.reduce((fData, file) => {
            fData.append('files', file);
            return fData;
        }, new FormData());
        return axios.post( '/api/pictures',
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        )
    },
    hideImage(id) {
        return axios.put(`/api/picture/${id}/hide`);
    },
    showImage(id) {
        return axios.put(`/api/picture/${id}/show`);
    },
    updateImage(picture) {
        return axios.put(`/api/picture/${picture.id}`, picture);
    },
    deleteImage(id) {
        return axios.delete(`/api/picture/${id}`);
    }
}

