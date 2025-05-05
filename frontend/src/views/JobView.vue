<template>
    <div class="job-view-template">
        <div class="job-view">
            <h1>Liste des Offres d'Emploi</h1>

            <table>
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Lieu</th>
                        <th>Status de ma candidature</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="job in filteredJobs" :key="job.id">
                        <td>{{ job.title }}</td>
                        <td>{{ job.description }}</td>
                        <td>{{ job.location }}</td>
                        <td>{{ job.status }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="">

            <div class="">
                <h1>Filtres</h1>
                <select v-model="selectedStatus" class="status-filter">
                    <option value="">Tous les statuts</option>
                    <option v-for="status in jobStatuses" :key="status" :value="status">
                        {{ status }}
                    </option>
                </select>
            </div>
            <RouterLink to="/add_job" class="new-job-button">Ajouter une offre</RouterLink>
        </div>
    </div>




</template>

<script>
import { JobOffer } from "../Models/JobOffer";
import { JobOfferStatus } from "../enum/JobOfferStatus";


export default {
    name: "JobView",
    data() {
        const job = new JobOffer(1, "Dev Fullstack", "TS + Node", "Paris", JobOfferStatus.WAITING);
        const job2 = new JobOffer(2, "Dev Frontend", "React + TS", "Lyon", JobOfferStatus.WAITING);
        const job3 = new JobOffer(3, "Dev Backend 3", "Node + TS", "Lille", JobOfferStatus.WAITING);
        const job4 = new JobOffer(4, "Dev Backend 4", "Node + TS", "Lille", JobOfferStatus.VALIDATED);
        const job5 = new JobOffer(5, "Dev Backend 5", "Node + TS", "Lille", JobOfferStatus.REFUSED);
        return {
            jobs: [job, job2, job3, job4, job5],
            selectedStatus: "",
        };
    },
    computed: {
        // Liste des statuts disponibles dans l'énum
        jobStatuses() {
            return Object.values(JobOfferStatus);
        },
        // Filtrer les jobs en fonction du statut sélectionné
        filteredJobs() {
            if (this.selectedStatus === "") {
                return this.jobs; // Aucun filtre appliqué
            }
            console.log(this.jobs)
            return this.jobs.filter(job => job.status === this.selectedStatus);
        },
    },
};
</script>

<style scoped>
.job-view-template {
    display: flex;
    gap: 50px;
}

.job-view {
    padding: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f4f4f4;
}

button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.new-job-button {
    display: inline-block;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}
</style>