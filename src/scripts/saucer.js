import Mobile from "./mobile";

export default class Saucer extends Mobile {
    constructor(x, y) {
        super(x, y, -3, 0, "./images/flyingSaucer-petit.png");
    }

    move(canvas) {
        if (this.x > 0) {
            this.x += this.deltaX;
        }
        super.move(canvas);
    }
}
