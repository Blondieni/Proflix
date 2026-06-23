//Same-Origin-Policy (SOP) und CORS-Fehlern (Folie 63 & 64) kein Header



// Globale Speicher für die Klassenobjekte
let serverProjekte = [];
let serverAufgabenbereiche = [];
let serverArtefakte = [];

// Globale Speicher für Verknüpfungsklassen
let serverProjektAufgabenbereiche = []; 
let serverProjektArtefakte = [];

// ---
// AUFGABEN 1-3: Datenabruf, Objekte und Verknüpfungen (GET)
// ---
function ladeDatenVomServer() {
    console.log("Starte Datenabruf, Objekt erstellung und Verknüpfung");

    // 1. Projektdaten abrufen
    fetch("json/projects.json")
        .then(function(response) { return response.json(); })
        .then(function(projectsRohdaten) {
            console.log("Projekte Rohdaten geladen:", projectsRohdaten);
            for (let i = 0; i < projectsRohdaten.length; i++) {
                let roh = projectsRohdaten[i];
                let neuesProjekt = new Projekt(roh.id, roh.name, roh.shortdesc, roh.logourl, new Date(roh.start));
                serverProjekte.push(neuesProjekt);
            }
            
            // 2. Aufgabenbereiche abrufen
            return fetch("json/tasks.json");
        })
        .then(function(response) { return response.json(); })
        .then(function(tasksRohdaten) {
            console.log("Aufgabenbereiche Rohdaten geladen:", tasksRohdaten);
            for (let i = 0; i < tasksRohdaten.length; i++) {
                let roh = tasksRohdaten[i];
                let neuerBereich = new Aufgabenbereich(roh.id, roh.name, roh.shortdesc);
                serverAufgabenbereiche.push(neuerBereich);

                // Verknüpfung von Projekt und Aufgabenbereich
                // Projekt_Aufgabenbereich Objekt erstellen
                let verknuepfung = new Projekt_Aufgabenbereich(roh.project, roh.id);
                serverProjektAufgabenbereiche.push(verknuepfung);
            }
            
            // 3. Artefaktdaten abrufen
            return fetch("json/artefacts.json");
        })
        .then(function(response) { return response.json(); })
        .then(function(artefactsRohdaten) {
            console.log("Artefakte Rohdaten geladen:", artefactsRohdaten);
            for (let i = 0; i < artefactsRohdaten.length; i++) {
                let roh = artefactsRohdaten[i];
                
                // Aufgabenbereich suchen
                let passenderBereich = serverAufgabenbereiche.find(b => b._id === roh.taskid);

                // Geplante Zeit umrechnen
                let stundenNum = 0;
                if (roh.planedtime) {
                    // HH:MM
                    let teile = roh.planedtime.split(":");
                    stundenNum = parseInt(teile[0]) + (parseInt(teile[1]) / 60);
                }

                // Artefakt erstellen
                let neuesArtefakt = new Artefakt(roh.id, roh.name, roh.shortdesc, passenderBereich, stundenNum);
                serverArtefakte.push(neuesArtefakt);

                // Projekte und Artefakte verknüpfen
                // a) Projekt-ID über Projekt_Aufgabenbereich finden nachsehen
                let projektId = null;
                let paVerknuepfung = serverProjektAufgabenbereiche.find(pa => pa._aufgabenbereichID === roh.taskid);
                if (paVerknuepfung) {
                    projektId = paVerknuepfung._projektId;
                }

                // b) Tatsächliche Zeit aus der json umrechnen (für Projekt_Artefakt)
                let realStundenNum = 0;
                if (roh.realtime) {
                    // HH:MM
                    let realTeile = roh.realtime.split(":");
                    realStundenNum = parseInt(realTeile[0]) + (parseInt(realTeile[1]) / 60);
                }

                // c) Projekt_Artefakt erstellen und speichern
                if (projektId !== null) {
                    let projektArtefaktLink = new Projekt_Artefakt(projektId, roh.id, realStundenNum);
                    serverProjektArtefakte.push(projektArtefaktLink);
                }
            }
            
            console.log("Erstellte Projekt-Aufgabenbereich Verknüpfungen:", serverProjektAufgabenbereiche);
            console.log("Erstellte Projekt-Artefakt Verknüpfungen:", serverProjektArtefakte);
            console.log("Abgeschlossen: Aufgaben 1, 2 und 3 erfolgreich");
            
            
            // Test ob berechneProjektlaufzeit noch funktioniert
            if(serverProjekte.length > 0) {
                let testLaufzeit = serverProjekte[0].berechneProjektlaufzeit(serverArtefakte, serverProjektArtefakte);
                console.log("TEST Laufzeit für Projekt 1 ('" + serverProjekte[0]._titel + "'): " + testLaufzeit + " Stunden");
            }
        })
        .catch(function(err) {
            console.error("Fehler beim Laden der Daten:", err);
        });
}

