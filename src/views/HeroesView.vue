<template>
    <div>
        <!-- Barra de búsqueda -->
        <div class="search-bar">
            <input v-model="searchTerm" @keyup.enter="searchHeroes" placeholder="Buscar talento (ej. Batman)..."
                aria-label="Buscar héroe" />
            <button @click="searchHeroes">🔍 Buscar</button>
        </div>

        <!-- Feedback de notificación -->
        <div v-if="notification" class="notification" :class="notification.type">
            {{ notification.msg }}
        </div>

        <!-- Estados de carga/error -->
        <div v-if="loading" class="state-msg">🔄 Consultando base de datos global...</div>
        <div v-if="error" class="state-msg error">⚠️ {{ error }}</div>

        <!-- Grid de héroes -->
        <div class="heroes-grid">
            <!--
        HeroCard recibe 'hero' como prop (componente anidado con props).
        Escucha el evento 'add-hero' para añadir al carrito.
            -->
            <HeroCard v-for="hero in heroes" :key="hero.id" :hero="hero" @add-hero="handleAddToCart" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeroCard from '@/components/HeroCard.vue'
import { useCartStore } from '@/stores/cartStore'

const cart = useCartStore()
const router = useRouter()

const API_TOKEN = '071304f07f46a6a782981e4317fb4fb7'

const heroes = ref([])
const searchTerm = ref('Spider')
const loading = ref(false)
const error = ref(null)
const notification = ref(null)

/**
 * Busca héroes en la API externa y actualiza el listado.
 * Implementa fetch con manejo de errores.
 */
async function searchHeroes() {
    if (!searchTerm.value.trim()) return

    loading.value = true
    error.value = null
    heroes.value = []

    try {
        const response = await fetch(
            `https://superheroapi.com/api.php/${API_TOKEN}/search/${searchTerm.value}`
        )
        const data = await response.json()

        if (data.response === 'success') {
            heroes.value = data.results
        } else {
            error.value = 'No se encontraron candidatos con ese nombre.'
        }
    } catch (err) {
        error.value = 'Error de conexión con la central.'
        console.error(err)
    } finally {
        loading.value = false
    }
}

/**
 * Intenta añadir un héroe al carrito usando el store.
 * Muestra una notificación temporal según el resultado.
 * @param {Object} hero - Héroe con precio calculado (viene de HeroCard)
 */
function handleAddToCart(hero) {
    const added = cart.addItem(hero)

    if (added) {
        showNotification(`✅ ${hero.name} añadido al carrito`, 'success')
    } else {
        showNotification(`⚠️ ${hero.name} ya está en el carrito`, 'warning')
    }
}

/**
 * Muestra una notificación temporal que desaparece sola.
 * @param {string} msg - Mensaje a mostrar
 * @param {'success'|'warning'} type - Tipo visual
 */
function showNotification(msg, type = 'success') {
    notification.value = { msg, type }
    setTimeout(() => { notification.value = null }, 2500)
}

onMounted(() => searchHeroes())
</script>

<style scoped>
.search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    background: white;
    padding: 20px 25px;
    border-radius: 14px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
}

input:focus {
    border-color: #3498db;
}

button {
    background: #3498db;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: opacity 0.2s;
}

button:hover {
    opacity: 0.9;
}

.notification {
    padding: 12px 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    font-weight: 600;
    text-align: center;
}

.notification.success {
    background: #d5f5e3;
    color: #1e8449;
}

.notification.warning {
    background: #fdebd0;
    color: #935116;
}

.state-msg {
    text-align: center;
    padding: 50px;
    font-size: 1.2rem;
    color: #7f8c8d;
}

.state-msg.error {
    color: #e74c3c;
}

.heroes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 25px;
}
</style>