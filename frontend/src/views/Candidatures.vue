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
              {{ getStatusLabel(item.status) }}
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
          item-title="text"
          item-value="value"
          label="Filtrer par statut"
          clearable
        />
        <router-link to="/candidature_spontanee">
          <v-btn color="primary" class="mt-4" block>
            Candidature spontanée
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Candidature } from "../models/Candidature";
import { CandidatureStatus } from "../enum/CandidatureStatus";

export default {
  name: "Candidatures",
  data() {
    const job = new Candidature(1, "Dev Fullstack", "TS + Node", "Paris", CandidatureStatus.PENDING);
    const job2 = new Candidature(2, "Dev Frontend", "React + TS", "Lyon", CandidatureStatus.PENDING);
    const job3 = new Candidature(3, "Dev Backend 3", "Node + TS", "Lille", CandidatureStatus.PENDING);
    const job4 = new Candidature(4, "Dev Backend 4", "Node + TS", "Lille", CandidatureStatus.VALIDATED);
    const job5 = new Candidature(5, "Dev Backend 5", "Node + TS", "Lille", CandidatureStatus.REFUSED);
    
    return {
      jobs: [job, job2, job3, job4, job5],
      selectedStatus: "",
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
      return Object.values(CandidatureStatus).map(status => ({
        text: this.getStatusLabel(status),
        value: status
      }));
    },
    filteredJobs() {
      const list = this.selectedStatus
        ? this.jobs.filter(job => job.status === this.selectedStatus)
        : this.jobs;

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