import { useState } from "react";
import "./index.css";

const tutorCategories = ["Podstawówka", "Liceum", "Technikum", "Zawodówka"];


const Filter = ({
  setFilteredJobs,
  handleTutorFilter,
  handleExperienceFilter,
  searchEvent,
}) => {
  const [checkedState, setCheckedState] = useState(
    new Array(tutorCategories.length).fill(false)
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
            <div className="tutor-category">
              <h4>Przedmioty</h4>
              <ul>
                <li onClick={handleTutorFilter}>Wszystkie</li>
                <li onClick={handleTutorFilter}>Matematyka</li>
                <li onClick={handleTutorFilter}>Język Polski</li>
                <li onClick={handleTutorFilter}>Historia</li>
                <li onClick={handleTutorFilter}>Chemia</li>
                <li onClick={handleTutorFilter}>Biologia</li>
                <li onClick={handleTutorFilter}>Fizyka</li>
                <li onClick={handleTutorFilter}>Informatyka</li>
                <li onClick={handleTutorFilter}>Język Obcy</li>
                <li onClick={handleTutorFilter}>Inne</li>
              </ul>
            </div>

            <div className="tutor-category">
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
