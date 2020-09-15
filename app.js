// https://www.redblobgames.com/grids/hexagons
// https://github.com/flauwekeul/honeycomb
// 

draw = SVG().addTo('body').size('100%', '100%')

const Hex = Honeycomb.extendHex({ size: 30 })
const Grid = Honeycomb.defineGrid(Hex)
// get the corners of a hex (they're the same for all hexes created with the same Hex factory)
const corners = Hex().corners()
// an SVG symbol can be reused


function provideSymbol(fill, stroke) {
    return draw.symbol()
	.polygon(corners.map(({ x, y }) => `${x},${y}`))
	.fill(fill)
	.stroke(stroke);
}

// render 17x11 possible hexes
const BOARD = Grid.rectangle({ width: 16, height: 11 })

const AVAILABLE_POSITIONS = [
    {first: {from: {x:8, y:0}, to: {x:15, y:4}}, second: {from: {x:0, y:0}, to: {x:7, y:4}}, mid: [{x:7,y:1},{x:7,y:3}]},
    {first: {from: {x:4, y:0}, to: {x:11, y:4}}, second: {from: {x:0, y:6}, to: {x:7, y:10}}, mid: [{x:4,y:5},{x:5,y:5},{x:6,y:5}]},
    {first: {from: {x:3, y:0}, to: {x:10, y:4}}, second: {from: {x:0, y:6}, to: {x:7, y:10}}, mid: [{x:3,y:5},{x:4,y:5},{x:5,y:5},{x:6,y:5}]},
    {first: {from: {x:2, y:0}, to: {x:9, y:4}}, second: {from: {x:0, y:6}, to: {x:7, y:10}}, mid: [{x:2,y:5},{x:3,y:5},{x:4,y:5},{x:5,y:5},{x:6,y:5}]},
    {first: {from: {x:1, y:0}, to: {x:8, y:4}}, second: {from: {x:0, y:6}, to: {x:7, y:10}}, mid: [{x:1,y:5},{x:2,y:5},{x:3,y:5},{x:4,y:5},{x:5,y:5},{x:6,y:5}]},
    {first: {from: {x:0, y:0}, to: {x:7, y:4}}, second: {from: {x:0, y:6}, to: {x:7, y:10}}, mid: [{x:0,y:5},{x:1,y:5},{x:2,y:5},{x:3,y:5},{x:4,y:5},{x:5,y:5},{x:6,y:5}]},
    {first: {from: {x:0, y:0}, to: {x:7, y:4}}, second: {from: {x:1, y:6}, to: {x:8, y:10}}, mid: [{x:1,y:5},{x:2,y:5},{x:3,y:5},{x:4,y:5},{x:5,y:5},{x:6,y:5}]},
    {first: {from: {x:0, y:0}, to: {x:7, y:4}}, second: {from: {x:2, y:6}, to: {x:9, y:10}}, mid: [{x:2,y:5},{x:3,y:5},{x:4,y:5},{x:5,y:5},{x:6,y:5}]},
    {first: {from: {x:0, y:0}, to: {x:7, y:4}}, second: {from: {x:3, y:6}, to: {x:10, y:10}}, mid: [{x:3,y:5},{x:4,y:5},{x:5,y:5},{x:6,y:5}]},
    {first: {from: {x:0, y:0}, to: {x:7, y:4}}, second: {from: {x:4, y:6}, to: {x:11, y:10}}, mid: [{x:4,y:5},{x:5,y:5},{x:6,y:5}]},
    {first: {from: {x:0, y:0}, to: {x:7, y:4}}, second: {from: {x:8, y:0}, to: {x:15, y:4}}, mid: [{x:7,y:1},{x:7,y:3}]},
]

BOARD_SETUP = 5;

function redraw() {
    draw.clear();
    drawBoard1();
    drawBoard2();
    drawMidBoard();

    /*emptyHex = provideSymbol('none', {width: 1, color: '#999'})
    BOARD.forEach(hex => {
	const { x, y } = hex.toPoint()
	if (hex.x === 15 && (hex.y % 2) === 1){ return; }
	else
	    // use hexSymbol and set its position for each hex
	    draw.use(emptyHex).translate(x, y)
    })*/
}

function drawBoard(config, hexSymbol) {
    for (let x=config.from.x; x<=config.to.x; x++)
	for (let y=config.from.y; y<=config.to.y; y++) {
	    console.log("iter "+x+"; "+y);
	    dpoint = BOARD.get({x:x, y:y}).toPoint()
	    dx=dpoint.x
	    dy=dpoint.y
	    console.log("drawX "+dx+"; drawY "+dy);
	    draw.use(hexSymbol).translate(dx, dy);
	}
	    
}

function drawBoard1() {
    greenHex = provideSymbol('darkgreen', {width: 1, color: '#999'})
    const config = AVAILABLE_POSITIONS[BOARD_SETUP].first;
    drawBoard(config, greenHex);
}

function drawBoard2() {
    yellowHex = provideSymbol('yellow', {width: 1, color: '#999'})
    const config = AVAILABLE_POSITIONS[BOARD_SETUP].second;
    drawBoard(config, yellowHex);
}

function drawMidBoard() {
    blueHex = provideSymbol('#66F', {width: 1, color: '#999'})
    AVAILABLE_POSITIONS[BOARD_SETUP].mid.forEach(h => {
	const { x, y } = BOARD.get(h).toPoint()
	draw.use(blueHex).translate(x,y);
    })
}

redraw()

document.addEventListener('click', ({ offsetX, offsetY }) => {
    const hexCoordinates = Grid.pointToHex(offsetX, offsetY)
    console.log(BOARD.get(hexCoordinates))
})

function move1Left() {
    if (BOARD_SETUP > 0) {
	BOARD_SETUP--;
	redraw();
    }
}

function move1Right() {
    if (BOARD_SETUP < AVAILABLE_POSITIONS.length-1) {
	BOARD_SETUP++;
	redraw();
    }
}

// [V] jak zrobic REDRAW dla elementu SVG !?
// [ ] dopracowac koncowe pola w niekorych miesjcach
// [ ] dopracowa
