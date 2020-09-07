
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

function colorCalc(code, baseName) {
    let baseColor = getComputedStyle(document.documentElement).getPropertyValue(baseName);
    let comps = baseColor.split(',');
    let hue = comps[0].trim();
    let sat = comps[1].trim();
    let lit = comps[2].trim();
    /* 360 * code/100, or 3.6 * code, is added to hue for variance */
    let newHue = Math.abs((3.6 * code) - hue);
    let newSat = Math.abs(sat - (2 * code));
    let newLit = Math.abs(lit - code/4);
    let newBorderLit = Math.abs(lit - code/2);

    /* Adjust border color from new color params */
    if (code < 96) {
        if (newBorderLit < 25) { newBorderLit += 25; }
    }

    /* Let's do some manual settings for black and white colors */
    if (code >= 96) {
        newHue = 0;
        newSat = 0;
        newLit = 100;
        newBorderLit = 100;
    }
    if (code == 98) {
        newLit = 0;
        newBorderLit = 0;
    }

    return [newHue, newSat, newLit, newBorderLit];
}

/*
 * I'm using color variables in my kitties.css, so I can get the default setting, and modify its hsl value
 * by a percentage equal to the DNA value selected
 */
async function headColor(color,code) {
    let headColorBase = '--base__fur-color';
    let headColorName = '--fur-color';
    let headBorderColorName = '--fur-border-color';

    /* Do some math to get new color params */
    let [hue, sat, lit, borderLit] = await colorCalc(code, headColorBase);

    /* Set new color variable in css */
    let newColor = "hsl(" + hue + ", " + sat + "%, " + lit + "%)";
    document.documentElement.style.setProperty(headColorName, newColor);
    newColor = "hsl(" + hue + ", " + sat + "%, " + borderLit + "%)";
    document.documentElement.style.setProperty(headBorderColorName, newColor);

    /* Update page where we show code */
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

async function mouthColor(color,code) {
    let colorBase = '--base__mouth-color';
    let colorName = '--mouth-color';
    let nose = '--nose-color';
    let whisker = '--whisker-color';
    let eyeTop = '--eye-top-border-color';

    /* Do some math to get new color params */
    let [hue, sat, lit, borderLit] = await colorCalc(code, colorBase);
    let tweakedLit = Math.abs(lit - code);

    /* Let's do some manual settings for black and white colors */
    if (code < 96) {
        borderLit = Math.abs(lit - code/2);
        if (borderLit < 25) { borderLit += 25; }
    }

    /* Set new color variable in css */
    let newColor = "hsl(" + hue + ", " + sat + "%, " + tweakedLit + "%)";
    document.documentElement.style.setProperty(colorName, newColor);
    newColor = "hsl(" + hue + ", " + sat + "%, " + borderLit + "%)";
    document.documentElement.style.setProperty(eyeTop, newColor);
    document.documentElement.style.setProperty(whisker, newColor);
    document.documentElement.style.setProperty(nose, newColor);

    /* Update page where we show code */
    $('#mouthcode').html('code: '+code);
    $('#dnamouth').html(code);
}

async function eyeColor(color,code) {
    let colorBase = '--base__eye-color';
    let colorName = '--eye-color';
    let eyeBorderColor = '--eye-border-color';
    let eyePupilColor = '--eye-pupil-color';

    /* Do some math to get new color params */
    let [hue, sat, lit, borderLit] = await colorCalc(code, colorBase);

    /* Let's do some manual settings for black and white colors */
    if (code < 96) {
        borderLit = Math.abs(lit - code/2);
        if (borderLit < 25) { borderLit += 25; }
    }

    /* Set new color variable in css */
    let newColor = "hsl(" + hue + ", " + sat + "%, " + lit + "%)";
    document.documentElement.style.setProperty(colorName, newColor);
    if (borderLit > 30) {
        borderLit = 30;
    }
    newColor = "hsl(0, 0%," + borderLit + "%)";
    document.documentElement.style.setProperty(eyeBorderColor, newColor);
    borderLit += 60;
    if (borderLit < 70 || borderLit > 100) {
        borderLit = 100;
    }
    newColor = "hsl(0, 0%," + borderLit + "%)";
    document.documentElement.style.setProperty(eyePupilColor, newColor);

    /* Update page where we show code */
    $('#eyecode').html('code: '+code);
    $('#dnaeyes').html(code);
}

async function pawColor(color,code) {
    let colorBase = '--base__paw-color';
    let colorName = '--face-marking-color';
    let innerEar = '--inner-ear-color';

    /* Do some math to get new color params */
    let [hue, sat, lit, borderLit] = await colorCalc(code, colorBase);

    /* Let's do some manual settings for black and white colors */
    if (code < 96) {
        borderLit = Math.abs(lit - code/2);
        if (borderLit < 25) { borderLit += 25; }
    }

    /* Set new color variable in css */
    let newColor = "hsl(" + hue + ", " + sat + "%, " + lit + "%)";
    document.documentElement.style.setProperty(colorName, newColor);
    newColor = "hsl(" + hue + ", " + sat + "%, " + borderLit + "%)";
    document.documentElement.style.setProperty(innerEar, newColor);
    /* For dark colors, let set toe separaters */
    if (code > 75 && code != 95 && code != 97) {
        newColor = "hsl(0, 0%, 100%)";
        document.documentElement.style.setProperty('--cat-leg-after-color', newColor);
    } else {
        newColor = "hsl(0, 0%, 0%)";
        document.documentElement.style.setProperty('--cat-leg-after-color', newColor);
    }

    /* Update page where we show code */
    $('#pawcode').html('code: '+code);
    $('#dnaears').html(code);
}

//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic')
            break
    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationName').html('Basic')
            normaldecoration()
            break
    }
}

async function normalEyes() {
    await $('.cat__eye').find('span').css('border', 'none')
}

async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
