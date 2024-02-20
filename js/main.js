const colorScheme = {
    0: '',
    1: 'blue',
    2: 'red',
    3: 'green',
    4: 'yellow',
    5: 'orange',
    6: 'violet',
}
let counter = 0;
class Tetris {

    constructor() {
        this.isPaused = true
        this.field = [];
        this.fieldsWidth = 10;
        this.fieldHeight = 20;
    }
    generateField() {
        // this.field = new Array(20).fill( new Array(10).fill(0))
        this.field = new Array(this.fieldHeight - 4).fill( new Array(this.fieldsWidth).fill(0))
        this.field.push([...new Array(this.fieldsWidth - 2).fill(2), 0 ,0])
        this.field.push(new Array(this.fieldsWidth).fill(3))
        this.field.push([...new Array(this.fieldsWidth - 2).fill(2), 0 ,0])
        this.field.push(new Array(this.fieldsWidth).fill(1))
        this.createField()
        this.togglePause()
    }
    togglePause() {
        this.isPaused = !this.isPaused
    }
    removeLine() {
        this.field.forEach((row, index) => {
           let filledRow = row.every(cell => cell > 0)
            if(filledRow) {
                row.fill(0)
                Array.from(document.getElementById(index).children).forEach(cell => {
                    cell.classList.remove(cell.classList[1])
                    cell.classList.add('cell--0')
                })
                console.log(this.field)
            }
        })
    }
    createField() {
        for(let i = 0; i < this.field.length; i++) {
            let row = document.createElement('div');
            row.classList.add('row')
            row.id = i
            for(let j = 0; j < this.field[i].length; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell', `cell--${this.field[i][j]}`)
                row.appendChild(cell)
            }
            document.querySelector('.field').appendChild(row)
        }
    }
}


const tetris = new Tetris()
tetris.generateField()
console.log('start game')
console.log(tetris.field)
tetris.removeLine()