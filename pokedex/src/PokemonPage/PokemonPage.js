import React, { useContext, useEffect, useState } from "react";
import style from "./PokemonPage.module.css";
import { ListContext } from "../App";
import { editName, getDetailsItem, isFavoritFunction } from "../helpers";
import Form from "./Form";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";

const PokemonPage = (props) => {
    const { details } = props;
    const {
        detailsForFavorites,
        selected,
        favorites,
        setFavorites,
        setDetailsForFavorites,
        comments,
    } = useContext(ListContext);

    const [currentComments, setCurrentComments] = useState({});

    useEffect(() => {
        if (comments.find((element) => element[selected.name]))
            setCurrentComments(
                comments.find((element) => element[selected.name])
            );
    }, [comments, selected.name]);

    const [isFavorit, setIsFavoit] = useState(
        isFavoritFunction(detailsForFavorites, selected.name)
    );

    const handleClick = (name) => {
        if (detailsForFavorites.length) {
            if (detailsForFavorites.find((item) => item.name === name)) {
                let tmp = [...favorites].filter(function (value) {
                    return value.name !== name;
                });
                setFavorites(tmp);
                if (detailsForFavorites.length) {
                    let tmp = [...detailsForFavorites].filter(function (value) {
                        return value.name !== name;
                    });
                    setDetailsForFavorites(tmp);
                }
            } else {
                let tmp = [...favorites];
                tmp.push(name);
                setFavorites(tmp);
                tmp = [...detailsForFavorites];
                tmp.push(getDetailsItem(name, details));
                setDetailsForFavorites(tmp);
            }
        } else {
            let tmp = [];
            tmp.push(name);
            setFavorites(tmp);
            tmp = [];
            tmp.push(getDetailsItem(name, details));
            setDetailsForFavorites(tmp);
        }
        setIsFavoit(!isFavorit);
    };

    return (
        <div className={style.container}>
            <Link to={"/main-page"}>
                <ArrowBackIcon className={style.icon} />
            </Link>
            <img
                src={selected.sprites.front_default}
                alt={selected.name}
                className={style.image}
            />
            <div className={style.box}>
                <div className={style.info}>
                    <div className={style.name}>
                        <div className={style.text}>Name:</div>{" "}
                        {editName(selected.name)}
                    </div>
                    <div className={style.props}>
                        <div className={style.height}>
                            <div className={style.text}>Height:</div>{" "}
                            {selected.height}
                        </div>
                        <div className={style.weight}>
                            <div className={style.text}>Weight:</div>{" "}
                            {selected.weight}
                        </div>
                    </div>
                    {selected.moves && (
                        <div className={style.moves}>
                            <div className={style.text}>Moves: </div>
                            <div>
                                <div>{selected.moves[0].move.name}</div>
                                <div>{selected.moves[1].move.name}</div>
                                <div>{selected.moves[2].move.name}</div>
                            </div>
                        </div>
                    )}
                    <div className={style.stats}>
                        <div className={style.text}>Stats: </div>
                        <div>
                            {selected.stats &&
                                selected.stats.map((element) => {
                                    return (
                                        <div key={element.stat.name}>
                                            {element.stat.name}{" "}
                                            {element.base_stat}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div
                        className={`${style.button} ${
                            isFavorit ? style.remove : null
                        }`}
                        onClick={() => handleClick(selected.name)}
                    >
                        {isFavorit ? "Remove" : "Add"}
                    </div>
                </div>
            </div>

            <Form />
            <div className={style.commentsBox}>
                {currentComments[selected.name] &&
                    currentComments[selected.name].map((element) => {
                        return (
                            <div key={Math.random()} className={style.comments}>
                                <div className={style.details}>
                                    {editName(element.details)}
                                </div>
                                <div className={style.infoBox}>
                                    <div>{element.number}</div>
                                    <div>{element.name} </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default PokemonPage;
