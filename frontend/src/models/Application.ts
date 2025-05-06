import { ApplicationStatus } from "../enum/ApplicationStatus";

export class Application {
    id: number;
    title: string;
    description: string;
    city: string;
    status: ApplicationStatus;


    constructor(
        id: number,
        title: string,
        description: string,
        city: string,
        status: ApplicationStatus = ApplicationStatus.PENDING
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.city = city;
        this.status = status;
    }

    // Méthode pour changer le statut de l'offre
    changeStatus(newStatus: ApplicationStatus): void {
        this.status = newStatus;
    }

    // Méthode pour afficher les détails de l'offre
    getDetails(): string {
        return `JobOffer [ID: ${this.id}, Title: ${this.title}, Mairie de la ville : ${this.city}, Status: ${this.status}]`;
    }

    // Méthode statique pour créer une instance de JobOffer à partir d'une chaîne de caractères
    static fromStringStatus(statusStr: string): ApplicationStatus {
        switch (statusStr.toUpperCase()) {
            case "VALIDATED":
                return ApplicationStatus.VALIDATED;
            case "PENDING":
                return ApplicationStatus.PENDING;
            case "REFUSED":
                return ApplicationStatus.REFUSED;
            default:
                throw new Error(`Statut invalide : ${statusStr}`);
        }
    }
}

