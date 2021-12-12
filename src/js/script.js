const allCharacters = {
    lowerCase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    upperCase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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



function generatePassword() {
    let length = slider.value;
    let password = [];

    //initial password generation
    for (i = 0; i < length; i++) {
        let randomizer = Math.floor(Math.random() * 26);

        let decide = Math.floor(Math.random() * 10);
        
        if(5 < decide){
            password.push(allCharacters.lowerCase[randomizer]);
        } else {
            password.push(allCharacters.upperCase[randomizer]);
        }
    }



    if (document.querySelector('#upperBox:checked') !== null) {
        document.getElementById("area").value = "the upperCase box";

    } if (document.querySelector('#specialBox:checked') !== null) {
        document.getElementById("area").value = "the specialCase box";

    } if (document.querySelector('#duplicateBox:checked') !== null) { //no duplicates parameter
        while (duplicateCheck(password)) { //runs algorithm for finding and replacing any a-z duplicates
            password = replaceDuplicate(password);
        }
        document.getElementById("area").value = password.join("");

    } if (document.querySelector('#digitBox:checked') !== null) {
        document.getElementById("area").value = "the digitCase box ";

    } if (document.querySelector('#specialBox:checked') !== null) {
        document.getElementById("area").value = "the specialCase box ";

    } else {
        document.getElementById("area").value = password.join("");
    }

    if (checkZeroParameters) {
        console.log(`Generated password : ${password.join("")} with a length of ${length} symbols`)
    }
}



function duplicateCheck(array) { //function that checks if the passed password array contains any duplicates
    let counter = 0;
    for (i = 0; i < array.length; i++) {
        let current = array[i].toLowerCase();

        for (j = i + 1; j < array.length; j++) {
            let consecutive = array[j].toLowerCase();

            if (current === consecutive) {
                counter++;
                break;
            }
        }
    }
    if (counter >= 1) {
        return true;
    } else {
        return false;
    }
}



function replaceDuplicate(array) { //function that removes duplicate element from array
    for (i = 0; i < array.length; i++) {
        let current = array[i];

        if (typeof (current) === 'string') {
            for (j = i + 1; j < array.length; j++) {
                let consecutive = array[j];

                if (current === consecutive) {
                    let randomizer = Math.floor(Math.random() * 26);
                    array[j] = (allCharacters.lowerCase[randomizer]);
                }
            }
        }
    }
    return array;
}



function generateWithParameters(rand){
    let decide = Math.floor(Math.random() * (length / 2));
        
        if(decide < (length / 2)){
            password.push(allCharacters.lowerCase[rand]);
        } else {
            password.push(allCharacters.numbers[rand]);
        }
}




//checkbox *check if ticked* functions
function checkDigitBox() {
    if (cbDigit.checked) {
        console.log(`digitBox checked`);
    } else {
        console.log(`digitBox unchecked`)
    }
}

function checkUpperBox() {
    if (cbUpper.checked) {
        console.log(`upperBox checked`);
    } else {
        console.log(`upperBox unchecked`)
    }
}

function checkSpecialBox() {
    if (cbSpecial.checked) {
        console.log(`specialBox checked`);
    } else {
        console.log(`specialBox unchecked`)
    }
}

function checkDuplicateBox() {
    if (cbDuplicate.checked) {
        console.log(`duplicateBox checked`);
    } else {
        console.log(`duplicateBox unchecked`)
    }
}

function checkZeroParameters() {
    if (!checkDigitBox && !checkSpecialBox && !checkUpperBox && !checkDuplicateBox) {
        return true;
    }
}

function checkIfAlphabetical(string){ //if ascii value of current letter is alphabetic, return true
    if(string >= 97 && string <= 122 || string >= 65 && string <= 90){
        return true;
    } else {
        return false;
    }
}