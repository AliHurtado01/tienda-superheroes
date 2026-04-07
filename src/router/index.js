import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

/**
 * Configuración de rutas de la aplicación.
 * - requiresAuth: true → ruta protegida, necesita login
 * - requiresGuest: true → solo para no autenticados (ej: login)
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
            meta: { requiresGuest: true }
        },
        {
            path: '/heroes',
            name: 'heroes',
            component: () => import('@/views/HeroesView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('@/views/CartView.vue'),
            meta: { requiresAuth: true }
        }
    ]
})

/**
 * Guardia de navegación global.
 * Se ejecuta ANTES de cada cambio de ruta.
 * Si devuelve un objeto { name: '...' }, redirige a esa ruta.
 * Si no devuelve nada (undefined), la navegación continúa normal.
 */
router.beforeEach((to) => {
    const auth = useAuthStore()

    // Intentar acceder a ruta protegida sin estar logueado → al login
    if (to.meta.requiresAuth && !auth.isLoggedIn) {
        return { name: 'login' }
    }

    // Intentar acceder al login estando ya logueado → al catálogo
    if (to.meta.requiresGuest && auth.isLoggedIn) {
        return { name: 'heroes' }
    }
})

export default router