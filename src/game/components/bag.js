import {BlurFilter, Container, Sprite, Texture} from "pixi.js";
import {WIDTH} from "../../constants/constants.js";
import {app, resizer} from "../../main.js";
import {SIGNALS} from "../signals/signals.js";
import {effect} from "@preact/signals-core";
import {gsap} from "gsap";
import {sender} from "../../sender/event-sender.js";

export class Bag extends Container{
    constructor(stage){
        super();

        this.stage = stage;

        this.spriteTween = null;

        this.sprite = new Sprite(Texture.from('bag'));
        this.sprite.anchor.set(0.5);
        this.addChild(this.sprite);

        this.shadow = new Sprite({
            texture: Texture.WHITE,
            tint: 0x000000,
            alpha: 0.5,
            width: 38,
            height: 4,
            filters: [new BlurFilter(6)],
            y: 31
        });
        this.shadow.anchor.set(0.5);
        this.addChild(this.shadow);

        this.stage.addChild(this);
        this.y = 310;

        document.addEventListener('pointerdown', this.onUpdatePosX);
        document.addEventListener('pointermove', this.onUpdatePosX);

        sender.on('shitOnBag', this.onShitOnBag)

        effect(() => this.x = SIGNALS.bagX.value);


        this.score = SIGNALS.score.value

        effect(() => {
            if(SIGNALS.score.value > this.score) {
                this.spriteTween?.kill();
                this.y = 310;
                this.spriteTween = gsap.to(this, {y: 310 + 4, yoyo: true, repeat: 1, duration: 0.08});
            }
            this.score = SIGNALS.score.value
        })
    }

    onShitOnBag = (shit) => {
        const pos = this.toLocal(shit.position);
        this.addChild(shit);
        shit.stage = this;
        const x = Math.min(Math.max(Math.round(pos.x), -14), 14);
        shit.position.set(x, -7);

        gsap.to(shit.scale, {y: 1.4, duration: 1.2, onComplete: () => {
                gsap.to(shit, {alpha: 0, duration: 1.5, onComplete: () => {
                        this.removeChild(shit);
                        shit.destroy({children: true})
                    }})
            }})
    }

    onUpdatePosX = e => {
        document.setPointerCapture?.(e.pointerId);
        const rect = app.canvas.getBoundingClientRect();
        const x = (e.x - rect.x) / resizer.scale;
        SIGNALS.bagX.value = Math.min(Math.max(x, 16), WIDTH - 16);
    }
}