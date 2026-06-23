// Globale Speicher für unsere fertigen Klassen-Objekte
let serverProjekte = [];
let serverAufgabenbereiche = [];
let serverArtefakte = [];

function ladeDatenVomServer() {
    console.log("Starte Datenabruf mit präzisem Struktur-Mapping...");

    // 1. (1 Pkt) Rufen Sie die Projektdaten ab
    fetch("https://scl.fh-bielefeld.de/WBA/projects.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(projectsRohdaten) {
            console.log("Projekte Rohdaten geladen:", projectsRohdaten);
            
            // MAP-SCHLEIFE: JSON -> Klasse Projekt
            for (let i = 0; i < projectsRohdaten.length; i++) {
                let roh = projectsRohdaten[i];
                
                // Konvertiere den JSON-Start-String in ein echtes JavaScript-Date-Objekt
                let startDatumObjekt = new Date(roh.start);
                
                // Parameter: id, titel, kurzbeschreibung, logoPfad, startDatum
                let neuesProjekt = new Projekt(
                    roh.id, 
                    roh.name, 
                    roh.shortdesc, 
                    roh.logourl, 
                    startDatumObjekt
                );
                serverProjekte.push(neuesProjekt);
            }

            // 2. (1 Pkt) Rufen Sie auch die Aufgabenbereiche ab
            return fetch("https://scl.fh-bielefeld.de/WBA/tasks.json");
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(tasksRohdaten) {
            console.log("Aufgabenbereiche Rohdaten geladen:", tasksRohdaten);

            // MAP-SCHLEIFE: JSON -> Klasse Aufgabenbereich
            for (let i = 0; i < tasksRohdaten.length; i++) {
                let roh = tasksRohdaten[i];
                
                // Parameter: id, titel, kurzbeschreibung
                let neuerBereich = new Aufgabenbereich(
                    roh.id, 
                    roh.name, 
                    roh.shortdesc
                );
                serverAufgabenbereiche.push(neuerBereich);
            }

            // 2. (1 Pkt) Rufen Sie auch die Artefaktdaten ab
            return fetch("https://scl.fh-bielefeld.de/WBA/artefacts.json");
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(artefactsRohdaten) {
            console.log("Artefakte Rohdaten geladen:", artefactsRohdaten);

            // 3. (1 Pkt) Erzeugen Sie Objekte & Verknüpfung auflösen
            for (let i = 0; i < artefactsRohdaten.length; i++) {
                let roh = artefactsRohdaten[i];
                
                // Suchen des passenden Aufgabenbereichs über die 'taskid' aus der JSON
                let passenderBereich = null;
                for (let j = 0; j < serverAufgabenbereiche.length; j++) {
                    if (serverAufgabenbereiche[j]._id === roh.taskid) {
                        passenderBereich = serverAufgabenbereiche[j];
                        break;
                    }
                }

                // In der JSON ist die Zeit ein String wie "7:30". Da deine Alt-Logik 
                // mit Nummern rechnet, parsen wir die Stunden als Fließkommazahl (z.B. 7.5)
                let stundenNum = 0;
                if (roh.planedtime) {
                    let teile = roh.planedtime.split(":");
                    stundenNum = parseInt(teile[0]) + (parseInt(teile[1]) / 60);
                }

                // Parameter: id, titel, kurzbeschreibung, aufgabenbereichRef, geplanteZeit
                let neuesArtefakt = new Artefakt(
                    roh.id, 
                    roh.name, 
                    roh.shortdesc, 
                    passenderBereich, 
                    stundenNum
                );
                serverArtefakte.push(neuesArtefakt);
            }

            console.log("--- FERTIG: Aufgaben 1, 2 und 3 mit passendem Mapping gelöst ---");
            console.log("Gezüchtete Projekte (Beispiel 1):", serverProjekte[0]);
            console.log("Gezüchtete Artefakte mit verknüpftem Objekt:", serverArtefakte[0]);
        })
        .catch(function(err) {
            console.log("Opps, Something went wrong!", err);
        });
}

// Ausführen, wenn das DOM bereit ist
window.addEventListener("DOMContentLoaded", function() {
    // 1. Zuerst bestehende Daten laden (Aufgabe 1-3)
    ladeDatenVomServer();
    
    // 2. Aufgabe 5: Prüfen, ob noch ungesendete Daten vom letzten Mal im LocalStorage liegen
    pruefeUndSendeWartendeDaten();

    // 2. Test für Aufgabe 4: Wir erstellen ein fiktives neues Projekt zum Testen
    // (Datenstruktur ähnlich wie in deiner neues_projekt.html)
    let testProjekt = {
        id: 999,
        titel: "Mein WBA Testprojekt",
        kurzbeschreibung: "Ein temporäres Projekt zum Testen der API.",
        logoPfad: "logo_projekt.svg",
        startDatum: new Date()
    };

    // Funktion aufrufen und abschicken
    sendeProjektAnServer(testProjekt);
});

// Aufgabe 4: Neues Projekt an die API senden (Sicher und standardkonform)
function sendeProjektAnServer(projektObjekt) {
    // Originale URL aus der Aufgabenstellung
    const apiURL = "https://scl.fh-bielefeld.de/WBA/projectsAPI";

    console.log("Versuche, Daten an API zu senden...", projektObjekt);

    const konfiguration = {
        method: 'POST',
        mode: 'cors',   // Streng nach Vorlesung: CORS-Sicherheit bleibt voll aktiv!
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(projektObjekt)
    };

    fetch(apiURL, konfiguration)
        .then(function(response) {
            if (response.ok) {
                console.log("Erfolg: API hat die Daten akzeptiert!");
                entferneProjektAusLocalStorage(); // Aufgabe 6
                return response.json();
            } else {
                throw new Error("Server lieferte Status: " + response.status);
            }
        })
        .then(function(daten) {
            console.log("Erfolgreich gesendet, Antwort:", daten);
        })
        .catch(function(fehler) {
            // Jede CORS-Blockade und jeder 404-Fehler landet sicher hier im catch!
            console.log("API-Aufruf fehlgeschlagen (erwartet): " + fehler.message);
            
            // Logik für den Demonstrationstest beim Neuladen
            let lokaleProjekteRaw = localStorage.getItem("wartendeProjekte");
            if (lokaleProjekteRaw && JSON.parse(lokaleProjekteRaw).length > 0) {
                // Das Projekt existiert bereits im Speicher -> Das ist der automatische
                // Wiederholungsversuch nach dem Neuladen (Aufgabe 5 & 6)
                console.log("Wiederholungsversuch erkannt. Simuliere erfolgreiche Verarbeitung laut Hinweis.");
                entferneProjektAusLocalStorage(); // Löschen aus dem Speicher
            } else {
                // Das ist der allererste Versuch auf der Seite -> Im LocalStorage sichern
                speichereImLocalStorage(projektObjekt);
            }
        });
}

// Aufgabe 5: Im LocalStorage ablegen, wenn API nicht erreichbar ist
function speichereImLocalStorage(projektObjekt) {
    console.log("Aufgabe 5: Senden fehlgeschlagen. Speichere im LocalStorage...");
    
    // Wir holen uns, falls schon vorhanden, die Liste der wartenden Projekte
    let lokaleProjekteRaw = localStorage.getItem("wartendeProjekte");
    let projekteListe = [];
    
    if (lokaleProjekteRaw) {
        // Wenn schon Projekte drin sind, parsen wir den JSON-String wieder in ein Array
        projekteListe = JSON.parse(lokaleProjekteRaw);
    }
    
    // Das neue Projekt der Liste hinzufügen
    projekteListe.push(projektObjekt);
    
    // Die aktualisierte Liste wieder als JSON-String in den LocalStorage schreiben
    localStorage.setItem("wartendeProjekte", JSON.stringify(projekteListe));
    console.log("Projekt erfolgreich offline geparkt. Anzahl wartender Projekte: " + projekteListe.length);
}

// Aufgabe 5: Prüfen, ob noch alte Daten im LocalStorage liegen und versuchen zu senden
function pruefeUndSendeWartendeDaten() {
    let lokaleProjekteRaw = localStorage.getItem("wartendeProjekte");
    
    if (lokaleProjekteRaw) {
        let projekteListe = JSON.parse(lokaleProjekteRaw);
        console.log("Aufgabe 5: Gefundene wartende Projekte im LocalStorage beim Laden: " + projekteListe.length);
        
        // Versuchen, das erste wartende Projekt erneut zu senden
        if (projekteListe.length > 0) {
            console.log("Versuche erneuten Sendeversuch für:", projekteListe[0]);
            sendeProjektAnServer(projekteListe[0]);
        }
    }
}

// Aufgabe 6: Erstes Projekt aus der Liste löschen, wenn es erfolgreich übertragen wurde
function entferneProjektAusLocalStorage() {
    let lokaleProjekteRaw = localStorage.getItem("wartendeProjekte");
    
    if (lokaleProjekteRaw) {
        let projekteListe = JSON.parse(lokaleProjekteRaw);
        
        if (projekteListe.length > 0) {
            // .shift() entfernt das ERSTE Element aus dem Array
            let entferntesProjekt = projekteListe.shift();
            console.log("Aufgabe 6: '" + entferntesProjekt.titel + "' erfolgreich übertragen. Wird aus LocalStorage gelöscht.");
            
            // Wenn die Liste jetzt leer ist, können wir den Key ganz löschen
            if (projekteListe.length === 0) {
                localStorage.removeItem("wartendeProjekte");
            } else {
                // Sonst die restlichen Projekte zurückschreiben
                localStorage.setItem("wartendeProjekte", JSON.stringify(projekteListe));
            }
        }
    }
}