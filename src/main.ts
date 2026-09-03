import './style.css'
function initialiser() {

    console.log("initialiser()");

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