import { useState } from "react";
import "./index.css";

const jobCategories = ["Podstawówka", "Liceum", "Technikum", "Zawodówka"];


const Filter = ({
  setFilteredJobs,
  handleJobFilter,
  handleExperienceFilter,
  searchEvent,
}) => {
  const [checkedState, setCheckedState] = useState(
    new Array(jobCategories.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    handleExperienceFilter(updatedCheckedState);
  };
  return (
    <>
      <div className="filter-page">
        <div className="search-box">

          <div className="filter">
            <div className="job-category">
              <h4>Kategorie</h4>
              <ul>
                <li onClick={handleJobFilter}>Wszystkie</li>
                <li onClick={handleJobFilter}>Matematyka</li>
                <li onClick={handleJobFilter}>Język Polski</li>
                <li onClick={handleJobFilter}>Historia</li>
                <li onClick={handleJobFilter}>Chemia</li>
                <li onClick={handleJobFilter}>Biologia</li>
                <li onClick={handleJobFilter}>Fizyka</li>
                <li onClick={handleJobFilter}>Informatyka</li>
                <li onClick={handleJobFilter}>Język Obcy</li>
                <li onClick={handleJobFilter}>Inne</li>
              </ul>
            </div>

            <div className="job-category">
              <h4>Szkoła</h4>
              <ul className="checkbox">
                <li>
                  <input
                    name="0-1"
                    type="checkbox"
                    checked={checkedState[0]}
                    onChange={() => handleOnChange(0)}
                  />
                  Podstawówka
                </li>
                <li>
                  <input
                    name="2-3"
                    type="checkbox"
                    checked={checkedState[1]}
                    onChange={() => handleOnChange(1)}
                  />
                  Liceum
                </li>
                <li>
                  <input
                    name="4-5"
                    type="checkbox"
                    checked={checkedState[2]}
                    onChange={() => handleOnChange(2)}
                  />
                  Technikum
                </li>
                <li>
                  <input
                    name="4-5"
                    type="checkbox"
                    checked={checkedState[3]}
                    onChange={() => handleOnChange(3)}
                  />
                  Zawodówka
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
