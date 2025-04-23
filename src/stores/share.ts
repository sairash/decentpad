import { ref, markRaw } from 'vue'
import { defineStore } from 'pinia'
import type Entry from '@/models/Entry'
import mqtt, { type MqttClient } from 'mqtt';
import { Opcodes, type ShareMessage } from '@/models/share';
import { decrypt, encrypt } from '@/ts/helper';
import type { JSONContent } from '@tiptap/vue-3';



const defaultRelayUrls = [
    "mqtt.eclipseprojects.io/mqtt",
    "broker.hivemq.com:8884/mqtt",
    "broker.emqx.io:8084/mqtt",
    "test.mosquitto.org:8081/mqtt",
].map((url) => "wss://" + url);


function default_share(content: string, secondary: string): string {
    return `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"${content}"}]},{"type":"paragraph","content":[{"type":"text","text":"${secondary}"}]}]}`
}

function make_json_content(content: string): JSONContent{
    return JSON.parse(content || default_share("loading...", "Connecting to Decentralized net!"))
}

const timeout_seconds = 5 * 1000 // 5 seconds

export const useShareStore = defineStore('share_mqtt', () => {
    const client = ref<MqttClient | null>(null);
    const take_shared = ref(false);
    const current_share_id = ref(0);
    const topic = "shared_notes_sai_notepad";

    const cur_time_out = ref<NodeJS.Timeout>();

    const entries = ref(new Map<string, Entry>());
    const shareBuffer = ref<JSONContent>(make_json_content(""))


    async function mqtt_operations(op: number, id: string, to: string, message: string, share_id: number) {
        switch (op) {
            case 1: // Asking for note
                take_shared.value = true
                // Sending note
                let note = localStorage.getItem(`${id}_${topic}`)

                if (note == undefined) return

                const sm: ShareMessage = {
                    id: id,
                    op: Opcodes.SendingNote,
                    message: note,
                    version: 0.1,
                    share_id: share_id
                }

                client.value?.publish(to, await encrypt(JSON.stringify(sm), topic))
                break;
            case 2: // Peer Sending note
                if (!take_shared.value || current_share_id.value != share_id) return

                clearTimeout(cur_time_out.value)

                take_shared.value = false
                shareBuffer.value = make_json_content(message)

                localStorage.setItem(`${id}_${topic}`, message)
                break;
            default:
                break;
        }
    }

    function update_shared_localstorage() {
        localStorage.setItem(topic, JSON.stringify(Array.from(entries.value.values() || [])));
    }

    function storeEntry(rand: string, hash: string, title: string, body: string) {
        const id = `${rand}-${hash}`;

        if (entries.value.has(`${id}_${topic}`)) return

        const date = new Date();
        const createdAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        const user_pass= localStorage.getItem("userpass_sai_note") || "not_registered_user";

        entries.value.set(`${id}_${topic}`, {
            id,
            rand,
            hash,
            title,
            user_pass,
            createdAt
        } as Entry)

        localStorage.setItem(`${id}_${topic}`, body)
        update_shared_localstorage()

        // client.subscribe(`${id}_${topic}`);
    }

    async function getEntryById(id: string) {
        shareBuffer.value = make_json_content("")
        const entry = localStorage.getItem(`${id}_${topic}`)
        
        if (entry != undefined) {
            shareBuffer.value = make_json_content(entry)
            return
        }
        
        
        current_share_id.value = Math.random()
        
        const sm: ShareMessage = {
            id: id,
            op: Opcodes.GetNote,
            message: "",
            version: 0.1,
            share_id: current_share_id.value
        }
        
        client.value?.subscribe(`${id}_${topic}`);
        client.value?.publish(`${id}_${topic}`, await encrypt(JSON.stringify(sm), topic))

        cur_time_out.value = setTimeout(() => {
            if(!take_shared.value) return

            take_shared.value = false
            shareBuffer.value = make_json_content(default_share("Sorry data couldn't be found :(", "Possibilities: Wrong share url, Peers sharing notes are inactive."))
        }, timeout_seconds);
    }

    function deleteEntry(id: string) {
        entries.value.delete(`${id}_${topic}`)

        update_shared_localstorage()
        localStorage.removeItem(`${id}_${topic}`)
        client.value?.unsubscribe(`${id}_${topic}`);
    }


    function init() {
        if (client.value != null && !client.value.disconnected) return

        const mqttClient = mqtt.connect(defaultRelayUrls[0])
        client.value = markRaw(mqttClient); // Avoid Vue reactivity

        let saved_entry = JSON.parse(localStorage.getItem(topic) || "[]") as Entry[]

        for (let index = 0; index < saved_entry.length; index++) {

            if (entries.value.has(`${saved_entry[index].id}_${topic}`)) continue

            entries.value.set(`${saved_entry[index].id}_${topic}`, saved_entry[index])

            client.value.subscribe(`${saved_entry[index].id}_${topic}`);
        }


        client.value.on("message", async function (received_topic, message) {
            console.log("message",message.toString())
            let message_interface = JSON.parse((await decrypt(message.toString(), topic))) as ShareMessage;
            await mqtt_operations(message_interface.op, message_interface.id, received_topic, message_interface.message, message_interface.share_id)
        });
    }

    return { topic, entries, shareBuffer, init, storeEntry, deleteEntry, getEntryById }
})