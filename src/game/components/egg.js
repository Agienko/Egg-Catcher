import {Sprite, Texture, Ticker} from "pixi.js";
import {WIDTH} from "../../constants/constants.js";
import {gsap} from "gsap";
import {SIGNALS} from "../signals/signals.js";
import {randomMinMax} from "../../helpers/helper.js";
import {sound} from "@pixi/sound";
import {sender} from "../../sender/event-sender.js";

export class Egg extends Sprite{
    constructor(stage, descriptor) {
        super(descriptor);

        this.stage = stage;
        this.tween = null;

        this.type = 'egg';

        this.eventMode = 'none';

        this.isShit = descriptor.isShit;
        this.hasBonus = descriptor.hasBonus;

        const score = Math.max(SIGNALS.score.value, 8);

        this.speed = Math.max(this.isShit ? 1.2 : 1.1, Math.log10(score/8))*1.5;
        this.acc = 0.005 + +this.hasBonus * 0.001 + (this.isShit ? 0.002 : 0);

        this.anchor.set(0.5);

        if(this.isShit){
            stage.addChild(this);
            sound.play('catch', {volume: 0.01, speed: 0.4});
        } else {
            stage.addChildAt(this, 2);
            sound.play('catch', {volume: 0.015, speed: 0.5});
        }

        Ticker.shared.add(this.tick);

    }

    tick = t => {
        if (SIGNALS.lives.value < 0) return this.destroy();

        this.speed += this.acc;
        this.y += this.speed * t.deltaMS/10;

        if (this.fallInBagTest()) {
            this.fallInBag();
        } else if (this.fallGroundTest()) {
            this.fallOnGround();
        }
    }
    fallInBag(){
        if(this.isShit) {
            Ticker.shared.remove(this.tick);
            this.type = '';
            sender.send('shitOnBag', this)
            --SIGNALS.score.value;
            sound.play('crash', {volume: 0.02, speed: 0.5, end: 0.1});
        } else {
            this.destroy();
            ++SIGNALS.score.value;
            sound.play('catch', {volume: 0.02, speed: 1.2});

            if(this.hasBonus) {
                ++SIGNALS.lives.value;
                sound.play('life', {volume: 0.012});
            }
        }

    }

    fallInBagTest(){
        return this.y > 300 && this.y < 310 && Math.abs(this.x - SIGNALS.bagX.value) <= 20;
    }

    fallOnGround(){
        this.type = '';
        Ticker.shared.remove(this.tick);
        this.y = WIDTH - 60;

        const rnd = randomMinMax(-5, 5);

        this.angle = -rnd;
        this.x += rnd;

        this.texture = Texture.from(this.isShit ? 'crashed_shit' : 'crashed_egg' );

        this.tween = gsap.to(this, {alpha: 0, duration: 1.5, delay: 0.5, onComplete: () => this.destroy()})
        sound.play('crash', {volume: 0.05, speed: this.isShit ? 2 : 1.5});
        if(!this.isShit) --SIGNALS.lives.value;
    }

    fallGroundTest(){
        return this.y >= WIDTH - 60;
    }

    destroy(options) {
        this.tween?.kill();
        this.tween = null;
        Ticker.shared.remove(this.tick);
        this.stage.removeChild(this);
        this.stage = null;
        super.destroy(options);
    }
}