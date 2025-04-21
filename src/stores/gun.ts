import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import Gun, { type IGunInstance, type IGunChain } from 'gun';
import type Entry from '@/models/Entry'

const note_address = "shared_notes_sai_notepad";


export const useGunStore = defineStore('gun_db', () => {
    const entries = ref<Entry[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    // Singleton Gun instance and note reference
    let gunInstance: IGunInstance<any> | null = null;
    let note_instance: IGunChain<any, IGunInstance<any>, IGunInstance<any>, "shared_notes_sai_notepad"> | undefined = undefined;

    function init() {
        if (!gunInstance) {
            gunInstance = Gun({
                peers: ['https://gun-manhattan.herokuapp.com/gun']
            });
        }
        if (!note_instance) {
            note_instance = gunInstance.get(note_address);
        }
        retriveEntries();
    }

    async function getEntryById(id: string): Promise<Entry | null> {
        // Check local entries first
        const existingEntry = entries.value.find(entry => entry.id === id);
        if (existingEntry) return existingEntry;

        // Fallback to direct query if not found locally
        return new Promise((resolve) => {
            try {
                note_instance?.get(id).once((data) => {
                    resolve(data ? { ...data, id } : null);
                });
            } catch (err) {
                error.value = 'Failed to fetch entry';
                console.error(err);
                resolve(null);
            }
        });
    }

    // Other functions remain mostly the same but benefit from single connection
    function deleteEntry(id: string) {
        try {
            note_instance?.get(id).put(null);
        } catch (err) {
            error.value = 'Failed to delete entry';
            console.error(err);
        }
    }

    function storeEntry(rand: string, hash: string, title: string, body: string) {
        try {
            const id = `${rand}-${hash}`;
            const date = new Date();
            const createdAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

            note_instance?.get(id).put({
                id,
                rand,
                hash,
                title,
                body,
                createdAt
            });
        } catch (err) {
            error.value = 'Failed to store entry';
            console.error(err);
        }
    }

    function retriveEntries() {
        try {
            loading.value = true;
            note_instance?.map().on((data: Entry | null, id) => {
                entries.value = data
                    ? upsertEntry(entries.value, { ...data, id })
                    : entries.value.filter(e => e.id !== id);
            });
        } catch (err) {
            error.value = 'Failed to retrieve entries';
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    // Helper function for efficient updates
    function upsertEntry(entries: Entry[], newEntry: Entry): Entry[] {
        const index = entries.findIndex(e => e.id === newEntry.id);
        if (index === -1) return [...entries, newEntry];
        const updated = [...entries];
        updated[index] = newEntry;
        return updated;
    }

    return { entries, loading, error, init, storeEntry, deleteEntry, getEntryById }
})