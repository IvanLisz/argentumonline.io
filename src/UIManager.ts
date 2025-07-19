import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';

export class UIManager {
    private scene: BABYLON.Scene;
    private advancedTexture: GUI.AdvancedDynamicTexture;
    private healthBar!: GUI.Rectangle;
    private manaBar!: GUI.Rectangle;
    private levelText!: GUI.TextBlock;
    private goldText!: GUI.TextBlock;

    constructor(scene: BABYLON.Scene) {
        this.scene = scene;
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
    }

    initialize() {
        this.createStatsPanel();
        this.createInventoryButton();
        this.createChatBox();
    }

    private createStatsPanel() {
        const statsPanel = new GUI.Rectangle('statsPanel');
        statsPanel.width = '300px';
        statsPanel.height = '100px';
        statsPanel.cornerRadius = 5;
        statsPanel.color = 'white';
        statsPanel.thickness = 2;
        statsPanel.background = 'rgba(0, 0, 0, 0.7)';
        statsPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        statsPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        statsPanel.left = 10;
        statsPanel.top = 10;
        this.advancedTexture.addControl(statsPanel);

        const healthBarBg = new GUI.Rectangle('healthBarBg');
        healthBarBg.width = '250px';
        healthBarBg.height = '20px';
        healthBarBg.color = 'darkred';
        healthBarBg.thickness = 1;
        healthBarBg.background = 'black';
        healthBarBg.top = '-25px';
        statsPanel.addControl(healthBarBg);

        this.healthBar = new GUI.Rectangle('healthBar');
        this.healthBar.width = '246px';
        this.healthBar.height = '16px';
        this.healthBar.color = 'transparent';
        this.healthBar.background = 'red';
        this.healthBar.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        healthBarBg.addControl(this.healthBar);

        const manaBarBg = new GUI.Rectangle('manaBarBg');
        manaBarBg.width = '250px';
        manaBarBg.height = '20px';
        manaBarBg.color = 'darkblue';
        manaBarBg.thickness = 1;
        manaBarBg.background = 'black';
        manaBarBg.top = '0px';
        statsPanel.addControl(manaBarBg);

        this.manaBar = new GUI.Rectangle('manaBar');
        this.manaBar.width = '246px';
        this.manaBar.height = '16px';
        this.manaBar.color = 'transparent';
        this.manaBar.background = 'blue';
        this.manaBar.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        manaBarBg.addControl(this.manaBar);

        this.levelText = new GUI.TextBlock('levelText');
        this.levelText.text = 'Level 1';
        this.levelText.color = 'white';
        this.levelText.fontSize = 16;
        this.levelText.top = '25px';
        this.levelText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.levelText.left = '10px';
        statsPanel.addControl(this.levelText);

        this.goldText = new GUI.TextBlock('goldText');
        this.goldText.text = 'Gold: 0';
        this.goldText.color = 'gold';
        this.goldText.fontSize = 16;
        this.goldText.top = '25px';
        this.goldText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.goldText.left = '-10px';
        statsPanel.addControl(this.goldText);
    }

    private createInventoryButton() {
        const inventoryButton = GUI.Button.CreateSimpleButton('inventoryBtn', 'Inventario (I)');
        inventoryButton.width = '120px';
        inventoryButton.height = '40px';
        inventoryButton.color = 'white';
        inventoryButton.background = 'rgba(0, 0, 0, 0.7)';
        inventoryButton.cornerRadius = 5;
        inventoryButton.thickness = 2;
        inventoryButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        inventoryButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        inventoryButton.left = -10;
        inventoryButton.top = 10;
        inventoryButton.onPointerClickObservable.add(() => {
            console.log('Open inventory');
        });
        this.advancedTexture.addControl(inventoryButton);
    }

    private createChatBox() {
        const chatBox = new GUI.Rectangle('chatBox');
        chatBox.width = '400px';
        chatBox.height = '200px';
        chatBox.cornerRadius = 5;
        chatBox.color = 'white';
        chatBox.thickness = 2;
        chatBox.background = 'rgba(0, 0, 0, 0.5)';
        chatBox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        chatBox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        chatBox.left = 10;
        chatBox.top = -10;
        this.advancedTexture.addControl(chatBox);

        const chatText = new GUI.TextBlock('chatText');
        chatText.text = 'Bienvenido a Argentum Babylon!';
        chatText.color = 'white';
        chatText.fontSize = 14;
        chatText.textWrapping = true;
        chatText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        chatText.paddingTop = '10px';
        chatText.paddingLeft = '10px';
        chatText.paddingRight = '10px';
        chatBox.addControl(chatText);
    }

    updateStats(stats: any) {
        if (this.healthBar && stats.maxHealth > 0) {
            const healthPercent = stats.health / stats.maxHealth;
            this.healthBar.width = `${246 * healthPercent}px`;
        }

        if (this.manaBar && stats.maxMana > 0) {
            const manaPercent = stats.mana / stats.maxMana;
            this.manaBar.width = `${246 * manaPercent}px`;
        }

        if (this.levelText) {
            this.levelText.text = `Level ${stats.level}`;
        }

        if (this.goldText) {
            this.goldText.text = `Gold: ${stats.gold}`;
        }
    }
}