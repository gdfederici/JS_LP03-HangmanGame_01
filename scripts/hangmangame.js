
// Appoggio termporaneo json
var dJson = '{ "dataComputer": [' +
    '{"word":"ACCOUNT", "tip":"The position of a user relative to a computer system, with which access and action permissions are defined."},' +
    '{"word":"APACHE", "tip":"Open Source software with WEB server function available for UNIX, Linux, Windows and other operating systems."},' +
    '{"word":"ARPANET", "tip":"Computer network created in the sixties of the twentieth century by the ARPA agency of the US Department of Defense. Now decommissioned, it has been the technological base from which the modern Internet is derived."} ]}';
var kJson = '{ "keyboard" : [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"] }';



// ---------- ///// ---------- // INIZIALIZZAZIONE // ---------- ///// ---------- //

// IT- Inizializzo il gioco.
// EN- Start the game.
function playInit() {
    createKeyboard();
    var mysteryStart = isMysteryBox();
    console.log("mystery", mysteryStart);
    createWord(mysteryStart.word);
    return mysteryStart;
}

// IT- Mostro a monitor la tastiera selezionata.
// EN- Keyboard on the monitor.
function createKeyboard () {
    let jsonKeyboard = loadKeyboard(kJson);
    document.getElementById("hangmanKeyboard").innerHTML = jsonKeyboard.map(function(item) {
        return "<button class='endgame' id='key-" + item + "' onclick='playGame(\"" + item + "\")'>" + item + "</button>";
    }).join(" ");
}
// IT- Carico i dati dal contenuto json.
// EN- Load the data from the json content.
function loadKeyboard (langJson) {
    return JSON.parse(langJson).keyboard;
}

// IT- Creo il box misterioso con tutti gli elementi per il gioco: parola, suggerimento, lettere indonivate, errori commessi.
// EN- Create the mystery box with all the elements: word, tip, check letters, mistakes.
function isMysteryBox() {
    var mysteryBox = isMystery();
    mysteryBox.ok = 0;
    mysteryBox.ko = 0;
    //mysteryBox.letters = [];
    return mysteryBox;
}
// IT- Dall'intero gruppo di parole+suggerimenti estraggo casualmente quelli da utilizzare nel gioco.
// EN- From the whole group of words+hints randomly extract the ones to use in the game.
function isMystery() {
    let mysteryObj = loadData(dJson);
    let luck = Math.floor(Math.random() * mysteryObj.length);
    console.log("MBOX", mysteryObj[luck]);
    return mysteryObj[luck];
}
// IT- Carico i dati dal contenuto json.
// EN- Load the data from the json content.
function loadData(contentJson) {
    return JSON.parse(contentJson).dataComputer;
}

// IT- Mostro a monitor lo spazio con la parola da indovinare.
// EN- Show space for mystery word.
function createWord (word) {
    let wordA = [...word];
    var i=-1;
    document.getElementById("deathWord").innerHTML = wordA.map(function(item) {
        i++;
        return "<span id='place" + i + "' class='mystery_word'> _ </span>";
    }).join(" ");
}


// ---------- ///// ---------- // GIOCO // ---------- ///// ---------- //


function playGame(letterChoice) {
    console.log(letterChoice);
    document.getElementById("key-"+letterChoice).disabled = true;
    var checkResult = checkLetter(letterChoice, mystery.word);
    //mystery.letters.push(letterChoice);
    if (!checkResult.length) {
        mystery.ko++;
        console.log ("errori", mystery.ko);
        if (mystery.ko === 3) {
            alert("Perso");
            disableKeyboard();
        }
    }
    else {
        showLetter (checkResult, letterChoice);
        console.log("giusto");
        if (mystery.ok === mystery.word.length) { 
            alert("Vinto");
            disableKeyboard();
        }
    }
}


// IT- Controllo la presenza della lettera nella parola.
// EN- Check letter in the word.
function checkLetter (letter, word) {
    let wordA = [...word]; // Trasformo stringa in array per utilizzare forEach altrimenti potevo lasciare e usare ciclo for normale
    console.log(wordA);
    let positions = [];
    wordA.forEach(function(value, index) {
        if (letter.toUpperCase() === value.toUpperCase()) {
            positions.push(index);
        }
    })
    console.log("positions", positions);
    return positions;
}

// IT- Mostro le lettere indovinate al posto degli spazi vuoti.
// EN- Show corret letter.
function showLetter (positions, letter) {
    let howManyCheck = positions.length;
    console.log("lettera", letter);
    for (i=0; i<howManyCheck; i++) {
        document.getElementById("place" + positions[i]).innerHTML = letter;
        mystery.ok++;
    }
}

// IT- Disattivare tutte le lettere della tastiera.
// EN- Disable all keyboard.
function disableKeyboard() {
    let killKeyboard = document.getElementsByClassName("endgame");
    for (let i=0; i<killKeyboard.length; i++) {
        killKeyboard[i].disabled = true;
    }
}


// *** ---------- TEST ---------- *** //

var mystery = startHangmanGame();
console.log("mystery", mystery);