<script setup>


import {onMounted, onUpdated, reactive, ref} from "vue";
import {
  getAllNodesFromOneSink,
  getAllSinks, getHistoricalDatas, refreshNodeData,
  updateNodeDescription,
  updateSinkDescription
} from "@/backend_requests/requests.js";
import {NodeOfSink, SinkWithoutNodes} from "@/models/models.js";
import { useToast } from 'primevue/usetoast';


//listes contenant les données récupérées depuis le backend
const sinksName = reactive([ ]);
const nodesName = reactive([ ]);
const visible = ref(true);

//pour historique data
const tempHistorical = reactive([ ]);
const humidHistorical = reactive([ ]);
const occupationHistorical = reactive([ ]);
const luminHistorical = reactive([ ]);
const personalizedHistoryData=ref(50);

//pour tableau
const tempAbs = reactive([ ]);
const tempOrd = reactive([ ]);




const toast = useToast();

// Pour les list box
const selectedSink = ref();
const selectedNode = ref();

/*Gérer dynamiquement le titre des Accordions*/


/*Gérer dynamiquement la visibilitédes Accordions*/
const acordion1VisibilityForSink = ref(false);
const acordion1VisibilityForNode = ref(selectedNode.value && selectedSink.value !=null );


/*Gérer dynamiquement les informations sur les ESP, sinks et nodes*/

const selectedSinkDescription = ref("selectedSink.value.description_sink");
const selectedSinkMacAdress = ref("selectedNode.value.mac_adress");
const selectedSinkPairedNodes = ref(0);

const selectedNodesDescription = ref("selectedSink.value.description_sink");
const selectedNodesMacAdress = ref("selectedNode.value.mac_adress");


/*Gérer les modifications de description du sink*/
const modifierVisibleForSink = ref(true);
const validerVisibleForSink = ref(false);


async function updateDescriptionForSink(){
  modifierVisibleForSink.value=true;
  validerVisibleForSink.value=false;

  await updateSinkDescription(selectedSink.value.mac_adress, selectedSinkDescription.value, toast);
}

const modifierVisibleForNode = ref(true);
const validerVisibleForNode = ref(false);
function updateDescriptionForNode(){
  modifierVisibleForNode.value=true;
  validerVisibleForNode.value=false;

  if (selectedSink.value.mac_adress && selectedNode.value.mac_adress_node!== null) {
    updateNodeDescription(selectedSink.value.mac_adress,selectedNode.value.mac_adress_node,selectedNodesDescription.value,toast)
  }

}




async function updateNodes() {

  if (selectedSink.value == null) {
    selectedNode.value=null
    nodesName.splice(0, nodesName.length)
    tempHistorical.splice(0, nodesName.length)
    humidHistorical.splice(0, nodesName.length)
    occupationHistorical.splice(0, nodesName.length)
    luminHistorical.splice(0, nodesName.length)
    acordion1VisibilityForNode.value=false
  }

  if (selectedSink.value && selectedSink.value.description_sink !== null) {
    selectedSinkDescription.value = selectedSink.value.description_sink;
    selectedSinkMacAdress.value = selectedSink.value.mac_adress;
  }
  acordion1VisibilityForSink.value=selectedSink.value!=null
  const nodesElements = await getAllNodesFromOneSink(selectedSink.value.mac_adress);
  const nodes = nodesElements.map(element => new NodeOfSink(element.mac_adress_node, element.description_node, element.mesures));
  nodesName.splice(0, nodesName.length, ...nodes);
  selectedSinkPairedNodes.value=nodesName.length

}

async function getNodesData() {
  acordion1VisibilityForNode.value = selectedNode.value != null
  if (selectedNode.value == null) {
    nodesName.splice(0, nodesName.length)
    tempHistorical.splice(0, tempHistorical.length)
    humidHistorical.splice(0, humidHistorical.length)
    occupationHistorical.splice(0, occupationHistorical.length)
    luminHistorical.splice(0, luminHistorical.length)
    acordion1VisibilityForNode.value=false
  }

  if (selectedNode.value && selectedNode.value.description_node !== null) {
    selectedNodesDescription.value = selectedNode.value.description_node;
    selectedNodesMacAdress.value = selectedNode.value.mac_adress_node;
  }



}

//refresh with last values

const lastTempValue = ref(0);
const lastHumidValue = ref(0);
const lastOccupValue = ref(0);
const lastLuminValue = ref(0);

