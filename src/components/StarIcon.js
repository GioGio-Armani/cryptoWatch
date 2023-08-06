import React, { useEffect } from "react";
import { useState } from "react";

const StarIcon = ({ coinId }) => {
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    if (window.localStorage.coinList) {
      let favList = window.localStorage.coinList.split(",");
      if (favList.includes(coinId)) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    }
  }, []);

  const idChecker = (id) => {
    let favList = null;
    if (window.localStorage.coinList) {
      favList = window.localStorage.coinList.split(",");
    }

    if (favList) {
      if (favList.includes(id)) {
        window.localStorage.coinList = favList.filter((coin) => coin !== id);
        setIsLike(false);
      } else {
        window.localStorage.coinList = [...favList, coinId];
        setIsLike(true);
      }
    } else {
      window.localStorage.coinList = coinId;
      setIsLike(true);
    }
  };

  return (
    <img
      onClick={() => idChecker(coinId)}
      src={isLike ? "./assets/star-full.svg" : "./assets/star-empty.svg"}
      alt="icon star"
    />
  );
};

export default StarIcon;
