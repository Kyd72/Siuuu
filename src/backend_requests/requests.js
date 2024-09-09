import {doAjaxRequest} from "@/backend_requests/fetch_api.js";

//ENDPOINTS

const create_practitioner="/practitioner" // endpoint pour créer un practicioner


//REQUETES

async function createPractitioner(practitionerJson, toast) {


    try {
        const post_options = {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: practitionerJson
        }

        const data = await doAjaxRequest(create_practitioner, post_options)

        async function connected() {

            toast.add({ severity: 'success', summary: 'Info', detail: "Praticien créé avec succès", life: 3000 });
            return  await data.json()


        }

        if (data.status >399) {

            await data.json().then((json)=> toast.add({ severity: 'error', summary: 'Info', detail: "Erreur création médécin \n"+  json.message, life: 3000 }) )
            ;
        }
        return data.status === 200 ? await connected() :  null


    } catch (e) {
        alert(e)
    }


}









//await getActivitiesForConectedStudent().then((e)=>  e.forEach(element => dataRowTable.push(element)) )

//const dataRowTable = reactive([])


export { createPractitioner}