async function getRefreshValues(){
  if (acordion1VisibilityForNode.value && (selectedSink.value && selectedNode.value !=null)){

    const lastDatas = await refreshNodeData(selectedSink.value.mac_adress, selectedNode.value.mac_adress_node, toast)
    if (lastDatas != null){
      lastTempValue.value=lastDatas.latest_measurements.temperature[0].valeur_mesure
      lastHumidValue.value=lastDatas.latest_measurements.humidite[0].valeur_mesure
      lastOccupValue.value=lastDatas.latest_measurements.occupation[0].valeur_mesure
      lastLuminValue.value=lastDatas.latest_measurements.luminosite[0].valeur_mesure


    }

    else {

      lastTempValue.value=0
      lastHumidValue.value=0
      lastOccupValue.value=0
      lastLuminValue.value=0
    }
  }
}

const refreshData = setInterval(getRefreshValues, 5000);


//get Historical Datas For Tab

//Pour tracer les graphes

// Temperature
const graphOrTable = ref(false);

const chartDataTemp = ref();
const chartDataHumid = ref();
const chartDataOccup = ref();
const chartDataLumin = ref();
const chartDataCombined = ref();


const chartOptionsTemp = ref();
const setChartOptionsTemp = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  };
}
const setChartData = (Date, Value, graphName) => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: Date,
    datasets: [
      {
        label: graphName,
        data: Value,
        fill: false,
        borderColor: documentStyle.getPropertyValue('--cyan-500'),
        tension: 0.4
      }

    ]
  };
};

const setChartDataCombined = (Date, Value1, Value2,Value3,Value4, graphName1,graphName2,graphName3,graphName4) => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: Date,
    datasets: [
      {
        label: graphName1,
        data: Value1,
        fill: false,
        borderColor: documentStyle.getPropertyValue('--cyan-500'),
        tension: 0.4
      },
      {
        label: graphName2,
        data: Value2,
        fill: false,
        borderColor: documentStyle.getPropertyValue('--gray-500'),
        tension: 0.4
      },
      {
        label: graphName3,
        data: Value3,
        fill: false,
        borderDash: [5, 5],
        borderColor: documentStyle.getPropertyValue('--blue-500'),
        tension: 0.4
      },
      {
        label: graphName4,
        data: Value4,
        fill: false,
        borderColor: documentStyle.getPropertyValue('--red-500'),
        tension: 0.4
      },

    ]
  };
};


async function getHistoricalDatasForTab2(){
  tempHistorical.splice(0, tempHistorical.length)
  humidHistorical.splice(0, humidHistorical.length)
  occupationHistorical.splice(0, occupationHistorical.length)
  luminHistorical.splice(0, luminHistorical.length)

  //



  if (selectedSink.value && selectedNode.value !== null) {


    const historicalDatas =
      await getHistoricalDatas(selectedSink.value.mac_adress, selectedNode.value.mac_adress_node, personalizedHistoryData.value, toast) //retourne un json
    tempHistorical.splice(0, historicalDatas.latest_measurements.temperature.length, ...historicalDatas.latest_measurements.temperature);
    humidHistorical.splice(0, historicalDatas.latest_measurements.humidite.length, ...historicalDatas.latest_measurements.humidite);
    occupationHistorical.splice(0, historicalDatas.latest_measurements.occupation.length, ...historicalDatas.latest_measurements.occupation);
    luminHistorical.splice(0, historicalDatas.latest_measurements.luminosite.length, ...historicalDatas.latest_measurements.luminosite);

    // extracting datas

    // Fonction pour extraire les données
    const extractData = () => {

          //Temperature
          const datesArrayTemp = [];
          const mesuresArrayTemp = [];
          tempHistorical.forEach(item => {
            datesArrayTemp.push(item.date_mesure.slice(0, 16).replace('T', ' '));
            mesuresArrayTemp.push(item.valeur_mesure);
          });
      chartDataTemp.value = setChartData(datesArrayTemp,mesuresArrayTemp, "Temperature");
      chartOptionsTemp.value = setChartOptionsTemp();

      //Humidite
      const datesArrayHumid = [];
      const mesuresArrayHumid = [];
      humidHistorical.forEach(item => {
        datesArrayHumid.push(item.date_mesure.slice(0, 16).replace('T', ' '));
        mesuresArrayHumid.push(item.valeur_mesure);
      });
      chartDataHumid.value = setChartData(datesArrayHumid,mesuresArrayHumid, "Humidite");

      //Occupation
      const datesArrayOccupation = [];
      const mesuresArrayOccupation = [];
      occupationHistorical.forEach(item => {
        datesArrayOccupation.push(item.date_mesure.slice(0, 16).replace('T', ' '));
        mesuresArrayOccupation.push(item.valeur_mesure);
      });
      chartDataOccup.value = setChartData(datesArrayOccupation,mesuresArrayOccupation, "Occupation");

      //Lumin
      const datesArrayLuminosite = [];
      const mesuresArrayLuminosite = [];
      luminHistorical.forEach(item => {
        datesArrayLuminosite.push(item.date_mesure.slice(0, 16).replace('T', ' '));
        mesuresArrayLuminosite.push(item.valeur_mesure);
      });
      chartDataLumin.value = setChartData(datesArrayLuminosite,mesuresArrayLuminosite, "Lumin");


      // tableau croise

      chartDataCombined.value=setChartDataCombined(datesArrayLuminosite, mesuresArrayTemp, mesuresArrayHumid, mesuresArrayOccupation,
      mesuresArrayLuminosite,"Temperature", "Humidite", "Occupation","Luminosite")



    };

extractData()





  }










}


