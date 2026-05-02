import { API_URL } from "@/lib/api-url";
import { Product } from "@/types";

const URL = `${API_URL}/products`

const getProduct = async (id: string): Promise<Product> => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
}

export default getProduct;
