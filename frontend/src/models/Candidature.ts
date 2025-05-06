import { CandidatureStatus } from "../enum/CandidatureStatus";

export class Candidature {
    id: number;
    title: string;
    description: string;
    city: string;
    status: CandidatureStatus;


    constructor(
        id: number,
        title: string,
        description: string,
        city: string,
        status: CandidatureStatus = CandidatureStatus.PENDING
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.city = city;
        this.status = status;
    }

    // Méthode pour changer le statut de l'offre
    changeStatus(newStatus: CandidatureStatus): void {
        this.status = newStatus;
    }

    // Méthode pour afficher les détails de l'offre
    getDetails(): string {
        return `JobOffer [ID: ${this.id}, Title: ${this.title}, Mairie de la ville : ${this.city}, Status: ${this.status}]`;
    }

    // Méthode statique pour créer une instance de JobOffer à partir d'une chaîne de caractères
    static fromStringStatus(statusStr: string): CandidatureStatus {
        switch (statusStr.toUpperCase()) {
            case "VALIDATED":
                return CandidatureStatus.VALIDATED;
            case "PENDING":
                return CandidatureStatus.PENDING;
            case "REFUSED":
                return CandidatureStatus.REFUSED;
            default:
                throw new Error(`Statut invalide : ${statusStr}`);
        }
    }
}

