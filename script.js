// ==== SNAKE GAME - Starter Pack ====
// Les TODO sont à compléter au fil du cours


//TODO exemples à tester
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
// Taille du canvas et de la grille
const gridSize = 20;      // taille d'une case
const tileCount = canvas.width / gridSize; // nombre de cases sur une ligne/colonne
// Snake (tête + corps sous forme de tableau de coordonnées)
let snake = [
    {x: 8, y: 8},   // Tête
    {x: 7, y: 8},   // Corps
    {x: 6, y: 8}
]; // position initiale
let direction = {x: 1, y: 0}; // direction actuelle (droite)
let nextDirection = direction;
let food = []; // position de la nourritureq
let bonus = null; // position bonus/malus si besoin
let score = 0;
let level = 1;
let lives = 3;
let isPaused = false;
let isGameOver = false;
let moveInterval = 200; // ms (vitesse de départ)
let moveTimer = null;
let wallsEnabled = false;
let difficulty = 'easy'; // 'easy' | 'normal' | 'hard'

// TODO : gestion des types de nourritures et des effets

// === Initialisation ===
window.onload = function () {
    // TODO : afficher écran d'accueil, choix options, etc.
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    document.getElementById('restart-btn').addEventListener('click', restartGame);

    // TODO : initialiser les events pour le choix du niveau, murs ON/OFF, etc.
    // Exemple :


    // Gestion des touches clavier
    handleKeyDown()

    // TODO : initialiser le jeu (afficher le snake, le food, etc.)


    spawnFood();
    gameLoop()
}

// === Fonction principale du jeu ===
function gameLoop() {

    if (isPaused || isGameOver) return;

    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };
    snake.unshift(head);    // Ajoute la nouvelle tête devant
    // snake.pop();           // Retire la dernière case (queue)

    if (snake[0].x === food.x && snake[0].y === food.y) {
        // Le Snake mange
        score++;
        if (score % 5 === 0) {
            level++;
            moveInterval = Math.max(60, moveInterval - 20); // Vitesse maximum à 60ms
        }
        spawnFood();
        // Ne retire pas la queue ce tour-ci : le Snake grandit !
    } else {
        snake.pop();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }

    function gameOver() {
        if (lives > 0) {
            lives--;
            snake[0] = {x: 8, y: 8};
        } else {

            const loseDialog = document.getElementById('loseDialog');
            const endScorePoint = document.getElementById('endScorePoint');
            endScorePoint.innerText = score;
            loseDialog.showModal();
            restartGame();
            togglePause();
        }
    }

    function changeTheDifficulty() {
        const selectDifficulty = document.getElementById('difficulty');
        selectDifficulty.addEventListener("input", (e) => {
            difficulty = e.target.value;
            if (difficulty === "easy") {
                lives = 10;
                restartGame();
                draw(difficulty);
            }
            if (difficulty === "medium") {
                lives = 5;
                restartGame();
                draw(difficulty);
            }
            if (difficulty === "hard") {
                lives = 0;
                restartGame();
                draw(difficulty);
            }
        })

    }

    changeTheDifficulty();

    function getTheWallsEnabledOrDisabled() {
        document.getElementById('walls-option').addEventListener('change', function () {
            return wallsEnabled = this.checked;
        });
        if (wallsEnabled === true) {
            canvas.style.border = "5px solid red";
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                gameOver();
                snake = [
                    {x: 8, y: 8},   // Tête
                    {x: 7, y: 8},   // Corps
                    {x: 6, y: 8}]
            }
        }
        if (wallsEnabled === false) {
            head.x = (head.x + tileCount) % tileCount;
            head.y = (head.y + tileCount) % tileCount;
            canvas.style.border = "none";
        }
    }

    getTheWallsEnabledOrDisabled();

    setTimeout(gameLoop, moveInterval);
    console.log(setTimeout)
// TODO : vérifier collisions, manger nourriture, gérer score, level, vies...
// TODO : gérer bonus/malus


// Affichage
    draw(difficulty);

}

// === Fonctions à compléter ===

// Démarrer le jeu
function startGame() {
    // TODO : (ré)initialiser toutes les variables, positions, score, etc.
    // TODO : commencer la boucle principale (setInterval/gameLoop)
    if (isPaused === true) {
        isPaused = false;
        console.log("Game not paused");

        gameLoop();
    }
}

