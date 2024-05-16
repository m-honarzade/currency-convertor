import { useEffect, useState } from "react";

function App() {
  const [amountInput, setAmountInput] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const amountInputHandler = (e) => {
    setAmountInput(+e.target.value);
  };

  useEffect(() => {
    const transformCurrency = async () => {
      const host = "api.frankfurter.app";
      setIsLoading(true);

      const res = await fetch(
        `https://${host}/latest?amount=${+amountInput}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setIsLoading(false);
      setOutput(data.rates[toCurrency]);
    };

    if (fromCurrency === toCurrency) return setOutput("1");
    transformCurrency();
  }, [amountInput, fromCurrency, toCurrency]);

  return (
    <>
      <div className="   border border-purple-700 bg-purple-950  border-1 rounded-md max-w-xl h-40 mx-auto mt-20 text-center">
        <div className="flex-col flex justify-center items-center px-6 py-12">
          <div className="flex flex-row gap-x-2">
            <input
              type="text"
              placeholder="amount"
              value={amountInput}
              onChange={amountInputHandler}
              disabled={isLoading}
              className=" p-2  text-sm w-40 border border-purple-400 "
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              disabled={isLoading}
              className="w-24 border border-purple-400 text-gray-500 text-sm "
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="CAD">CAD</option>
            </select>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              disabled={isLoading}
              className="w-24 border border-purple-400 text-gray-500 text-sm "
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="CAD">CAD</option>
            </select>
          </div>
          <div className="mt-6">
            <p className="text-white text-sm font-semibold">
              {amountInput}{" "}
              <span className="text-gray-300 font-semibold text-xs">
                {fromCurrency}
              </span>{" "}
              === {output}
              <span className="text-gray-300 font-semibold text-xs">
                {" "}
                {toCurrency}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
