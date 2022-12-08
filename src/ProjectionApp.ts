/* Lecture 26
 * CSCI 4611, Fall 2022, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'
import { GUI } from 'dat.gui'


export class ProjectionApp extends gfx.GfxApp
{
    private cameraControls: gfx.OrbitControls;

    private projectionMode: string;

    constructor()
    {
        super();

        this.cameraControls = new gfx.OrbitControls(this.camera); 

        this.projectionMode = 'Perspective';

        // This sets up a default camera that won't show anything.
        // We are going to manually compute the projection matrix.
        this.camera.setOrthographicCamera(0, 1.777, 0, 1, 0.01, 1);
    }

    createScene(): void 
    {
        // Initialize the camera using our custom projection matrix
        this.setCameraProjection();

        // Configure camera controls
        this.cameraControls.setDistance(600);
        this.cameraControls.zoomSpeed = 10;

        // Create the scene lighting
        const sceneLight = new gfx.DirectionalLight();
        sceneLight.ambientIntensity.set(0.5, 0.5, 0.5);
        sceneLight.diffuseIntensity.set(0.5, 0.5, 0.5);
        sceneLight.position.set(1, 1, -1);
        this.scene.add(sceneLight);

        // Create the skybox material
        const skyboxMaterial = new gfx.UnlitMaterial();
        skyboxMaterial.color.set(0.749, 0.918, 0.988);
        skyboxMaterial.side = gfx.Side.BACK;

        // Add the skybox to the scene
        const skybox = new gfx.BoxMesh(1000, 1000, 1000);
        skybox.material = skyboxMaterial;
        this.scene.add(skybox);

        // Create the ground material
        const groundMaterial = new gfx.UnlitMaterial();
        groundMaterial.setColor(new gfx.Color(0.5, 0.5, 0.5));

        // Add the ground mesh to the scene
        const ground = new gfx.BoxMesh(510, 1, 510);
        ground.position.set(0, -.5, 0);
        ground.material = groundMaterial;
        this.scene.add(ground);

        const column = new gfx.BoxMesh(15, 1, 15);
        for(let i=-250; i <= 250; i+=20)
        {
            for(let j=-250; j <= 250; j+=20)
            {
                const columnHeight = Math.random() * 55 + 5;
                const columnMaterial = new gfx.GouraudMaterial();
                columnMaterial.setColor(new gfx.Color(Math.random(), Math.random(), Math.random()));

                const columnInstance = new gfx.MeshInstance(column);
                columnInstance.position.set(i, columnHeight/2, j);
                columnInstance.scale.set(1, columnHeight, 1);
                columnInstance.material = columnMaterial;
                this.scene.add(columnInstance);
            }
        }

        // Create the GUI
        const gui = new GUI();
        gui.width = 200;

        const projectionController = gui.add(this, 'projectionMode', [
            'Perspective',
            'Orthographic',
            'Isometric'
        ]);
        projectionController.name('Projection');
        projectionController.onChange(()=>{ this.setCameraProjection() });
    }

    update(deltaTime: number): void 
    {
        this.cameraControls.update(deltaTime);
    }

    setCameraProjection(): void
    {
        // To be added

        // Resize the viewport based on the camera aspect ratio
        this.resize();
    }

    // Override the default resize event handler
    resize(): void
    {
        this.renderer.resize(window.innerWidth, window.innerHeight, this.camera.getAspectRatio());
    }
}