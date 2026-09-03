import './style.css'
function initialiser() {

    console.log("initialiser()");
    naviguerEtape(1);


    document.querySelectorAll("[data-cible-etape]").forEach((bouton) => {

        bouton.addEventListener("click", () => {
            const cible = Number(bouton.getAttribute("data-cible-etape"));
            naviguerEtape(cible);

        });

    });

}

initialiser();

function naviguerEtape(nouvelleEtape: number) {

    document.querySelectorAll("[data-etape]").forEach((element) => {
        const numeroEtape = Number(element.getAttribute("data-etape"));
        if (numeroEtape === nouvelleEtape) {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
    });

}