// =======================================================================
// var declarations

// media
var iWomen = new Image();
iWomen.src = 'assets/images/women-spritesheet.png';
//iWomen.src = 'assets/images/spritesheet_numbered.png';
// dom
var canvas, context;
// characters
var ladyRunner;
// =======================================================================
// game initialization
function init(){
    canvas = document.getElementById('game').firstElementChild;
    context = canvas.getContext('2d');
    startWorldObjects()
    run();
}
function run(){    
    paint();
    act();
    requestAnimationFrame( run );    
}
function startWorldObjects(){
    ladyRunner = new Spritesheet( iWomen, {
        destinationX: canvas.width - 125,
        destinationY: 90,
        frameWidth: 125,
        frameHeight: 125,
        originX: 0,
        originY: 0,
        numHorizontalFrames: 4,
        numVerticalFrames: 4
    });    
}
// =======================================================================
// main scene
function paint(){
    
    // draw background
    context.fillStyle = '#fff';
    context.fillRect( 0, 0, canvas.width, canvas.height );
    
    // context.drawImage( iWomen, 0, 0 );
    ladyRunner.animate( 0.04 );
        
}
function act(){
    ladyRunner.destinationX -= 3;
    if ( ladyRunner.destinationX < 0 )
        ladyRunner.destinationX = canvas.width - 120;
}
// =======================================================================
// Spritesheet class
function Spritesheet( source, options ){
    
    this.lastUpdate = 0;
    this.acumDelta = 0;
    
    this.source = source;
    this.destinationX = options.destinationX;
    this.destinationY = options.destinationY;
    this.frameWidth = options.frameWidth;
    this.frameHeight = options.frameHeight;
    
    this.originX = options.originX;
    this.originY = options.originY;
    this.horizontalSpriteIndex = 0;
    this.verticalSpriteIndex = 0;
    this.numHorizontalFrames = options.numHorizontalFrames - 1;
    this.numVerticalFrames = options.numVerticalFrames - 1;
}
Spritesheet.prototype.animate = function( updateFrequency ){
    if ( !this.source ) return;
    var now = Date.now();
    var deltaTime = ( now - this.lastUpdate ) / 1000;
    if ( deltaTime > 1 ) deltaTime = 0;
    this.acumDelta += deltaTime;
    this.lastUpdate = now;
    
    context.drawImage(
        this.source,
        this.originX * this.horizontalSpriteIndex,
        this.originY * this.verticalSpriteIndex,
        this.frameWidth,
        this.frameHeight,
        this.destinationX,
        this.destinationY,
        this.frameWidth,
        this.frameHeight
    );
    
    if ( this.acumDelta < updateFrequency )  return;
    this.acumDelta = 0;
    this.horizontalSpriteIndex += 1;
    if ( this.horizontalSpriteIndex === 1 )
        this.originX = this.frameWidth;
    if ( this.horizontalSpriteIndex > this.numHorizontalFrames ) {
        this.horizontalSpriteIndex = 0;
        if ( this.numVerticalFrames > 0  ) {
            this.verticalSpriteIndex += 1;
            if ( this.verticalSpriteIndex === 1 ) {
                this.originY = this.frameHeight;
            }
            if ( this.verticalSpriteIndex > this.numVerticalFrames ) {
                this.verticalSpriteIndex = 0;
            }
        }
    }
}

// =======================================================================
// event listeners and inputs
window.addEventListener('DOMContentLoaded', init, false);