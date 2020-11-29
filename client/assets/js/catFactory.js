
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
// Cat variation functions
//###################################################
function eyeVariation(num) {
    // Set displayed dna value for eye shape
    $('#dnashape').html(num);
    if (parseInt(num) < 0 || parseInt(num) > 9) {
        num = 0;
    }
    adjustEyelids(num)
    $('#eyeshapecode').html(parseInt(num * 10) + '%');        // slider state description
}

function decorationVariation(num) {
    $('#headdecorationcode').html(num + '<sup>o</sup>');
    $('#dnadecoration').html(num)
    headDecoration(num);
}

function faceDecorationVariation(num) {
    $('#facesidedecorationcode').html(parseFloat(num/10) + 'em');
    $('#dnadecorationSides').html(num)
    faceDecoration(num);
}

function tailDecorationVariation(num) {
    $('#taildecorationcode').html(parseInt(num));
    $('#dnadecorationMid').html(num)
    tailDecoration(num);
}

function animationVariation(num) {
    clearAnimations();
    switch(parseInt(num)) {
        case 1:
            $('#animationcode').html('Head (' + num + ')');
            headAnimation();
            break;
        case 2:
            $('#animationcode').html('Tail (' + num + ')');
            tailAnimation();
            break;
        case 3:
            $('#animationcode').html('Eyes (' + num + ')');
            eyeAnimation();
            break;
        // case 4:
        //     $('#animationcode').html('Whiskers (' + num + ')');
        //     whiskerAnimation();
        //     break;
    }
}

async function adjustEyelids(num) {
    let eyelidHeight = '--eyelid-height';
    await document.documentElement.style.setProperty(eyelidHeight, parseInt(num*2) + 'px');
}

async function headDecoration(num) {
    let topDecorationAngle = '--top-decoration-angle';
    let topDecorationNegAngle = '--top-decoration-neg-angle';
    await document.documentElement.style.setProperty(topDecorationAngle, parseInt(num) + 'deg');
    await document.documentElement.style.setProperty(topDecorationNegAngle, (parseInt(num) * -1) + 'deg');
}

async function faceDecoration(num) {
    let centerDecorationThickness = '--center-decoration-thickness';
    let outerDecorationThickness = '--outer-decoration-thickness';
    await document.documentElement.style.setProperty(centerDecorationThickness, parseFloat(num/10) + 'em');
    await document.documentElement.style.setProperty(outerDecorationThickness, parseFloat(num/10) + 'em');
}

async function tailDecoration(num) {
    let tailDecorationWidth = '--cat-tail-width';
    let tailDecorationHeight = '--cat-tail-height';
    let width = num;
    let height = num;
    switch(parseInt(num)) {
        case 1:
            width = 0.3;
            height = 0.2;
            break;
        case 2:
            width = 0.4;
            height = 0.2;
            break;
        case 3:
            width = 0.5;
            height = 0.2;
            break;
        case 4:
            width = 0.6;
            height = 0.2;
            break;
        case 5:
            width = 0.7;
            height = 0.3;
            break;
        case 6:
            width = 0.7;
            height = 0.4;
            break;
        case 7:
            width = 0.7;
            height = 0.5;
            break;
    }
    await document.documentElement.style.setProperty(tailDecorationWidth, parseFloat(width) + 'em');
    await document.documentElement.style.setProperty(tailDecorationHeight, parseFloat(height) + 'em');
}

function clearAnimations() {
    $('.cat_face, .cat_ears').removeClass('moving_head');
    $('.cat_tail').removeClass('moving_tail');
    // $('.cat_legs').after().removeClass('moving_tail_tip');
    $('.cat_eyes_eyelid').removeClass('moving_eyelids');
    // $('.cat_whiskers_whisker_l').before().removeClass('moving_whiskers_l');
}

function headAnimation() {
    $('.cat_face, .cat_ears').addClass('moving_head');
}

function tailAnimation() {
    $('.cat_tail').addClass('moving_tail');
    // $('.cat_legs').after().addClass('moving_tail_tip');
}

function eyeAnimation() {
    $('.cat_eyes_eyelid').addClass('moving_eyelids');
}

// function whiskerAnimation() {
//     $('.cat_whiskers_whisker').addClass('moving_whiskers');
// }
