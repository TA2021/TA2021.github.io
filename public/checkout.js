document.querySelector('.search-bar').style.display = 'none';


const i = document.querySelectorAll('input');
i.forEach(el => el.addEventListener('keyup', checkComplete))


function checkComplete() {
    let isComplete = true
    i.forEach((el, ind) => {
        if (!ind) return;
        if (!el.value.trim()) isComplete = false;
    })
    console.log({isComplete})

    if (isComplete) {
        document.querySelector('.buy-now button').disabled = false;
        document.querySelector('.g-warning').innerText = "";
    }
}