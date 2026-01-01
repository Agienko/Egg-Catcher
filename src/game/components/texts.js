import {Text} from "pixi.js";
import {effect} from "@preact/signals-core";
import {SIGNALS} from "../signals/signals.js";
import {gsap} from "gsap";

export class Texts {
    constructor(stage) {
        const style = {
            fill: "#b22222",
            stroke: "#791414",
            strokeThickness: 1,
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: "monospace",
        }

        this.livesText = new Text({
            text: 'LIVES',
            style,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 64 + 32, y: 16}
        })
        stage.addChild(this.livesText)
        this.livesTextDynamic = new Text({
            text: '5',
            style,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 64 + 32, y: 16 + 20}
        })
        stage.addChild(this.livesTextDynamic);

        this.scoreText = new Text({
            text: 'SCORE',
            style,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 64 + 32 *7, y: 16}
        })
        stage.addChild(this.scoreText)
        this.scoreTextDynamic = new Text({
            text: '0',
            style,
            anchor: {x: 0.5, y: 0.5},
            position: {x: 64 + 32 * 7, y: 16 + 20}
        })
        stage.addChild(this.scoreTextDynamic);

        this.scoreTween = null;
        this.livesTween = null;

        effect(() => {
            this.scoreTween?.kill();
            this.scoreTextDynamic.text = SIGNALS.score;
            this.scoreTextDynamic.scale.set(1);
            this.scoreTween = gsap.to(this.scoreTextDynamic, {pixi: {scale: 1.2}, duration: 0.2,repeat: 1, yoyo: true, ease: 'power2.inOut'})
        })
        effect(() => {
            this.livesTween?.kill();
            this.livesTextDynamic.text = SIGNALS.lives;
            this.livesTextDynamic.scale.set(1);
            this.livesTween = gsap.to(this.livesTextDynamic, {pixi: {scale: 1.2}, duration: 0.2,repeat: 1, yoyo: true, ease: 'power2.inOut'})


        })

    }
}