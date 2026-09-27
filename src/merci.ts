import './style.css'
// Reinitialiser le formulaire au complet
// Montrer résumé du don montant et type
const spanNom = document.getElementById("resume-nom");
const spanPrenom = document.getElementById("resume-prenom");
const spanCourriel = document.getElementById("resume-courriel");
const spanTelephone = document.getElementById("resume-telephone");
const spanMontant = document.getElementById("resume-montant");
const spanType = document.getElementById("resume-type");

if (spanNom) spanNom.textContent = sessionStorage.getItem("resumeNom") || "—";
if (spanPrenom) spanPrenom.textContent = sessionStorage.getItem("resumePrenom") || "—";
if (spanCourriel) spanCourriel.textContent = sessionStorage.getItem("resumeCourriel") || "—";
if (spanTelephone) spanTelephone.textContent = sessionStorage.getItem("resumeTelephone") || "—";
if (spanMontant) spanMontant.textContent = sessionStorage.getItem("resumeMontant") || "—";
if (spanType) spanType.textContent = sessionStorage.getItem("resumeType") || "—";