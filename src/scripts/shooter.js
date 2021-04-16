import Mobile from "./mobile";
import srcShooter from "../assets/images/tir.png";

export default class Shooter extends Mobile {
    constructor(starShip) {
        super(starShip.x, starShip.y + Mobile.OBJECT_WIDTH / 10, 8, 0, srcShooter);
    }

    move(box) {
        if (this.x < box.width) {
            this.x += this.deltaX;
        }
        super.move(box);
    }

    collisionWith(mobile) {
        let collisionState = false;

        let P1 = [Math.max(this.x, mobile.x), Math.max(this.y, mobile.y)];
        let P2 = [
            Math.min(this.x + this.image.width, mobile.x + mobile.image.width),
            Math.min(this.y + this.image.height, mobile.y + mobile.image.height),
        ];

        if (P1[0] < P2[0] && P1[1] < P2[1]) {
            collisionState = true;
        }

        if (mobile.deltaX === 0) {
            collisionState = false;
        }
        return collisionState;
    }

    collisionWithSaucer(saucers) {
        let collisionState = false;

        saucers.forEach((saucer) => {
            if (this.collisionWith(saucer)) {
                saucer.deltaX = 0;
                saucer.deltaY = -3;
                collisionState = true;
            }
        });

        return collisionState;
    }
}
