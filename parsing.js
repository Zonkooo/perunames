var BEGIN = 0;
var END = 1;
var ENIA = "N".charCodeAt(0); //ñ
var ARRAYLEN = "z".charCodeAt(0) + 1;
var MINWORDLEN = 3;

var occurences = [];

function initArray() {
    for(var i = 0; i < ARRAYLEN; i++){
        occurences[i] = [];
        for(var j = 0; j < ARRAYLEN; j++){
            occurences[i][j] = 0;
        }
    }
}

function printArray() {
    var firstLine = "";
    for(var c = "a".charCodeAt(0); c < ARRAYLEN; c++){
        firstLine += "\t" + String.fromCharCode(c);
    }
    console.log(firstLine);
    for(var i = "a".charCodeAt(0); i < ARRAYLEN; i++){
        var line = String.fromCharCode(i);
        for(var j = "a".charCodeAt(0); j < ARRAYLEN; j++) {
            line += "\t" + (occurences[i][j] * 100).toFixed(1);
        }
        console.log(line);
    }
}

function readfile() {
    initArray();
    for(var icity = 0; icity < names_raw.length; icity++) {
        var cityname = names_raw[icity];
        //console.log(cityname);
        occurences[BEGIN][cityname.charCodeAt(0)]++;
        for(var ichar = 1; ichar < cityname.length; ichar++) {
            occurences[cityname.charCodeAt(ichar-1)][cityname.charCodeAt(ichar)]++;
        }
        occurences[cityname.charCodeAt(cityname.length-1)][END]++;
    }
    normalizeArray();
    //printArray();
}

function normalizeArray() {
    for(var i = 0; i < ARRAYLEN; i++) {
        var sum = 0;
        for (var j1 = 0; j1 < ARRAYLEN; j1++) {
            sum += occurences[i][j1];
        }
        for (var j2 = 0; j2 < ARRAYLEN; j2++) {
            occurences[i][j2] /= sum;
        }
    }
}

function generateName() {
    var name = "";
    var current = BEGIN;
    while(true) {
        var choice = Math.random();
        var accu = 0;
        for (var i = 0; i < ARRAYLEN; i++) {
            accu += occurences[current][i];

            if (accu >= choice) {
                if (i == END) {
                    if(name.length < MINWORDLEN)
                        break;
                    console.log(name);
                    document.getElementById("cityname").innerHTML = name + ", Peru 🇵🇪";
                    return;
                }
                current = i;
                name += i == ENIA ? "ñ" : String.fromCharCode(i);
                break;
            }
        }
        if(i == ARRAYLEN)
            console.warn("reached end of eval for letter " + String.fromCharCode(current) + " (" + current + ")"
                + " and choice " + choice
                + " accu was only " + accu);
    }
}