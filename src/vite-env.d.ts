/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_CACHE_DURATION: string
  readonly VITE_MAX_RETRIES: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
