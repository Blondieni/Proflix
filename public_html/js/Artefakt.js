class Artefakt {
    constructor(id, titel, kurzbeschreibung, aufgabenbereichRef, geplanteZeit) {
        this._id = id;
        this._titel = titel;
        
        // Setter nutzen damit die Einschränkung greift (ohne "_")
        this.kurzbeschreibung = kurzbeschreibung;
        
        
        this._aufgabenbereichRef = aufgabenbereichRef;
        this._geplanteZeit = geplanteZeit;
    }


    // Getter und Setter
    get kurzbeschreibung() {
        return this._kurzbeschreibung;
    }
    
    get id() {
    return this._id;
}

    set kurzbeschreibung(neuerText) {
        if (neuerText && neuerText.length > 255) {
            this._kurzbeschreibung = neuerText.substring(0, 255);
        } else {
            this._kurzbeschreibung = neuerText;
        }
    }

    get geplanteZeit() {
        return this._geplanteZeit;
    }
}


