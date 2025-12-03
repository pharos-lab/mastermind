import type { Color } from "../types"
import { useLocalStorage } from "./useLoacalStorage"

export function useMastermind() {

    const storage = useLocalStorage()


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

    return { ...storage, addColor, undoColor, resetColor }
}