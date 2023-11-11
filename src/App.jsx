import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurrencyRates() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [poundRate, setPoundRate] = useState(0);

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/BRL');
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error('Erro ao obter cotações:', error);
      }
    }

    async function fetchPoundRate() {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/GBP');
        setPoundRate(response.data.rates.BRL);
      } catch (error) {
        console.error('Erro ao obter cotação da Libra Esterlina:', error);
      }
    }

    fetchExchangeRates();
    fetchPoundRate();

    document.title = 'Cotação das Moedas em tempo real';
  }, []);

  return (
    <div>
      <h1>Cotação Atual em Relação ao Real Brasileiro (BRL)</h1>
      <div className="currency-rates">
        <div className="currency-rate">
          <h2>Dólar</h2>
          <p>1 Dólar = {exchangeRates['USD']} BRL</p>
        </div>
        <div className="currency-rate">
          <h2>Euro</h2>
          <p>1 Euro = {exchangeRates['EUR']} BRL</p>
        </div>
        <div className="currency-rate">
          <h2>Libra</h2>
          <p>1 Libra = {poundRate} BRL</p>
        </div>
      </div>
    </div>
  );
}

export default CurrencyRates;


    