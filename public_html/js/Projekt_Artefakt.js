class Projekt_Artefakt {
    constructor(projektId, artefaktId, tatsaechlicheZeit) {
        this._projektId = projektId;
        this._artefaktId = artefaktId;
        this._tatsaechlicheZeit = tatsaechlicheZeit;
    }


    // Getter
    get tatsaechlicheZeit() {
        return this._tatsaechlicheZeit;
    }
    get projektId() {
        return this._projektId;
    }
    get artefaktId() {
        return this._artefaktId;
    }
}

