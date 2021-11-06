import GetComponentsDom from './GetComponentsDom';
import Icon from '@/components/Icon/Icon';
import styles from '@/styles/ShowTip.module.less';
export default function (container, type, content, duration, callback) {
    const iconDom = GetComponentsDom(Icon, { type: type });
    iconDom.classList.add(styles.icondom);
    const div = document.createElement('div');
    div.innerHTML = `${iconDom.outerHTML}<span>${content}</span>`;
    div.className = `${styles.showtip} ${styles[`showtip-${type}`]}`;
    if (!container) {
        container = document.body;
    }
    container.appendChild(div);
    if (getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
    }
    div.clientHeight;
    div.style.opacity = 1;
    div.style.transform = 'translate(-50%, -50%)';
    setTimeout(() => {
        div.style.transform = 'translate(-50%, -50%) translateY(-35px)';
        div.style.opacity = 0;
        div.addEventListener('transitionend', () => {
            div.remove();
            callback && callback();
        }, { once: true })
    }, duration)
}