import { Category } from '@/types';

const URL =
  'http://localhost:3001/api/45a1f0a4-c54a-4295-852b-6ae82ca56b3f/categories';

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  return await res.json();
};

export default getCategories;
