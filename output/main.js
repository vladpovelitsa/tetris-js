document.querySelector('#start').onclick = function () {
  console.log('start game');
};
const colorScheme = {
  0: '',
  1: 'blue',
  2: 'red',
  3: 'green',
  4: 'yellow',
  5: 'orange',
  6: 'violet'
};
const tetris = {
  field: [],
  fieldsWidth: 10,
  fieldHeight: 20,
  generateField: function () {
    let cell = document.createElement('div');
    let row = document.createElement('div');
  }
};