// =======================================================================
// var declarations

// media
var iNumbers = new Image();
iNumbers.src = 'assets/images/frame-sprite-animation.png';
// dom
var canvas, context;

// =======================================================================
// game initialization
function init(){
    canvas = document.getElementById('game').firstElementChild;
    context = canvas.getContext('2d');
    run();
}

function run(){    
    paint();
    act();
    requestAnimationFrame( run );
    
}
// =======================================================================
// main scene
var spriteNumbs = new Spritesheet( iNumbers, 90, 150, 5 );
function paint(){
    
    // draw background
    context.fillStyle = '#dd4f4f';
    context.fillRect( 0, 0, canvas.width, canvas.height );
    
    // spritesheet
    context.drawImage(
        iNumbers,
        ( canvas.width / 2 ) - ( iNumbers.width / 2 ),
        ( canvas.height / 2 ) - ( iNumbers.height / 2 ) * 3
    );
    
    spriteNumbs.drawArea(
        80,
        0,
        80,
        80,
        0.2 // update one time each second
    );    
    
}
function act(){
}
// =======================================================================
// Spritesheet class
function Spritesheet( source, x, y, numHorizontalFrames, numVerticalFrames ){
    this.source = source ? source : null;
    this.x = typeof x === 'number' ? x : 10;
    this.y = typeof y === 'number' ? y : 10;
    
    this.lastUpdate = 0;
    this.acumDelta = 0;
    this.horizontalSpriteIndex = 0;
    this.verticalSpriteIndex = 0;
    this.numHorizontalFrames = numHorizontalFrames - 1;
}
Spritesheet.prototype.drawArea = function( sX, sY, sWidth, sHeight, updateFrequency ){
    if ( !this.source ) return;
    this.updateFrequency = typeof updateFrequency === 'number' ? updateFrequency : 0;
    
    var now = Date.now();
    var deltaTime = ( now - this.lastUpdate ) / 1000;
    if ( deltaTime > 1 ) deltaTime = 0;
    this.acumDelta += deltaTime;
    this.lastUpdate = now;
    
    context.drawImage(
        this.source,
        sX * this.horizontalSpriteIndex,
        sY * this.verticalSpriteIndex,
        sWidth,
        sHeight,
        this.x,
        this.y,
        sWidth,
        sHeight
    );
    
    if ( this.acumDelta < this.updateFrequency )  return;
    this.acumDelta = 0;
    this.horizontalSpriteIndex += 1;
    if ( this.horizontalSpriteIndex > this.numHorizontalFrames )
        this.horizontalSpriteIndex = 0;
    console.log( this );
}

// =======================================================================
// event listeners and inputs
window.addEventListener('DOMContentLoaded', init, false);