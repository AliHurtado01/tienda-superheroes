<template>
    <nav class="navbar" v-if="auth.isLoggedIn">
        <RouterLink to="/heroes" class="brand">🛡️ H.E.R.O. Agency</RouterLink>

        <div class="nav-links">
            <RouterLink to="/heroes" class="nav-link">Catálogo</RouterLink>

            <RouterLink to="/cart" class="nav-link cart-link">
                🗂️ Carrito
                <span v-if="cart.count > 0" class="badge">{{ cart.count }}</span>
            </RouterLink>

            <span class="username">Agente: {{ auth.username }}</span>

            <button class="logout-btn" @click="handleLogout">Salir</button>
        </div>
    </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const cart = useCartStore()
const router = useRouter()

/**
 * Cierra la sesión del usuario y redirige al login.
 */
function handleLogout() {
    auth.logout()
    router.push({ name: 'login' })
}
</script>

<style scoped>
.navbar {
    background: white;
    padding: 15px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    position: sticky;
    top: 0;
    z-index: 100;
}

.brand {
    font-weight: 800;
    font-size: 1.2rem;
    color: #2c3e50;
    text-decoration: none;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 20px;
}

.nav-link {
    text-decoration: none;
    color: #555;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 8px;
    transition: background 0.2s;
    position: relative;
}

.nav-link:hover {
    background: #f0f2f5;
}

.nav-link.router-link-active {
    color: #3498db;
    background: #eaf4fb;
}

.cart-link {
    display: flex;
    align-items: center;
    gap: 6px;
}

.badge {
    background: #e74c3c;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: bold;
}

.username {
    color: #7f8c8d;
    font-size: 0.9rem;
}

.logout-btn {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-family: inherit;
    transition: opacity 0.2s;
}

.logout-btn:hover {
    opacity: 0.85;
}
</style>