onMounted(async () => {
  const sinkElements = await getAllSinks();
  const sinks = sinkElements.map(element => new SinkWithoutNodes(element.mac_adress, element.description_sink));
  sinksName.splice(0, sinksName.length, ...sinks);
});

onUpdated(async () => {
  const sinkElements = await getAllSinks();
  const sinks = sinkElements.map(element => new SinkWithoutNodes(element.mac_adress, element.description_sink));
  sinksName.splice(0, sinksName.length, ...sinks);



});







</script>


<template>



  <Sidebar style="z-index: 1;" v-model:visible="visible">


    <Chip label="Sinks" />
    <div>
      <p></p>
      <p></p>
      <Listbox v-model="selectedSink" :options="sinksName" optionLabel="description_sink" @click="updateNodes"     class="w-full md:w-14rem" />
      <p></p>
      <p></p>


    </div>
    <Chip label="Nodes" />
    <div>
      <p></p>
      <p></p>
      <Listbox v-model="selectedNode" :options="nodesName" optionLabel="description_node"  @click="getNodesData"  class="w-full md:w-14rem" />
      <p></p>
      <p></p>


    </div>


  </Sidebar>
  <Button icon="pi pi-bars" @click="visible = true" />
  <div class="card">
    <Accordion  :activeIndex="0">
      <AccordionTab v-if="acordion1VisibilityForSink" header="Détails du sink">

        <div class="card flex justify-content-center">
        <div class="flex flex-column gap-2">
          <label for="macadress">Adresse Mac de l'ESP32</label>
          <p></p>
          <InputText id="username" v-model="selectedSinkMacAdress" disabled  aria-describedby="username-help" />
        </div>
          <p></p>
          <p></p><p></p>
          <p></p>
          <div class="flex flex-column gap-2">
            <label for="macadress">Nombre de nodes appairés</label>
            <p></p>
            <InputText id="username" v-model="selectedSinkPairedNodes" disabled  aria-describedby="username-help" />
          </div>
          <p></p>
          <p></p><p></p>
          <p></p>
          <div class="card flex justify-content-center">
        </div>
          <div class="flex flex-column gap-3">
          <label for="description">Description</label>
          <p></p>
          <InputText id="username" v-model="selectedSinkDescription" aria-describedby="username-help" :disabled="!validerVisibleForSink" />
        </div>
          <p></p>
          <p></p><p></p>
          <p></p>
          <Toast />
          <Button v-if="modifierVisibleForSink" label="Changer la description" outlined @click="validerVisibleForSink=!validerVisibleForSink;modifierVisibleForSink=false"  />
          <Button v-if="validerVisibleForSink" label="Valider" outlined @click="updateDescriptionForSink()"  />

        </div>



      </AccordionTab>
      <AccordionTab v-if="acordion1VisibilityForNode" header="Détails du Node">

        <div class="card flex justify-content-center">
          <div class="flex flex-column gap-2">
            <label for="macadress">Adresse Mac de l'ESP32</label>
            <p></p>
            <InputText id="node_macadress" v-model="selectedNodesMacAdress" disabled  aria-describedby="username-help" />
          </div>
          <p></p>
          <p></p><p></p>
          <p></p>
          <div class="card flex justify-content-center">
          </div>
          <div class="flex flex-column gap-3">
            <label for="description">Description</label>
            <p></p>
            <InputText id="username" v-model="selectedNodesDescription" aria-describedby="username-help" :disabled="!validerVisibleForNode" />
          </div>
          <p></p>
          <p></p><p></p>
          <p></p>
          <Button v-if="modifierVisibleForNode" label="Changer la description" outlined @click="validerVisibleForNode=!validerVisibleForNode;modifierVisibleForNode=false"  />
          <Button v-if="validerVisibleForNode" label="Valider" outlined @click="updateDescriptionForNode()"  />

        </div>



      </AccordionTab>
      <AccordionTab v-if="acordion1VisibilityForNode" header="Valeurs en temps réel" @click="refreshData">
        <div class="card">
          <Splitter style="height: 300px; width: 300px" class="mb-5">
          <SplitterPanel class="flex align-items-center justify-content-center">
            <Splitter style="height: 300px; width: 300px" layout="vertical">
              <SplitterPanel class="flex align-items-center justify-content-center">
                <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                  <Tag>Température:  {{lastTempValue}}</Tag>
                </div>
              </SplitterPanel>
              <SplitterPanel class="flex align-items-center justify-content-center">
                <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                  <Tag>Humidité: {{lastHumidValue}}</Tag>
                </div>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
          <SplitterPanel class="flex align-items-center justify-content-center">
            <Splitter style="height: 300px; width: 300px" layout="vertical">
              <SplitterPanel class="flex align-items-center justify-content-center">

                <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                  <Tag>Occupation: {{lastOccupValue}}</Tag>
                </div>
              </SplitterPanel>
              <SplitterPanel class="flex align-items-center justify-content-center">
                <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                  <Tag>Luminosité: {{lastLuminValue}}</Tag>
                </div>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
        </Splitter>
        </div>

      </AccordionTab>
      <AccordionTab v-if="acordion1VisibilityForNode" header="Historique des valeurs">

        <div class="flex flex-column gap-3">
          <Tag value="Dernières valeurs à retracer" />
          <p></p>
          <InputText id="username" v-model="personalizedHistoryData" placeholder="50 par défaut"  />
        </div>
        <p></p>
        <p></p><p></p>
        <p></p>
        <Button  label="Valider" outlined @click="getHistoricalDatasForTab2"  />
        <Button style="margin-left : 50vw" label="Voir graphes/Tables"  @click="graphOrTable=!graphOrTable"  />
        <p></p>
        <p></p><p></p>
        <p></p>

