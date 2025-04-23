/* op codes:
    1: Asking for note data to other clients
    2: Sending note data */
export enum Opcodes {
    GetNote = 1,
    SendingNote,
}

export interface ShareMessage {
    id: string; // id of the note
    op: Opcodes; // operation code of the message 
    message: string; // extra message to be sent
    version: number; // for compatibility
    share_id: number; // for security
}