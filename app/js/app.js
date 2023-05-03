const body = document.querySelector('body');
const menuBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.menu__list');
const contactTitle = document.querySelector('.section-title')
const contactForm = document.querySelector('.form');
const contactText = document.querySelector('.contacts__text');
const successfulMsg = document.querySelector('.successeful__msg');
const successefulBlock = document.querySelector('.successeful');
const tabItem = document.querySelectorAll ('.tabs__btn-item');
const tabContent = document.querySelectorAll('.tabs__content-item');


menuBtn.addEventListener('click', () => {
    menu.classList.toggle('menu__list--active');

    if (menu.classList.contains('menu__list--active')) {
        body.classList.toggle('hidden');
    }
    
    else if (body.classList.contains('hidden')) {
        body.classList.remove('hidden');
    }

});


tabItem.forEach(function(el) {
    el.addEventListener('click', open);
})


function open (evt) {
    const tabTarget = evt.currentTarget;
    const button = tabTarget.dataset.button;

    tabItem.forEach(function(item) {
        item.classList.remove('tabs__btn-item--active');
    });
    tabTarget.classList.add('tabs__btn-item--active');

    tabContent.forEach(function(item){
        item.classList.remove('tabs__content-item--active')
    })
    document.querySelector(`#${button}`).classList.add('tabs__content-item--active');
}

const getData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`error adress ${url}, status ${response.status}` )
    }
    return await response.json();
};

const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data
    })

    if (!response.ok) {
        throw new Error(`error adress ${url}, status ${response.status}` )
    }
    return await response.json();
}

const sendFormData = () => {

    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const dataForomForm = new FormData(contactForm)

        sendData('https://jsonplaceholder.typicode.com/posts', dataForomForm)
        .then(() => {
            contactForm.reset();
        })
        .catch((err) => {
            console.log('error- ', err)
        })

        contactTitle.classList.add('form__blur');
        contactText.classList.add('form__blur');
        contactForm.classList.add('form__blur');
        successefulBlock.classList.remove('disabled');
        successfulMsg.classList.remove('disabled');
        successfulMsg.innerHTML = 'Thank you for your message!';

        setTimeout(() => {
            contactTitle.classList.remove('form__blur');
            contactForm.classList.remove('form__blur');
            contactText.classList.remove('form__blur');
            successefulBlock.classList.add('disabled')
            successfulMsg.classList.add('disabled');
        }, 5000);
    })
}
sendFormData();