function settings() {
    const submitDifficulty = document.getElementById("submitDifficulty")
    submitDifficulty.addEventListener("click", () => {
        startGame();
    })

    const settingsButton = document.getElementById('settings-btn');
    const loseDialog = document.getElementById('startGameDialog');
    settingsButton.addEventListener('click', () => {
        isPaused = true;


        loseDialog.showModal();
    })
}

settings()

// Mettre en pause/reprendre
function togglePause() {
    // TODO : suspendre ou reprendre le jeu

    isPaused = true;
    console.log("Game is paused");
}

// Recommencer une partie
function restartGame() {
    // TODO : réinitialiser la partie complète
    snake = [
        {x: 8, y: 8},   // Tête
        {x: 7, y: 8},   // Corps
        {x: 6, y: 8}
    ]; // position initiale
    direction = {x: 1, y: 0}; // direction actuelle (droite)
    nextDirection = direction;
    food = []; // position de la nourritureq
    bonus = null; // position bonus/malus si besoin
    score = 0;
    level = 1;
    //lives = 3;

    spawnFood();
}

// Gestion des touches

function handleKeyDown(e) {
    document.addEventListener('keydown', function (e) {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
        }
        if (direction.x !== 1 && e.key === "ArrowLeft" || e.key === "q") {
            direction = {x: -1, y: 0};
        }
        if (direction.x !== -1 && e.key === "ArrowRight" || e.key === "d") {
            direction = {x: 1, y: 0};
        }
        if (direction.y !== 1 && e.key === "ArrowUp" || e.key === "z") {
            direction = {x: 0, y: -1}
        }
        if (direction.y !== -1 && e.key === "ArrowDown" || e.key === "s") {
            direction = {x: 0, y: 1}
        }
    });
}

// Générer la nourriture aléatoirement
function spawnFood() {
    // TODO : placer la nourriture à une position libre
    while (true) {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        if (!snake.some(c => c.x === food.x && c.y === food.y)) break;
    }
}

// Dessiner tout (snake, nourriture, score, etc.)
function draw(difficulty = "medium") {
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // --- Affichage du Snake ---
    // TODO : afficher la tête et le corps du Snake avec des couleurs différentes
    // Style flat, couleurs fun


        if (difficulty === "easy") {
            snake.forEach((cell, i) => {
                ctx.fillStyle = (i === 0) ? "#790909" : "#b4b400"; // Jaune pour la tête, vert pour le corps
                ctx.fillRect(cell.x * 20, cell.y * 20, 20, 20);
            });
        }
        if (difficulty === "medium") {
            snake.forEach((cell, i) => {
                ctx.fillStyle = (i === 0) ? "#750979" : "#ee9090"; // Jaune pour la tête, vert pour le corps
                ctx.fillRect(cell.x * 20, cell.y * 20, 20, 20);
            });
        }
        if (difficulty === "hard") {
            snake.forEach((cell, i) => {
                ctx.fillStyle = (i === 0) ? "#092979" : "#05b2e7"; // Jaune pour la tête, vert pour le corps
                ctx.fillRect(cell.x * 20, cell.y * 20, 20, 20);
            });
        }

        // --- Affichage de la nourriture ---
        ctx.beginPath();
        ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2.2, 0, 2 * Math.PI);
        ctx.fillStyle = "#f43f5e";
        ctx.fill();
        // TODO : dessiner la nourriture (bonus, malus si besoin)
        // Utiliser des couleurs différentes, forme cercle, étoile, etc.

        // --- Affichage du score, niveau, vies ---
        document.getElementById('score').textContent = score;
        document.getElementById('level').textContent = level;
        document.getElementById('lives').textContent = lives;

        // TODO : effets visuels en cas de bonus/malus/game over...
    }

// Faire évoluer la vitesse et le niveau
    function updateLevel() {
        // TODO : augmenter le niveau à chaque palier de score, accélérer la vitesse, jouer son bonus
    }

// Jouer un effet sonore
    function playSound(type) {
        const sounds = {
            eat: document.getElementById('sound-eat'),
            bonus: document.getElementById('sound-bonus'),
            malus: document.getElementById('sound-malus'),
            gameover: document.getElementById('sound-gameover')
        };
        if (sounds[type]) {
            sounds[type].currentTime = 0;
            sounds[type].play();
        }
    }

// TODO : fonctions bonus (pause, restart, options, murs, bonus/malus, animation, ...)

// === Fin du starter pack ===
