import type { Code, Color, Feedback } from "../types"
import { useLocalStorage } from "./useLoacalStorage"

export function useMastermind() {

    const storage = useLocalStorage()
    const AVAILABLE_COLORS: Color[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

    
    function generateSecretCode(): Code {
      const code: Code = [];
      
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * AVAILABLE_COLORS.length);
        code.push(AVAILABLE_COLORS[randomIndex] || 'blue');
      }
      
      storage.game.value.code = code;

      return code;
    }

    function calculateFeedback(secretCode: Code, attempt: Code): Feedback {
        if (secretCode.length !== attempt.length) {
          throw new Error('Secret code and attempt must have the same length');
        }
      
        const secretCopy = [...secretCode] as unknown[];
        const attemptCopy = [...attempt] as unknown[];
        
        let exactMatches = 0;
        let colorMatches = 0;
      
        for (let i = 0; i < secretCopy.length; i++) {
          if (secretCopy[i] === attemptCopy[i]) {
            exactMatches++;
            // Marquer comme utilisé avec null
            secretCopy[i] = null;
            attemptCopy[i] = null;
          }
        }
      
        for (let i = 0; i < attemptCopy.length; i++) {
          if (attemptCopy[i] !== null) {
            const colorIndex = secretCopy.indexOf(attemptCopy[i]);
            if (colorIndex !== -1) {
              colorMatches++;
              // Marquer comme utilisé
              secretCopy[colorIndex] = null as any;
            }
          }
        }
      
        return { exactMatches, colorMatches };
    }

    function addColor(color:Color) {
        if(storage.game.value.currentAttempt.length >= 4) return
        
        storage.game.value.currentAttempt.push(color)
    }

    function undoColor() {
        if(storage.game.value.currentAttempt.length <= 0) return
        
        storage.game.value.currentAttempt.pop()
    }

    function resetColor() {
        storage.game.value.currentAttempt = []
    }

    function submitColors(): boolean {
        if (storage.game.value.currentAttempt.length !== storage.game.value.code.length) {
          console.warn('Attempt is not complete');
          return false;
        }
      
        // if (storage.game.value.status !== 'playing') {
        //   console.warn('storage.game.value is not in playing state');
        //   return false;
        // }
      
        // Calculer le feedback
        const feedback = calculateFeedback(storage.game.value.code, storage.game.value.currentAttempt);
      
        // Créer l'objet attempt
        const attempt = {
          code: [...storage.game.value.currentAttempt],
          feedback: {
            exactMatches: feedback.exactMatches,
            colorMatches: feedback.colorMatches,
          }
        };
      
        storage.game.value.attempts.unshift(attempt);
        // storage.game.value.currentAttemptIndex++;
      
        // if (feedback.exactMatches === storage.game.value.code.length) {
        //   storage.game.value.status = 'won';
        //   // Calculer score bonus (plus de points si moins de tentatives)
        //   const bonus = (storage.game.value.maxAttempts - storage.game.value.currentAttemptIndex) * 10;
        //   storage.game.value.score = 100 + bonus;
        // }
        // // Vérifier défaite
        // else if (storage.game.value.currentAttemptIndex >= storage.game.value.maxAttempts) {
        //   storage.game.value.status = 'lost';
        //   storage.game.value.score = 0;
        // }
      
        // Réinitialiser la tentative actuelle
        storage.game.value.currentAttempt = [];
        
        console.log(feedback);
        
        return true;
      }

    return { ...storage, addColor, undoColor, resetColor, generateSecretCode, calculateFeedback, submitColors }
}