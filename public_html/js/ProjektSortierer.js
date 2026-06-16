
// Methoden sind static da wir dessen Methoden 
// nur als Werkzeug benutzen und kein Zustand speichern müssen
class ProjektSortierer {

    // Sortierung nach Anfangsdatum (ältestes zuerst)
    static sortiereNachDatum(projekte) {
        // Array projekte kopieren
        let sortiert = [];
        for (var p of projekte) {
            sortiert.push(p);
        }

        // Bubblesort
        for (var i = 0; i < sortiert.length; i++) {
            for (var j = i + 1; j < sortiert.length; j++) {
                // Wenn das Datum von i nach dem Datum von j liegt, tauschen wir sie
                if (sortiert[i].startDatum > sortiert[j].startDatum) {
                    let temp = sortiert[i];
                    sortiert[i] = sortiert[j];
                    sortiert[j] = temp;
                }
            }
        }
        return sortiert;
    }

    // Sortierung nach Projektlaufzeit (geplante Stunden, größtes zuerst)
    static sortiereNachLaufzeit(projekte, alleArtefakte, alleProjektArtefakte) {
        // Array projekte kopieren
        let sortiert = [];
        for (var p of projekte) {
            sortiert.push(p);
        }

        for (var i = 0; i < sortiert.length; i++) {
            for (var j = i + 1; j < sortiert.length; j++) {
                // Für Laufzeit von i und j Methode aus Aufgabe 2 nutzen
                let laufzeitI = sortiert[i].berechneProjektlaufzeit(alleArtefakte, alleProjektArtefakte);
                let laufzeitJ = sortiert[j].berechneProjektlaufzeit(alleArtefakte, alleProjektArtefakte);

                // Für absteigende Sortierung: Wenn i kleiner ist als j, tauschen
                if (laufzeitI < laufzeitJ) {
                    let temp = sortiert[i];
                    sortiert[i] = sortiert[j];
                    sortiert[j] = temp;
                }
            }
        }
        return sortiert;
    }
}