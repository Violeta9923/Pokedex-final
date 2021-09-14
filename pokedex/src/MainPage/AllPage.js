import React, { useContext, useEffect, useState } from "react";
import { getPokeList, getDetailsFromUrl } from "../Api";
import style from "./AllPage.module.css";
import { editName, isFavoritFunction, getDetailsItem } from "../helpers";
import { ListContext } from "../App";
import { Link } from "react-router-dom";

const Item = (props) => {
    const { element, details } = props;
    const {
        favorites,
        setFavorites,
        detailsForFavorites,
        setDetailsForFavorites,
        setSelected,
    } = useContext(ListContext);
    const [isFavorit, setIsFavoit] = useState(
        isFavoritFunction(favorites, element.name)
    );

    useEffect(() => {
        setIsFavoit(isFavoritFunction(detailsForFavorites, element.name));
    }, [detailsForFavorites, element.name]);

    const handleClick = (element) => {
        if (favorites.length) {
            if (
                detailsForFavorites.find((item) => item.name === element.name)
            ) {
                let tmp = [...favorites].filter(function (value) {
                    return value.name !== element.name;
                });
                setFavorites(tmp);
                if (detailsForFavorites.length) {
                    let tmp = [...detailsForFavorites].filter(function (value) {
                        return value.name !== element.name;
                    });
                    setDetailsForFavorites(tmp);
                }
            } else {
                let tmp = [...favorites];
                tmp.push(element);
                setFavorites(tmp);
                tmp = [...detailsForFavorites];
                tmp.push(getDetailsItem(element.name, details));
                setDetailsForFavorites(tmp);
            }
        } else {
            let tmp = [];
            tmp.push(element);
            setFavorites(tmp);
            tmp = [];
            tmp.push(getDetailsItem(element.name, details));
            setDetailsForFavorites(tmp);
        }
    };

    return (
        <div className={style.itemContainer}>
            <img
                src={
                    getDetailsItem(element.name, details) &&
                    getDetailsItem(element.name, details).sprites.front_default
                }
                alt={element.name}
                className={style.image}
            />
            <div className={style.box}>
                <div className={style.name}>
                    <Link
                        to={`/${element.name}`}
                        onClick={() =>
                            setSelected(getDetailsItem(element.name, details))
                        }
                    >
                        {editName(element.name)}
                    </Link>
                </div>

                <div
                    className={`${style.button} ${isFavorit ? style.removeBtn : null}`}
                    onClick={() => handleClick(element)}
                >
                    {isFavorit ? "Remove" : "Add"}
                </div>
            </div>
        </div>
    );
};

const MainPage = (props) => {
    const { list, details, setDetails, setList, setMaxIndex } = props;
    const { index, selected, setSelected } = useContext(ListContext);

    useEffect(() => {
        const getList = async () => {
            const response = await getPokeList(index);
            if (response) {
                setList(response);
                setMaxIndex(response.count);
            }
        };
        getList();
    }, [setList, index, setMaxIndex]);

    useEffect(() => {
        const getDetails = async () => {
            if (list.results) {
                let promiseResponse = await Promise.all(
                    list.results.map((element) => {
                        return getDetailsFromUrl(element.url);
                    })
                );
                if (promiseResponse) {
                    setDetails((prev) =>
                        prev.concat(
                            promiseResponse.filter(
                                (item) => prev.indexOf(item) < 0
                            )
                        )
                    );
                }
            }
        };
        getDetails();
    }, [setDetails, list, index]);

    return (
        <div className={style.container}>
            {list.results &&
                list.results.map((element) => {
                    return (
                        <div className={style.item} key={Math.random()}>
                            <Item
                                details={details}
                                element={element}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </div>
                    );
                })}
        </div>
    );
};

export default MainPage;
