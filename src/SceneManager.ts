import * as BABYLON from '@babylonjs/core';

export class SceneManager {
    private scene: BABYLON.Scene;
    private camera!: BABYLON.UniversalCamera;
    private light!: BABYLON.DirectionalLight;

    constructor(scene: BABYLON.Scene) {
        this.scene = scene;
    }

    async createEnvironment() {
        this.scene.clearColor = new BABYLON.Color4(0.5, 0.7, 0.9, 1);
        
        this.createCamera();
        this.createLights();
        await this.createTerrain();
        this.createSkybox();
    }

    private createCamera() {
        this.camera = new BABYLON.UniversalCamera(
            'MainCamera',
            new BABYLON.Vector3(0, 15, -20),
            this.scene
        );
        
        this.camera.setTarget(BABYLON.Vector3.Zero());
        this.camera.attachControl(this.scene.getEngine().getRenderingCanvas(), false);
        
        this.camera.keysUp = [];
        this.camera.keysDown = [];
        this.camera.keysLeft = [];
        this.camera.keysRight = [];
        
        this.camera.angularSensibility = 5000;
        this.camera.speed = 0;
    }

    private createLights() {
        const ambientLight = new BABYLON.HemisphericLight(
            'AmbientLight',
            new BABYLON.Vector3(0, 1, 0),
            this.scene
        );
        ambientLight.intensity = 0.7;
        ambientLight.diffuse = new BABYLON.Color3(1, 1, 1);
        ambientLight.specular = new BABYLON.Color3(0.5, 0.5, 0.5);
        ambientLight.groundColor = new BABYLON.Color3(0.2, 0.2, 0.3);

        this.light = new BABYLON.DirectionalLight(
            'DirectionalLight',
            new BABYLON.Vector3(-1, -2, -1),
            this.scene
        );
        this.light.position = new BABYLON.Vector3(20, 40, 20);
        this.light.intensity = 0.5;

        const shadowGenerator = new BABYLON.ShadowGenerator(2048, this.light);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.blurScale = 2;
        shadowGenerator.setDarkness(0.2);
    }

    private async createTerrain() {
        const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', this.scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.5, 0.2);
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        
        const ground = BABYLON.MeshBuilder.CreateGround(
            'ground',
            { width: 100, height: 100, subdivisions: 20 },
            this.scene
        );
        ground.material = groundMaterial;
        ground.receiveShadows = true;
        
        for (let i = 0; i < 10; i++) {
            const rock = BABYLON.MeshBuilder.CreateSphere(
                `rock${i}`,
                { diameter: Math.random() * 2 + 0.5, segments: 8 },
                this.scene
            );
            rock.position = new BABYLON.Vector3(
                (Math.random() - 0.5) * 80,
                0.25,
                (Math.random() - 0.5) * 80
            );
            
            const rockMaterial = new BABYLON.StandardMaterial(`rockMat${i}`, this.scene);
            rockMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
            rock.material = rockMaterial;
        }
        
        for (let i = 0; i < 20; i++) {
            const tree = this.createTree(i);
            tree.position = new BABYLON.Vector3(
                (Math.random() - 0.5) * 80,
                0,
                (Math.random() - 0.5) * 80
            );
        }
    }

    private createTree(index: number): BABYLON.Mesh {
        const trunk = BABYLON.MeshBuilder.CreateCylinder(
            `trunk${index}`,
            { height: 3, diameter: 0.5 },
            this.scene
        );
        
        const leaves = BABYLON.MeshBuilder.CreateSphere(
            `leaves${index}`,
            { diameter: 3, segments: 8 },
            this.scene
        );
        leaves.position.y = 2.5;
        leaves.parent = trunk;
        
        const trunkMaterial = new BABYLON.StandardMaterial(`trunkMat${index}`, this.scene);
        trunkMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.2, 0.1);
        trunk.material = trunkMaterial;
        
        const leavesMaterial = new BABYLON.StandardMaterial(`leavesMat${index}`, this.scene);
        leavesMaterial.diffuseColor = new BABYLON.Color3(0.1, 0.6, 0.1);
        leaves.material = leavesMaterial;
        
        return trunk;
    }

    private createSkybox() {
        const skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 1000 }, this.scene);
        const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', this.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;
        
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.emissiveColor = new BABYLON.Color3(0.5, 0.7, 0.9);
    }

    getCamera(): BABYLON.UniversalCamera {
        return this.camera;
    }
}