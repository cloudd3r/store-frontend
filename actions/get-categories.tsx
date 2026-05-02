import { Category } from '@/types';
import { API_URL } from '@/lib/api-url';

const URL = `${API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  return await res.json();
};

export default getCategories;
