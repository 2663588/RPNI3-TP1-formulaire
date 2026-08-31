interface messageErreur {
    vide?: string;
    pattern?: string;
    type?: string;
}
interface erreursJSON {
    [fieldName: string]: messageErreur;
}
let messagesJSON:erreursJSON;

function validerChamp(champ:HTMLInputElement): boolean {
    let valide = false;
    const id = champ.id; // email
    const idMessageErreur = "erreur-" + id; // erreur-email
    const erreurElement = document.getElementById(idMessageErreur) as HTMLDivElement;

    console.log('valider champ', champ.validity);

    // Vérifie chaque type d'erreur de validation
    if (champ.validity.valueMissing && messagesJSON[id].vide) {
        console.log('erreur', id);
        
        valide = false;
        erreurElement.innerText = messagesJSON[id].vide;
    } 
    else if (champ.validity.typeMismatch && messagesJSON[id].type) {
        // Type de données incorrect (email, url, tel, etc.)
        valide = false;
        erreurElement.innerText = messagesJSON[id].type;
    } 
    else if (champ.validity.patternMismatch && messagesJSON[id].pattern) {
        // Ne correspond pas au pattern regex défini
        valide = false;
        erreurElement.innerText = messagesJSON[id].pattern;
    }
    else {
        // La validation n'a pas d'erreur, donc on assigne la variable vraie
        valide = true;
    }

    return valide;
}

function validerEtape(etape: number): boolean {
    let etapeValide = false;

    switch(etape) {
        case 0:
            const nomElement = document.getElementById('nom') as HTMLInputElement;
            const prenomElement = document.getElementById('prenom') as HTMLInputElement;
            const emailElement = document.getElementById('email') as HTMLInputElement;
            const telephoneElement = document.getElementById('telephone') as HTMLInputElement;

            const nomValide  = validerChamp(nomElement);
            const prenomValide = validerChamp(prenomElement);
            const emailValide = validerChamp(emailElement);
            const telephoneValide = validerChamp(telephoneElement);

            if(!nomValide || !prenomValide || !emailValide || !telephoneValide) {
                etapeValide = false;
            }
            else{
                etapeValide = true;
            }

        break;
    }
    
    return etapeValide;
}