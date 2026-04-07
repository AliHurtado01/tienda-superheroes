<template>
    <div class="cart-view">
        <h2>🗂️ Contratos Activos</h2>

        <div v-if="cart.items.length === 0" class="empty-state">
            <p>No hay contratos pendientes.</p>
            <RouterLink to="/heroes" class="back-link">← Volver al catálogo</RouterLink>
        </div>

        <div v-else>
            <ul class="cart-list">
                <li v-for="item in cart.items" :key="item.id" class="cart-item">
                    <img :src="item.image.url" :alt="item.name" class="cart-thumb" />
                    <div class="item-info">
                        <h3>{{ item.name }}</h3>
                        <span class="alignment">
                            {{ item.biography.alignment === 'good' ? 'Héroe Oficial' : 'Mercenario' }}
                        </span>
                    </div>
                    <span class="item-price">${{ item.price }}</span>
                    <button class="remove-btn" @click="cart.removeItem(item.id)">✕ Cancelar</button>
                </li>
            </ul>

            <div class="cart-footer">
                <div class="total-row">
                    <span>Presupuesto total:</span>
                    <strong>${{ cart.total }}</strong>
                </div>
                <div class="footer-actions">
                    <RouterLink to="/heroes" class="back-link">← Seguir buscando</RouterLink>
                    <button class="checkout-btn" @click="handleCheckout">
                        Finalizar contratación
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

/**
 * Simula el proceso de checkout: muestra confirmación,
 * vacía el carrito y redirige al catálogo.
 */
function handleCheckout() {
    const count = cart.count
    const total = cart.total
    cart.clear()
    alert(`✅ Contratación completada: ${count} héroes por $${total}. ¡En camino!`)
    router.push({ name: 'heroes' })
}
</script>

<style scoped>
.cart-view {
    background: white;
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    max-width: 800px;
    margin: 0 auto;
}

h2 {
    margin-top: 0;
    color: #2c3e50;
}

.empty-state {
    text-align: center;
    padding: 40px;
    color: #7f8c8d;
}

.cart-list {
    list-style: none;
    padding: 0;
    margin: 0 0 30px 0;
}

.cart-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 18px 0;
    border-bottom: 1px solid #f0f2f5;
}

.cart-thumb {
    width: 70px;
    height: 70px;
    border-radius: 12px;
    object-fit: cover;
    background: #2c3e50;
}

.item-info {
    flex: 1;
}

.item-info h3 {
    margin: 0 0 4px;
    color: #2c3e50;
    font-size: 1rem;
}

.alignment {
    font-size: 0.8rem;
    color: #7f8c8d;
    text-transform: uppercase;
}

.item-price {
    font-weight: 700;
    color: #27ae60;
    font-size: 1.1rem;
    min-width: 80px;
    text-align: right;
}

.remove-btn {
    background: #ffebeb;
    color: #e74c3c;
    border: none;
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-family: inherit;
    transition: background 0.2s;
}

.remove-btn:hover {
    background: #fad7d7;
}

.cart-footer {
    border-top: 2px solid #f0f2f5;
    padding-top: 25px;
}

.total-row {
    display: flex;
    justify-content: space-between;
    font-size: 1.3rem;
    color: #2c3e50;
    margin-bottom: 20px;
}

.footer-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.back-link {
    color: #3498db;
    text-decoration: none;
    font-weight: 600;
}

.back-link:hover {
    text-decoration: underline;
}

.checkout-btn {
    background: #27ae60;
    color: white;
    border: none;
    padding: 14px 28px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: opacity 0.2s;
}

.checkout-btn:hover {
    opacity: 0.9;
}
</style>