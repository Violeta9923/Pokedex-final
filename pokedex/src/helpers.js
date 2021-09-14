export const getDetailsItem = (name, details) => {
    if (details) {
        return details.find((element) => element.name === name);
    }
};

export const editName = (name) => {
    if(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return "";
};

export const isFavoritFunction = (favorites, name) => {
    if (favorites && favorites.length) {
        if (favorites.find((element) => element.name === name)) {
            return true;
        }
    }
    return false;
};

