class Projekt {
    constructor(id, titel, kurzbeschreibung, logoPfad, startDatum) {
        this._id = id; 
        this._titel = titel; 
        this._kurzbeschreibung = kurzbeschreibung;
        this._logoPfad = logoPfad; 
        this._startDatum = startDatum;   
    }
    
    get kurzbeschreibung() {
        return this._kurzbeschreibung;
    }
    
    set kurzbeschreibung(neuerText) {
        if (neuerText && neuerText.length > 255) {
            this._kurzbeschreibung = neuerText.substring(0, 255);
        } else {
            this._kurzbeschreibung = neuerText;
        }
    }
    
}
