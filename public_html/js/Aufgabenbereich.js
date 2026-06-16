class Aufgabenbereich {
    constructor(id, titel, kurzbeschreibung) {
        this._id = id;
        this._titel = titel;
        this.kurzbeschreibung = kurzbeschreibung;
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