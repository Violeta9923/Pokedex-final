import axios from "axios";

const client = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
});

export const getPokeList = async (index) => {
    try {
        const response = await client.get(
            `pokemon?limit=20&offset=${index}`
        );
        return response.data;
    } catch (e) {
        return false;
    }
};

export const getAllItems = async () => {
    try {
        const response = await client.get(
        );
        return response.data;
    } catch (e) {
        return false;
    }
};

export const getDetailsFromUrl = async (url) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (e) {
        return false;
    }
};
