const inputElementRef =  document.getElementById('jao-ws__input')
const sendButtonElementRef =  document.getElementById('jao-ws__send-button')
const sendButtonWrapperElementRef =  document.getElementById('jao-ws__send-button-wrapper')
const errorMessageElementRef =  document.getElementById('jao-ws__error-message')
const pasteButtonElementRef =  document.getElementById('jao-ws__paste-button')


function heightScreenFixer() {
    const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('—app-height', `${window.innerHeight}px`)
    }
    window.addEventListener('resize', appHeight)
    appHeight()
}

heightScreenFixer()

function openWhatsapp(input) {
    const number = removeNoNumbers(input.value);
    const url = `https://wa.me/${number}`;
    window.open(url)
}

function inputValidator(inputElementRef, sendButtonElementRef,  errorMessageElementRef){
    const number = removeNoNumbers(inputElementRef.value);
    !!number?  sendButtonElementRef.removeAttribute('disabled'): sendButtonElementRef.setAttribute('disabled', '');
    !!number? errorMessageElementRef.classList.remove('jao-ws__error-message--show') : errorMessageElementRef.classList.add('jao-ws__error-message--show')
}


function removeNoNumbers(text) {
    return text.replace(/\D/g, '');
}

function paste(inputElementRef, sendButtonElementRef, errorMessageElementRef){
    navigator.clipboard.readText().then((clipText) => {
        inputElementRef.value = clipText
        inputValidator(inputElementRef, sendButtonElementRef, errorMessageElementRef)
    });
}


sendButtonWrapperElementRef.addEventListener('touchstart', () => {
    inputValidator(inputElementRef, sendButtonElementRef, errorMessageElementRef)
}, { passive: true });


sendButtonWrapperElementRef.addEventListener('mouseenter', () => {
    inputValidator(inputElementRef, sendButtonElementRef, errorMessageElementRef)
}, { passive: true });


sendButtonElementRef.addEventListener('click', () => {
    openWhatsapp(inputElementRef)
}, { passive: true });

inputElementRef.addEventListener('input', () => {
    inputValidator(inputElementRef, sendButtonElementRef, errorMessageElementRef)
}, { passive: true });

pasteButtonElementRef.addEventListener('click', () => {
    paste(inputElementRef, sendButtonElementRef, errorMessageElementRef)
}, { passive: true });

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("././serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}
