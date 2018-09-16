'use strict';

const tasks = [
  {
    title: 'Hello world',
    problem: 'Pomocí funkce console.log("Text") vypiš do programu: Hello world',
    solution: '',
    test: 'window.consoleStack.includes("Hello world")',
    category: 'basics'
  },
  {
    title: 'Číslo',
    problem: 'Definuj proměnnou x a inicializuj jí číslem 10.',
    solution: 'let x = 10',
    test: 'x === 10',
    category: 'basics'
  },
  {
    title: 'Řetězec',
    problem: 'Definuj proměnnou x a inicializuj jí řezězcem Coder dojo (pozor na vélká a malá písmenka).',
    solution: 'let x = 10',
    test: 'x === "Coder dojo"',
    category: 'basics'
  },
  {
    title: 'Pravda/Nepravda',
    problem: 'Definuj proměnnou x a inicializuj jí hodnotou pravda (true), dale definuj promennou y a inicializuj ji hodnotou nepravda (false)',
    solution: `
    let x = true
    let y = false`,
    test: 'x === true && y === false',
    category: 'basics'
  },
  {
    title: 'Pole',
    problem: 'Definuj proměnnou x ji prazdnym polem TODO doplnit dokumentaci, zdroj',
    solution: 'let x = []',
    test: 'x instanceof Array',
    category: 'basics'
  },
  {
    title: 'Pole 2',
    problem: 'Mame definovanou promennou x, ktera obsahuje prazdne pole. Pomoci funkce push() vloz do pole cislo 10.',
    solution: 'let x = []',
    default: 'let x = []',
    test: 'x[0] === 10',
    category: 'basics'
  },
  {
    title: 'Podminka 1',
    problem: 'Dopln podminku (if), aby se zmenila promenna coderDojo na true.',
    solution: '',
    default: `let den = 'utery'
let coderDojo = false

if () {
  coderDojo = true
}`,
    test: 'coderDojo == true',
    category: 'basics'
  },

  {
    title: 'Pozice 1',
    problem: 'Presun kulicku do praveho horniho rohu. Pouzij promenne width (sirka platna), height (vyska platna) a ballRadius (prumer kulicky)',
    solution: 'let x = []',
    default: `posX = ballRadius
posY = ballRadius

drawBall()
`,
    test: 'posX == width - ballRadius && posY == ballRadius',
    canvas: true,
    category: 'ball'
  },
  {
    title: 'Pozice 2',
    problem: 'Presun kulicku do praveho dolniho rohu.',
    solution: 'let x = []',
    default: `posX = ballRadius
posY = ballRadius

drawBall()
`,
    test: 'posX == width - ballRadius && posY == height - ballRadius',
    canvas: true,
    category: 'ball'
  },
  {
    title: 'Pozice 3',
    problem: 'Presun kulicku do leveho dolniho rohu.',
    solution: 'let x = []',
    default: `posX = ballRadius
posY = ballRadius

drawBall()
`,
    test: 'posX == ballRadius && posY == height - ballRadius',
    canvas: true,
    category: 'ball'
  },
  {
    title: 'Pozice 4',
    problem: 'Presun kulicku doprostred.',
    solution: 'let x = []',
    default: `posX = ballRadius
posY = ballRadius

drawBall()
`,
    test: 'posX == width / 2 - ballRadius && posY == height / 2 - ballRadius',
    canvas: true,
    category: 'ball'
  },
  {
    title: 'Animace',
    problem: 'Pouzij podminky (if) a do metody draw napis kod, ktery bude pohybovat kulickou skrze vsechny rohy.',
    solution: 'let x = []',
    default: `posX = ballRadius
posY = ballRadius

function draw() {
  drawBall()
  window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)
`,
    asyncTest: true,
    test: `
const start = window.ballRadius+'x'+window.ballRadius+'y'
const rightTopCorner = window.canvasWidth-window.ballRadius+'x'+(window.ballRadius+1)+'y'
const rightBottomCorner = (window.canvasWidth-window.ballRadius-1)+'x'+(window.canvasHeight-window.ballRadius)+'y'
const leftBottomCorner = window.ballRadius+'x'+(window.canvasHeight-window.ballRadius-1)+'y'

return window.positionStack.includes(start) && window.positionStack.includes(rightTopCorner) && window.positionStack.includes(rightBottomCorner) && window.positionStack.includes(leftBottomCorner)
    `,
    canvas: true,
    category: 'ball'
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    tasks.map(task => {
      task.createdAt = new Date();
      task.updatedAt = new Date();
    })

    await queryInterface.bulkInsert('Task', tasks, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Task', null, {})
  }
};
