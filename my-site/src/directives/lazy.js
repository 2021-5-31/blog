import eventBus from '@/eventBus/eventBus';
import defaultGif from '@/assets/default.gif';
eventBus.$bus.$on('scrollEvent', () => {
    debounce()
})
let imgs = [];
let timer = null;
const debounce = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        setImg()
    }, 50)
}
const setImg = () => {
    for (const prop of imgs) {
        prop.dom.src = defaultGif
        const rect = prop.dom.getBoundingClientRect();
        if (rect.top > -rect.height && rect.bottom < window.innerHeight) {
            const newImg = new Image();
            newImg.onload = () => {
                prop.dom.src = prop.src
            };
            newImg.src = prop.src
            imgs = imgs.filter(item => item !== prop)
        }
    }
}

export default {
    inserted(el, bindings) {
        const img = {
            src: bindings.value,
            dom: el
        }
        imgs.push(img);
        setImg();
    },
    unbind(el) {
        imgs = imgs.filter(item => item.dom !== el)
    }
}