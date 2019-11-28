var submit = document.querySelector("input[type='submit']");
var textbox =  document.getElementsByTagName("input")[0];
var wrongTextEntered = document.getElementsByTagName("span")[1];
wrongTextEntered.hidden = true;

var localStorage = window.localStorage;
var TimerTick = setInterval(Timer, 5000);

window.addEventListener('load',function(e){
    localStorage.setItem(localStorage.length + 1, JSON.stringify(new SetAction(e)));
});

window.addEventListener("unload", function(e){
    localStorage.setItem(localStorage.length + 1, JSON.stringify(new SetAction(e)));
});


submit.addEventListener("click", function(e){
    // Set Generate Button click data and time
    localStorage.setItem(localStorage.length + 1, JSON.stringify(new SetAction(e)));
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

textbox.addEventListener("focus", function(){
    wrongTextEntered.hidden = true; 
});



function CheckText(x)
{
    // Check Input validtion
    var check = true;
    var num;
    try{
        num = parseInt(x);
    } 
    catch(error){
        check &= false;
    }
    return ((check && num >= 0 && num <= 26)? num : -1);
}


function generateButtons(Div, buttonNum)
{
    var numList = [];
    // Generate random numbers and store them in the numlist
    for (var i = 0; i < buttonNum; i++)
    {
        var check;// Checks if the number has been generated before or not 
        do{
            check = true;
            var random = Math.floor((Math.random() * 26) + 1);
        
            for (var j = 0; j < i; j++){
                if (random == numList[j])
                {
                    check = false;
                    break;
                }
            }

            if (check)
            {
                numList.push(random);
            }
        }while(!check);
    }
    // Sort Elements in Ascending Oreder
    numList.sort((a, b) => a - b);

    // Generate Buttons in Div[1]
    for (var i = 0; i < buttonNum; i++)
    {
        var button = document.createElement('button');
        button.textContent=String.fromCharCode(64 + numList[i]);
        button.setAttribute('class', 'buttonstyle');
        Div.appendChild(button);
    }
}



function setButtonEvents(Div, buttonList)
{
    //set event per each generated button
    for (var i = 0; i < buttonList.length; i++)
    {
        buttonList[i].addEventListener("click", function(e){
            // Set LettersButton click data and time
            localStorage.setItem(localStorage.length + 1, JSON.stringify(new SetAction(e)));
            
            var characterPressed = e.target.textContent;
            var imagePath = "Images/";
            imagePath = imagePath.concat(characterPressed + ".png");
            var image = document.createElement('img');
            image.src = imagePath;
            image.setAttribute('class', 'imagestyle');
            var clearDiv2 = document.getElementsByTagName("Div")[2];
		    clearDiv2.innerHTML="";
            Div.appendChild(image);
        });
    }
}


function SetAction(e){
    this.eventType = e.type;
    this.eventTarget = e.target;
    this.eventTime = new Date();
}

function Timer()
{
    window.localStorage.clear();
    localStorage = window.localStorage;
}
