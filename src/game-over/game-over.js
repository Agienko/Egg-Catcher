import {Container, Sprite, Text, Texture} from "pixi.js";
import {app} from "../main.js";
import {sound} from "@pixi/sound";

export class GameOver extends Container{
    constructor(stage) {
        super();
        stage.addChild(this);
        this.overlay = new Sprite({texture: Texture.WHITE});
        this.overlay.tint = '#4fc4f7';
        this.overlay.alpha = 0.6;
        this.addChild(this.overlay);
        sound.play('over', {volume: 0.05});

        this.gameOverText = new Text({
            text: 'GAME OVER',
            style: {
                fill: '#fff',
                fontSize: 64,
                fontWeight: 'bold',
                fontFamily: "monospace",
            },
            anchor: {x: 0.5, y: 0.5},
            position: {x: app.renderer.width / 2, y: app.renderer.height / 2}
        })

        this.addChild(this.gameOverText);


        window.addEventListener('resize', this.onResize);
        this.onResize();
    }
    onResize = () => {
        this.overlay.width = app.renderer.width;
        this.overlay.height = app.renderer.height;

    }

    destroy(options) {
        window.removeEventListener('resize', this.onResize);
        super.destroy(options);
    }
}