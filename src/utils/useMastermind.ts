import { useLocalStorage } from "./useLoacalStorage"

export function useMastermind() {

    const storage = useLocalStorage()

    return { ...storage }
}