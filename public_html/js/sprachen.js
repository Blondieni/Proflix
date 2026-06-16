// Map in der wir alle Sprachen sammeln
const alleSprachen = new Map();

// Map für die deutsche Sprache
const woerterbuchDeutsch = new Map();
woerterbuchDeutsch.set("projekt", "Projekt");
woerterbuchDeutsch.set("menue", "Menü");
woerterbuchDeutsch.set("kurzbeschreibung", "Kurzbeschreibung");
woerterbuchDeutsch.set("startdatum", "Startdatum");

// Deutsche Sprache in die Map aller Sprachen einfügen
alleSprachen.set("de", woerterbuchDeutsch);

// Map für die englische Sprache
const woerterbuchEnglisch = new Map();
woerterbuchEnglisch.set("projekt", "Project");
woerterbuchEnglisch.set("menue", "Menu");
woerterbuchEnglisch.set("kurzbeschreibung", "Short Description");
woerterbuchEnglisch.set("startdatum", "Start Date");

// Englische Sprache in die Map aller Sprachen einfügen
alleSprachen.set("en", woerterbuchEnglisch);

//---

// Steuerung der Sprachen

let aktuelleSprache = "de"; 

function setzeSprache(neueSprache) {
    // Prüfe, ob die neue Sprache in der Map aller Sprachen exestiert
    if (alleSprachen.has(neueSprache)) {
        // neue Sprachen setzen
        aktuelleSprache = neueSprache;
    }
}

function übersetze(schluessel) {
    // Hole Wörterbuch der aktuellenSprache
    let aktivesWoerterbuch = alleSprachen.get(aktuelleSprache);
    
    // Übersetze das Wort aus dem aktiven Wörterbuch
    return aktivesWoerterbuch.get(schluessel);
}