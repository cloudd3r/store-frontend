const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const storeId = process.env.NEXT_PUBLIC_STORE_ID;
const fallbackApiUrl = process.env.NEXT_PUBLIC_API_URL;

export const API_URL =
  apiBaseUrl && storeId
    ? `${apiBaseUrl.replace(/\/$/, '')}/${storeId}`
    : fallbackApiUrl || '';
