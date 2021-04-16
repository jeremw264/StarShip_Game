import Saucer from "./saucer";
import Shooter from "./shooter";
import StarShip from "./starship";

class Game {
    constructor() {
        this.canvas = document.getElementById("stars");
        this.starShip = new StarShip(50, 200); // Object StarShip
        this.saucers = []; // Array Object Saucer
        this.shoots = [];
        this.score = 0;
        this.animationRequest = null;
        this.fleetsSaucers = 0;
        this.autoFleets = null;
    }

    set Score(score) {
        this.score = score;
        document.getElementById("score").innerHTML = this.score;
    }

    get Score() {
        return this.score;
    }

    moveAndDraw() {
        var context = this.canvas.getContext("2d");

        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.saucers) {
            let temp = this.saucers;
            this.saucers = this.saucers.filter((saucer) => saucer.x > 0);
            this.Score = this.Score - (temp.length - this.saucers.length) * 1000;
        }

        if (this.shoots.length > 0) {
            this.shoots.forEach((shoot) => {
                if (shoot.collisionWithSaucer(this.saucers) || shoot.x > this.canvas.width) {
                    if (!(shoot.x > this.canvas.width)) {
                        this.Score += 200;
                    }
                    this.shoots = this.shoots.filter((elt) => elt != shoot);
                }
            });
        }

        // Déplacement et affichage

        // Tir
        if (this.shoots) {
            this.shoots.forEach((shoot) => {
                shoot.move(this.canvas);
                shoot.draw(context);
            });
        }

        // Soucoupes
        if (this.saucers.length > 0) {
            this.saucers.forEach((saucer) => {
                saucer.move(this.canvas);
                saucer.draw(context);
            });
        }

        // StarShip
        this.starShip.move(this.canvas);
        this.starShip.draw(context);

        this.animationRequest = window.requestAnimationFrame(() => this.moveAndDraw());
    }

    addSaucer() {
        let y = this.alea(this.canvas.height - 36);
        this.saucers.push(new Saucer(this.canvas.width, y));
    }

    addShoot() {
        this.shoots.push(new Shooter(this.starShip));
    }

    alea(n) {
        return Math.floor(Math.random(n) * n);
    }

    startAndStopsaucerFleets() {
        if (this.fleetsSaucers === 0) {
            this.fleetsSaucers = 1;
            this.autoFleets = window.setInterval(() => this.addSaucer(), 750);
        } else if (this.fleetsSaucers === 1) {
            this.fleetsSaucers = 0;
            window.clearInterval(this.autoFleets);
        }
    }

    keyDownActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
                this.starShip.moveUp();
                break;
            case "ArrowDown":
                this.starShip.moveDown();
                break;
            case " ":
                this.addShoot();
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "ArrowDown":
                this.starShip.stopMoving();
                break;
            default:
                return;
        }
        event.preventDefault();
    }
}

// crée et exporte l'instance unique de Game
const theGame = new Game();
export default theGame;
