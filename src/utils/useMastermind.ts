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
        console.log(`add color ${color} to current Attempts!`);
        
        if(storage.game.value.currentAttempt.length >= 4) return
        
        storage.game.value.currentAttempt.push(color)
    }

    function undoColor() {
        console.log(`undo color!`);

        if(storage.game.value.currentAttempt.length <= 0) return
        
        storage.game.value.currentAttempt.pop()
    }

    function resetColor() {
        console.log(`reset color!`);
        storage.game.value.currentAttempt = []
    }

    return { ...storage, addColor, undoColor, resetColor, generateSecretCode, calculateFeedback }
}