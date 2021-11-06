import styles from '@/styles/loading.module.less';
import loadingUrl from '@/assets/loading.svg'
function hasImg(el){
    return el.querySelector('img[data-role=loading]')
}
export default function(el,binding){
    if (binding.value && !hasImg(el)) {
    const img = document.createElement('img');
    img.src = loadingUrl;
    img.dataset.role = 'loading';
    img.className = styles.loading;
    el.appendChild(img)
    }
    
    if(!binding.value && hasImg(el)){
        hasImg(el).remove()
    }
    
}