import {AnimatedSprite, Texture} from "pixi.js";
import {Egg} from "./egg.js";
import {SIGNALS} from "../signals/signals.js";


const SHIT_CHANCES = [
    { score: 1000, chance: 0.95 },
    { score: 750,  chance: 0.9 },
    { score: 500,  chance: 0.85 },
    { score: 300,  chance: 0.8 },
    { score: 200,  chance: 0.75 },
    { score: 100,  chance: 0.7 }
];


const BONUS_CHANCES = [
    { score: 1000, chance: 0.65 },
    { score: 750, chance: 0.7 },
    { score: 500, chance: 0.75 },
    { score: 300, chance: 0.8 },
    { score: 200, chance: 0.85 },
    { score: 100, chance: 0.9 },
]

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
        const chance = SHIT_CHANCES
            .find(t => score > t.score) ?? 0.75;
        return Math.random() > chance;
    }
    #generateBonus(){
        const score = SIGNALS.score.value;
        const chance = BONUS_CHANCES
            .find(t => score > t.score) ?? 0.95;
        return Math.random() > chance;
    }

    createEgg(){
        this.gotoAndPlay(1);

        const isShit = this.#generateShit();
        const hasBonus = !isShit && this.#generateBonus();
        const texture = Texture.from(isShit ? 'shit' : (hasBonus ? 'golden_egg' : 'egg'));
        return new Egg(this.stage, {texture, isShit, hasBonus, x: this.x, y: this.y + 16});
    }
}