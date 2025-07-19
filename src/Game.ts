import * as BABYLON from '@babylonjs/core';
import { SceneManager } from './SceneManager';
import { Player } from './entities/Player';
import { InputManager } from './InputManager';
import { UIManager } from './UIManager';

export class Game {
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private sceneManager: SceneManager;
    private player!: Player;
    private inputManager: InputManager;
    private uiManager: UIManager;

    constructor(canvas: HTMLCanvasElement) {
        this.engine = new BABYLON.Engine(canvas, true, {
            preserveDrawingBuffer: true,
            stencil: true
        });

        this.scene = new BABYLON.Scene(this.engine);
        this.sceneManager = new SceneManager(this.scene);
        this.inputManager = new InputManager(this.scene, canvas);
        this.uiManager = new UIManager(this.scene);
        
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    async start() {
        await this.initialize();
        
        this.engine.runRenderLoop(() => {
            this.update();
            this.scene.render();
        });
    }

    private async initialize() {
        await this.sceneManager.createEnvironment();
        
        this.player = new Player(this.scene, new BABYLON.Vector3(0, 1, 0));
        await this.player.load();
        
        this.inputManager.setPlayer(this.player);
        
        this.uiManager.initialize();
        
        const loadingDiv = document.getElementById('loading');
        if (loadingDiv) {
            loadingDiv.style.display = 'none';
        }
    }

    private update() {
        const deltaTime = this.engine.getDeltaTime() / 1000;
        
        if (this.player) {
            this.player.update(deltaTime);
        }
        
        this.inputManager.update();
    }
}