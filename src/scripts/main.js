// importation de l'instance de Game créée dans Game.js
import theGame from "./game.js";
import Mobile from "./mobile.js";
import Shooter from "./shooter.js";
import StarShip from "./starship.js";


// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le starship
const init = () => {

    const fleetsSaucers = document.getElementById("flotteSoucoupes");
    theGame.moveAndDraw();

    window.addEventListener("keydown", theGame.keyDownActionHandler.bind(theGame));
    window.addEventListener("keyup", theGame.keyUpActionHandler.bind(theGame));

    fleetsSaucers.addEventListener("click", () => {
        theGame.startAndStopsaucerFleets(theGame);
        document.activeElement.blur();
    });
};

window.addEventListener("load", init);

//
console.log("le bundle a été généré");
