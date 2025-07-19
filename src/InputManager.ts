import * as BABYLON from '@babylonjs/core';
import { Player } from './entities/Player';

export class InputManager {
    private scene: BABYLON.Scene;
    private canvas: HTMLCanvasElement;
    private player: Player | null = null;
    private camera: BABYLON.UniversalCamera;

    constructor(scene: BABYLON.Scene, canvas: HTMLCanvasElement) {
        this.scene = scene;
        this.canvas = canvas;
        this.camera = scene.activeCamera as BABYLON.UniversalCamera;
        
        this.setupInputHandlers();
    }

    setPlayer(player: Player) {
        this.player = player;
    }

    private setupInputHandlers() {
        this.canvas.addEventListener('click', (event) => {
            if (event.button === 0) {
                this.handleLeftClick(event);
            }
        });

        this.canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            this.handleRightClick(event);
        });

        this.scene.registerBeforeRender(() => {
            this.updateCameraFollow();
        });
    }

    private handleLeftClick(event: MouseEvent) {
        const pickResult = this.scene.pick(event.clientX, event.clientY, (mesh) => {
            return mesh.name === 'ground';
        });

        if (pickResult && pickResult.hit && pickResult.pickedPoint && this.player) {
            this.player.moveTo(pickResult.pickedPoint);
        }
    }

    private handleRightClick(event: MouseEvent) {
        const pickResult = this.scene.pick(event.clientX, event.clientY);

        if (pickResult && pickResult.hit && pickResult.pickedMesh) {
            console.log('Right clicked on:', pickResult.pickedMesh.name);
        }
    }

    private updateCameraFollow() {
        if (this.player && this.camera) {
            const playerPosition = this.player.getPosition();
            const offset = new BABYLON.Vector3(0, 15, -20);
            
            const targetCameraPosition = playerPosition.add(offset);
            const currentCameraPosition = this.camera.position;
            
            this.camera.position = BABYLON.Vector3.Lerp(
                currentCameraPosition,
                targetCameraPosition,
                0.1
            );
            
            this.camera.setTarget(playerPosition);
        }
    }

    update() {
        
    }
}