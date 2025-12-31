import {Text} from "pixi.js";
import {effect} from "@preact/signals-core";
import {SIGNALS} from "../signals/signals.js";

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


        effect(() => {
            this.scoreTextDynamic.text = SIGNALS.score
        })
        effect(() => {
            this.livesTextDynamic.text = SIGNALS.lives
        })

    }

    setLives(lives){
        this.livesTextDynamic.text = lives;
    }
    setScore(score){
        this.scoreTextDynamic.text = score;
    }
}