// ---
// AUFGABE 4 (CORS API) (POST)
// ---
function sendeDatenAnServer(datenBundle) {
    // Test nach Vorgabe (404)
    const apiURL = "https://scl.fh-bielefeld.de/WBA/projectsAPI"; 
    
    // Test für (200-ok)
    //const apiURL = "json/projects.json";
    //const apiURL = "https://scl.fh-bielefeld.de/WBA/projects.json"; 

    const konfiguration = {
        method: 'POST',
        mode: 'cors',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(datenBundle) // Komplettes Bundle (Projekt, Bereich, Artefakt) senden
    };

    fetch(apiURL, konfiguration)
        .then(function(response) {
            if (response.ok) {
                console.log("Erfolg: API hat die Daten akzeptiert!");
                entferneDatenAusLocalStorage(); // Aufgabe 6: Im Erfolgsfall löschen
                return response.json();
            } else {
                // Bei 404 oder Serverfehlern wird ein Error geworfenern
                throw new Error("Server lieferte Status: " + response.status);
            }
        })
        .then(function(daten) {
            console.log("Erfolgreich vom Server verarbeitet:", daten);
        })
        .catch(function(fehler) {
            console.log("API-Aufruf fehlgeschlagen: " + fehler.message);
            // Aufgabe 5: Im Fehlerfall sicher offline im LocalStorage parken
            speichereImLocalStorage(datenBundle);
        });
}

// ==========================================
// AUFGABE 5-6: Localstorage
// ==========================================
function speichereImLocalStorage(datenBundle) {
    let lokaleDatenRaw = localStorage.getItem("wartendeDaten");
    
    // Wenn schon Daten da sind, auslesen, ansonsten leeres Array erstellen
    let datenListe = lokaleDatenRaw ? JSON.parse(lokaleDatenRaw) : [];
    
    // Daten in die Liste packen
    datenListe.push(datenBundle);
    
    // Wieder im LocalStorage speichern
    localStorage.setItem("wartendeDaten", JSON.stringify(datenListe));
    
    console.log("Aufgabe 5: Projekt, Aufgabenbereich und Artefakt offline geparkt.");
    console.log("Aktuell wartende Pakete im Speicher: " + datenListe.length);
}

// Prüfen beim Neuladen, ob noch ungesendete alte Daten vorhanden (Aufgabe 5)
function pruefeUndSendeWartendeDaten() {
    let lokaleDatenRaw = localStorage.getItem("wartendeDaten");
    if (lokaleDatenRaw) {
        let datenListe = JSON.parse(lokaleDatenRaw);
        if (datenListe.length > 0) {
            console.log("Aufgabe 5: Wiederholungsversuch für wartende Daten gestartet");
            sendeDatenAnServer(datenListe[0]);
        }
    }
}

// Entfernt das erfolgreich übertragene Paket aus dem Localstorage (Aufgabe 6)
function entferneDatenAusLocalStorage() {
    let lokaleDatenRaw = localStorage.getItem("wartendeDaten");
    if (lokaleDatenRaw) {
        let datenListe = JSON.parse(lokaleDatenRaw);
        if (datenListe.length > 0) {
            let entfernt = datenListe.shift(); // Das älteste/erste Element löschen
            console.log("Aufgabe 6: '" + entfernt.projekt.titel + "' erfolgreich übertragen. Wird aus LocalStorage entfernt.");
            
            if (datenListe.length === 0) {
                localStorage.removeItem("wartendeDaten");
            } else {
                localStorage.setItem("wartendeDaten", JSON.stringify(datenListe));
            }
        }
    }
}

// ---
// Intialisierung (DOM)
// ---
window.addEventListener("DOMContentLoaded", function() {
    // 1. Serverdaten per GET laden & mappen
    ladeDatenVomServer();
    
    // Prüfen, ob wir einen Backlog haben
    let lokaleDatenRaw = localStorage.getItem("wartendeDaten");
    let datenListe = lokaleDatenRaw ? JSON.parse(lokaleDatenRaw) : [];

    if (datenListe.length > 0) {
        // a: Es gibt wartende Daten -> Wiederholungsversuch (Aufgabe 5)
        pruefeUndSendeWartendeDaten();
    } else {
        // b: Speicher ist leer -> Erzeuge neues Bundle zum Senden (Aufgabe 4)
        console.log("Erzeuge neues Test-Bundle zum Senden...");
        let testDatenBundle = {
            projekt: { id: 999, titel: "Neues WBA Projekt", kurzbeschreibung: "Ein Testprojekt" },
            aufgabenbereich: { id: 888, titel: "Konzeption", kurzbeschreibung: "Diagrammerstellung" },
            artefakt: { id: 777, titel: "UI Entwurf", geplanteZeit: 4 }
        };
        sendeDatenAnServer(testDatenBundle);
    }
});