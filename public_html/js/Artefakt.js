class Artefakt {
    constructor(id, titel, kurzbeschreibung, aufgabenbereichRef, geplanteZeit) {
        this._id = id;
        this._titel = titel;
        this.kurzbeschreibung = kurzbeschreibung;
        this._aufgabenbereichRef = aufgabenbereichRef;
        this._geplanteZeit = geplanteZeit;
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

    get geplanteZeit() {
        return this._geplanteZeit;
    }
}


