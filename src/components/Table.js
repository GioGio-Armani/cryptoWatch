import React from "react";
import { useState } from "react";
import TableLine from "./TableLine";
import ToTop from "./ToTop";
import { useSelector } from "react-redux";
import { isStableCoin } from "./Utils";

const Table = ({ coinsData }) => {
  const [rangeNumber, setRangeNumber] = useState(100);
  const [orderBy, setOrderBy] = useState("");

  const showStable = useSelector((state) => state.stableReducer.showStable);
  const showFavList = useSelector((state) => state.listReducer.showListe);

  const tableHeader = [
    "Prix",
    "MarketCap",
    "Volume",
    "1h",
    "1j",
    "1s",
    "1m",
    "6m",
    "1y",
    "ATH",
  ];

  return (
    <div className="table-container">
      <ul className="table-header">
        <div className="range-container">
          <span>
            Top{" "}
            <input
              type="text"
              value={rangeNumber}
              onChange={(e) => setRangeNumber(e.target.value)}
            />
          </span>
          <input
            type="range"
            min="1"
            max="250"
            value={rangeNumber}
            onChange={(e) => setRangeNumber(e.target.value)}
          />
          <ToTop />
        </div>
        {tableHeader.map((el, index) => (
          <li key={index}>
            <input
              type="radio"
              name="header-el"
              id={el}
              defaultChecked={
                el === orderBy || el === orderBy + "reverse" ? true : false
              }
              onClick={() => {
                if (orderBy === el) {
                  setOrderBy(el + "reverse");
                } else {
                  setOrderBy(el);
                }
              }}
            />
            <label htmlFor={el}>{el}</label>
          </li>
        ))}
      </ul>
      {coinsData &&
        coinsData
          .slice(0, rangeNumber)
          .filter((coin) => {
            if (showStable) {
              return coin;
            } else {
              if (isStableCoin(coin.symbol)) {
                return coin;
              }
            }
          })
          .filter((coin) => {
            if (showFavList) {
              let list = window.localStorage.coinList.split(",");
              if (list.includes(coin.id)) {
                return coin;
              }
            } else {
              return coin;
            }
          })
          .sort((a, b) => {
            switch (orderBy) {
              case "Prix":
                return a.current_price - b.current_price;
              case "Prixreverse":
                return b.current_price - a.current_price;
              case "MarketCap":
                return a.market_cap - b.market_cap;
              case "MarketCapreverse":
                return b.market_cap - a.market_cap;
              case "Volume":
                return a.total_volume - b.total_volume;
              case "Volumereverse":
                return b.total_volume - a.total_volume;
              case "1h":
                return (
                  a.price_change_percentage_1h_in_currency -
                  b.price_change_percentage_1h_in_currency
                );
              case "1hreverse":
                return (
                  b.price_change_percentage_1h_in_currency -
                  a.price_change_percentage_1h_in_currency
                );
              case "1j":
                return (
                  a.price_change_percentage_24h_in_currency -
                  b.price_change_percentage_24h_in_currency
                );
              case "1jreverse":
                return (
                  b.price_change_percentage_24h_in_currency -
                  a.price_change_percentage_24h_in_currency
                );
              case "1s":
                return (
                  a.price_change_percentage_7d_in_currency -
                  b.price_change_percentage_7d_in_currency
                );
              case "1sreverse":
                return (
                  b.price_change_percentage_7d_in_currency -
                  a.price_change_percentage_7d_in_currency
                );
              case "1m":
                return (
                  a.price_change_percentage_30d_in_currency -
                  b.price_change_percentage_30d_in_currency
                );
              case "1mreverse":
                return (
                  b.price_change_percentage_30d_in_currency -
                  a.price_change_percentage_30d_in_currency
                );
              case "6m":
                return (
                  a.price_change_percentage_200d_in_currency -
                  b.price_change_percentage_200d_in_currency
                );
              case "6mreverse":
                return (
                  b.price_change_percentage_200d_in_currency -
                  a.price_change_percentage_200d_in_currency
                );
              case "1y":
                return (
                  a.price_change_percentage_1y_in_currency -
                  b.price_change_percentage_1y_in_currency
                );
              case "1yreverse":
                return (
                  b.price_change_percentage_1y_in_currency -
                  a.price_change_percentage_1y_in_currency
                );
              case "ATH":
                return a.ath_change_percentage - b.ath_change_percentage;
              case "ATHreverse":
                return b.ath_change_percentage - a.ath_change_percentage;
              default:
                null;
                break;
            }
          })
          .map((coin, index) => (
            <TableLine coin={coin} index={index} key={index} />
          ))}
    </div>
  );
};

export default Table;
