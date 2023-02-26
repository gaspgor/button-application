import './App.css';
import {useCallback, useEffect, useRef, useState} from "react";

function App() {
  const [clicks, setClicks] = useState(0)
  const [validation, setValidation] = useState(false)
  const [clicksValidation, setClicksValidation] = useState(false)
  const button1 = useRef(null)
  const button2 = useRef(null)

  useEffect(() => {
    const clicksFromStorage = localStorage.getItem("clicks");
    const button1Validation = parseInt(localStorage.getItem("validation"), 10);
    if (clicksFromStorage) {
      setClicks(parseInt(clicksFromStorage, 10))
    }
    setValidation(button1Validation == 1 || false)
  }, [])

  useEffect(() => {
    if (validation) {
      button1.current.classList.add("hidden")
    }
  }, [validation])

  const counterButtonCallBack = useCallback((e) => {
    setClicks(clicks + 1)
    localStorage.setItem("clicks", (clicks + 1).toString());
    setClicksValidation(true)
    button2.current.classList.add("hidden")
  }, [clicks])

  const button1CLickCallBack = useCallback((e) => {
    localStorage.setItem("validation", "1");
    setValidation(true)
  }, [])

  return (
    <div className="App">
      <div className="buttons">
        <div className="item">
          <button ref={button1} onClick={button1CLickCallBack}>Button 1</button>
          <p className={`expired ${!validation ? "hidden" : ""}`}>Expired</p>
        </div>
        <div className="item">
          <button ref={button2} onClick={counterButtonCallBack}>Button 2</button>
          <p className={!clicksValidation ? "hidden" : ""}>Count {clicks}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
