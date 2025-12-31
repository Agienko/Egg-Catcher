import {AnimatedSprite, Texture} from "pixi.js";
import {Egg} from "./egg.js";

export class Chicken extends AnimatedSprite{
    constructor(stage, i) {
        super({textures: ['chicken_1', 'chicken_2'].map(name => Texture.from(name))});
        this.stage = stage;
        this.anchor.set(0.5);
        this.eventMode = 'none';
        this.position.set(48 + 72 * i, 64 + 16)

        this.animationSpeed = 0.08;
        this.stage.addChild(this);

        this.onFrameChange = frameIndex => frameIndex === 0 && this.stop();
    }
    getEgg(){
        this.gotoAndPlay(1)

        const egg = new Egg(this.stage);
        egg.position.set(this.x, this.y + 16);
        return egg;
    }
}