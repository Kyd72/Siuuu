// Définition des classes JavaScript pour les mesures de base
class BaseMesure {
    constructor(date_mesure, valeur_mesure) {
        this.date_mesure = date_mesure;
        this.valeur_mesure = valeur_mesure;
    }
}

// Définition des classes JavaScript pour les différentes mesures
class TemperatureMesure extends BaseMesure {}

class HumiditeMesure extends BaseMesure {}

class OccupationMesure extends BaseMesure {}

class LuminositeMesure extends BaseMesure {}

// Définition des classes JavaScript pour les mesures regroupées
class Mesures {
    constructor(temperature, humidite, occupation, luminosite) {
        this.temperature = temperature;
        this.humidite = humidite;
        this.occupation = occupation;
        this.luminosite = luminosite;
    }
}

// Définition de la classe JavaScript pour un noeud de mesure
class NodeOfSink {
    constructor(mac_adress_node, description_node, mesures) {
        this._mac_adress_node = mac_adress_node;
        this._description_node = description_node;
        this._mesures = mesures;
    }


    get mac_adress_node() {
        return this._mac_adress_node;
    }

    set mac_adress_node(value) {
        this._mac_adress_node = value;
    }

    get description_node() {
        return this._description_node;
    }

    set description_node(value) {
        this._description_node = value;
    }

    get mesures() {
        return this._mesures;
    }

    set mesures(value) {
        this._mesures = value;
    }
}

// Définition de la classe JavaScript pour un point de collecte
class Sink {
    constructor(mac_adress, description_sink, nodes) {
        this.description_sink = description_sink;
        this.nodes = nodes;
        this._mac_adress = mac_adress;
    }


    get mac_adress() {
        return this._mac_adress;
    }

    set mac_adress(value) {
        this._mac_adress = value;
    }
}

class SinkWithoutNodes {
    constructor(mac_adress, description_sink) {
        this._mac_adress = mac_adress;
        this._description_sink = description_sink;
    }


    get mac_adress() {
        return this._mac_adress;
    }

    set mac_adress(value) {
        this._mac_adress = value;
    }

    get description_sink() {
        return this._description_sink;
    }

    set description_sink(value) {
        this._description_sink = value;
    }
}


export {Sink, SinkWithoutNodes, NodeOfSink}