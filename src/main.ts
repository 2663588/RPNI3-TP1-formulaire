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

    //Affichage de autre montant et 4 choix des montants bien
    document.getElementById("autre-montant-valeur")?.addEventListener("focus", () => {
        document.querySelectorAll('input[name="montant"]').forEach((radio) => {
            (radio as HTMLInputElement).checked = false;
        });
    });
    document.querySelectorAll('input[name="montant"]').forEach((radio) => {
        radio.addEventListener("change", () => {
            const autreMontant = document.getElementById("autre-montant-valeur") as HTMLInputElement;
            if (autreMontant) autreMontant.value = "";
        });
    });



    //afficherResume
    document.getElementById("soumettre3")?.addEventListener("click", (evenement) => {
        evenement.preventDefault();
        afficherResume();
        naviguerEtape(4);
    });

}
initialiser();





function naviguerEtape(nouvelleEtape: number) {

    //Barre de progression !
    document.querySelectorAll("[data-cible-etape]").forEach((bouton) => {
        const cible = Number(bouton.getAttribute("data-cible-etape"));
        if (cible === nouvelleEtape) {
            bouton.parentElement?.classList.add("font-bold");
        } else {
            bouton.parentElement?.classList.remove("font-bold");
        }
    });


    // allez de pages en pages avec bouton retour, continuer, etc.
    document.querySelectorAll("[data-etape]").forEach((element) => {
        const numeroEtape = Number(element.getAttribute("data-etape"));
        if (numeroEtape === nouvelleEtape) {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
    });

    document.getElementById("continuer1")?.addEventListener("click", () => {
        naviguerEtape(2);
    });

    document.getElementById("retour2")?.addEventListener("click", () => {
        naviguerEtape(1);
    });
    document.getElementById("continuer2")?.addEventListener("click", () => {
        naviguerEtape(3);
    });

    document.getElementById("retour3")?.addEventListener("click", () => {
        naviguerEtape(2);
    });

    const barre = document.getElementById("barre-progression");
    if (barre) {
        barre.style.width = (nouvelleEtape / 4 * 100) + "%";

    }





    
}

 //Faire le don et afficher le resumé page 4 !
function afficherResume() {
    const montantCoche = document.querySelector('input[name="montant"]:checked') as HTMLInputElement;
    const autreMontant = document.getElementById("autre-montant-valeur") as HTMLInputElement;

    let montantAffiche = "—";
    if (montantCoche) {
        montantAffiche = montantCoche.value + " $";
    } else if (autreMontant && autreMontant.value) {
        montantAffiche = autreMontant.value + " $";
    }

    const typeCoche = document.querySelector('input[name="type-don"]:checked') as HTMLInputElement;
    const typeAffiche = typeCoche ? (typeCoche.value === "unique" ? "Don unique" : "Don mensuel") : "—";

    const spanMontant = document.getElementById("resume-montant");
    const spanType = document.getElementById("resume-type");
    if (spanMontant) spanMontant.textContent = montantAffiche;
    if (spanType) spanType.textContent = typeAffiche;
}