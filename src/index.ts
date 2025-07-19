import { Game } from './Game';

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('renderCanvas');
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
        throw new Error('Canvas element not found or not an HTMLCanvasElement');
    }
    const game = new Game(canvas);
    game.start();
});