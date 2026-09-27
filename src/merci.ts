import './style.css'

const spanMontant = document.getElementById("resume-montant");
const spanType = document.getElementById("resume-type");

if (spanMontant) spanMontant.textContent = sessionStorage.getItem("resumeMontant") || "—";
if (spanType) spanType.textContent = sessionStorage.getItem("resumeType") || "—";