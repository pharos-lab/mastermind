import type { Code, Color } from "../types"
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

    return { ...storage, addColor, undoColor, resetColor, generateSecretCode }
}