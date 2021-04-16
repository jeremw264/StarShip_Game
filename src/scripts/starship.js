import imgStarShip from "../assets/images/vaisseau-ballon-petit.png";
import Mobile from "./mobile";
import MoveState from "./moveState";

export default class StarShip extends Mobile {
    constructor(x, y) {
        super(x, y, 0, 8, imgStarShip);
        this.moving = MoveState.state['NONE'];
    }

    get up() {
        return MoveState.state["UP"] === this.moving;
    }

    get down() {
        return MoveState.state["DOWN"] === this.moving;
    }

    moveUp() {
        this.moving = MoveState.state["UP"];
    }

    moveDown() {
        this.moving = MoveState.state["DOWN"];
    }

    stopMoving() {
        this.moving = MoveState.state["NONE"];
    }

    move(canvas) {
        if (this.y - this.deltaY > 0 && this.y + this.deltaY < canvas.height - this.image.height) {
            super.move(canvas);
        } else if (this.y > 0 && this.y + this.deltaY < canvas.height - this.image.height && this.down) {
            super.move(canvas);
        } else if (this.y - this.deltaY > 0 && this.y < canvas.height - this.image.height && this.up) {
            super.move(canvas);
        }
    }
}
