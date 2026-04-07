<template>
    <div class="login-wrapper">
        <div class="login-card">
            <div class="login-header">
                <h1>🛡️ H.E.R.O. Agency</h1>
                <p>Accede al sistema de gestión de talentos superhumanos</p>
            </div>

            <form class="login-form" @submit.prevent="handleLogin">
                <div class="field">
                    <label for="username">Nombre de agente</label>
                    <input id="username" v-model="username" type="text" placeholder="Ej: Nick Fury"
                        autocomplete="username" />
                    <span v-if="errors.username" class="error-msg">{{ errors.username }}</span>
                </div>

                <div class="field">
                    <label for="password">Contraseña</label>
                    <input id="password" v-model="password" type="password" placeholder="••••••••"
                        autocomplete="current-password" />
                    <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
                </div>

                <button type="submit" class="login-btn">
                    Acceder al sistema →
                </button>
            </form>

            <p class="hint">💡 Introduce cualquier nombre y contraseña para entrar.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')

/** Objeto reactivo para los mensajes de error del formulario */
const errors = reactive({ username: '', password: '' })

/**
 * Valida los campos y, si todo es correcto, inicia sesión.
 * No conecta con ningún backend: es un login simulado.
 */
function handleLogin() {
    // Limpiar errores previos
    errors.username = ''
    errors.password = ''

    // Validación básica
    let valid = true
    if (!username.value.trim()) {
        errors.username = 'El nombre de agente es obligatorio.'
        valid = false
    }
    if (!password.value) {
        errors.password = 'La contraseña es obligatoria.'
        valid = false
    }

    if (!valid) return

    // Simular login: guardamos el usuario y redirigimos
    auth.login(username.value.trim())
    router.push({ name: 'heroes' })
}
</script>

<style scoped>
.login-wrapper {
    min-height: calc(100vh - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-card {
    background: white;
    padding: 50px 40px;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 440px;
}

.login-header {
    text-align: center;
    margin-bottom: 35px;
}

.login-header h1 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.8rem;
}

.login-header p {
    color: #7f8c8d;
    margin-top: 8px;
    font-size: 0.95rem;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.field label {
    font-weight: 600;
    color: #34495e;
    font-size: 0.9rem;
}

.field input {
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
}

.field input:focus {
    border-color: #3498db;
}

.error-msg {
    color: #e74c3c;
    font-size: 0.82rem;
}

.login-btn {
    background: #2c3e50;
    color: white;
    border: none;
    padding: 14px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.2s;
    margin-top: 5px;
}

.login-btn:hover {
    background: #34495e;
}

.hint {
    text-align: center;
    color: #95a5a6;
    font-size: 0.82rem;
    margin-top: 20px;
    margin-bottom: 0;
}
</style>