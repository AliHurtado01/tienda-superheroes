<template>
  <div class="card">
    <div class="image-wrapper">
      <img :src="hero.image.url" :alt="hero.name" />
      <span class="id-badge">ID: {{ hero.id }}</span>
    </div>
    
    <div class="card-body">
      <h3>{{ hero.name }}</h3>
      <p class="subtitle">{{ hero.biography.alignment === 'good' ? 'Héroe Oficial' : 'Mercenario/Villano' }}</p>
      
      <div class="price-tag">
        Honorarios: ${{ computedPrice }} / misión
      </div>
      
      <div class="stats">
        <div class="stat-box">
          <span class="label">Fuerza</span>
          <span class="value">{{ hero.powerstats.strength || '-' }}</span>
        </div>
        <div class="stat-box">
          <span class="label">Combate</span>
          <span class="value">{{ hero.powerstats.combat || '-' }}</span>
        </div>
      </div>

      <button class="hire-btn" @click="addToCart">
        🤝 Contratar
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  hero: { type: Object, required: true }
});

const emit = defineEmits(['add-hero']);

const computedPrice = computed(() => {
  const power = parseInt(props.hero.powerstats.power) || 10;
  const combat = parseInt(props.hero.powerstats.combat) || 10;
  return (power + combat) * 250;
});

function addToCart() {
  emit('add-hero', { 
    ...props.hero, 
    price: computedPrice.value 
  });
}
</script>

<style scoped>
.card {
  /* Hacemos que la tarjeta ocupe todo el ancho de su celda del Grid */
  width: 100%; 
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  position: relative;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.15);
}

.image-wrapper {
  height: 240px;
  width: 100%;
  position: relative;
  background-color: #2c3e50;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit:contain;
}

.id-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
}

.card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1; 
}

h3 { margin: 0; color: #2c3e50; font-size: 1.2rem; }
.subtitle { margin: 0 0 10px 0; color: #7f8c8d; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; }

.price-tag {
  font-weight: bold;
  color: #27ae60;
  font-size: 1rem;
  margin-bottom: 12px;
  background: #f0f9f4;
  padding: 5px;
  border-radius: 4px;
  text-align: center;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  gap: 10px;
}

.stat-box {
  background: #f4f6f8;
  flex: 1;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
}

.stat-box .label { display: block; font-size: 0.7rem; color: #95a5a6; }
.stat-box .value { font-weight: bold; color: #34495e; }

.hire-btn {
  background-color: #34495e;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-top: auto;
  transition: background 0.2s;
}

.hire-btn:hover { background-color: #2c3e50; }
</style>