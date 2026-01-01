import {AnimatedSprite, Texture} from "pixi.js";
import {Egg} from "./egg.js";
import {SIGNALS} from "../signals/signals.js";

export class Chicken extends AnimatedSprite{
    constructor(stage, i) {
        super({textures: ['chicken_1', 'chicken_2'].map(name => Texture.from(name))});
        this.stage = stage;
        this.anchor.set(0.5);
        this.eventMode = 'none';
        this.position.set(48 + 72 * i, 80)

        this.animationSpeed = 0.04;

        this.stage.addChild(this);

        this.onFrameChange = frameIndex => frameIndex === 0 && this.stop();
    }
    #generateShit(){
        const score = SIGNALS.score.value;

        let chance = 0.75;

        if(score > 1000) {
            chance = 0.95;
        } else if(score > 750){
            chance = 0.9;
        } else if(score > 500) {
            chance = 0.85;
        } else if(score > 300) {
            chance = 0.8;
        } else if(score > 200) {
            chance = 0.75;
        } else if(score > 100) {
            chance = 0.7;
        }

        return Math.random() > chance;
    }
    #generateBonus(){
        const score = SIGNALS.score.value;

        let chance = 0.95;

        if(score > 1000) {
            chance = 0.65;
        }else if(score > 750){
            chance = 0.7;
        }else if(score > 500) {
            chance = 0.75;
        } else if(score > 300) {
            chance = 0.80;
        } else if(score > 200) {
            chance = 0.85;
        } else if(score > 100) {
            chance = 0.9;
        }

        return Math.random() > chance;
    }

    getEgg(){
        this.gotoAndPlay(1);

        const isShit = this.#generateShit();
        const hasBonus = !isShit && this.#generateBonus();
        const texture = Texture.from(isShit ? 'shit' : (hasBonus ? 'golden_egg' : 'egg'));
        return new Egg(this.stage, {texture, isShit, hasBonus, x: this.x, y: this.y + 16});
    }
}