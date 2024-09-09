import {doAjaxRequest} from "@/backend_requests/fetch_api.js";




const recuperer_tous_les_sinks="/climatsense/iot/sinks"

const recuperer_tous_les_nodes_d_un_sink="/climatsense/iot/nodes/" //+{sink_mac_address}

const update_sink_desc1="/climatsense/iot/sinks/" //+{sink_mac_address}+update_sink_desc2
const update_sink_desc2="/update_description/" //+{new_description}

const update_node_desc1="/climatsense/iot/sinks/" //+{sink_mac_address}+update_node_desc2
const update_node_desc2="/nodes/" //+node mac adress+ update_node_desc3
const update_node_desc3="/update_description/" //+{new_description}

const get_last_datas1="/climatsense/iot/sinks/" //+{sink_mac_address}+get_last_datas2
const get_last_datas2="/nodes/" //+node mac adress+ get_last_datas3
const get_last_datas3="/latest_measurements"

const get_historical_datas1="/climatsense/iot/sinks/" //+{sink_mac_address}/nodes/{node_mac_address}/latest_measurements/{num_measurements}"
const get_historical_datas2="/nodes/" //+{node_mac_address}/latest_measurements/{num_measurements}
const get_historical_datas3="/latest_measurements/" //+{num_measurements}

    async function getAllSinks() {


    try {
        const get_options = {
            method: 'GET',
            headers: {
                'accept': '*/*'
            }
        }

        const data = await doAjaxRequest(recuperer_tous_les_sinks, get_options)

        async function connected() {

            return  await data.json()


        }

        if (data.status >399) {
            throw new Error("Erreur");
        }
        return data.status === 200 ? await connected() :  null


    } catch (e) {
        alert(e)
    }


}
async function getAllNodesFromOneSink(mac_adress_sink) {


    try {
        const get_options = {
            method: 'GET',
            headers: {
                'accept': '*/*'
            }
        }

        const data = await doAjaxRequest(recuperer_tous_les_nodes_d_un_sink+mac_adress_sink, get_options)

        async function connected() {

            return  await data.json()


        }

        if (data.status >399) {
            throw new Error("uu");
        }
        return data.status === 200 ? await connected() :  null


    } catch (e) {
        alert("e")
    }


}
async function updateSinkDescription(mac_adress_sink, new_description, toast) {


    try {
        const put_options = {
            method: 'PUT',
            headers: {
                'accept': '*/*'
            }
        }

        const data = await doAjaxRequest(update_sink_desc1+mac_adress_sink+update_sink_desc2+new_description, put_options)

        let response;
        response = await data.json();

        if (data.status ===404) {
            toast.add({ severity: 'error', summary: 'Info', detail: response.error, life: 3000 });
        }

        if (data.status ===200) {
            toast.add({ severity: 'success', summary: 'Info', detail: response.message, life: 3000 });
        }

    } catch (e) {
        toast.add({ severity: 'error', summary: 'Info', detail: e, life: 3000 });
    }


}
async function updateNodeDescription(mac_adress_sink,node_mac_adress, new_description, toast) {


    try {
        const put_options = {
            method: 'PUT',
            headers: {
                'accept': '*/*'
            }
        }

        const data = await doAjaxRequest(update_node_desc1+mac_adress_sink+update_node_desc2+node_mac_adress+update_node_desc3+new_description, put_options)

        let response;
        response = await data.json();

        if (data.status ===404) {
            toast.add({ severity: 'error', summary: 'Info', detail: response.error, life: 3000 });
        }

        if (data.status ===200) {
            toast.add({ severity: 'success', summary: 'Info', detail: response.message, life: 3000 });
        }

    } catch (e) {
        toast.add({ severity: 'error', summary: 'Info', detail: e, life: 3000 });
    }


}


async function refreshNodeData(mac_adress_sink,node_mac_adress, toast) {


    try {
        const get_options = {
            method: 'GET',
            headers: {
                'accept': '*/*'
            }
        }

        const data = await doAjaxRequest(get_last_datas1+mac_adress_sink+get_last_datas2+node_mac_adress+get_last_datas3, get_options)

        async function connected() {

            return  await data.json()


        }

        if (data.status >399) {
            toast.add({ severity: 'error', summary: 'Info', detail: "Erreur mac adress", life: 3000 });
        }
        return data.status === 200 ? await connected() :  null


    } catch (e) {
        alert(e)
    }


}

// climatsense/iot/sinks/{sink_mac_address}/nodes/{node_mac_address}/latest_measurements/{num_measurements}
async function getHistoricalDatas (mac_adress_sink,node_mac_adress, wanted_number, toast){


    try {
        const get_options = {
            method: 'GET',
            headers: {
                'accept': '*/*'
            }
        }

        const data = await doAjaxRequest(get_historical_datas1+mac_adress_sink+get_historical_datas2+node_mac_adress+get_historical_datas3+wanted_number, get_options)

        async function connected() {

            return  await data.json()


        }

        if (data.status >399) {
            toast.add({ severity: 'error', summary: 'Info', detail: "Erreur récupération des données", life: 3000 });
        }
        return data.status === 200 ? await connected() :  null


    } catch (e) {
        alert(e)
    }
}







//await getActivitiesForConectedStudent().then((e)=>  e.forEach(element => dataRowTable.push(element)) )

//const dataRowTable = reactive([])


export { getAllSinks, getAllNodesFromOneSink, updateSinkDescription, updateNodeDescription, refreshNodeData, getHistoricalDatas}


