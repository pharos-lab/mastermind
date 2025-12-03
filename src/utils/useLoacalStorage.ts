// src/composables/useLocalStorage.ts

import { ref, watch } from 'vue';
import type { Profile, Game } from '../types';

const PROFILE_KEY = 'mastermind_profile';
const GAME_KEY = 'mastermind_game';

function createDefaultProfile(): Profile {
  return {
    name: 'John Doe',
    totalGames: 0,
    gamesWon: 0,
    gamesLost: 0,
  };
}

function createDefaultGame(playerName: string): Game {
  return {
    player: playerName,
    score: 0,
    code: [],
    attempts: [],
    currentAttempt: [],
    status: '',
    maxAttempts: 10,
    currentAttemptIndex: 0,
  };
}

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

export function useLocalStorage() {
  // Charger ou créer le profil
  const profile = ref<Profile>(
    loadFromStorage(PROFILE_KEY, createDefaultProfile())
  );

  // Charger ou créer le jeu
  const game = ref<Game>(
    loadFromStorage(GAME_KEY, createDefaultGame(profile.value.name))
  );

  // Sauvegarder automatiquement à chaque changement
  watch(profile, (newProfile) => {
    saveToStorage(PROFILE_KEY, newProfile);
  }, { deep: true });

  watch(game, (newGame) => {
    saveToStorage(GAME_KEY, newGame);
  }, { deep: true });

  // Utilitaires
  function resetProfile(): void {
    profile.value = createDefaultProfile();
  }

  function resetGame(): void {
    game.value = createDefaultGame(profile.value.name);
  }

  function clearStorage(): void {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(GAME_KEY);
    profile.value = createDefaultProfile();
    game.value = createDefaultGame(profile.value.name);
  }

  return {
    profile,
    game,
    resetProfile,
    resetGame,
    clearStorage,
  };
}