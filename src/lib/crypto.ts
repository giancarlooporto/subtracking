// Utility for converting ArrayBuffer to Base64
const bufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};

// Utility for converting Base64 to ArrayBuffer
const base64ToBuffer = (base64: string): ArrayBuffer => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
};

// Configuration
const ALGORITHM = 'AES-GCM';
const KDF_ALGORITHM = 'PBKDF2';
const HASH = 'SHA-256';
const KEY_LENGTH = 256;
const ITERATIONS = 100000;

// Derive a key from a password and salt
const deriveKey = async (password: string, salt: Uint8Array): Promise<CryptoKey> => {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: KDF_ALGORITHM },
        false,
        ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
        {
            name: KDF_ALGORITHM,
            salt: salt as any, // Cast to any to avoid strict BufferSource type mismatch in some envs
            iterations: ITERATIONS,
            hash: HASH
        },
        keyMaterial,
        { name: ALGORITHM, length: KEY_LENGTH },
        false,
        ["encrypt", "decrypt"]
    );
};

export interface EncryptedVault {
    iv: string;
    salt: string;
    data: string;
    version: number;
}

export const encryptData = async (data: any, password: string): Promise<EncryptedVault> => {
    try {
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const key = await deriveKey(password, salt);

        const enc = new TextEncoder();
        const encodedData = enc.encode(JSON.stringify(data));

        const encryptedContent = await window.crypto.subtle.encrypt(
            {
                name: ALGORITHM,
                iv: iv
            },
            key,
            encodedData
        );

        return {
            iv: bufferToBase64(iv.buffer),
            salt: bufferToBase64(salt.buffer),
            data: bufferToBase64(encryptedContent),
            version: 1
        };
    } catch (error) {
        console.error("Encryption failed:", error);
        throw new Error("Failed to encrypt data");
    }
};

export const decryptData = async (encryptedVault: EncryptedVault, password: string): Promise<any> => {
    try {
        const salt = new Uint8Array(base64ToBuffer(encryptedVault.salt));
        const iv = new Uint8Array(base64ToBuffer(encryptedVault.iv));
        const data = base64ToBuffer(encryptedVault.data);

        const key = await deriveKey(password, salt);

        const decryptedContent = await window.crypto.subtle.decrypt(
            {
                name: ALGORITHM,
                iv: iv
            },
            key,
            data
        );

        const dec = new TextDecoder();
        return JSON.parse(dec.decode(decryptedContent));
    } catch (error) {
        console.error("Decryption failed:", error);
        throw new Error("Incorrect password or corrupted file");
    }
};
