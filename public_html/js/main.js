/* Aus ihrer Vorlesung
 * var: automatisch globale Variable (auch in eingebundenen Skripten)
 * let: lokale Variable (Sichtbarkeit auf einen Block beschränkt)
 * const: nicht veränderbarer Wert (Sichtbarkeit wie bei let)
 */


// Aufgabenbereiche erstellen
const bereichKonzept = new Aufgabenbereich(1, "Konzeption", "Erstellung von Diagrammen");
const bereichFrontend = new Aufgabenbereich(2, "Frontend", "HTML und CSS Umsetzung");
//---


// >>Artefakte erstellen<<
// Art_Projekt_1 (Brunsmann)
const art1_1 = new Artefakt(10, "Artefaktdiagramm", "UML-Diagramm", bereichKonzept, 4);
const art1_2 = new Artefakt(11, "Team-Präsentation", "PowerPoint für die Vorstellung", bereichKonzept, 5);

// Art_Projekt_2 (Programmieren)
const art2_1 = new Artefakt(12, "Tagebuch-HTML", "Grundgerüst des Tagebuchs", bereichFrontend, 6);
const art2_2 = new Artefakt(13, "Tagebuch-CSS", "Styling des Tagebuchs", bereichFrontend, 4);

// art_Projekt_3 (Webentwicklung)
const art3_1 = new Artefakt(14, "Mockup-Entwurf", "Klickbarer Prototyp", bereichKonzept, 8);
const art3_2 = new Artefakt(15, "App-Logik", "Erste JavaScript-Funktionen", bereichFrontend, 12);

// Artefakte im einen Array sammeln
const alleArtefakte = [art1_1, art1_2, art2_1, art2_2, art3_1, art3_2];

//---



// >>Projekte erstellen<<
const projekt1 = new Projekt(101, "Brunsmann Projekt", "Freiwillige Präsentation zur Teamarbeit.", "logo_projekt.svg", new Date("2026-05-01"));
const projekt2 = new Projekt(102, "Programmieren", "Blondies kleines Programmiertagebuch.", "logo_projekt.svg", new Date("2026-04-15"));
const projekt3 = new Projekt(103, "Webentwicklung", "Entwicklung einer modernen Webanwendung.", "logo_projekt.svg", new Date("2026-06-01"));

// Projekte im einen Array sammeln
const alleProjekte = [projekt1, projekt2, projekt3];


// >>Verknüpfen über Verknüfungsklassen<<

// Projekt1 (101) mit Artefakt 10 und 11 verknüpfen (projektId, artefaktId, tatsaechlicheZeit)
const link_p1_art1 = new Projekt_Artefakt(101, 10, 3); // Geplant: 4 - Tatsächlich: 3
const link_p1_art2 = new Projekt_Artefakt(101, 11, 6); // Geplant: 5 - Tatsächlich: 6

// Projekt2 (102) mit Artefakt 12 und 13 verknüpfen
const link_p2_art1 = new Projekt_Artefakt(102, 12, 6); 
const link_p2_art2 = new Projekt_Artefakt(102, 13, 5);

// Projekt3 (103) mit Artefakt 12 und 13 verknüpfen
const link_p3_art1 = new Projekt_Artefakt(103, 14, 10);
const link_p3_art2 = new Projekt_Artefakt(103, 15, 15);

// Verknüpfungen in einen Array sammeln
const alleProjektArtefakte = [link_p1_art1, link_p1_art2, link_p2_art1, link_p2_art2, link_p3_art1, link_p3_art2];


// >>Konsolen Ausgabe (Aufgabe1)<<
console.log("Projekte:", alleProjekte);
console.log("Projekt_Artefakte:", alleProjektArtefakte);

// >>Konsolen Ausgabe (Aufgabe2)<<
console.log(">>Aufgabe2<<");

for (let projekt of alleProjekte) {
    // Parameter sind die Arrays
    let stunden = projekt.berechneProjektlaufzeit(alleArtefakte, alleProjektArtefakte);
    console.log("Das Projekt " + projekt._titel + " hat eine geplante Laufzeit von " + stunden + " Stunden.");
}

// >>Konsolen Ausgabe (Aufgabe3)<<
console.log(">>Aufgabe3<<");
console.log("Sortierung nach Datum:");
var sortiertDatum = ProjektSortierer.sortiereNachDatum(alleProjekte);

for (var p of sortiertDatum) {
    console.log(p._titel + " - Start: " + p._startDatum); 
}

console.log("Sortierung nach Laufzeit:");
var sortiertLaufzeit = ProjektSortierer.sortiereNachLaufzeit(alleProjekte, alleArtefakte, alleProjektArtefakte);

for (var p of sortiertLaufzeit) {
    var std = p.berechneProjektlaufzeit(alleArtefakte, alleProjektArtefakte);
    console.log(p._titel + " - Geplant: " + std + " Stunden");
}

// >>Konsolen Ausgabe (Aufgabe4 und Aufgabe5)<<
console.log(">>Aufgabe4 und Aufgabe5<<");

// Deutsch (Standart)
console.log("Aktuelle Sprache ist 'de':");
console.log("Übersetzung für 'projekt': " + übersetze("projekt"));
console.log("Übersetzung für 'menue': " + übersetze("menue"));
console.log("Übersetzung für 'kurzbeschreibung': " + übersetze("kurzbeschreibung"));
console.log("Übersetzung für 'startdatum': " + übersetze("startdatum"));

// Englisch
setzeSprache("en");
console.log("Aktuelle Sprache ist 'en':");
console.log("Übersetzung für 'projekt': " + übersetze("projekt"));
console.log("Übersetzung für 'menue': " + übersetze("menue"));
console.log("Übersetzung für 'kurzbeschreibung': " + übersetze("kurzbeschreibung"));
console.log("Übersetzung für 'startdatum': " + übersetze("startdatum"));

