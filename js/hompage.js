const users = document.querySelector('.users')
const cards = document.querySelector('.cards-numbers')

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.round(progress * (end - start) + start);
        obj.innerHTML = current.toLocaleString(); // Use toLocaleString() for better number formatting
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}
document.addEventListener('DOMContentLoaded' , () =>{
    animateValue(users.children[0] , 45000 , 52762 , 2000)
    animateValue(cards.children[0] , 8340000 , 8347411 , 2000)
})