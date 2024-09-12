import {doAjaxRequest} from "@/backend_requests/fetch_api.js";

//ENDPOINTS

const create_practitioner="/practitioner" // endpoint pour créer un practicioner

const search_practitioner_part1="/practitioner?identifier.value="
const search_practitioner_part3="&name.family="                         // Chercher un praticien avec son nom et son identifier value
const search_practitioner_part2="&identifier.system=FIE5-INTEROP"

const search_practitioner_by_id="/practitioner/"                        // Chercher un praticien avec son id

const search_patients="/patient?generalPractitioner.reference="   // Chercher les médecins qui m'ont comme référence avec son nom et son identifier value

const get_questionnaire_for_practitioner="/questionnaire-response?author.reference=Practitioner/"   // Chercher les médecins qui m'ont comme référence avec son nom et son identifier value

const get_questionnaire_for_practitioner_by_ID="/questionnaire-response/"   // Chercher les médecins qui m'ont comme référence avec son nom et son identifier value


const search_patient_by_id ="/patient/"

const create_questionnaire="/questionnaire" // endpoint pour créer un practicioner

const questionnaire_By_Id ="/questionnaire/" 
const get_questionnaire_response_by_Patient_ID="/questionnaire-response?subject.reference=Patient/"   // Chercher les médecins qui m'ont comme référence avec son nom et son identifier value


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


}
/*Chercher le praticien avec son id*/
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
/*Chercher le patient avec son id*/
async function getPatientById(patientId, toast, router) {

    try {
        const get_options = {
            method: 'GET',
            headers: {
                'accept': '*/*'
            }
    }

    const data = await doAjaxRequest(search_patient_by_id+patientId, get_options)

    async function connected() {

       return await data.json() ;

    }

    if (data.status >399) {

        await data.json().then((json)=> toast.add({ severity: 'error', summary: 'Info', detail: "Ce patient n'existe pas\n"+  json.message, life: 3000 }) )
        ;

        router.push('/login')
    }
    return data.status === 200 ? await connected() :  null


} catch (e) {
    alert(e)
}


}

async function getQuestionnaireResponses(practitionerId, toast) {
    try {
        const get_options = {
            method: 'GET',
            headers: {
                'accept': '*/*',
            },
        };

        const data = await doAjaxRequest(get_questionnaire_for_practitioner+practitionerId, get_options); // On supprime le practitionerId dans l'appel ici

        if (!data.ok) {
            const json = await data.json();
            toast.add({ severity: 'error', summary: 'Error', detail: `Erreur dans la récupération des questionnaires: ${json.message}`, life: 3000 });
            return [];
        }

        return await data.json();

    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Connection error', life: 3000 });
        console.error('Error fetching questionnaire responses:', error);
        return [];
    }
}

async function getQuestionnaireResponsesById(questionnaireResponseID, toast) {
    try {
        const get_options = {
            method: 'GET',
            headers: {
                'accept': '*/*',
            },
        };

        const data = await doAjaxRequest(get_questionnaire_for_practitioner_by_ID+questionnaireResponseID, get_options); // On récupère l'objet à modifier

        if (!data.ok) {
            const json = await data.json();
            toast.add({ severity: 'error', summary: 'Error', detail: `Erreur dans la récupération des questionnaires: ${json.message}`, life: 1000 });
            return [];
        }

        return await data.json();

    }
    catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Connection error', life: 3000 });
        console.error('Error fetching questionnaire responses:', error);
        return [];
    }
}

async function getQuestionnaireResponsesByPatientId(PatientID, toast) {
    try {
        const get_options = {
            method: 'GET',
            headers: {
                'accept': '*/*',
            },
        };

        const data = await doAjaxRequest(get_questionnaire_response_by_Patient_ID+PatientID, get_options);

        if (!data.ok) {
            const json = await data.json();
            toast.add({ severity: 'error', summary: 'Error', detail: `Erreur dans la récupération des questionnaires: ${json.message}`, life: 1000 });
            return [];
        }

        return await data.json();

    }
    catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Connection error', life: 3000 });
        console.error('Error fetching questionnaire responses:', error);
        return [];
    }
}



async function updateResponseStatus(responseId, toast, newStatus) {

    let jsonToUpdate= await getQuestionnaireResponsesById(responseId, toast)

    // Vérifier que l'objet possède un champ "status"
    if (jsonToUpdate.hasOwnProperty('status')) {
        jsonToUpdate.status = newStatus;
        console.log("Le champ 'status' a été mis à jour avec succès.");
        try {
            const putOptions = {
                method: 'PUT',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonToUpdate),
            };

            const response = await doAjaxRequest(`${get_questionnaire_for_practitioner_by_ID}${responseId}`, putOptions);

            if (!response.ok) {
                const json = await response.json();
                toast.add({ severity: 'error', summary: 'Error', detail: `Failed to update response: ${json.message}`, life: 3000 });
            } else {
                toast.add({ severity: 'success', summary: 'Success', detail: `Response ${newStatus === 'completed' ? 'approved' : 'rejected'} successfully`, life: 3000 });
            }
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Connection error', life: 3000 });
            console.error('Error updating response status:', error);
        }
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: "Erreur dans la mise à jour, le champ n'existe pas", life: 3000 });

    }


}

/*Créer un praticien*/
async function createQuestionnaire(questionnaireJson, toast) {
    try {
        const post_options = {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: questionnaireJson
        }

        const data = await doAjaxRequest(create_questionnaire, post_options)

        async function connected() {

            toast.add({ severity: 'success', summary: 'Info', detail: "questionnaire créé avec succès", life: 3000 });
            return  await data.json()

        }

        if (data.status >399) {

            await data.json().then((json)=> toast.add({ severity: 'error', summary: 'Info', detail: "Erreur création questionnaire. \n"+  json.message, life: 3000 }) )
            ;
        }
        return data.status === 200 ? await connected() :  null


    } catch (e) {
        alert(e)
}

}


async function getQuestionnairesAll(toast, router) {


    try {
        const get_options = {
            method: 'GET',
            headers: {
                'accept': '*/*'
            }
        }

        const data = await doAjaxRequest(create_questionnaire, get_options)

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

async function getQuestionnaireById(questionnaireID, toast) {
    try {
        const get_options = {
            method: 'GET',
            headers: {
                'accept': '*/*',
            },
        };

        const data = await doAjaxRequest(questionnaire_By_Id+questionnaireID, get_options); // On récupère l'objet à modifier

        if (!data.ok) {
            const json = await data.json();
            toast.add({ severity: 'error', summary: 'Error', detail: `Erreur dans la récupération du questionnaires: ${json.message}`, life: 1000 });
            return [];
        }

        return await data.json();

    }
    catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Connection error', life: 3000 });
        console.error('Error fetching questionnaire responses:', error);
        return [];
    }
}




export { createPractitioner, getPractitionerByNameAndIdentifier, getPractitionerById, getQuestionnaireResponses, updateResponseStatus, getPatients, getPatientById, getQuestionnaireResponsesById, createQuestionnaire, getQuestionnairesAll, getQuestionnaireById }


