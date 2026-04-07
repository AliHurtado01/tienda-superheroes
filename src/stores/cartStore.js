import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'agencyCart'

/**
 * Store del carrito de contratación.
 * Gestiona los héroes añadidos y sincroniza con localStorage.
 */
export const useCartStore = defineStore('cart', () => {
    // Cargamos del localStorage al inicializar el store
    const items = ref(JSON.parse(localStorage.getItem(STORAGE_KEY)) || [])

    const count = computed(() => items.value.length)
    const total = computed(() =>
        items.value.reduce((acc, item) => acc + item.price, 0)
    )

    /**
     * Añade un héroe al carrito.
     * @param {Object} hero - Objeto héroe con precio ya calculado
     * @returns {boolean} true si se añadió, false si ya existía
     */
    function addItem(hero) {
        if (items.value.find(i => i.id === hero.id)) return false
        items.value.push(hero)
        _persist()
        return true
    }

    /**
     * Elimina un héroe del carrito por su ID.
     * @param {string} heroId
     */
    function removeItem(heroId) {
        items.value = items.value.filter(i => i.id !== heroId)
        _persist()
    }

    /** Vacía el carrito completamente. */
    function clear() {
        items.value = []
        _persist()
    }

    /** Sincroniza el estado actual con localStorage. */
    function _persist() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
    }

    return { items, count, total, addItem, removeItem, clear }
})