// —— Trivia y HUD ——
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz0KKoaEphjOeYd98MI2s1BOkc2Zytaz6PMpqRzhzAjuRi6uVsExB3g4C1bEYQA4foZ/exec';

const preguntas = [
  { pregunta: "¿Dónde se encuentra el Gran Cañón?", respuestas: ["Arizona", "California", "Colorado", "Florida"], correcta: 0 },
  { pregunta: "¿En qué ciudad se firmó la Declaración de Independencia de Estados Unidos?", respuestas: ["Nueva York", "Boston", "Washington D.C.", "Filadelfia"], correcta: 3 },
  { pregunta: "¿Qué estados conectaba la RUTA 66?", respuestas: [
      "Illinois, Misuri, Kansas, Oklahoma, Texas, Nuevo México, Arizona e Indiana",
      "Connecticut, Misuri, Kansas, Oklahoma, Texas, Delaware, Arizona y California",
      "Carolina del Norte, Misuri, Kansas, Oklahoma, Texas, Nuevo México, Arizona y Kentucky",
      "Illinois, Misuri, Kansas, Oklahoma, Texas, Nuevo México, Arizona y California"
    ], correcta: 3 },
  { pregunta: "¿Cuál es el apodo más famoso de la Ruta 66?", respuestas: ["The Freedom Trail", "The Liberty Highway", "The Mother Road", "The Western Express"], correcta: 2 },
  { pregunta: "¿Cuál fue uno de los principales motivos para la construcción de la Ruta 66?", respuestas: ["Servir como autopista militar", "Conectar zonas rurales con grandes ciudades", "Fomentar el turismo hacia la costa este", "Crear una ruta alternativa al ferrocarril"], correcta: 1 },
  { pregunta: "¿El título oficial del documento de Declaración de la Independencia de Estados Unidos fue?", respuestas: ["The Independence Charter of the United States of 1773", "The American Freedom Act of 1776", "The unanimous Declaration of the thirteen united States of America", "Resolution for the Liberation of the Thirteen Colonies"], correcta: 2 },
  { pregunta: "¿Cuál es la longitud aproximada de la Ruta 66?", respuestas: ["1,200 millas", "1,850 millas", "2,400 millas", "3,100 millas"], correcta: 2 },
  { pregunta: "¿En qué año se firmó la Declaración de la Independencia de Estados Unidos?", respuestas: ["1789", "1776", "1804", "1754"], correcta: 1 },
  { pregunta: "¿Qué país fue el principal aliado de los colonos durante la guerra contra Gran Bretaña?", respuestas: ["Francia", "Portugal", "Rusia", "Alemania"], correcta: 0 },
  { pregunta: "¿Qué evento marcó el inicio oficial del conflicto armado entre colonos y británicos?", respuestas: ["La Fiesta del Té de Massachusetts", "La firma del Tratado de París", "El Congreso de Filadelfia", "La Batalla de Lexington y Concord"], correcta: 3 },
  { pregunta: "¿Quién gobernaba Inglaterra durante la Guerra de Independencia de los Estados Unidos?", respuestas: ["Joge III", "Enrique VIII", "Jorge II", "Guillermo IV"], correcta: 0 },
  { pregunta: "¿Qué hizo famosa a la Ruta 66 durante los años 30?", respuestas: ["La expansión del ferrocarril", "La migración por el Dust Bowl", "El auge petrolero", "La Segunda Guerra Mundial"], correcta: 1 },
  { pregunta: "¿Cuál era el número de colonias que se independizaron del Reino Unido?", respuestas: ["10", "20", "15", "13"], correcta: 3 },
  { pregunta: "¿Qué canción ayudó a popularizar la Ruta 66?", respuestas: ["Born to Run", "Hotel California", "(Get Your Kicks on) Route 66", "Highway to Hell"], correcta: 2 },
  { pregunta: "¿Qué significó la Fiesta del Té de Boston?", respuestas: ["Un acto de protesta contra los impuestos", "Una celebración colonial", "Un pacto con los ingleses", "Un acto diplomático"], correcta: 0 },
  { pregunta: "¿En qué año fue retirada oficialmente la Ruta 66 del sistema de carreteras?", respuestas: ["1984", "1989", "1985", "1990"], correcta: 2 },
  { pregunta: "¿Qué símbolo fue adoptado como emblema nacional tras la independencia?", respuestas: ["El león", "El águila calva", "El búfalo", "El ciervo blanco"], correcta: 1 },
  { pregunta: "¿Qué película de Pixar rinde homenaje a la Ruta 66?", respuestas: ["Wall-E", "Cars", "Ratatouille", "Up"], correcta: 1 },
  { pregunta: "¿Cuál de los siguientes NO fue firmante de la Declaración?", respuestas: ["Abraham Lincoln", "John Hancock", "George Wythe", "Thomas Jefferson"], correcta: 0 },
  { pregunta: "¿Cuál es el nombre del pueblo fantasma popular en la Ruta 66 de Nuevo México?", respuestas: ["Texas", "Glenrio", "Roswell", "Red Rock"], correcta: 1 }
];

