const allCharacters = {
    lowerCase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    upperCase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    specialChars: ['+', '-', '&', '|', '!', '(', ')', '{', '}', '[', ']', '^', '~', '*', '?', ':']
};


let slider = document.getElementById("lengthRange");
let output = document.getElementById("sliderLabel");
output.innerHTML = slider.value;
slider.oninput = function () {
output.innerHTML = this.value;
} 


function generatePassword() {
    let length = slider.value; //the default length of the password with no parameters changed 
    let password = [];

    //initial password generation
    for (i = 0; i < length; i++) {
        let randomizer = Math.floor(Math.random() * 26); //sets randomizer bounds from 0 to 26 (inclusive)

        password.push(allCharacters.lowerCase[randomizer]);
        previous = randomizer;
    }

    while (duplicateCheck(password)) {
        password = replaceDuplicate(password);
    }

    document.getElementById("area").value = password.join("");
    console.log(`Generated password : ${password.join("")} with a length of ${length} symbols`)
}



function duplicateCheck(array) { //function that checks if the passed password array contains any duplicates
    let counter = 0;
    for (i = 0; i < array.length; i++) {
        let current = array[i];

        for (j = i + 1; j < array.length; j++) {
            let consecutive = array[j];

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

        for (j = i + 1; j < array.length; j++) {
            let consecutive = array[j];

            if (current === consecutive) {
                let randomizer = Math.floor(Math.random() * 26);
                array[j] = (allCharacters.lowerCase[randomizer]);
            }
        }
    }
    return array;
}