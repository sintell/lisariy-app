import axios from "axios";
const _images = [
    {id: 1, name: "Some picture with name", description: 'image #1', src: 'https://dummyimage.com/400x400/aaafff/000000.jpg'},
    {id: 2, name: "Some picture with name", description: 'image #2', src: 'https://dummyimage.com/400x400/faaaff/000333.jpg'},
    {id: 3, name: "Some picture with name", description: 'image #3', src: 'https://dummyimage.com/400x400/ffaaaf/0033330.jpg'},
    {id: 4, name: "Some picture with name", description: 'image #4', src: 'https://dummyimage.com/400x400/fffaaa/033300.jpg'},
    {id: 5, name: "Some picture with name", description: 'image #5', src: 'https://dummyimage.com/400x400/eeefff/333000.jpg'},
    {id: 6, name: "Some picture with name", description: 'image #6', src: 'https://dummyimage.com/400x400/feeeff/000333.jpg'},
    {id: 7, name: "Some picture with name", description: 'image #7', src: 'https://dummyimage.com/400x400/ffeeef/003330.jpg'},
    {id: 8, name: "Some picture with name", description: 'image #8', src: 'https://dummyimage.com/400x400/fffeee/033300.jpg'},
    {id: 9, name: "Some picture with name", description: 'image #9', src: 'https://dummyimage.com/400x400/ffffff/333000.jpg'},
]

export default {
    loadImagesData() {
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve(_images)
        //     }, Math.random() * 100);
        // })
        return axios.get('/api/pictures');
    },
    loadImageData(id) {
        return axios.get(`/api/pictures/${id}`);

        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve(_images.find(image => image.id === Number(id)));
        //     }, Math.random() * 1000);
        // })
    },
    saveImage({name, description}) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const img = {
                    id: _images.length + 1,
                    name,
                    description,
                    src: `https://dummyimage.com/400x400/${Math.floor(Math.random()*16777215).toString(16)}/${Math.floor(Math.random()*16777215).toString(16)}.jpg`
                }
                _images.unshift(img)
                resolve(img);
            }, Math.random() * 1000);
        })
    }
}

