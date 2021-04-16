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
        this.lifes = 3
        this.animationRequest = null;
        this.fleetsSaucers = 0;
        this.autoFleets = null;
    }

    set Score(score) {
        this.score = score;
    }

    get Score() {
        return this.score;
    }

    set Lifes(lifes){
        this.lifes = lifes
    }

    get Lifes(){
        return this.lifes
    }

    moveAndDraw() {
        var context = this.canvas.getContext("2d");

        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        context.font = '18px roboto';
        context.fillStyle = '#FFFFFF'
        context.fillText(`Score: ${this.Score}`,this.canvas.width-125,25)
        context.fillText(`Vies: ${this.Lifes}`,this.canvas.width-125,50)

        if (this.saucers) {
            let temp = this.saucers;
            this.saucers = this.saucers.filter((saucer) => saucer.x > 0);
            this.Score = this.Score - (temp.length - this.saucers.length) * 1000;
            if (temp.length != this.saucers.length) {
                this.Lifes -= 1
            }
            
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

        if (this.Lifes < 1) {
            this.reset()
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
            document.getElementById('flotteSoucoupes').innerHTML = 'Stop'
        } else if (this.fleetsSaucers === 1) {
            this.fleetsSaucers = 0;
            window.clearInterval(this.autoFleets);
            document.getElementById('flotteSoucoupes').innerHTML = 'Play'
        }
    }

    reset(){
        this.fleetsSaucers = 1
        this.startAndStopsaucerFleets()
        this.Score=0
        this.Lifes = 3
        this.saucers = []
        this.shoots = []
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
