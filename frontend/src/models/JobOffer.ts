

export class JobOffer {
    id: number;
    title: string;
    description: string;
    city: string;
    dailyAssignment: number;
    dateCreated: Date;

    constructor(
        id: number,
        description: string,
        title: string,
        city: string,
        dailyAssignment: number = 0,
        dateCreated: Date = new Date()
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.city = city;
        this.dailyAssignment = dailyAssignment;
        this.dateCreated = dateCreated;
    }
}

