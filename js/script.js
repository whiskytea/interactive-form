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
    else {wwwwww
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

const error = function (domElement){
    domElement.classList.add('not-valid');
    domElement.classList.add('error-border');
}

const clearError = () => {
    const allNodes = document.body.getElementsByTagName("*"); //https://stackoverflow.com/questions/12823264/get-all-elements-in-the-body-tag-using-pure-javascript
    for (node of allNodes){
        const nodeClasslist = node.classList;
        nodeClasslist.remove('not-valid', 'error-border');
    }
}

const isChecked = function (inputList) {
    let somethingChecked = false;
    for (let input of inputList){
        if (input.checked){
            somethingChecked = true;
            break;
        }
    }
    return somethingChecked;
}

const form = document.querySelector('form');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const verifyEmail = new RegExp("[a-zA-Z0-9._]+@[a-zA-Z0-9]+.(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)"); // RegExp for email validation is a modified version of the regexp found here: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#validation
const verifyCardNum = new RegExp("^[0-9]*$") //https://stackoverflow.com/questions/19715303/regex-that-accepts-only-numbers-0-9-and-no-characters
const activities = Array.from(document.querySelectorAll('#activities-box input'));
const cardNum = document.querySelector('#cc-num');
const cardZip = document.querySelector('#zip');
const cardCVV = document.querySelector('#cvv');

// console.log(isChecked(activities));


form.addEventListener('submit', (e) =>{
    clearError();
    if(nameField.value === ''){
        error(nameField);
        e.preventDefault();
    }
    else if(!verifyEmail.test(emailField.value)){
       error(emailField);
        e.preventDefault();
    }
    else if(isChecked(activities) === false){ 
        e.preventDefault(); 
        error(activitiesBox);
        
    }
    else if(cardNum.value == '' || !verifyCardNum.test(cardNum.value) || cardNum.value.length < 13 || cardNum.value.length > 16){
        e.preventDefault(); 
        error(cardNum);
    }
    else if(cardZip.value == '' || !verifyCardNum.test(cardZip.value) || cardZip.value.length < 5 || cardZip.value.length > 5){
        e.preventDefault(); 
        error(cardZip);
    }
    else if(cardCVV.value == '' || !verifyCardNum.test(cardCVV.value) || cardCVV.value.length < 3 || cardCVV.value.length > 3){
        e.preventDefault(); 
        error(cardCVV);
    }
})

