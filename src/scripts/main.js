// importation de l'instance de Game créée dans Game.js
import theGame from "./game.js";

// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le starship
const init = () => {
    const fleetsSaucers = document.getElementById("flotteSoucoupes");

    window.addEventListener("keydown", theGame.keyDownActionHandler.bind(theGame));
    window.addEventListener("keyup", theGame.keyUpActionHandler.bind(theGame));
    theGame.moveAndDraw()

    fleetsSaucers.addEventListener("click", () => {
        theGame.start(theGame);
        document.activeElement.blur();
    });
};

window.addEventListener("load", init);

//
console.log("le bundle a été généré");
