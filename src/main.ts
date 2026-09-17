import './style.css'



//message d'erreurs
interface messageErreur {
    vide?: string;
    pattern?: string;
    type?: string;
}
interface erreursJSON {
    [fieldName: string]: messageErreur;
}
let messagesJSON: erreursJSON;

async function chargerMessages() {
    const reponse = await fetch('/objJSONMessages.json');
    messagesJSON = await reponse.json();
}

chargerMessages().then(() => {
    initialiser();
});


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



    //afficherResumeDuDon
    document.getElementById("soumettre3")?.addEventListener("click", (evenement) => {
        evenement.preventDefault();
        if (validerEtape(3)) {
            afficherResume();
            naviguerEtape(4);
        }
    });



    // Reinitialiser le formulaire au complet
    document.getElementById("retour4")?.addEventListener("click", () => {
        const monFormulaire = document.querySelector("form") as HTMLFormElement;
        monFormulaire.reset();

        const spanMontant = document.getElementById("resume-montant");
        const spanType = document.getElementById("resume-type");
        if (spanMontant) spanMontant.textContent = "—";
        if (spanType) spanType.textContent = "—";

        naviguerEtape(1);
    });



    //Changer de pages en pages 
    document.getElementById("continuer1")?.addEventListener("click", () => {
    if (validerEtape(1)) {
        naviguerEtape(2);
    }
});

    document.getElementById("retour2")?.addEventListener("click", () => {
        naviguerEtape(1);
    });
    document.getElementById("continuer2")?.addEventListener("click", () => {
        if (validerEtape(2)) {
            naviguerEtape(3);
        }
    });

    document.getElementById("retour3")?.addEventListener("click", () => {
        naviguerEtape(2);
    });


}






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

    //Animer la barre de progression 
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







function validerChamp(champ: HTMLInputElement): boolean {
    let valide = false;
    const id = champ.id;
    const idMessageErreur = "erreur-" + id;
    const erreurElement = document.getElementById(idMessageErreur) as HTMLSpanElement;
    const icone = document.getElementById("icone-erreur-" + id);

    if (champ.validity.valueMissing && messagesJSON[id]?.vide) {
        valide = false;
        champ.setAttribute("aria-invalid", "true");
        if (erreurElement) erreurElement.textContent = messagesJSON[id].vide!;
        icone?.classList.remove("hidden");
    }
    else if (champ.validity.typeMismatch && messagesJSON[id]?.type) {
        valide = false;
        champ.setAttribute("aria-invalid", "true");
        if (erreurElement) erreurElement.textContent = messagesJSON[id].type!;
        icone?.classList.remove("hidden");
    }
    else if (champ.validity.patternMismatch && messagesJSON[id]?.pattern) {
        valide = false;
        champ.setAttribute("aria-invalid", "true");
        if (erreurElement) erreurElement.textContent = messagesJSON[id].pattern!;
        icone?.classList.remove("hidden");
    }
    else {
        valide = true;
        champ.setAttribute("aria-invalid", "false");
        if (erreurElement) erreurElement.textContent = "";
        icone?.classList.add("hidden");
    }

    return valide;
}




// Validation première page 1

function validerGroupeRadio(nomGroupe: string, idErreur: string): boolean {
    const radioCoche = document.querySelector(`input[name="${nomGroupe}"]:checked`);
    const erreurElement = document.getElementById(idErreur);
    const icone = document.getElementById("icone-erreur-" + nomGroupe);

    if (!radioCoche) {
        if (erreurElement) erreurElement.textContent = messagesJSON[nomGroupe]?.vide || "Veuillez faire un choix.";
        icone?.classList.remove("hidden");
        return false;
    } else {
        if (erreurElement) erreurElement.textContent = "";
        icone?.classList.add("hidden");
        return true;
    }
}

//Valider montant entré page 1
function validerMontant(): boolean {
    const montantCoche = document.querySelector('input[name="montant"]:checked');
    const autreMontant = document.getElementById("autre-montant-valeur") as HTMLInputElement;
    const erreurElement = document.getElementById("erreur-montant");
    const icone = document.getElementById("icone-erreur-montant");

    const autreMontantRempli = autreMontant && autreMontant.value.trim() !== "";

    if (!montantCoche && !autreMontantRempli) {
        if (erreurElement) erreurElement.textContent = messagesJSON["montant"]?.vide || "Veuillez sélectionner un montant.";
        icone?.classList.remove("hidden");
        return false;
    } else {
        if (erreurElement) erreurElement.textContent = "";
        icone?.classList.add("hidden");
        return true;
    }
}




// Valider page 2

function validerEtape(etape: number): boolean {
    let etapeValide = true;


    if (etape === 1) {
        const typeDonValide = validerGroupeRadio("type-don", "erreur-type-don");
        const montantValide = validerMontant();
        etapeValide = typeDonValide && montantValide;
    }

    else if (etape === 2) {
        const nomElement = document.getElementById('nom-complet') as HTMLInputElement;
        const prenomElement = document.getElementById('prenom-complet') as HTMLInputElement;
        const adresseElement = document.getElementById('adresse') as HTMLInputElement;
        const courrielElement = document.getElementById('courriel') as HTMLInputElement;
        const telephoneElement = document.getElementById('telephone') as HTMLInputElement;

        const nomValide = validerChamp(nomElement);
        const prenomValide = validerChamp(prenomElement);
        const adresseValide = validerChamp(adresseElement);
        const courrielValide = validerChamp(courrielElement);
        const telephoneValide = validerChamp(telephoneElement);

        etapeValide = nomValide && prenomValide && adresseValide && courrielValide && telephoneValide;
    }

    else if (etape === 3) {

        const nomcarteElement = document.getElementById('nom-carte') as HTMLInputElement;
        const numerocarteElement = document.getElementById('numero-carte') as HTMLInputElement;
        const cvcElement = document.getElementById('cvc') as HTMLInputElement;


        const nomcarteValide = validerChamp(nomcarteElement);
        const numerocarteValide = validerChamp(numerocarteElement);
        const cvcValide = validerChamp(cvcElement);


        etapeValide = nomcarteValide && numerocarteValide && cvcValide;
    }

    return etapeValide;
}