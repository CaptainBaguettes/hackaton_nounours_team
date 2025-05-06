<template>
    <nav class="navbar">
        <div class="navbar-left">
            <RouterLink to="/" class="nav-button">Accueil</RouterLink>
            <RouterLink to="/jobs" class="nav-button">Offres</RouterLink>
            <RouterLink to="/candidatures" class="nav-button">Mes candidatures</RouterLink>
            <RouterLink to="/" class="nav-button">Mairies</RouterLink>

        </div>
        <div class="navbar-right">
            <button class="user-login">
            </button>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
};
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #ddd;
}

.navbar-left {
    display: flex;
    gap: 15px;
}

.nav-button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 5px 10px;
    text-decoration: none;
    color: inherit;
}

.nav-button:hover {
    color: #007bff;
}

.navbar-right {
    display: flex;
    align-items: center;
}

.user-login {
    background: none;
    border: none;
    cursor: pointer;
}

.user-icon {
    width: 24px;
    height: 24px;
}
</style>