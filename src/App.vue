<template>
  <div class="app-container">
    <header>
      <div class="brand">
        <h1>🛡️ H.E.R.O. Agency</h1>
        <p>Catálogo de Talentos Superhumanos</p>
      </div>
      
      <div class="controls">
        <div class="search-wrapper">
          <input 
            v-model="searchTerm" 
            @keyup.enter="searchHeroes"
            placeholder="Buscar talento (ej. Batman)..." 
          />
          <button @click="searchHeroes">🔍 Buscar</button>
        </div>
        
        <button class="cart-btn" :class="{ 'has-items': cart.length > 0 }" @click="showCart = !showCart">
          📁 Expedientes ({{ cart.length }})
        </button>
      </div>
    </header>

    <div v-if="showCart" class="cart-overlay" @click.self="showCart = false">
      <div class="cart-panel">
        <div class="cart-header">
          <h2>📁 Contratos Activos</h2>
          <button class="close-btn" @click="showCart = false">✕</button>
        </div>
        
        <ul v-if="cart.length > 0" class="cart-list">
          <li v-for="(item, index) in cart" :key="index" class="cart-item">
            <img :src="item.image.url" class="cart-thumb" />
            <div class="cart-info">
              <span class="name">{{ item.name }}</span>
              <span class="price">${{ item.price }}</span>
            </div>
            <button @click="removeFromCart(index)" class="delete-btn">Cancelar</button>
          </li>
        </ul>
        <div v-else class="empty-cart">
          <p>No hay contratos pendientes.</p>
        </div>
        
        <div class="cart-footer">
          <div class="total-row">
            <span>Presupuesto Total:</span>
            <span class="total-amount">${{ totalCart }}</span>
          </div>
          <button class="checkout-btn" v-if="cart.length > 0" @click="checkout">
            Finalizar Contratación
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="state-msg">🔄 Consultando base de datos global...</div>
    <div v-if="error" class="state-msg error">⚠️ {{ error }}</div>

    <div class="heroes-grid">
      <HeroCard 
        v-for="hero in heroes" 
        :key="hero.id" 
        :hero="hero"
        @add-hero="handleAddToCart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import HeroCard from './components/HeroCard.vue';


const API_TOKEN = '071304f07f46a6a782981e4317fb4fb7'; 


const heroes = ref([]);       
const cart = ref([]);         
const searchTerm = ref('Spider');
const showCart = ref(false);  
const loading = ref(false);
const error = ref(null);


const searchHeroes = async () => {
  if (!searchTerm.value) return;

  loading.value = true;
  error.value = null;
  heroes.value = []; 

  try {
    const response = await fetch(`https://superheroapi.com/api.php/${API_TOKEN}/search/${searchTerm.value}`);
    const data = await response.json();

    if (data.response === 'success') {
      heroes.value = data.results;
    } else {
      error.value = 'No se encontraron candidatos con ese nombre.';
    }
  } catch (err) {
    error.value = 'Error de conexión con la central.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};


const handleAddToCart = (hero) => {
  const exists = cart.value.find(item => item.id === hero.id);
  if (exists) {
    alert('¡Este héroe ya está en tu lista de contratos!');
    return;
  }
  
  cart.value.push(hero);
  updateLocalStorage();
  showCart.value = true;
};

const removeFromCart = (index) => {
  cart.value.splice(index, 1);
  updateLocalStorage();
};

const checkout = () => {
  alert(`Contratación procesada por valor de $${totalCart.value}. ¡Los héroes van en camino!`);
  cart.value = [];
  updateLocalStorage();
  showCart.value = false;
};

const totalCart = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price, 0);
});


const updateLocalStorage = () => {
  localStorage.setItem('agencyCart', JSON.stringify(cart.value));
};

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem('agencyCart');
  if (storedData) {
    cart.value = JSON.parse(storedData);
  }
};

onMounted(() => {
  loadFromLocalStorage();
  searchHeroes();
});
</script>

<style>

* { box-sizing: border-box; }
body { 
  margin: 0; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
  background-color: #f0f2f5; 
  color: #333; 
}


.app-container {
  width: 90%;            
  max-width: 1400px;    
  margin: 40px auto;     
  padding: 0;
}


header {
  background: white;
  padding: 25px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.brand h1 { margin: 0; color: #2c3e50; font-size: 1.8rem; letter-spacing: -0.5px; }
.brand p { margin: 5px 0 0 0; color: #7f8c8d; font-size: 0.9rem; }

.controls { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.search-wrapper { display: flex; gap: 8px; }

input { 
  padding: 12px; 
  border: 1px solid #e0e0e0; 
  border-radius: 8px; 
  width: 220px; 
  outline: none;
  transition: border 0.3s;
}
input:focus { border-color: #3498db; }

button { cursor: pointer; border: none; font-family: inherit; font-weight: 600; transition: transform 0.1s, opacity 0.2s; }
button:active { transform: scale(0.98); }
.controls button { background: #3498db; color: white; padding: 12px 20px; border-radius: 8px; }
.controls button:hover { opacity: 0.9; }

.cart-btn { background: #2c3e50 !important; }
.cart-btn.has-items { background: #27ae60 !important; }


.heroes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 30px;
  justify-content: center; 
}


.state-msg { text-align: center; padding: 50px; font-size: 1.3rem; color: #7f8c8d; width: 100%; grid-column: 1 / -1; }
.state-msg.error { color: #e74c3c; }


.cart-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.4); z-index: 999;
  backdrop-filter: blur(2px);
  display: flex; justify-content: flex-end;
}

.cart-panel {
  width: 420px; max-width: 90%; height: 100%;
  background: white; padding: 30px;
  display: flex; flex-direction: column;
  box-shadow: -10px 0 30px rgba(0,0,0,0.15);
}

.cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #f5f5f5; }
.close-btn { background: transparent !important; color: #333 !important; font-size: 1.5rem; padding: 0; }

.cart-list { list-style: none; padding: 0; margin: 0; overflow-y: auto; flex-grow: 1; }
.cart-item { display: flex; gap: 15px; align-items: center; padding: 15px 0; border-bottom: 1px solid #f9f9f9; }
.cart-thumb { width: 60px; height: 60px; border-radius: 12px; object-fit: cover; }
.cart-info { flex-grow: 1; }
.cart-info .name { display: block; font-weight: bold; color: #2c3e50; }
.cart-info .price { color: #27ae60; font-weight: bold; font-size: 0.9rem; }
.delete-btn { background: #ffebeb !important; color: #e74c3c !important; padding: 6px 12px !important; border-radius: 6px; font-size: 0.8rem; }

.cart-footer { margin-top: auto; border-top: 2px solid #f5f5f5; padding-top: 20px; }
.total-row { display: flex; justify-content: space-between; font-size: 1.3rem; font-weight: bold; margin-bottom: 20px; color: #2c3e50; }
.checkout-btn { width: 100%; background: #27ae60 !important; color: white; padding: 16px; border-radius: 10px; font-size: 1.1rem; }
</style>