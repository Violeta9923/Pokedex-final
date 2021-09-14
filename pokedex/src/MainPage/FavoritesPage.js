import React, { useContext } from "react";
import style from "./FavoritesPage.module.css";
import { ListContext } from "../App";
import { getDetailsItem, editName } from "../helpers";
import { Link } from "react-router-dom";

const FavoritesPage = (props) => {
    const { details } = props;
    const {
        favorites,
        setFavorites,
        detailsForFavorites,
        setDetailsForFavorites,
        setSelected,
    } = useContext(ListContext);

    const handleClick = (element) => {
        setFavorites(
            favorites.filter(function (item) {
                return item.name !== element.name;
            })
        );
        setDetailsForFavorites(
            detailsForFavorites.filter(function (item) {
                return item.name !== element.name;
            })
        );
    };

    return (
        <div className={style.container}>
            {detailsForFavorites.length &&
                detailsForFavorites.map((element) => {
                    return (
                        <div className={style.item} key={Math.random()}>
                            <img
                                src={
                                    getDetailsItem(
                                        element.name,
                                        detailsForFavorites
                                    ) &&
                                    getDetailsItem(
                                        element.name,
                                        detailsForFavorites
                                    ).sprites.front_default
                                }
                                alt={element.name}
                                className={style.image}
                            />
                            <div className={style.box}>
                                <Link
                                    to={`/${element.name}`}
                                    className={style.name}
                                    onClick={() =>
                                        setSelected(
                                            getDetailsItem(
                                                element.name,
                                                details
                                            )
                                        )
                                    }
                                >
                                    {editName(element.name)}
                                </Link>
                                <div
                                    className={style.removeBtn}
                                    onClick={() => handleClick(element)}
                                >
                                    Remove
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default FavoritesPage;
