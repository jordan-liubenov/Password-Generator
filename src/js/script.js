const allCharacters = {
    lowerCase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    upperCase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    specialChars: ['+', '-', '&', '|', '!', '(', ')', '{', '}', '[', ']', '^', '~', '*', '?', ':']
};

//checkboxes
const cbDigit = document.querySelector('#digitBox');
const cbUpper = document.querySelector('#upperBox');
const cbDuplicate = document.querySelector('#duplicateBox');
const cbSpecial = document.querySelector('#specialBox');

//getting slider value
let slider = document.getElementById("lengthRange");
let output = document.getElementById("sliderLabel");
output.innerHTML = slider.value;
slider.oninput = function () {
    output.innerHTML = this.value;
}


//main generation function
function generatePassword() {
    let length = slider.value;
    let password = [];

    //initial password generation
    for (i = 0; i < length; i++) {
        let randomizer = Math.floor(Math.random() * 26);

        password.push(allCharacters.lowerCase[randomizer]);
    }

    checkParameters(password, length); //function that checks if any parameters were selected and re-generates the password accordingly

    if (checkZeroParameters()) {
        document.getElementById("area").value = password.join("")
        console.log(`Generated password : ${password.join("")} with a length of ${length} symbols`)
    }
}



function duplicateCheck(array) { //function that checks if the passed password array contains any duplicates
    let counter = 0;
    for (i = 0; i < array.length; i++) {
        let current = array[i];

        if (checkIfAlphabetical(current)) {
            for (j = i + 1; j < array.length; j++) {
                let consecutive = array[j];

                if (current === consecutive) {
                    counter++;
                    break;
                }
            }
        }
    }
    if (counter == 1) {
        return true;
    } else {
        return false;
    }
}



function replaceDuplicate(array) { //function that removes duplicate element/s from array
    for (i = 0; i < array.length; i++) {
        let current = array[i];

        if (checkIfAlphabetical(current)) {
            for (j = i + 1; j < array.length; j++) {
                let consecutive = array[j];

                if (current === consecutive) {
                    let randomizer = Math.floor(Math.random() * 26);
                    if (current === current.toUpperCase()) {
                        array[j] = (allCharacters.upperCase[randomizer]);
                    } else if (current === current.toLowerCase()) {
                        array[j] = (allCharacters.lowerCase[randomizer]);
                    }
                }
            }
        }
    }
    return array;
}



function upperCaseGeneration(password, length) { //generates and replaces random lowerCase chars with upperCase ones
    for (i = 1; i <= length; i++) {
        let decide = Math.floor(Math.random() * 20);
        let rand = Math.floor(Math.random() * 26);

        let currentIndex = password.indexOf(password[i]);
        if (decide < 10) {
            password[currentIndex] = allCharacters.lowerCase[rand];
        } else {
            password[currentIndex] = allCharacters.upperCase[rand];
        }
    }
    return password;
}



function digitGeneration(password, length) { //generates and replaces random characters with digits
    for (i = 1; i <= length; i++) {
        let decide = Math.floor(Math.random() * 30);
        let rand = Math.floor(Math.random() * 10);

        let currentIndex = password.indexOf(password[i]);
        if (decide < 15) {
            password[currentIndex] = allCharacters.numbers[rand];
        }
    }
    return password;
}



function specialCharGeneration(password, length) { //generates and replaces random characters in the password with special chars
    for (i = 1; i <= length; i++) {
        let decide = Math.floor(Math.random() * 30);
        let rand = Math.floor(Math.random() * 16);

        let currentIndex = password.indexOf(password[i]);
        if (decide < 20) {
            password[currentIndex] = allCharacters.specialChars[rand];
        }
    }
    return password;
}



function checkZeroParameters() { //checks if no checkboxes have been ticked
    if (!cbDigit.checked && !cbSpecial.checked && !cbDuplicate.checked && !cbUpper.checked) {
        return true;
    }
}



function checkIfAlphabetical(arg) { //checks if the passed argument is an element in the alphabet
    if (allCharacters.lowerCase.includes(arg) || allCharacters.upperCase.includes(arg)) {
        return true;
    }
    else {
        return false;
    }
}



function checkParameters(password, length) {
    if (cbUpper.checked) {
        password = upperCaseGeneration(password, length);
    }

    if (cbDuplicate.checked) { 
        while (duplicateCheck(password)) { //runs algorithm for finding and replacing any a-z duplicates
            password = replaceDuplicate(password);
        }
    }

    if (cbDigit.checked) {
        password = digitGeneration(password, length);
    }

    if (cbSpecial.checked) {
        password = specialCharGeneration(password, length);
    }
    document.getElementById("area").value = password.join("");
}