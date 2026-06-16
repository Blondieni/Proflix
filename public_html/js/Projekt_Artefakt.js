class Projekt_Artefakt {
    constructor(projektId, artefaktId, tatsaechlicheZeit) {
        this._projektId = projektId;
        this._artefaktId = artefaktId;
        this._tatsaechlicheZeit = tatsaechlicheZeit;
    }

    get tatsaechlicheZeit() {
        return this._tatsaechlicheZeit;
    }
}

