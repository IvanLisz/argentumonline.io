import * as BABYLON from '@babylonjs/core';
import { Character } from './Character';

export class Player extends Character {
    private targetPosition: BABYLON.Vector3 | null = null;
    private isMoving: boolean = false;
    private moveSpeed: number = 5;

    constructor(scene: BABYLON.Scene, position: BABYLON.Vector3) {
        super(scene, position);
        this.stats = {
            level: 1,
            health: 100,
            maxHealth: 100,
            mana: 50,
            maxMana: 50,
            strength: 10,
            agility: 10,
            intelligence: 10,
            experience: 0,
            gold: 0
        };
    }

    async load() {
        this.mesh = BABYLON.MeshBuilder.CreateCapsule(
            'player',
            { height: 2, radius: 0.5 },
            this.scene
        );
        this.mesh.position = this.position.clone();
        
        const material = new BABYLON.StandardMaterial('playerMaterial', this.scene);
        material.diffuseColor = new BABYLON.Color3(0.2, 0.4, 0.8);
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        this.mesh.material = material;
        
        const nameplate = BABYLON.MeshBuilder.CreatePlane('nameplate', { width: 2, height: 0.5 }, this.scene);
        nameplate.position.y = 1.5;
        nameplate.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
        nameplate.parent = this.mesh;
        
        const nameplateMaterial = new BABYLON.StandardMaterial('nameplateMat', this.scene);
        nameplateMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
        nameplateMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
        nameplateMaterial.backFaceCulling = false;
        nameplate.material = nameplateMaterial;
        nameplate.visibility = 0;
    }

    moveTo(targetPosition: BABYLON.Vector3) {
        this.targetPosition = targetPosition.clone();
        this.targetPosition.y = this.position.y;
        this.isMoving = true;
    }

    update(deltaTime: number) {
        if (this.isMoving && this.targetPosition && this.mesh) {
            const direction = this.targetPosition.subtract(this.position);
            const distance = direction.length();
            
            if (distance > 0.1) {
                direction.normalize();
                const movement = direction.scale(this.moveSpeed * deltaTime);
                
                if (movement.length() > distance) {
                    this.position = this.targetPosition.clone();
                    this.isMoving = false;
                    this.targetPosition = null;
                } else {
                    this.position.addInPlace(movement);
                }
                
                this.mesh.position = this.position.clone();
                
                const angle = Math.atan2(direction.x, direction.z);
                this.mesh.rotation.y = angle;
            } else {
                this.isMoving = false;
                this.targetPosition = null;
            }
        }
    }

    takeDamage(amount: number) {
        this.stats.health = Math.max(0, this.stats.health - amount);
        if (this.stats.health === 0) {
            console.log('Player died!');
        }
    }

    heal(amount: number) {
        this.stats.health = Math.min(this.stats.maxHealth, this.stats.health + amount);
    }

    addExperience(amount: number) {
        this.stats.experience += amount;
        const experienceNeeded = this.stats.level * 100;
        
        if (this.stats.experience >= experienceNeeded) {
            this.levelUp();
        }
    }

    private levelUp() {
        this.stats.level++;
        this.stats.experience = 0;
        
        this.stats.maxHealth += 10;
        this.stats.maxMana += 5;
        this.stats.strength += 2;
        this.stats.agility += 2;
        this.stats.intelligence += 2;
        
        this.stats.health = this.stats.maxHealth;
        this.stats.mana = this.stats.maxMana;
        
        console.log(`Level up! Now level ${this.stats.level}`);
    }
}