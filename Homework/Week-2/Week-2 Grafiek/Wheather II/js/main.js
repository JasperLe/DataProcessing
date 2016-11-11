// Naam: Jasper Lelijveld
// Studentnummer: 11401753
// Opgave: Week-2 Homework

// Opgave was redelijk moeilijk. Het resultaat is matig, maar het is in ieder geval wel gelukt!
// Heel veel waarden zijn hard gecoded. Dat is jammer.
// als je je window verkleint kan je horizontaal scrollen

// split de data uit de textarea
var data = new Array();
data = document.getElementById('rawdata').value.split('\n');
var temp = [[]];
// split de data verder en push naar array temp
for (i = 0; i < 365; i++) {
    temp.push(data[i].split(','));
}
// shift het één omhoog (ivm titels.
for (i = 0; i < 1; i++) {
    temp.shift();
}

// Array voor maanden
var month = new Array();
month[1] = "January";
month[2] = "February";
month[3] = "March";
month[4] = "April";
month[5] = "May";
month[6] = "June";
month[7] = "July";
month[8] = "August";
month[9] = "September";
month[10] = "October";
month[11] = "November";
month[12] = "December";

// Opdelen van 20151101 in 11 -> november, stop de maand in temp[][1]
var date
for (i = 1; i < 365; i++) {
    date = temp[i][1];
    date = date.substr(4, 2);
    if (date < 10) {
        date = date.substr(1, 1)
    }
    date = month[date];
    temp[i][1] = date;
}

// Om de data te checken
//    for (i = 0; i < 365; i++) {
//        var row = table1.insertRow(i);
//        var cell1 = row.insertCell(0);
//        var cell2 = row.insertCell(1);
//        var cell3 = row.insertCell(2);
//        cell1.innerHTML = temp[i][1];
//        cell2.innerHTML = temp[i][2];
//        cell3.innerHTML = data[i];
//    }

// canvas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// transformatie functie
function createTransform(domain, range){
    var beta = (range[1] / domain[1] - range[0] / domain[0]) * (domain[0] * domain[1]) / (domain[0] - domain[1]);
    var alpha = (range[0] - beta) / domain[0];
	
    return function(x){
        return alpha * x + beta;
    };
}

// Transformeer de temp zodat het past in de hoogte van mijn canvas
var transformHeight = createTransform([-50, 300], [0, myCanvas.height]);

// CANVAS lijnen
// coördinaten draaien, bijstellen en een beetje marge over laten
ctx.translate(myCanvas.width / 2, myCanvas.height / 2);
ctx.scale(1, -1);
ctx.translate(0, 0);
ctx.translate(-(myCanvas.width / 3), -myCanvas.height / 2);

// de lijn tekenen op basis van de temperatuur in temp[i][2] + de transformatie
ctx.beginPath();
for (i = 0; i < 365; i++) {
    if (i > 0) {
        ctx.moveTo((i - 1) *2, transformHeight(temp[i - 1][2]));
        ctx.lineTo(i*2, transformHeight(temp[i][2]));
    }
    else {
        ctx.moveTo(0, temp[365]);
    }
}
ctx.stroke();

ctx.beginPath();
// spiegel het canvas horizontaal
ctx.scale(1, -1);
// X labels
var bool = false;
for (i = 0; i < 365; i++) {
    if (i % 30 == 1 && bool == true) {
        ctx.font = "10px serif";
        ctx.textBaseline = 'middle';
        void ctx.fillText(temp[i][1], i * 2, -10);
        ctx.moveTo(i*2-3, -10);
        ctx.lineTo(i*2-3, -20);
        ctx.stroke();
        bool = true;
    }
    else if (i % 31 == 1 && bool == false) {
        ctx.font = "10px serif";
        ctx.textBaseline = 'middle';
        void ctx.fillText(temp[i][1], i * 2, -10);
        ctx.moveTo(i*2-3, -10);
        ctx.lineTo(i*2-3, -20);
        ctx.stroke();
        bool = false;
    }
}

// y labels (start bij -50)
var x = -50;
for (i = 0; i < 250; i++) {
    if (i % 7 == 1) {
        ctx.font = "10px serif";
        ctx.textBaseline = 'middle';
        void ctx.fillText(x/10, -20, -i * 2);
        x += 10;
    }
}

// lijnen voor assen tekenen
ctx.moveTo(0, -20);
ctx.lineTo(myCanvas.width - 250, -20);
ctx.moveTo(0, -20);
ctx.lineTo(0, -myCanvas.height)
ctx.stroke();

// as-namen
ctx.font = "20px serif";
ctx.textBaseline = 'middle';
void ctx.fillText("Maand", 750, -10);
void ctx.fillText("Temperatuur", -150, -250);
void ctx.fillText("Gemiddelde temperatuur per dag in De Bilt", 70, -480);