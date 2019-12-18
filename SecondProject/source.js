var button = document.getElementsByTagName("input")[1];
var Getdata = document.getElementsByTagName("input")[2];
var textbox = document.getElementsByTagName("input")[0];
var wrongTextEntered = document.getElementsByTagName("span")[1];
wrongTextEntered.hidden = true;

var localStorage = window.localStorage;
var TimerTick = setInterval(Timer, 5000);

window.addEventListener('load', function (e) {
    var store = [];
    if (localStorage.getItem('load') == null) {
        store.push(new SetAction(e));
        localStorage.setItem('load', JSON.stringify(store));
    }
    else {
        store = JSON.parse(localStorage.getItem('load'));
        store.push(new SetAction(e));
        localStorage.setItem('load', JSON.stringify(store));
    }
});

window.addEventListener("unload", function (e) {
    var store = [];
    if (localStorage.getItem('unload') == null) {
        store.push(new SetAction(e));
        localStorage.setItem('unload', JSON.stringify(store));
    }
    else {
        store = JSON.parse(localStorage.getItem('unload'));
        store.push(new SetAction(e));
        localStorage.setItem('unload', JSON.stringify(store));
    }
});


button.addEventListener("click", function (e) {
    // Set Generate Button click data and time
    var store = [];
    if (localStorage.getItem('buttonClick') == null) {
        store.push(new SetAction(e));
        localStorage.setItem('buttonClick', JSON.stringify(store));
    }
    else {
        store = JSON.parse(localStorage.getItem('buttonClick'));
        store.push(new SetAction(e));
        localStorage.setItem('buttonClick', JSON.stringify(store));
    }
    var buttonNum = CheckText(textbox.value);
    if (buttonNum == -1)// Wrong Input has been Read
    {
        wrongTextEntered.hidden = false;
        return;
    }
    var DivList = document.getElementsByTagName("div");
    DivList[1].innerHTML = "";
    DivList[2].innerHTML = "";
    // Generate Buttons in Div[1]
    generateButtons(DivList[1], buttonNum);
    //Generate image when buttons pressed
    var buttonList = document.getElementsByClassName('buttonstyle');
    setButtonEvents(DivList[2], buttonList);

});

textbox.addEventListener("focus", function () {
    wrongTextEntered.hidden = true;
    var DivList = document.getElementsByTagName("div");
    DivList[1].innerHTML = "";
    DivList[2].innerHTML = "";
});



function CheckText(x) {
    // Check Input validtion
    var check = true;
    var num;
    try {
        num = parseInt(x);
    }
    catch (error) {
        check &= false;
    }
    return ((check && num >= 0 && num <= 26) ? num : -1);
}


function generateButtons(Div, buttonNum) {
    var numList = [];
    // Generate random numbers and store them in the numlist
    for (var i = 0; i < buttonNum; i++) {
        var check;// Checks if the number has been generated before or not 
        do {
            check = true;
            var random = Math.floor((Math.random() * 26) + 1);

            for (var j = 0; j < i; j++) {
                if (random == numList[j]) {
                    check = false;
                    break;
                }
            }

            if (check) {
                numList.push(random);
            }
        } while (!check);
    }
    // Sort Elements in Ascending Oreder
    numList.sort((a, b) => a - b);

    // Generate Buttons in Div[1]
    for (var i = 0; i < buttonNum; i++) {
        var button = document.createElement('button');
        button.textContent = String.fromCharCode(64 + numList[i]);
        button.setAttribute('class', 'buttonstyle');
        Div.appendChild(button);
    }
}



function setButtonEvents(Div, buttonList) {
    //set event per each generated button
    for (var i = 0; i < buttonList.length; i++) {
        buttonList[i].addEventListener("click", function (e) {
            // Set LettersButton click data and time
            var store = [];
            if (localStorage.getItem('click') == null) {
                store.push(new SetAction(e));
                localStorage.setItem('click', JSON.stringify(store));
            }
            else {
                store = JSON.parse(localStorage.getItem('click'));
                store.push(new SetAction(e));
                localStorage.setItem('click', JSON.stringify(store));
            }

            var characterPressed = e.target.textContent;
            var imagePath = "Images/";
            imagePath = imagePath.concat(characterPressed + ".png");
            var image = document.createElement('img');
            image.src = imagePath;
            image.setAttribute('class', 'imagestyle');
            var clearDiv2 = document.getElementsByTagName("Div")[2];
            clearDiv2.innerHTML = "";
            Div.appendChild(image);
        });
    }
}


function SetAction(e) {
    this.eventType = e.type;
    this.eventTarget = e.target;
    this.eventTime = new Date();
}

function Timer() {
    var flag = true;
    var store = [];
    var itms = ['load', 'unload', 'click', 'buttonClick'];
    for (var i = 0; i < itms.length; i++) {
        if (JSON.parse(localStorage.getItem(itms[i])) == null) continue;
        store = JSON.parse(localStorage.getItem(itms[i]));
        for (var j = 0; j < store.length; j++) {
            var ob = store[j];
            var Item = { "eventType": ob.eventType, "eventTarget": ob.eventTarget, "eventTime": ob.eventTime };
            $.ajax({
                "type": "POST",
                "url": "ajexPOST.php",
                "data": { "dataset": JSON.stringify(Item) },
                "success": function (response) {
                    flag &= true;
                },
                "error": function () {
                    flag &= false;
                }
            })
        }

    }

    if (flag) {
        window.localStorage.clear();
        localStorage = window.localStorage;
    }
}


Getdata.addEventListener("click", function (e) {
    console.clear();
    $.ajax({
        "type": "GET",
        "url": "ajexGET.php",
        "data": { "dataset": "" },
        "success": function (response) {
            var $data = JSON.parse(response);
            //console.log($data[0]);
            for (var i=0;i<$data.length;i++) {
                console.log($data[i]);
            }
        }
    });
});
