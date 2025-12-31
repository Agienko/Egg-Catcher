import {Container, Sprite, Texture} from "pixi.js";

export class World extends Container{
    constructor(stage) {
        super();
        stage.addChild(this);
        for(let i = 0; i < 12; i++){

            for(let j = 0; j < 11; j++){
                const bg = new Sprite({texture: Texture.from('sky')})
                bg.texture.source.scaleMode = 'nearest';
                bg.position.set(i * 32, j * 32)
                this.addChild(bg)
            }

            const underground = new Sprite({texture: Texture.from('underground')})
            underground.texture.source.scaleMode = 'nearest';
            underground.position.set(i * 32, 32*11)
            this.addChild(underground)

            const textureName = i === 0 || i === 11 ? 'ground_tree' : 'ground';
            const ground = new Sprite({texture: Texture.from(textureName)});
            ground.texture.source.scaleMode = 'nearest';
            ground.position.set(i * 32, 32*10)
            this.addChild(ground);

            this.eventMode = 'none';
            this.interactiveChildren = false;

        }

        for (let i = 2; i < 10; i++) {
            {
                const textureName = i === 2 ? 'tree_top_left' : 'tree';
                const tree = new Sprite({texture: Texture.from(textureName)})
                tree.position.set(0, 32*i)
                this.addChild(tree);
            }
            {
                const textureName = i === 2 ? 'tree_top_right' : 'tree';
                const tree = new Sprite({texture: Texture.from(textureName)})
                tree.position.set(32*11, 32*i)
                this.addChild(tree)
            }

        }
        for (let i = 1; i < 11; i++) {
            const rope = new Sprite({texture: Texture.from('rope')})
            rope.position.set(32*i, 32*2)
            this.addChild(rope)
        }

        this.eventMode = 'none';
        this.interactiveChildren = false;
        this.cacheAsTexture(true)
    }
}