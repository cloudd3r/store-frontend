import { API_URL } from "@/lib/api-url";
import { Size } from "@/types";

const URL = `${API_URL}/sizes`

const getSizes = async (): Promise<Size[]> => {
    const res = await fetch(URL);
    return res.json();
}

export default getSizes;
