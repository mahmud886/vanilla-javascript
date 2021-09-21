const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show input error messages

const showErrorMessage = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
};

// show success outline message

const showSuccessMessage = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};

// Check email valid

const checkEmailValid = (input) => {
    const reg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(input.value.trim())) {
        showSuccessMessage(input);
    } else {
        showErrorMessage(input, 'Email is not valid!');
    }
};

// Check required fields

const checkRequired = (inputArr) => {
    let isRequired = false;
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showErrorMessage(input, `${getFieldName(input)} is required`);
            isRequired = true;
        } else {
            showSuccessMessage(input);
        }
    });
    return isRequired;
};

// check input length

const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showErrorMessage(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showErrorMessage(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else {
        showSuccessMessage(input);
    }
};

// Check password match
const checkPasswordMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showErrorMessage(input2, 'Password do not match!');
    }
};

// get fieldname

const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Event Listeners
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!checkRequired([username, email, password, password2])) {
        checkLength(username, 3, 15);
        checkLength(password, 6, 25);
        checkEmailValid(email);
        checkPasswordMatch(password, password2);
    }
});
