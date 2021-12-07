const allCharacters = {
    lowerCase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    upperCase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    specialChars: ['+', '-', '&', '|', '!', '(', ')', '{', '}', '[', ']', '^', '~', '*', '?', ':']
};



function generatePassword() {

    let length = 12; //the default length of the password with no parameters changed
    let password = [];

    let previous = 0;
    for (i = 0; i < length; i++) {
        let randomizer = Math.floor(Math.random() * 26); //sets randomizer bounds from 0 to 26 (inclusive)

        password.push(allCharacters.lowerCase[randomizer]);
        previous = randomizer;

    }

    let passwordString = (preventMultipleOccurance(password)); //if there are characters that repeat in the password, replace duplicates

    document.getElementById("area").value = passwordString.join("");
    console.log(`Generated: ${passwordString.join("")}`)
}


function preventMultipleOccurance(array) {
    for (i = 0; i < array.length; i++) { //loops through the array containing the password

        let current = array[i];

        for (j = i + 1; j < array.length; j++) {
            let consecutive = array[j];

            if (current == consecutive) {

                for (j = i + 1; j < array.length; j++) {
                    let consecutive = array[j];

                    if (current === consecutive) {
                        array[j] = allCharacters.lowerCase[(Math.floor(Math.random() * 26))];

                        while (array[j] === current) {
                            array[j] = allCharacters.lowerCase[(Math.floor(Math.random() * 26))];
                        }
                    }
                }

            }
        }
    }
    return array;
}

