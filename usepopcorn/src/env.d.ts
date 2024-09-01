/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OMDB_API_KEY: string;
    // Add more environment variables as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
