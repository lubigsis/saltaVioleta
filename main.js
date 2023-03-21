//-----------------------------------------------variables que utilizaré
//tablero
let board;
let boardWidth = 750; //px
let boardHeight = 250;
let context;

//violeta
let violetaWidth = 88; //88  ->
let violetaHeight = 94; //94 -> 
let violetaX = 50;
let violetaY = boardHeight - violetaHeight;
let violetaImg;


let violeta = {
    x : violetaX,
    y : violetaY,
    width : violetaWidth,
    height : violetaHeight
}

//--------------------------------cactus
let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;


//-------------------------------------FÍSICA--------
let velocidadX = -8; //velocidad del cactus hacia la izquierda.
let velocidadY = 0;
let gravedad = .4;

let gameOver = false;
let score = 0;


//---------------------------------------------------Edito el tablero --> al canvas
window.onload = function(){
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext('2d');

    //----------------------------------subo la imagenes: Violeta
    violetaImg = new Image();
    violetaImg.src = 'perro.png'; 
    violetaImg.onload = function(){
    context.drawImage(violetaImg, violetaX, violetaY, violetaWidth, violetaHeight);
  };
    //-------------------------------------------cactus---------------------------------
    cactus1Img = new Image();
    cactus1Img.src = 'cactus1.png';

    cactus2Img = new Image();
    cactus2Img.src = 'cactus2.png';

    cactus3Img = new Image();
    cactus3Img.src = 'cactus3.png';


    requestAnimationFrame(update);
    setInterval(placeCactus, 1000);// --> 1"
    document.addEventListener("keydown", moverVioleta);


}

//-----------------------------para dibujar el frame del juego (como la funcion draw() de P5.JS)
function update(){
    requestAnimationFrame(update);
    if (gameOver){
        return;
    }

    context.clearRect(0, 0, board.width, board.height);//reset canvas.

    //violeta
    velocidadY += gravedad;
    violeta.y = Math.min(violeta.y + velocidadY, violetaY); //gravedad para que Violeta no exceda el suelo.
    context.drawImage(violetaImg, violetaX, violetaY, violetaWidth, violetaHeight);


    //cactus
    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocidadX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
    
  }
}

//-------------------------------
function moverVioleta(e){
    if (gameOver){
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") &&  violeta.y == violetaY){ 
        //saltar
        velocidadY = -10;
    }
    
}


//------------------------------
function placeCactus(){
    if (gameOver){
        return;
    }

    let cactus = {  //'null' porque la img del cactus y el tamaño de ancho varía, dado que usarpe 3 img.
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height : cactusHeight
    }
    //-------------------------determino aleatoriamente qué cactus se mostrará.
    let placeCactusChance = Math.random();  //  ---> 0 - 0.9999...

    if (placeCactusChance > .90){  // --> 10% de que salga el cactus3
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);

    }
    else if (placeCactusChance > .70) { //  --> 30% para que aparezca el cactus2
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .50) { //  --> 50% para el cactus1
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }

    //mientras limito el número de cactus que están al mismo tiempo.
    if (cactusArray.length > 5){
        cactusArray.shift(); //remueve el primer elemento del array, de esta manera el array no crece constantemente.
    }

}