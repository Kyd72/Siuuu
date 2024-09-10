import {doAjaxRequest} from "@/backend_requests/fetch_api.js";

//ENDPOINTS

const create_practitioner="/practitioner" // endpoint pour créer un practicioner

const search_practitioner_part1="/practitioner?identifier.value="
const search_practitioner_part3="&name.family="
const search_practitioner_part2="&identifier.system=FIE5-INTEROP"




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

async function getPractitioner(practitionerName, toast, practitionerIdentifiant) {


    try {
        const get_options = {
            method: 'GET',
            headers: {
                'accept': '*/*'
            }
        }

        const data = await doAjaxRequest(search_practitioner_part1+practitionerIdentifiant+search_practitioner_part2+search_practitioner_part3+practitionerName, get_options)

        async function connected() {

            toast.add({ severity: 'success', summary: 'Info', detail: "Authentifié", life: 1500 });
            await data.json().then(data => {
                // Accédez à l'ID du Practitioner
                const practitionerId = data.id; // Supposant que l'ID est dans la propriété "id"

                // Stockez l'ID dans le localStorage
                localStorage.setItem('practitionerId', practitionerId);

                console.log('Practitioner ID enregistré dans le localStorage:', practitionerId);
            })
                .catch(error => {
                    toast.add({ severity: 'success', summary: 'Info', detail: "Erreur lors de la récupération des données", life: 1500 });

                });


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


