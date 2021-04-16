import MoveState from "./moveState";

export default class Mobile {
    static OBJECT_WIDTH = 100;

    constructor(x, y, deltaX, deltaY, imgSrc) {
        this.x = x;
        this.y = y;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.image = this.createImage(imgSrc);
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y);
    }

    move(box) {
        if (this.moving === MoveState.state["DOWN"]) {
            this.y = this.y + this.deltaY;
        }
        if (this.moving === MoveState.state["UP"]) {
            this.y = this.y - this.deltaY;
        }
    }

    createImage(srcImage) {
        const image = new Image();
        image.src = srcImage;
        return image;
    }
}
