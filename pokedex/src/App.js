import React, { useState, useEffect } from "react";
import MainPage from "./MainPage/MainPage";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import PokemonPage from "./PokemonPage/PokemonPage";

export const ListContext = React.createContext();

//window.localStorage.clear()

function App() {
    const [index, setIndex] = useState(
        () => JSON.parse(window.localStorage.getItem("index")) || 0
    );
    const [maxIndex, setMaxIndex] = useState();
    const [list, setList] = useState({});
    const [selected, setSelected] = useState(
        () => JSON.parse(window.localStorage.getItem("selected")) || ""
    );
    const [favorites, setFavorites] = useState(
        () => JSON.parse(window.localStorage.getItem("favorites")) || []
    );
    const [detailsForFavorites, setDetailsForFavorites] = useState(
        () =>
            JSON.parse(window.localStorage.getItem("detailsForFavorites")) || []
    );
    const [details, setDetails] = useState([]);
    const [selectedTab, setSelectedTab] = useState(
        () => JSON.parse(window.localStorage.getItem("selectedTab")) || ""
    );
    const [comments, setComments] = useState(
        () => JSON.parse(window.localStorage.getItem("comments")) || []
    );

    useEffect(() => {
        if (selectedTab === "") setSelectedTab(1);
    }, [selectedTab]);

    useEffect(() => {
        window.localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        window.localStorage.setItem(
            "detailsForFavorites",
            JSON.stringify(detailsForFavorites)
        );
    }, [detailsForFavorites]);

    useEffect(() => {
        window.localStorage.setItem("index", JSON.stringify(index));
    }, [index]);

    useEffect(() => {
        window.localStorage.setItem("selected", JSON.stringify(selected));
    }, [selected]);

    useEffect(() => {
        window.localStorage.setItem("selectedTab", JSON.stringify(selectedTab));
    }, [selectedTab]);

    useEffect(() => {
        window.localStorage.setItem("comments", JSON.stringify(comments))
    }, [comments])

    return (
        <div className={"container"}>
            <div className={"title"}>
                Pokedex
            </div>
            <BrowserRouter>
                <ListContext.Provider
                    value={{
                        favorites,
                        setFavorites,
                        detailsForFavorites,
                        setDetailsForFavorites,
                        index,
                        setIndex,
                        selected,
                        setSelected,
                        selectedTab,
                        setSelectedTab,
                        comments,
                        setComments
                    }}
                >
                    <Switch>
                        <Route exact path="/">
                            <MainPage
                                list={list}
                                setList={setList}
                                details={details}
                                setDetails={setDetails}
                                maxIndex={maxIndex}
                                setMaxIndex={setMaxIndex}
                            />
                        </Route>
                        <Route exact path={`/${selected.name}`}>
                            <PokemonPage details={details} />
                        </Route>
                        <Route exact path="/main-page">
                            <MainPage
                                list={list}
                                setList={setList}
                                details={details}
                                setDetails={setDetails}
                                maxIndex={maxIndex}
                                setMaxIndex={setMaxIndex}
                            />
                        </Route>
                    </Switch>
                </ListContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
