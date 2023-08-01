import React, { useEffect, useState } from "react";
import useCookies from "react-cookie/cjs/useCookies";
import { useNavigate } from "react-router";
import { handleGetPacks, handleGetSales } from "../api";
import PackListing from "../components/cards/PackListing";
import SaleListing from "../components/cards/SaleListing";
import { calculateInsights, handleValidateDate } from "../utils";
import InsightCard from "../components/cards/InsightCard";
import DateForm from "../components/cards/DateForm";

const Cards = () => {
  const navigate = useNavigate();
  const [packs, setPacks] = useState([]);
  const [sales, setSales] = useState([]);
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [insights, setInsights] = useState({
    mostSoldPackUSD: 0,
    mostSoldPackQuantity: 0,
    leastSoldPackUSD: 0,
    leastSoldPackQuantity: 0,
    totalSalesInUSD: 0,
  });

  useEffect(() => {
    const packsResponse = handleGetPacks(cookies, navigate);
    packsResponse.then((packsResponse) => {
      setPacks(packsResponse);
    });
    const salesResponse = handleGetSales(cookies, navigate);
    salesResponse.then((salesResponse) => {
      setSales(salesResponse);
    });
  }, []);

  const handleCardSubmit = (e) => {
    e.preventDefault();
    const isValid = handleValidateDate(startDate, endDate);
    if (isValid) {
      const _newStartDate = new Date(startDate);
      const _newEndDate = new Date(endDate);
      const insights = calculateInsights(
        _newStartDate,
        _newEndDate,
        sales,
        packs
      );
      setInsights(insights);
    }
  };

  return (
    <div className="d-flex flex-column">
      <div
        className="d-flex m-4 justify-content-around flex-wrap align-items-center h-100"
        style={{ gap: "2rem" }}
      >
        <DateForm
          handleCardSubmit={handleCardSubmit}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
        />
        {Boolean(insights?.mostSoldPackUSD) && (
          <InsightCard insights={insights} />
        )}
      </div>

      <h2 className="text-center pt-4">Packs {`(${packs.length})`}</h2>

      <div
        className="d-flex m-4 justify-content-around flex-wrap align-items-center h-100"
        style={{ gap: "2rem" }}
      >
        {packs &&
          packs.map((pack) => {
            return <PackListing key={pack.id} pack={pack} />;
          })}
      </div>
      <h2 className="text-center pt-4">Sales {`(${sales.length})`}</h2>

      <div
        className="d-flex m-4 justify-content-around flex-wrap align-items-start h-100"
        style={{ gap: "2rem" }}
      >
        {sales &&
          sales.map((sale, index) => {
            return <SaleListing key={index} sale={sale} />;
          })}
      </div>
    </div>
  );
};

export default Cards;
