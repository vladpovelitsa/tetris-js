export class Tetris {
    constructor() {
        this.isPaused = true
        this.field = [];
        this.fieldsWidth = 10;
        this.fieldHeight = 20;
    }
    generateField() {
        this.field = new Array(this.fieldHeight).fill(new Array(this.fieldsWidth).fill(0))
        this.createField()
        this.togglePause()
    }
    togglePause() {
        this.isPaused = !this.isPaused
    }
    removeLine() {
        this.field.forEach((row, index) => {
            let filledRow = row.every(cell => cell > 0)
            if (filledRow) {
                this.field.splice(index, 1)
                this.field.unshift(new Array(this.fieldsWidth).fill(0))
                this.reRenderField()
            }
        })
    }
    createField() {
        for(let i = 0; i < this.fieldsWidth * this.fieldHeight; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell', "cell--0")
            document.querySelector('.field').appendChild(cell)
        }
    }
    reRenderField() {
        document.querySelectorAll('.cell').forEach((cell, cellIndex) => {
            cell.classList.remove(cell.classList[1])
            cell.classList.add('cell--' + this.field[Math.floor(cellIndex / this.fieldsWidth)][cellIndex % this.fieldsWidth])
        })
    }
}