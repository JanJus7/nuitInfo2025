'use client';

import { useEffect, useRef, useState } from 'react';

export default function Snake() {
    const canvasRef = useRef(null);
    const [darkMode, setDarkMode] = useState(false);
    const [sizeMode, setSizeMode] = useState('normal'); // 'normal', 'fullHeight', 'fullScreen'
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const scoreRef = useRef(0);
    const gameStateRef = useRef({
        snake: null,
        apple: null,
        count: 0,
        canvasSize: null
    });

    useEffect(() => {
        if (gameOver) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Calculate canvas size
        let canvasSize = 400;
        if (sizeMode === 'fullScreen') {
            const size = Math.min(window.innerWidth, window.innerHeight) - 100;
            canvasSize = Math.floor(size / 16) * 16;
        } else if (sizeMode === 'fullHeight') {
            const size = window.innerHeight - 150;
            canvasSize = Math.floor(size / 16) * 16;
        }

        canvas.width = canvasSize;
        canvas.height = canvasSize;

        const context = canvas.getContext('2d');

        // the canvas width & height, snake x & y, and the apple x & y, all need to be a multiples of the grid size in order for collision detection to work
        // (e.g. 16 * 25 = 400)
        const grid = 16;
        const gridCount = canvasSize / grid;
        let animationId;

        // Initialize snake and apple only once, or if canvas size changed significantly
        if (!gameStateRef.current.snake || gameStateRef.current.canvasSize !== canvasSize) {
            gameStateRef.current.snake = {
                x: Math.floor(gridCount / 2) * grid,
                y: Math.floor(gridCount / 2) * grid,
                dx: grid,
                dy: 0,
                cells: [],
                maxCells: 4
            };
            gameStateRef.current.apple = {
                x: Math.floor(gridCount * 0.8) * grid,
                y: Math.floor(gridCount * 0.8) * grid,
                isGolden: false
            };
            gameStateRef.current.count = 0;
            gameStateRef.current.canvasSize = canvasSize;
        }

        const snake = gameStateRef.current.snake;
        const apple = gameStateRef.current.apple;
        let count = gameStateRef.current.count;
        let score = scoreRef.current;

        // get random whole numbers in a specific range
        // @see https://stackoverflow.com/a/1527820/2124254
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        // Generate new apple with 10% chance of being golden
        function generateApple() {
            apple.x = getRandomInt(0, gridCount) * grid;
            apple.y = getRandomInt(0, gridCount) * grid;
            apple.isGolden = Math.random() < 0.1; // 10% chance
        }

        // game loop
        function loop() {
            animationId = requestAnimationFrame(loop);

            // slow game loop to 15 fps instead of 60 (60/15 = 4)
            if (++count < 4) {
                return;
            }

            count = 0;
            gameStateRef.current.count = count;
            context.clearRect(0, 0, canvas.width, canvas.height);

            // move snake by it's velocity
            snake.x += snake.dx;
            snake.y += snake.dy;

            // wrap snake position horizontally on edge of screen
            if (snake.x < 0) {
                snake.x = canvas.width - grid;
            }
            else if (snake.x >= canvas.width) {
                snake.x = 0;
            }

            // wrap snake position vertically on edge of screen
            if (snake.y < 0) {
                snake.y = canvas.height - grid;
            }
            else if (snake.y >= canvas.height) {
                snake.y = 0;
            }

            // keep track of where snake has been. front of the array is always the head
            snake.cells.unshift({ x: snake.x, y: snake.y });

            // remove cells as we move away from them
            if (snake.cells.length > snake.maxCells) {
                snake.cells.pop();
            }

            // draw apple
            context.fillStyle = apple.isGolden
                ? (darkMode ? '#ffd700' : '#ffb700')
                : (darkMode ? '#ff6b6b' : 'red');
            context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

            // draw snake one cell at a time
            context.fillStyle = darkMode ? '#51cf66' : 'green';
            snake.cells.forEach(function (cell, index) {

                // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
                context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

                // snake ate apple
                if (cell.x === apple.x && cell.y === apple.y) {
                    // Add size based on apple type
                    if (apple.isGolden) {
                        snake.maxCells += 3;
                        score += 5;
                    } else {
                        snake.maxCells++;
                        score += 1;
                    }

                    // Update the ref to persist the score
                    scoreRef.current = score;

                    // Check si on doit changer le thème (tous les 10 points)
                    const currentHundreds = Math.floor(score / 10);
                    const lastHundreds = Math.floor((score - (apple.isGolden ? 5 : 1)) / 10);
                    if (currentHundreds > lastHundreds) {
                        setDarkMode(prev => !prev);
                    }

                    // Update score state
                    setScore(score);

                    // Arrêter le jeu si score >= 300
                    if (score >= 300) {
                        setGameOver(true);
                        cancelAnimationFrame(animationId);
                        return;
                    }

                    // Générer une nouvelle pomme
                    generateApple();
                }

                // check collision with all cells after this one (modified bubble sort)
                for (var i = index + 1; i < snake.cells.length; i++) {

                    // snake occupies same space as a body part. reset game
                    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                        snake.x = Math.floor(gridCount / 2) * grid;
                        snake.y = Math.floor(gridCount / 2) * grid;
                        snake.cells = [];
                        snake.maxCells = 4;
                        snake.dx = grid;
                        snake.dy = 0;

                        // Reset score
                        score = 0;
                        scoreRef.current = 0;
                        setScore(0);

                        // Générer une nouvelle pomme
                        generateApple();
                    }
                }
            });
        }

        // listen to keyboard events to move the snake
        function handleKeyDown(e) {
            // prevent snake from backtracking on itself by checking that it's
            // not already moving on the same axis (pressing left while moving
            // left won't do anything, and pressing right while moving left
            // shouldn't let you collide with your own body)

            // left arrow key
            if ((e.which === 37 || e.key === 'ArrowLeft') && snake.dx === 0) {
                snake.dx = -grid;
                snake.dy = 0;
            }
            // up arrow key
            else if ((e.which === 38 || e.key === 'ArrowUp') && snake.dy === 0) {
                snake.dy = -grid;
                snake.dx = 0;
            }
            // right arrow key
            else if ((e.which === 39 || e.key === 'ArrowRight') && snake.dx === 0) {
                snake.dx = grid;
                snake.dy = 0;
            }
            // down arrow key
            else if ((e.which === 40 || e.key === 'ArrowDown') && snake.dy === 0) {
                snake.dy = grid;
                snake.dx = 0;
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        // start the game
        animationId = requestAnimationFrame(loop);

        // Cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [sizeMode, darkMode, gameOver]);

    const cycleSize = () => {
        setSizeMode(current => {
            if (current === 'normal') return 'fullHeight';
            if (current === 'fullHeight') return 'fullScreen';
            return 'normal';
        });
    };

    const getSizeButtonText = () => {
        if (sizeMode === 'normal') return '📏 Normal';
        if (sizeMode === 'fullHeight') return '⬆️ Pleine hauteur';
        return '⛶ Plein écran';
    };

    const handleRestart = () => {
        // Réinitialiser le jeu
        setGameOver(false);
        setScore(0);
        scoreRef.current = 0;
        gameStateRef.current.snake = null;
        gameStateRef.current.apple = null;
        gameStateRef.current.count = 0;
        // Optionnel: reset darkMode ou sizeMode si besoin
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            margin: 0,
            background: darkMode ? 'rgba(50, 50, 50, 1)' : 'rgba(255, 246, 227, 1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s ease',
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                display: 'flex',
                gap: '10px',
                zIndex: 1000
            }}>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        border: 'none',
                        borderRadius: '8px',
                        background: darkMode ? '#4a4a4a' : '#e0e0e0',
                        color: darkMode ? '#ffffff' : '#000000',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                >
                    {darkMode ? '☀️ Mode clair' : '🌙 Mode sombre'}
                </button>
                <button
                    onClick={cycleSize}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        border: 'none',
                        borderRadius: '8px',
                        background: darkMode ? '#4a4a4a' : '#e0e0e0',
                        color: darkMode ? '#ffffff' : '#000000',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                >
                    {getSizeButtonText()}
                </button>
            </div>
            {!gameOver ? (
                <>
                    <div style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        marginBottom: '20px',
                        color: darkMode ? '#ffffff' : '#000000',
                        textAlign: 'center',
                        padding: '10px 30px',
                        borderRadius: '12px',
                        background: darkMode ? 'rgba(74, 74, 74, 0.8)' : 'rgba(224, 224, 224, 0.8)',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s ease',
                        fontFamily: 'Arial, sans-serif'
                    }}>
                        Score: {score}
                    </div>
                    <canvas
                        ref={canvasRef}
                        id="game"
                        style={{
                            border: darkMode ? '1px solid rgb(200, 200, 200)' : '1px solid rgb(107, 107, 107)',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                        }}
                    />
                </>
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100vw',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    background: darkMode ? 'rgba(50, 50, 50, 0.95)' : 'rgba(255, 246, 227, 0.95)',
                    zIndex: 2000
                }}>
                    <div style={{
                        fontSize: '40px',
                        fontWeight: 'bold',
                        color: darkMode ? '#ffd700' : '#ff6b6b',
                        marginBottom: '30px',
                        textAlign: 'center',
                        fontFamily: 'Arial, sans-serif',
                        textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }}>
                        🎉 Bravo !<br />Vous avez atteint 300 points.<br />Score final : {score}
                    </div>
                    <button
                        onClick={handleRestart}
                        style={{
                            padding: '16px 40px',
                            fontSize: '24px',
                            borderRadius: '12px',
                            border: 'none',
                            background: darkMode ? '#51cf66' : '#ff6b6b',
                            color: '#fff',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        🔄 Rejouer
                    </button>
                </div>
            )}
        </div>
    );
}