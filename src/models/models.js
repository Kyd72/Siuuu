// Définition des classes JavaScript pour les utilisateurs de base de base
class Practitioner {
    constructor(resourceType, identifier, name, telecom, gender, birthDate, qualification, address) {
      this.resourceType = resourceType || "Practitioner";
      this.identifier = identifier || [];
      this.name = name || [];
      this.telecom = telecom || [];
      this.gender = gender || "";
      this.birthDate = birthDate || "";
      this.qualification = qualification || [];
      this.address = address || [];
    }
  
    setIdentifier(use, system, value) {
      this.identifier.push({ use, system, value });
    }
  
    setName(use, family, given, suffix) {
      this.name.push({ use, family, given, suffix });
    }
  
    setTelecom(system, value, use) {
      this.telecom.push({ system, value, use });
    }
  
    setGender(gender) {
      this.gender = gender;
    }
  
    setBirthDate(birthDate) {
      this.birthDate = birthDate;
    }
  
    setQualification(system, code, display) {
      this.qualification.push({
        code: { coding: [{ system, code, display }] }
      });
    }
  
    setAddress(use, line, city, postalCode, country) {
      this.address.push({ use, line, city, postalCode, country });
    }
  }


  class QuestionnaireResponse {
    constructor(
      resourceType = "QuestionnaireResponse",
      id = "",
      questionnaire = "",
      status = "",
      subject = {},
      authored = "",
      author = {},
      item = []
    ) {
      this.resourceType = resourceType;
      this.id = id;
      this.questionnaire = questionnaire;
      this.status = status;
      this.subject = subject;
      this.authored = authored;
      this.author = author;
      this.item = item;
    }
  
    // Setter pour le champ status
    setStatus(status) {
      this.status = status;
    }
  
    // Vous pouvez ajouter d'autres setters si nécessaire
  }
  
export {
    Practitioner, QuestionnaireResponse
}