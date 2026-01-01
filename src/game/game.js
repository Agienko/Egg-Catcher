import {Container} from "pixi.js";
import {World} from "./components/world.js";
import {Texts} from "./components/texts.js";
import {Chicken} from "./components/chicken.js";
import {Bag} from "./components/bag.js";
import {GameOver} from "../game-over/game-over.js";
import {getRandomInt, randomFromArr} from "../helpers/helper.js";
import {effect} from "@preact/signals-core";
import {gsap} from "gsap";
import {SIGNALS} from "./signals/signals.js";
import {flashBack} from "../main.js";

const DELAY_THRESHOLDS = [
    { score: 1000, min: 180, max: 250 },
    { score: 750,  min: 200, max: 290 },
    { score: 500,  min: 220, max: 300 },
    { score: 350,  min: 250, max: 400 },
    { score: 250,  min: 270, max: 450 },
    { score: 180,  min: 280, max: 500 },
    { score: 120,  min: 290, max: 550 },
    { score: 80,   min: 300, max: 600 },
    { score: 50,   min: 400, max: 700 },
    { score: 20,   min: 500, max: 1000 },
    { score: 10,   min: 800, max: 1500 }
];

class Game extends Container{
    constructor(stage) {
        super();
        stage.addChild(this);

        this.loopTween = null;

        this.world = new World(this);
        this.texts = new Texts(this);

        this.chickens = [];

        for (let i = 0; i < 5; i++) {
            const chicken = new Chicken(this, i);
            this.chickens.push(chicken);
        }

        this.bag = new Bag(this);

        this.loop();

        this.lives = SIGNALS.lives.value
        effect(()=> {
            if(SIGNALS.lives.value > this.lives) {
                flashBack.style.opacity = '0.5';
                gsap.to(flashBack.style, {opacity: 0, duration: 0.3, ease: 'power2.inOut'});
            } else {
                gsap.to(stage, {x: 1, repeat: 2, yoyo: true, duration: 0.04, ease: 'power2.inOut', onComplete: () => {
                    stage.x = 0;
                    }});
            }

            this.lives = SIGNALS.lives.value
        })

        effect(() => {
            if(SIGNALS.lives.value >= 0) return;
            this.loopTween?.kill();

            const toDestroy = this.children.filter(child => child.type === 'egg');

            toDestroy.forEach(child => child.destroy());

            new GameOver(() => {
                SIGNALS.lives.value = 5;
                SIGNALS.score.value = 0;
                this.loop();
            });

        })

    }

    loop(){
        if(SIGNALS.lives.value < 0) return;
        const score = SIGNALS.score.value;
        const {min = 1000, max = 2000} = DELAY_THRESHOLDS.find(i => score > i.score) ?? {};

        this.loopTween = gsap.delayedCall(getRandomInt(min, max) / 1000, () => {
            if(SIGNALS.lives.value < 0) return;
            randomFromArr(this.chickens).createEgg();
            this.loop();
        })
    }
}

export default Game