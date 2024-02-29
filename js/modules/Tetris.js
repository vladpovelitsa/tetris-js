import TetrominosArray from "./Tetrominos.js";

export class Tetris {

    #Tetrominos = TetrominosArray

    constructor() {
        this.isPaused = false
        this.field = [];
        this.fieldsWidth = 10;
        this.fieldHeight = 20;
        this.newTetramino = {};
        this.counter;
    }

    generateField() {
        this.field = new Array(this.fieldHeight).fill().map(() => new Array(this.fieldsWidth).fill(0))

        this.createField()

        this.addNewTetromino()
        this.startDropping()
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
        for (let i = 0; i < this.fieldsWidth * this.fieldHeight; i++) {
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
        this.newTetramino.form.forEach((item, itemIndex) => {
            item.forEach((block, blockIndex) => {
                if (block !== 0) {
                    this.field[this.newTetramino.coords[0] + itemIndex][this.newTetramino.coords[1] + blockIndex] = isRemove ? 0 : block
                }
            })
        })

    }

    addNewTetromino() {
        let formIndex = Math.floor(Math.random() * this.#Tetrominos.length);
        let rotationIndex = Math.floor(Math.random() * this.#Tetrominos[formIndex].length)
        let newForm = this.#Tetrominos[formIndex][rotationIndex]


        this.newTetramino = {
            coords: [0, (this.fieldsWidth / 2) - Math.ceil(newForm.length / 2)], // [row , col]
            formIndex: formIndex,
            rotationIndex: rotationIndex,
            form: newForm,
        }

        this.drawTetromino()
        this.reRenderField()
    }

    moveDown() {
        if(!this.nextMoveAllowed()) {
            clearInterval(this.counter)
            this.addNewTetromino()
        }
        if (this.field[this.newTetramino.coords[0] + this.newTetramino.form.length]) {
            this.drawTetromino(true)
            this.newTetramino.coords[0]++
            this.drawTetromino()
            this.reRenderField()
        } else {
            clearInterval(this.counter)
            this.addNewTetromino()
            // this.startDropping()
        }
    }

    moveRight() {
        if (this.newTetramino.coords[1] + this.newTetramino.form[0].length < this.fieldsWidth) {
            this.drawTetromino(true)
            this.newTetramino.coords[1]++
            this.drawTetromino()
            this.reRenderField()
        }
    }

    moveLeft() {
        if (this.newTetramino.coords[1] > 0) {
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

    startDropping() {
        this.counter = setInterval(function (game) {
            game.moveDown()
        }, 1000, this)
    }

    togglePause() {
        this.isPaused ? this.startDropping() : clearInterval(this.counter)
        this.isPaused = !this.isPaused
    }
    nextMoveAllowed() {
        let nextSubRow = this.field[this.newTetramino.coords[0] + this.newTetramino.form.length]
            ?.slice(
                this.newTetramino.coords[1],
                this.newTetramino.coords[1] + this.newTetramino.form[0].length
            )

        if(nextSubRow) {
            let arr = []
            for (let i = 0; i < nextSubRow.length; i++) {
                arr.push([nextSubRow[i], this.newTetramino.form[this.newTetramino.form.length - 1][i]].some(block => block === 0))
            }
            return arr.every(item => item === true)
        }

    }

}