// Clase integrada de gestión de preguntas
function QuestionManager() {
  this.nextIndex = 0;
  this.lastAskedPoints = -1;
}

QuestionManager.prototype.ask = function(onAnswered) {
  Game.questionActive = true;
  const q = preguntas[this.nextIndex];
  this.nextIndex = (this.nextIndex + 1) % preguntas.length;

  const ov = document.createElement('div');
  ov.id = 'qnOverlay';
  Object.assign(ov.style, {
    position: 'fixed', top: 0, left: 0,
    width: '100vw', height: '100vh',
    background: 'rgba(0,0,0,0.8)',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center',
    color: '#fff', fontFamily: 'Arial', zIndex: 9999
  });

  const txt = document.createElement('div');
  txt.innerText = q.pregunta;
  txt.style.fontSize = '24px';
  txt.style.marginBottom = '20px';
  ov.appendChild(txt);

  q.respuestas.forEach((resp, i) => {
    const btn = document.createElement('button');
    btn.innerText = resp;
    Object.assign(btn.style, {
      margin: '5px',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer'
    });
    btn.onclick = () => {
      document.body.removeChild(ov);
      Game.questionActive = false;
      onAnswered(i === q.correcta);
    };
    ov.appendChild(btn);
  });

  document.body.appendChild(ov);
};

const questionManager = new QuestionManager();

// —— Juego principal ——
var Game = {};
var scenario = new Scenario();
var player = new Car();
var levelController = new LevelController();
var traffic = new Traffic();
var score = new Score();

Game.canvasWidth = 800;
Game.canvasHeight = 600;

Game.initialFps = 100;
Game.fps = Game.initialFps;
Game.skipTicks = 1000 / Game.fps;

Game.maxFuel = 100;
Game.currentFuel = Game.maxFuel;
Game.fuelConsumption = 0.05;
Game.fuelRefillOnHit = 50;

Game.questionActive = false;
Game.highScores = [];

var lastPoints = 0;
var totalPoints = 0;
var gameStarted = false;
var isGameOver = false;

var leftArrowKeyCode = 37;
var rightArrowKeyCode = 39;

var gameThemeSound = new Audio('sounds/game_theme.mp3');
var gameOverThemeSound = new Audio('sounds/gameOver_theme.mp3');

Game.initialize = function() {
  this.canvas = document.getElementById('canvas');
  this.context = this.canvas.getContext('2d');
  this.context.font = '30px Arial';

  ['left','right'].forEach(dir => {
    const btn = document.createElement('button');
    btn.id = dir + 'Btn';
    btn.innerText = dir === 'left' ? '◀' : '▶';
    Object.assign(btn.style, {
      position: 'fixed',
      bottom: '20px',
      [dir === 'left' ? 'left' : 'right']: '20px',
      fontSize: '32px',
      padding: '10px',
      opacity: 0.7,
      zIndex: 1500
    });
    document.body.appendChild(btn);
    const fn = dir === 'left' ? 'moveToLeft' : 'moveToRight';
    btn.addEventListener('touchstart', () => player[fn]());
    btn.addEventListener('mousedown', () => player[fn]());
  });

  Game.showStartScreen();

  document.addEventListener('keydown', e => {
    if (e.keyCode === leftArrowKeyCode) player.moveToLeft();
    if (e.keyCode === rightArrowKeyCode) player.moveToRight();
    if (!gameStarted) {
      gameStarted = true;
      isGameOver = false;
      Game.startGame();
    }
  });
};

Game.showStartScreen = function() {
  levelController.initialize(Game.fps);
  scenario.initialize(this.canvas);
  traffic.initialize(this.canvas, scenario);
  score.initialize();
  gameOverThemeSound.play();
  gameThemeSound.pause();
};

