import {doAjaxRequest} from "@/backend_requests/fetch_api.js";

//ENDPOINTS

const create_practitioner="/practitioner" // endpoint pour créer un practicioner

const search_practitioner_part1="/practitioner?identifier.value="
const search_practitioner_part3="&name.family="                         // Chercher un praticien avec son nom et son identifier value
const search_practitioner_part2="&identifier.system=FIE5-INTEROP"

const search_practitioner_by_id="/practitioner/"                        // Chercher un praticien avec son id

const search_patients="/patient?generalPractitioner.reference="   // Chercher les médecins qui m'ont comme référence avec son nom et son identifier value






//REQUETES
/*Créer un praticien*/
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


}/*Chercher le praticien*/
async function getPractitionerByNameAndIdentifier(practitionerName, toast, practitionerIdentifiant, router) {


    try {
        const get_options = {
            method: 'GET',
            headers: {
                'accept': '*/*'
            }
        }

        const data = await doAjaxRequest(search_practitioner_part1+practitionerIdentifiant+search_practitioner_part2+search_practitioner_part3+practitionerName, get_options)

        async function connected() {

            await data.json().then(data => {
                // Accédez à l'ID du Practitioner
                let practitionerId ; // Supposant que l'ID est dans la propriété "id"

                // Vérifier si 'data' est un tableau
                if (Array.isArray(data)) {
                    if (data.length > 0) {
                        // Si c'est un tableau avec des objets, prendre le premier
                        practitionerId = data[0].id;
                        toast.add({ severity: 'success', summary: 'Info', detail: "Authentifié", life: 1500 });

                    } else {
                        console.error('Le tableau est vide.');
                        toast.add({ severity: 'error', summary: 'Info', detail: "Ce compte n'existe pas", life: 1500 });

                        return;
                    }
                } else {
                    // Si c'est un objet unique
                    practitionerId = data.id;
                    toast.add({ severity: 'success', summary: 'Info', detail: "Authentifié", life: 1500 });

                }

                // Stockez l'ID dans le localStorage
                localStorage.setItem('practitionerId', practitionerId);
                router.push('/dashboard')

                console.log('Practitioner ID enregistré dans le localStorage:', practitionerId);
            })
                .catch(error => {
                    toast.add({ severity: 'error', summary: 'Info', detail: "Erreur lors de la récupération des données", life: 1500 });

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


}/*Chercher le praticien avec son id*/
async function getPractitionerById(practitionerId, toast, router) {


    try {
        const get_options = {
            method: 'GET',
            headers: {
                'accept': '*/*'
            }
        }

        const data = await doAjaxRequest(search_practitioner_by_id+practitionerId, get_options)

        async function connected() {

           return await data.json() ;



        }

        if (data.status >399) {

            await data.json().then((json)=> toast.add({ severity: 'error', summary: 'Info', detail: "Ce médécin n'existe pas\n"+  json.message, life: 3000 }) )
            ;

            router.push('/login')
        }
        return data.status === 200 ? await connected() :  null


    } catch (e) {
        alert(e)
    }


}
async function getPatients(practitionerId, toast, router) {


    try {
        const get_options = {
            method: 'GET',
            headers: {
                'accept': '*/*'
            }
        }

        const data = await doAjaxRequest(search_patients+"Practitioner/"+practitionerId, get_options)

        async function connected() {

            return await data.json() ;



        }

        if (data.status >399) {

            await data.json().then((json)=> toast.add({ severity: 'error', summary: 'Info', detail: "Ce médécin n'existe pas\n"+  json.message, life: 3000 }) )
            ;

            router.push('/login')
        }
        return data.status === 200 ? await connected() :  null


    } catch (e) {
        alert(e)
    }


}










//await getActivitiesForConectedStudent().then((e)=>  e.forEach(element => dataRowTable.push(element)) )

//const dataRowTable = reactive([])


export { createPractitioner, getPractitionerByNameAndIdentifier, getPractitionerById, getPatients}