<!-- Ajout d'un composant pour le graphe        -->
        <p></p>
        <Chip v-if="graphOrTable" label="Température" />
        <p></p>
        <Chart v-if="graphOrTable" type="line" :data="chartDataTemp" :options="chartOptionsTemp" class="h-40rem" />
        <p></p>
        <Chip v-if="graphOrTable" label="Humidite" />
        <p></p>
        <Chart v-if="graphOrTable" type="line" :data="chartDataHumid" :options="chartOptionsTemp" class="h-40rem" />
        <p></p>
        <Chip v-if="graphOrTable" label="Occupation" />
        <p></p>
        <Chart v-if="graphOrTable" type="line" :data="chartDataOccup" :options="chartOptionsTemp" class="h-40rem" />
        <p></p>
        <Chip v-if="graphOrTable" label="Luminosite" />
        <p></p>
        <Chart v-if="graphOrTable" type="line" :data="chartDataLumin" :options="chartOptionsTemp" class="h-40rem" />
        <p></p>
        <Chip v-if="graphOrTable" label="Graphe combiné" />
        <p></p>
<!--graphe croisé-->
        <Chart v-if="graphOrTable" type="line" :data="chartDataCombined" :options="chartOptionsTemp" class="h-40rem" />
        <p></p>
        <Chip v-if="!graphOrTable" label="Température" />
        <p></p>
        <DataTable v-if="!graphOrTable" :value="tempHistorical" tableStyle="min-width: 70rem">
          <Column field="date_mesure" header="Date"></Column>
          <Column field="valeur_mesure" header="Valeur Mesure (°C)"></Column>
        </DataTable>
        <p></p>
        <Chip v-if="!graphOrTable" label="Humidité" />
        <p></p>
        <DataTable v-if="!graphOrTable" :value="humidHistorical" tableStyle="min-width: 70rem">
          <Column field="date_mesure" header="Date"></Column>
          <Column field="valeur_mesure" header="Valeur Mesure (%)"></Column>
        </DataTable>
        <p></p>
        <Chip v-if="!graphOrTable" label="Occupation" />
        <p></p>
        <DataTable v-if="!graphOrTable" :value="occupationHistorical" tableStyle="min-width: 70rem">
          <Column field="date_mesure" header="Date"></Column>
          <Column field="valeur_mesure" header="Valeur Mesure (nbre personne)"></Column>
        </DataTable>
        <p></p>
        <Chip v-if="!graphOrTable" label="Luminosité" />
        <p></p>
        <DataTable v-if="!graphOrTable" :value="luminHistorical" tableStyle="min-width: 70rem">
          <Column field="date_mesure" header="Date"></Column>
          <Column field="valeur_mesure" header="Valeur Mesure (lux)"></Column>
        </DataTable>
      </AccordionTab>
    </Accordion>
  </div>







</template>




<style scoped>
.card{
  width:100vw;
  padding-left:20vw;
  padding-right:10vw;
}

.image{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: -9999; /* Pour s'assurer que l'image reste au-dessus des autres contenus */
}

</style>