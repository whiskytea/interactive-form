//I'm guessing one would normally declare all their variables at the very beginning of the script. Since this is a homework assignment
//split into sections, it just made more sense to declare variables to each section in the same block of code as the rest of that section.


//Name Field Section
const nameInput = document.querySelector('#name');

document.addEventListener('DOMContentLoaded', () => {
    nameInput.focus();
});

//Job Role Section
const otherJobInput = document.querySelector('#other-job-role');
const jobSelect = document.querySelector("select#title")

otherJobInput.style.display = 'none';
jobSelect.addEventListener('change', () => {
    if (jobSelect.value === "other"){
        otherJobInput.style.display = 'inline';
    }
    else {
        otherJobInput.style.display = 'none';
    }
});

//T-shirt Info Section
const shirtColorList = document.querySelector('#color');
const shirtList = document.querySelector('#design');

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

// From Validation and Accessibility Section

const error = function (domElement){ //function that adds the form validation visualization
    domElement.parentElement.classList.add('not-valid');
    domElement.parentElement.classList.remove('valid');   
    domElement.parentElement.lastElementChild.style.display = "inline";
}

const valid = (domElement) => { 
    domElement.parentElement.classList.add('valid');
    domElement.classList.remove('error-border');  
}

const clearError = () => { //clears the form validation error visualizations. error visualizations will be readded as needed
    const allNodes = document.body.getElementsByTagName("*"); //https://stackoverflow.com/questions/12823264/get-all-elements-in-the-body-tag-using-pure-javascript
    for (node of allNodes){
        const nodeClasslist = node.classList;
        if(nodeClasslist.contains('not-valid')){
            nodeClasslist.remove('not-valid', 'error-border');
            node.lastElementChild.style.display = "none";
        }
        
    }
}

//all the helper functions
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

const checkNameField = (e = null) => {
    if(nameField.value === ''){
        if (e !== null){
            e.preventDefault();
        };
        error(nameField);
    }
    else{
        valid(nameField);
    }
};
const checkEmailField = (e = null) => {
    if (emailField.value === ''){
        if (e !== null){
            e.preventDefault();
        };  
        error(emailField);
    }
    else if(!verifyEmail.test(emailField.value)){
        if (e !== null){
            e.preventDefault();
        };
        emailHint.textContent = "The email address is formatted incorrectly."; //Extra Credit - conditional validation hint
        error(emailField);
    }
    else{
        valid(emailField);
    }
};
const checkActivities = (e = null) => {
    if(isChecked(activities) === false){ 
        if (e !== null){
            e.preventDefault();
        }; 
        error(activitiesBox); 
    }
    else{
        valid(activitiesBox);
    }
};
const checkCardNum = (e = null) => {
    if(cardNum.value == '' || !verifyCardNum.test(cardNum.value) || cardNum.value.length < 13 || cardNum.value.length > 16){
        if (e !== null){
            e.preventDefault();
        }; 
        error(cardNum);
    }
    else{
        valid(cardNum);
    }
};
const checkCardZip = (e = null) => {
    if(cardZip.value == '' || !verifyCardNum.test(cardZip.value) || cardZip.value.length < 5 || cardZip.value.length > 5){
        if (e !== null){
            e.preventDefault();
        }; 
        error(cardZip);
    }
    else{
        valid(cardZip);
    }
};
const checkCardCVV = (e = null) => {
    if(cardCVV.value == '' || !verifyCardNum.test(cardCVV.value) || cardCVV.value.length < 3 || cardCVV.value.length > 3){
        if (e !== null){
            e.preventDefault();
        }; 
        error(cardCVV);
    }
    else{
        valid(cardCVV);
    }
};

//fetch all the form DOM elements needed

const form = document.querySelector('form');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const emailHint = document.querySelector('#email-hint');
const verifyEmail = new RegExp("[a-zA-Z0-9._]+@[a-zA-Z0-9]+.(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)"); // RegExp for email validation is a modified version of the regexp found here: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#validation
const verifyCardNum = new RegExp("^[0-9]*$") //https://stackoverflow.com/questions/19715303/regex-that-accepts-only-numbers-0-9-and-no-characters
const activities = Array.from(document.querySelectorAll('#activities-box input'));
const paymentMethod = document.querySelector('#payment');
const cardNum = document.querySelector('#cc-num');
const cardZip = document.querySelector('#zip');
const cardCVV = document.querySelector('#cvv');

//submit form validation checks
form.addEventListener('submit', (e) =>{
    clearError();
    checkNameField(e);
    checkEmailField(e);
    checkActivities(e);
    if (paymentMethod === 'Credit Card'){
        checkCardNum(e);
        checkCardZip(e)
        checkCardCVV(e);
    } 
}) 

//Extra Credit:real time form validation - checks only when the user switches focus off of an element
//Does not check activities section

nameField.addEventListener('blur', () => {
    clearError();
    checkNameField();
});
emailField.addEventListener('blur', () => {
    clearError();
    checkEmailField();
});
cardNum.addEventListener('blur', () => {
    clearError();
    checkCardNum();
});
cardZip.addEventListener('blur', () => {
    clearError();
    checkCardZip();
});
cardCVV.addEventListener('blur', () => {
    clearError();
    checkCardCVV();
});

for (let activity of activities){
    activity.addEventListener('focus', () => {
        activity.parentElement.classList.add('focus');
    });
    activity.addEventListener('blur', () => {
        activity.parentElement.classList.remove('focus');
    });
    activity.addEventListener('input', () =>{
        const schedule = [];
        
        //grab all the dates and times and put them in an array, also renable options
        for (let option of activities){
            option.parentElement.classList.remove('disabled');
            if (option.checked){
                schedule.push(option.dataset.dayAndTime);
            }
        }
        //now disable all the conflicting options
        for (let item of activities){
            if (schedule.includes(item.dataset.dayAndTime)){
                if(!item.checked){
                    item.parentElement.classList.add("disabled");
                }
            }
        }
    })
}

//I don't like that the .error-border class stays on the expiration date fields when you select options, so this code removes it after focus out
const cardExpMonth = document.querySelector('#exp-month');
const cardExpYear = document.querySelector('#exp-year');

cardExpMonth.addEventListener('blur', () => {cardExpMonth.classList.remove('error-border')});
cardExpYear.addEventListener('blur', () => {cardExpYear.classList.remove('error-border')});