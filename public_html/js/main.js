const bereichKonzept = new Aufgabenbereich(1, "Konzeption", "Erstellung von Diagrammen");
const bereichFrontend = new Aufgabenbereich(2, "Frontend", "HTML und CSS Umsetzung");

const artefaktDiagramm = new Artefakt(10, "Artefaktdiagramm", "Das UML-Diagramm der Klassen", bereichKonzept, 4);
const artefaktHtml = new Artefakt(11, "index.html", "Die Startseite der App", bereichFrontend, 6);
const artefaktCss = new Artefakt(12, "style.css", "Das globale Stylesheet", bereichFrontend, 8);

const projekt1 = new Projekt(
    101, 
    "Brunsmann Projekt", 
    "Freiwillige Präsentation zur Teamarbeit.", 
    "img/brunsmann.png", 
    new Date("2026-05-01")
);

const projekt2 = new Projekt(
    102, 
    "Programmieren", 
    "Blondies kleines Programmiertagebuch.", 
    "img/diary.png", 
    new Date("2026-04-15")
);

const projekt3 = new Projekt(
    103, 
    "Webentwicklung", 
    "Entwicklung einer modernen Webanwendung mit JS.", 
    "img/web.png", 
    new Date("2026-06-01")
);

const alleProjekte = [projekt1, projekt2, projekt3];

console.log("Proflix App erfolgreich geladen! Projekte geladen:", alleProjekte);

