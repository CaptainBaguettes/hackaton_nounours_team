<template>
  <v-container class="job-view-template pa-4" fluid>
    <v-row no-gutters class="d-flex flex-nowrap">
      <!-- Liste des offres -->
      <v-col cols="8">
        <h1>Mes candidatures</h1>
        <v-data-table
          :items="filteredJobs"
          :headers="headers"
          class="mb-4"
        >   
          <template #item.status="{ item }">
            <v-chip :color="getStatusColor(item.status)" dark>
              {{ getStatusLabel(item.status)}}
            </v-chip>
          </template>
        </v-data-table>
      </v-col>

      <!-- Filtres -->
      <v-col cols="4">
        <h1>Filtres</h1>
        <v-select
          v-model="selectedStatus"
          :items="jobStatuses"
          item-text="text"
          item-value="value"
          label="Filtrer par statut"
          clearable
        />
        <router-link to="/">
          <v-btn color="primary" class="mt-4" block>
            Candidature spontanée
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Application } from "../models/Application";
import { ApplicationStatus } from "../enum/ApplicationStatus";

export default {
  name: "ApplicationView",
    data() {
        
    const job = new Application(1, "Dev Fullstack", "TS + Node", "Paris", ApplicationStatus.PENDING);
    const job2 = new Application(2, "Dev Frontend", "React + TS",  "Lyon", ApplicationStatus.PENDING);
    const job3 = new Application(3, "Dev Backend 3", "Node + TS", "Lille", ApplicationStatus.PENDING);
    const job4 = new Application(4, "Dev Backend 4", "Node + TS", "Lille", ApplicationStatus.VALIDATED);
    const job5 = new Application(4, "Dev Backend 4", "Node + TS", "Lille", ApplicationStatus.VALIDATED);
    const job6 = new Application(5, "Dev Backend 5", "Node + TS",  "Lille", ApplicationStatus.REFUSED);
    const job7 = new Application(5, "Dev Backend 5", "Node + TS",  "Lille", ApplicationStatus.REFUSED);
    const job8 = new Application(5, "Dev Backend 5", "Node + TS", "Lille", ApplicationStatus.REFUSED);
    const job9 = new Application(5, "Dev Backend 5", "Node + TS",  "Lille", ApplicationStatus.REFUSED);
    const job10 = new Application(5, "Dev Backend 5", "Node + TS", "Lille", ApplicationStatus.REFUSED);
    const job11 = new Application(5, "Dev Backend 5", "Node + TS", "Lille", ApplicationStatus.REFUSED);
    return {
      jobs: [job, job2, job3, job4, job5, job6, job7, job8, job9, job10, job11],
      selectedStatus: "",
      // Mise à jour de la structure des en-têtes pour v-data-table
      headers: [
        { text: "Titre", value: "title" },
        { text: "Description", value: "description" },
        { text: "Lieu", value: "location" },
        { text: "Statut", value: "status" },
      ],
    };
  },
  computed: {
    jobStatuses() {
      return Object.values(ApplicationStatus);
    },
    filteredJobs() {
        const list = this.selectedStatus
            ? this.jobs.filter(job => job.status === this.selectedStatus)
            : this.jobs;

        // Reformater les objets JobOffer en objets plats
        return list.map(job => ({
            title: job.title,
            description: job.description,
            location: job.location,
            status: job.status,
        }));
    },
  },
  methods: {
    getStatusColor(status) {
      switch (status) {
        case "PENDING":
          return "grey";
        case "VALIDATED":
          return "green";
        case "REFUSED":
          return "red";
        default:
          return "blue";
      }
    },
    getStatusLabel(status) {
      switch (status) {
        case "PENDING":
          return "En attente";
        case "VALIDATED":
          return "Validée";
        case "REFUSED":
          return "Refusée";
        default:
          return status;
      }

    }
  },
};
</script>

<style scoped>

.job-view-template {
  max-width: 1500px;
  padding: 0 40px;
}

.v-col {
  padding-top: 20px;
}

/* Pour encore plus d’espace entre les colonnes : */
.v-col:first-child {
  margin-right: 40px;
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