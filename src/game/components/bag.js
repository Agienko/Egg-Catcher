import {Sprite, Texture} from "pixi.js";
import {WIDTH} from "../../constants/constants.js";
import {app, resizer} from "../../main.js";
import {SIGNALS} from "../signals/signals.js";
import {effect} from "@preact/signals-core";

export class Bag extends Sprite{
    constructor(stage){
        super(Texture.from('bag'));
        this.anchor.set(0.5);
        stage.addChild(this);
        this.y = 310;

        app.canvas.addEventListener('pointerdown', this.onUpdatePosX);
        app.canvas.addEventListener('pointermove', this.onUpdatePosX);

        effect(() => this.x = SIGNALS.bagX.value);
    }

    onUpdatePosX = e => {
        const rect = app.canvas.getBoundingClientRect();
        const x = (e.x - rect.x) / resizer.scale;
        SIGNALS.bagX.value = Math.min(Math.max(x, 16), WIDTH - 16);
    }
}