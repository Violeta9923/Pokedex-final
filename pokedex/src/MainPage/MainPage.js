import React, { useContext } from "react";
import style from "./MainPage.module.css";
import { ListContext } from "../App";
import AllPage from "./AllPage";
import FavoritesPage from "./FavoritesPage";

const MainPage = (props) => {
    const { list, details, setDetails, setList, maxIndex, setMaxIndex } = props;

    const { index, setIndex, selectedTab, setSelectedTab } =
        useContext(ListContext);

    return (
        <div className={style.container}>
            <div className={style.tabsBar}>
                <div
                    className={`${style.tab} ${
                        selectedTab === 1 ? style.selected : null
                    }`}
                    onClick={() => setSelectedTab(1)}
                >
                    All
                </div>
                <div
                    className={`${style.tab} ${
                        selectedTab === 2 ? style.selected : null
                    }`}
                    onClick={() => setSelectedTab(2)}
                >
                    Favorites
                </div>
            </div>
            {selectedTab === 1 && (
                <div>
                    <AllPage
                        list={list}
                        setList={setList}
                        details={details}
                        setDetails={setDetails}
                        maxIndex={maxIndex}
                        setMaxIndex={setMaxIndex}
                    />
                    <div className={style.btnsContainer}>
                        {index > 0 && (
                            <div
                                onClick={() => setIndex(index - 20)}
                                className={style.prevBtn}
                            >
                                Prev
                            </div>
                        )}
                        {index < maxIndex - 40 && (
                            <div
                                onClick={() => setIndex(index + 20)}
                                className={style.nextBtn}
                            >
                                Next
                            </div>
                        )}
                    </div>
                </div>
            )}

            {selectedTab === 2 && <FavoritesPage details={details} />}
        </div>
    );
};

export default MainPage;
