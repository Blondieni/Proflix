class Projekt {
    constructor(id, titel, kurzbeschreibung, logoPfad, startDatum) {
        this._id = id; 
        this._titel = titel; 
        
        // Setter nutzen damit die Einschränkung greift (ohne "_")
        this.kurzbeschreibung = kurzbeschreibung;
        
        this._logoPfad = logoPfad; 
        this._startDatum = startDatum;  
    }
    
    
    // Getter und Setter
    get kurzbeschreibung() {
        return this._kurzbeschreibung;
    }
    
    get startDatum() {
    return this._startDatum;
}
    
    set kurzbeschreibung(neuerText) {
        if (neuerText && neuerText.length > 255) {
            this._kurzbeschreibung = neuerText.substring(0, 255);
        } else {
            this._kurzbeschreibung = neuerText;
        }
    }
    
    // Methode zur Berechnung der Projektlaufzeit (Aufgabe 2)
    berechneProjektlaufzeit(alleArtefakte, alleProjektArtefakte) {
        let summeGeplanteZeit = 0;

        // Schleife über alle Projekt_Artefakt verknüpfungen
        for (let verknuepfung of alleProjektArtefakte) {

            // Wenn die Verknüpfung zu diesem Projekt gehört
            if (verknuepfung.projektId === this._id) {

                // addiere die Artefakt geplante Zeit auf die Summe drauf
                for (let artefakt of alleArtefakte) {
                    if (artefakt.id === verknuepfung.artefaktId) {
                        // Geplante Zeit aufaddieren
                        summeGeplanteZeit = summeGeplanteZeit + artefakt.geplanteZeit;
                    }
                }

            }
        }

        return summeGeplanteZeit;
    }
}
    
