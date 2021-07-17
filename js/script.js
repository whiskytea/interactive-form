const nameInput = document.querySelector('#name');
const otherJobInput = document.querySelector('#other-job-role');
const jobSelect = document.querySelector("select#title")
const shirtColorList = document.querySelector('#color');
const shirtList = document.querySelector('#design');

//name field requirement
document.addEventListener('DOMContentLoaded', () => {
    nameInput.focus();
});

//job role requirement
otherJobInput.style.display = 'none';
jobSelect.addEventListener('change', () => {
    if (jobSelect.value === "other"){
        otherJobInput.style.display = 'inline';
    }
    else {
        otherJobInput.style.display = 'none';
    }
});

//t-shirt Info requirement
shirtColorList.disabled = true; //https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/disabled
shirtList.addEventListener('change', () => {
    shirtColorList.disabled = false;
    if (shirtList.value === "js puns"){
        shirtColorList.style.display = 'inline';
        for (let color of shirtColorList.children) { //hide
            if (color.dataset.theme !== 'js puns'){
                color.style.display = 'none';
            }
            else if(color.dataset.theme){
                color.style.display = 'inline';
            }
        }
    }
    else {
        shirtColorList.style.display = 'inline';
        for (let color of shirtColorList.children) {
            if (color.dataset.theme === 'js puns'){
                color.style.display = 'none';
            }
            else if(color.dataset.theme){
                color.style.display = 'inline';
            }
        }
    }
    shirtColorList.value = "choose a color";
});

//"Register for Activites" section
const activitiesBox = document.querySelector("#activities-box");
const totalContainer = document.querySelector('#activities-cost');

activitiesBox.addEventListener('change', () =>{
    let total = 0;
    totalContainer.textContent = `Total: $${total}`;
    for (let childElement of activitiesBox.children){
        for (let labelElements of childElement.children){
            if (labelElements.checked){
                total += parseInt(labelElements.dataset.cost);
            }
        }
    }
    totalContainer.textContent = `Total: $${total}`;
})

//"Payment Info" section

const paymentMethods = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

document.addEventListener('DOMContentLoaded', () => {
    paymentMethods.value = "credit-card";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
})

paymentMethods.addEventListener('change', () =>{
    let paymentChoice = paymentMethods.value;
    if (paymentChoice === 'credit-card'){
        creditCard.style.display = "block";
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    }
    else if (paymentChoice === 'paypal'){
        creditCard.style.display = "none";
        paypal.style.display = "block";
        bitcoin.style.display = "none";
    }
    else if (paymentChoice === 'bitcoin'){
        creditCard.style.display = "none";
        paypal.style.display = "none";
        bitcoin.style.display = "block";
    }
})

// From Validation

const form = document.querySelector('form');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const verifyEmail = new RegExp("[a-zA-Z0-9._]+@[a-zA-Z0-9]+.(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)"); // RegExp for email validation is a modified version of the regexp found here: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#validation
const verifyCardNum = new RegExp()
const activities = Array.from(document.querySelectorAll('#activities-box input'));
console.log(activities.some((input) => input.checked));

form.addEventListener('submit', (e) =>{
    if(nameField.value === ''){
        nameField.classList.add('not-valid');
        e.preventDefault();
    }
    else if(!verifyEmail.test(emailField.value)){
        emailField.classList.add('not-valid');
        e.preventDefault();
    }
    else if(activities.some((input) => input.checked)){ //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
        activitiesbox.classList.add('not-valid');
        console.log('hi');
        e.preventDefault();
    }
    else if(paymentMethods.value === 'credit-card'){
        if()
        e.preventDefault();
    }
    
})