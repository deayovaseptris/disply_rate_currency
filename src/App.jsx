import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [rates, setRates] = useState([]);
  const currencies = ["CAD", "EUR", "IDR", "JPY", "CHF", "GBP"];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await fetch(
          `${apiUrl}?apikey=${apiKey}&symbols=${currencies.join(",")}`
        );
        const data = await response.json();
        const filteredRates = currencies.map((currency) => ({
          currency,
          exchangeRate: parseFloat(data.rates[currency]),
          weBuy: parseFloat(data.rates[currency]) * 1.05,
          weSell: parseFloat(data.rates[currency]) * 0.95,
        }));
        setRates(filteredRates);
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchRates();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rate Currency</h1>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.currency}>
                <td>{rate.currency}</td>
                <td>{rate.weBuy.toFixed(4)}</td>
                <td>{rate.exchangeRate.toFixed(4)}</td>
                <td>{rate.weSell.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Rates are based from 1 USD</p>
        <p>This application uses API from https://currencyfreaks.com</p>
      </header>
    </div>
  );
};

export default App;
