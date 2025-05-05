<template>
    <div class="job-view">
        <h1>Liste des Offres d'Emploi</h1>
        <table>
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Lieu</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="job in jobs" :key="job.id">
                    <td>{{ job.title }}</td>
                    <td>{{ job.description }}</td>
                    <td>{{ job.location }}</td>
                </tr>
            </tbody>
        </table>
        <RouterLink to="/add_job" class="new-job-button">Ajouter une offre</RouterLink>
    </div>
</template>

<script>
export default {
    name: "JobView",
    data() {
        return {
            jobs: [
                { id: 1, title: "Développeur Frontend", description: "Développement d'applications web", location: "Paris" },
                { id: 2, title: "Designer UI/UX", description: "Conception d'interfaces utilisateur", location: "Lyon" },
                { id: 3, title: "Chef de Projet", description: "Gestion de projets informatiques", location: "Marseille" },
            ],
        };
    },
};
</script>

<style scoped>
.job-view {
    padding: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th, td {
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