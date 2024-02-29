import {Tetris} from './modules/Tetris.js'

const tetris = new Tetris()
tetris.generateField()
console.log('start game')
console.table(tetris.field)


document.addEventListener('keydown', function (){
    if(+event.keyCode === 40) {
        tetris.moveDown()
    }
    if(+event.keyCode === 39) {
        tetris.moveRight()
    }
    if(+event.keyCode === 37) {
        tetris.moveLeft()
    }
    if(+event.keyCode === 38) {
        tetris.rotate()
    }
    if(+event.keyCode === 32) {
        tetris.togglePause()
    }
})