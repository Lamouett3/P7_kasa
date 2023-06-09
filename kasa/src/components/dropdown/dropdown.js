import React, { useState, useEffect } from "react";
import "./dropdown.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function Dropdown({ id, label, property }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`../../logement.json`);
        const data = await response.json();
        const item = data.find((item) => item.id === id);
        setData(item[property]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [id, property]);

  return (
    <div className="dropdown">
      <button className="dropdown__button" onClick={() => setIsOpen(!isOpen)}>
        {label}
        <span className="dropdown__icon">
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </span>
      </button>
      {isOpen && (
        <div className="dropdown__content">
          {Array.isArray(data) ? (
            <ul className="dropdown__list">
              {data.map((value, index) => (
                <li key={index} className="dropdown__list-item">
                  {value}
                </li>
              ))}
            </ul>
          ) : (
            <p>{data}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
