import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Store de autenticación.
 * Gestiona el estado de la sesión del usuario actual.
 * Persiste en sessionStorage (expira al cerrar el navegador).
 */
export const useAuthStore = defineStore('auth', () => {
    // Estado: el usuario actual (null si no hay sesión)
    const user = ref(JSON.parse(sessionStorage.getItem('hero-user')) || null)

    // Computed: derivados del estado, no duplicamos lógica
    const isLoggedIn = computed(() => user.value !== null)
    const username = computed(() => user.value?.name ?? '')

    /**
     * Inicia sesión guardando el usuario en el store y sessionStorage.
     * @param {string} name - Nombre de usuario
     */
    function login(name) {
        user.value = { name }
        sessionStorage.setItem('hero-user', JSON.stringify(user.value))
    }

    /**
     * Cierra la sesión limpiando el store y sessionStorage.
     */
    function logout() {
        user.value = null
        sessionStorage.removeItem('hero-user')
    }

    return { user, isLoggedIn, username, login, logout }
})