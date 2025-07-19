import * as BABYLON from '@babylonjs/core';

export interface CharacterStats {
    level: number;
    health: number;
    maxHealth: number;
    mana: number;
    maxMana: number;
    strength: number;
    agility: number;
    intelligence: number;
    experience: number;
    gold: number;
}

export abstract class Character {
    protected scene: BABYLON.Scene;
    protected position: BABYLON.Vector3;
    protected mesh: BABYLON.Mesh | null = null;
    protected stats: CharacterStats;

    constructor(scene: BABYLON.Scene, position: BABYLON.Vector3) {
        this.scene = scene;
        this.position = position;
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

    abstract load(): Promise<void>;
    abstract update(deltaTime: number): void;

    getPosition(): BABYLON.Vector3 {
        return this.position.clone();
    }

    getMesh(): BABYLON.Mesh | null {
        return this.mesh;
    }

    getStats(): CharacterStats {
        return { ...this.stats };
    }
}