
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
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidesPattern)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  $('.set-dna').click((e) =>  {
      let id = e.target.id;
      if (id === "default-kitty") {
          $('#dnabody').html(defaultDNA.headColor);
          $('#dnamouth').html(defaultDNA.mouthColor);
          $('#dnaeyes').html(defaultDNA.eyesColor);
          $('#dnaears').html(defaultDNA.earsColor);
          $('#dnashape').html(defaultDNA.eyesShape)
          $('#dnadecoration').html(defaultDNA.decorationPattern)
          $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
          $('#dnadecorationSides').html(defaultDNA.decorationSidesPattern)
          $('#dnaanimation').html(defaultDNA.animation)
          $('#dnaspecial').html(defaultDNA.lastNum)
          renderCat(defaultDNA)
      }
      if (id === "random-kitty") {
          let bodyRandom = Math.floor(Math.random()*100);
          let faceRandom = Math.floor(Math.random()*100);
          let eyeRandom = Math.floor(Math.random()*100);
          let pawRandom = Math.floor(Math.random()*100);
          if (bodyRandom < 10) { bodyRandom = 10; }
          if (faceRandom < 10) { faceRandom = 10; }
          if (eyeRandom < 10) { eyeRandom = 10; }
          if (pawRandom < 10) { pawRandom = 10; }
          let eyeshapeRandom = Math.floor(Math.random()*10);
          if (eyeshapeRandom > 8) { eyeshapeRandom = 0; }
          let patternRandom = Math.floor(Math.random()*100);
          if (patternRandom > 45) { patternRandom -= 45; }
          let sidesRandom = Math.floor(Math.random()*100);
          if (sidesRandom > 80) { sidesRandom -= 80; }
          if (sidesRandom > 60) { sidesRandom -= 60; }
          if (sidesRandom > 40) { sidesRandom -= 40; }
          if (sidesRandom > 20) { sidesRandom -= 20; }
          let midRandom = Math.floor(Math.random()*10);
          let animationRandom = Math.floor(Math.random()*10);
          if (animationRandom > 9) { animationRandom -= 9; }
          if (animationRandom > 6) { animationRandom -= 6; }
          if (animationRandom > 3) { animationRandom -= 3; }
          let randomDNA = {
              "headcolor" : bodyRandom,
              "mouthColor" : faceRandom,
              "eyesColor" : eyeRandom,
              "earsColor" : pawRandom,
              "eyesShape" : eyeshapeRandom,
              "decorationPattern" : patternRandom,
              "decorationSidesPattern" : sidesRandom,
              "decorationMidcolor" : midRandom,
              "animation" :  animationRandom,
              "lastNum" :  1
          }
          $('#dnabody').html(bodyRandom);
          $('#dnamouth').html(faceRandom);
          $('#dnaeyes').html(eyeRandom);
          $('#dnaears').html(pawRandom);
          $('#dnashape').html(eyeshapeRandom);
          $('#dnadecoration').html(patternRandom);
          $('#dnadecorationMid').html(midRandom);
          $('#dnadecorationSides').html(sidesRandom);
          $('#dnaanimation').html(animationRandom);
          $('#dnaspecial').html(defaultDNA.lastNum);
          renderCat(randomDNA)
      }
      if (id === "create-kitty") {
      }

  });

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
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
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
    eyeVariation(dna.eyesShape);
    $('#headdecoration').val(dna.decorationPattern);
    $('#headdecorationcode').html(parseInt(dna.decorationPattern) + '<sup>o</sup>');
    headDecoration(dna.decorationPattern);
    $('#facesidedecoration').val(dna.decorationSidesPattern);
    $('#facesidedecorationcode').html(parseFloat(dna.decorationSidesPattern/10) + 'em');
    faceDecorationVariation(dna.decorationSidesPattern);
    $('#taildecoration').val(dna.decorationMidcolor);
    $('#taildecorationcode').html(parseFloat(dna.decorationMidcolor));
    tailDecorationVariation(dna.decorationMidcolor);
    $('#animation').val(dna.animation);
    animationVariation(dna.animation);
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
