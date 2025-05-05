import { JobOfferStatus } from "../enum/JobOfferStatus";

export class JobOffer {
    id: number;
    title: string;
    description: string;
    location: string;
    status: JobOfferStatus;

    constructor(
        id: number,
        title: string,
        description: string,
        location: string,
        status: JobOfferStatus = JobOfferStatus.WAITING
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.status = status;
    }

    // Méthode pour changer le statut de l'offre
    changeStatus(newStatus: JobOfferStatus): void {
        this.status = newStatus;
    }

    // Méthode pour afficher les détails de l'offre
    getDetails(): string {
        return `JobOffer [ID: ${this.id}, Title: ${this.title}, Location: ${this.location}, Status: ${this.status}]`;
    }

    // Méthode statique pour créer une instance de JobOffer à partir d'une chaîne de caractères
    static fromStringStatus(statusStr: string): JobOfferStatus {
        switch (statusStr.toUpperCase()) {
            case "VALIDATED":
                return JobOfferStatus.VALIDATED;
            case "WAITING":
                return JobOfferStatus.WAITING;
            case "REFUSED":
                return JobOfferStatus.REFUSED;
            default:
                throw new Error(`Statut invalide : ${statusStr}`);
        }
    }
}

