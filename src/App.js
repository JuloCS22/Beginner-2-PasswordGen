import { useState } from "react";
import { tableCode } from "./data";
import "./styles.css";

export default function App() {
  const [password, setPassword] = useState([
    { id: 0, text: "FirstExample1234" },
  ]);
  const [passwordLength, setPasswordLength] = useState(12);
  const [isSelected, setIsSelected] = useState(true);

  let idNumber = 1;
  let i = 0;
  let lastPasswordNumber = password.length - 1;
  const min = 0;
  const max = tableCode.length - 1;

  function generateCode() {
    let newCode = "";
    i = 0;
    {
      while (i < passwordLength) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        {
          randomNumber >= max / 3
            ? (newCode += tableCode[randomNumber])
            : (newCode += tableCode[randomNumber].toUpperCase());
        }
        i++;
      }
    }
    setPassword([...password, { id: idNumber, text: newCode }]);
    idNumber++;
  }

  function copyPassword(text) {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Password copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  }

  function handleClickTwelve() {
    if (passwordLength !== 12) {
      setPasswordLength(12);
    } else {
      return;
    }
    setIsSelected(!isSelected);
  }

  function handleClickTwenty() {
    if (passwordLength !== 20) {
      setPasswordLength(20);
    } else {
      return;
    }
    setIsSelected(!isSelected);
  }

  return (
    <div>
      <h1>PasswordGen</h1>
      <h2>V 2.0</h2>
      <div className="mainButtons">
        <div className="passwordStyle">
          <button
            className={isSelected ? "selectedButton" : ""}
            onClick={handleClickTwelve}
          >
            12 characters
          </button>
          <button
            className={isSelected ? "" : "selectedButton"}
            onClick={handleClickTwenty}
          >
            20 characters
          </button>
        </div>
        <button className="generateButton" onClick={generateCode}>
          Generate a password with {passwordLength} characters
        </button>
      </div>
      <ul>
        <h3>
          {password[lastPasswordNumber].text}
          <button
            className="copyButton"
            onClick={() => copyPassword(password[lastPasswordNumber].text)}
          >
            Copy
          </button>
        </h3>
        <h4>Old codes : </h4>
        {password.slice(0, lastPasswordNumber).map((pass) => (
          <li key={pass.id}>
            {pass.text}
            <button
              className="copyButton"
              onClick={() => copyPassword(pass.text)}
            >
              Copy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
