
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 16,
    "mouthColor" : 14,
    "eyesColor" : 91,
    "earsColor" : 16,
    //Cattributes
    "eyesShape" : 0,
    "decorationPattern" : 0,
    "decorationSidesPattern" : 2,
    "decorationMidcolor" : 5,
    "animation" :  1,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationSides').html(defaultDNA.decorationSidesPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor);
    $('#bodycolor').val(dna.headcolor);
    mouthColor(colors[dna.mouthColor],dna.mouthColor);
    $('#facialfeaturecolor').val(dna.mouthColor);
    eyeColor(colors[dna.earColor],dna.eyesColor);
    $('#eyecolor').val(dna.eyesColor);
    pawColor(colors[dna.earColor],dna.earsColor);
    $('#pawcolor').val(dna.earColor);
    $('#eyeshape').val(dna.eyesShape);
    $('#eyeshapecode').html(parseInt(dna.eyesShape * 10) + '%');        // slider state description
    $('#headdecoration').val(dna.decorationPattern);
    $('#headdecorationcode').html(parseInt(dna.decorationPattern) + '<sup>o</sup>');
    $('#facesidedecoration').val(dna.decorationSidesPattern);
    $('#facesidedecorationcode').html(parseFloat(dna.decorationSidesPattern/10) + 'em');
    $('#taildecoration').val(dna.decorationMidcolor);
    $('#taildecorationcode').html(parseFloat(dna.decorationMidcolor));
    animationVariation(dna.animation);
    $('#animation').val(dna.animation);
}

/* Create Listeners for sliders */
// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val();
    headColor(colors[colorVal],colorVal);
})
$('#facialfeaturecolor').change(()=>{
    var colorVal = $('#facialfeaturecolor').val();
    mouthColor(colors[colorVal],colorVal);
})
$('#eyecolor').change(()=>{
    var colorVal = $('#eyecolor').val();
    eyeColor(colors[colorVal],colorVal);
})
$('#pawcolor').change(()=>{
    var colorVal = $('#pawcolor').val();
    pawColor(colors[colorVal],colorVal);
})
// Change cat attributes
$('#eyeshape').change(()=>{
    var num = $('#eyeshape').val();
    eyeVariation(num);
})
$('#headdecoration').change(()=>{
    var num = $('#headdecoration').val();
    decorationVariation(num);
})
$('#facesidedecoration').change(()=>{
    var num = $('#facesidedecoration').val();
    faceDecorationVariation(num);
})
$('#taildecoration').change(()=>{
    var num = $('#taildecoration').val();
    tailDecorationVariation(num);
})
$('#animations').change(()=>{
    var num = $('#animation').val();
    animationVariation(num);
})