Game.startGame = function() {
  gameThemeSound.currentTime = 0;
  gameThemeSound.play();
  gameThemeSound.onended = () => { gameThemeSound.currentTime = 2.5; gameThemeSound.play(); };
  gameOverThemeSound.pause();

  totalPoints = 0;
  lastPoints = 0;
  Game.currentFuel = Game.maxFuel;
  Game.fps = Game.initialFps;
  Game.skipTicks = 1000 / Game.fps;
  score.resetScore();

  levelController.initialize(Game.fps);
  player.initialize(GameConfig.player.yPosition, GameConfig.player.carType, GameConfig.player.carId);
  scenario.initialize(this.canvas);
  traffic.initialize(this.canvas, scenario, player);
};

Game.gameOver = function() {
  isGameOver = true;
  gameStarted = false;
  gameThemeSound.pause();
  gameOverThemeSound.play();

  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'Arial',
    zIndex: 9999
  });
  const msg = document.createElement('div');
  msg.innerText = 'GAME OVER! Tu puntuación: ' + totalPoints;
  msg.style.fontSize = '24px';
  msg.style.marginBottom = '20px';
  overlay.appendChild(msg);

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Ingresa tu nombre';
  input.style.fontSize = '20px';
  input.style.padding = '5px';
  overlay.appendChild(input);

  const submit = document.createElement('button');
  submit.innerText = 'Enviar';
  submit.style.marginTop = '10px';
  submit.style.padding = '8px 16px';
  submit.onclick = () => {
    const name = input.value.trim() || 'Anonimo';

    // Enviar a Google Apps Script por GET
    const url = `${SCRIPT_URL}?name=${encodeURIComponent(name)}&score=${totalPoints}`;
    fetch(url, { method: 'GET', mode: 'no-cors' });

    Game.highScores.push({ name, score: totalPoints });
    Game.highScores.sort((a,b) => b.score - a.score);
    if (Game.highScores.length > 10) Game.highScores.pop();

    document.body.removeChild(overlay);
  };
  overlay.appendChild(submit);

  document.body.appendChild(overlay);
};

Game.update = function() {
  if (gameStarted && !Game.questionActive) {
    Game.currentFuel -= Game.fuelConsumption;
    if (Game.currentFuel <= 0) {
      Game.gameOver();
      return;
    }
  }

  if (gameStarted && !Game.questionActive) {
    const pts = Math.floor(lastPoints / 10);
    if (pts > 0 && pts % 100 === 0 && pts !== questionManager.lastAskedPoints) {
      questionManager.lastAskedPoints = pts;
      questionManager.ask(correct => {
        if (correct) {
          Game.currentFuel = Math.min(Game.maxFuel, Game.currentFuel + Game.fuelRefillOnHit);
        }
      });
    }
  }

  scenario.updateRoad(traffic.emptyLane);
  traffic.update(this.context);

  if (gameStarted) {
    player.update();
    if (player.passedOnPothole) {
      lastPoints = Math.max(0, lastPoints - GameConfig.obstacle.pointsLossOnPothole);
      player.passedOnPothole = false;
    }
    Game.fps = levelController.increaseSpeed();
    lastPoints++;
    totalPoints = Math.floor(lastPoints / 10);
  }
};

Game.draw = function() {
  const ctx = this.context;
  ctx.clearRect(0, 0, Game.canvasWidth, Game.canvasHeight);

  const barW = 200, barH = 20;
  const x = Game.canvasWidth - barW - 20, y = 20;
  ctx.fillStyle = '#444';
  ctx.fillRect(x, y, barW, barH);
  const pct = Game.currentFuel / Game.maxFuel;
  ctx.fillStyle = '#0f0';
  ctx.fillRect(x, y, barW * pct, barH);
  ctx.strokeStyle = '#000';
  ctx.strokeRect(x, y, barW, barH);

  scenario.drawRoad(ctx);
  traffic.draw(ctx);

  if (gameStarted) {
    player.drawCar(ctx);
    score.draw(ctx, totalPoints);
  } else if (isGameOver) {
    score.draw(ctx, totalPoints);
    score.drawGameOverScreen(ctx);
    Util.drawPressAnyKey(ctx);
  } else {
    Util.drawPressAnyKey(ctx);
    score.draw(ctx, 0);
  }

  if (GameConfig.debug.showGuideLines) {
    Util.drawGuidelines(ctx);
  }
};

// Bucle de juego
document.addEventListener('DOMContentLoaded', () => {
  Game.initialize();
  (function loop() {
    Game.update();
    Game.draw();
    setTimeout(loop, Game.skipTicks);
  })();
});
