import TetrominosArray from "./Tetrominos.js";

export class Tetris {

    #Tetrominos = TetrominosArray
    constructor() {
        this.isPaused = true
        this.field = [];
        this.fieldsWidth = 10;
        this.fieldHeight = 20;
        this.newTetramino = {};

    }
    generateField() {
        this.field = new Array(this.fieldHeight).fill().map(() => new Array(this.fieldsWidth).fill(0))

        this.createField()
        this.togglePause()

        this.addNewTetromino()
        // setInterval(this.moveDown,1000, this.newTetramino,this.addNewTetromino)
        // this.moveDown()
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
    drawTetromino(isRemove) {
        this.newTetramino.form.forEach((item,index) => {
            this.field[this.newTetramino.coords[0]+index]
                .splice(
                    this.newTetramino.coords[1],
                    item.length,
                    ...(isRemove ? [0] : item)
                )
        })
    }

    addNewTetromino() {
        let formIndex = Math.floor(Math.random() * this.#Tetrominos.length);
        let rotationIndex = Math.floor(Math.random() *this.#Tetrominos[formIndex].length)
        let newForm = this.#Tetrominos[formIndex][rotationIndex]


        this.newTetramino = {
            coords: [0,(this.fieldsWidth / 2) - Math.ceil(newForm.length/2)], // [row , col]
            formIndex: formIndex,
            rotationIndex: rotationIndex,
            form:newForm,
        }

        this.drawTetromino()
        this.reRenderField()
    }

    moveDown() {
        if(this.newTetramino.coords[0] + this.newTetramino.form.length < this.fieldHeight) {
            this.drawTetromino(true)
            this.newTetramino.coords[0]++
            this.drawTetromino()
            this.reRenderField()
        }
    }
    moveRight() {
        if(this.newTetramino.coords[1] + this.newTetramino.form[0].length < this.fieldsWidth) {
            this.drawTetromino(true)
            this.newTetramino.coords[1]++
            this.drawTetromino()
            this.reRenderField()
        }
    }
    moveLeft() {
        if(this.newTetramino.coords[1] > 0) {
            this.drawTetromino(true)
            this.newTetramino.coords[1]--
            this.drawTetromino()
            this.reRenderField()
        }
    }
    rotate() {
        this.drawTetromino(true)
        this.newTetramino.rotationIndex = this.#Tetrominos[this.newTetramino.formIndex].length - 1 > this.newTetramino.rotationIndex ? this.newTetramino.rotationIndex + 1 : 0
        this.newTetramino.form = this.#Tetrominos[this.newTetramino.formIndex][this.newTetramino.rotationIndex]
        this.drawTetromino()
        this.reRenderField()
    }
}