function strToBuf(str: string): Uint8Array {
    return new TextEncoder().encode(str);
}
function bufToBase64(buf: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buf)));
}
function base64ToBuf(b64: string): Uint8Array {
    return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
}

const fixedIV = new Uint8Array(12);

async function deriveKeyFromPassword(password: string): Promise<CryptoKey> {
    const salt = strToBuf("static-salt"); 
    const baseKey = await crypto.subtle.importKey(
        "raw",
        strToBuf(password),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}


export async function encrypt(text: string, password: string): Promise<string> {
    const key = await deriveKeyFromPassword(password);
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: fixedIV },
      key,
      strToBuf(text)
    );
    return bufToBase64(encrypted);
}

export async function decrypt(ciphertext: string, password: string): Promise<string> {
    const key = await deriveKeyFromPassword(password);
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: fixedIV },
      key,
      base64ToBuf(ciphertext)
    );
    return new TextDecoder().decode(decrypted);
  }