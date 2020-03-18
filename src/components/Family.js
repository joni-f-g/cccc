import React, { useState } from "react";

import "./Family.css";

const Family = ({
  familyNames,
  locale,
  setAvailabilities,
  setCurrentFamily,
  setFamilyNames,
  setShowSchedule
}) => {
  let previous;
  let next;
  let numberOfCaregivers;
  let family;
  switch (locale ? locale.code : "en-US") {
    case "es":
      previous = "Previo";
      next = "Siguiente";
      numberOfCaregivers = "Número de cuidadores";
      family = "Familia";
      break;
    case "zh-CN":
      previous = "前";
      next = "后";
      numberOfCaregivers = "可承担托儿工作的人数";
      family = "家庭";
      break;
    case "pt":
      previous = "Anterior";
      next = "Seguinte";
      numberOfCaregivers = "Número de cuidadores/famílias";
      family = "Família";
      break;
    case "de":
      previous = "Vorheriger";
      next = "Nächster";
      numberOfCaregivers = "Anzahl der Betreuer";
      family = "Familie";
      break;
    case "fr":
      previous = "Précédente";
      next = "Suivante";
      numberOfCaregivers = "Nombre de Gardiens";
      family = "Famille";
      break;
    case "el":
      previous = "Προηγούμενο";
      next = "Επόμενο";
      numberOfCaregivers = "Αριθμός νταντάδων";
      family = "Οικογένεια";
      break;
    default:
      previous = "PREV";
      next = "GO";
      numberOfCaregivers = "Number of caregivers";
      family = "Familia";
  }
  const [families, setFamilies] = useState(familyNames || null);
  const [numberOfFamilies, setNumberOfFamilies] = useState(4);
  const [selectedFamily, setSelectedFamily] = useState(
    families ? families[0] : null
  );

  const initializeFamilies = () => {
    const availabilities = [];
    const fams = [];
    for (let i = 0; i < numberOfFamilies; i++) {
      fams.push({ id: i, value: `${family} #${i + 1}` });
      availabilities.push([]);
    }
    setFamilies(fams);
    setFamilyNames(fams);
    setAvailabilities(availabilities);
    setSelectedFamily(fams[0]);
    setCurrentFamily(fams[0]);
  };

  const clearFamilies = () => {
    setFamilies(null);
    setFamilyNames(null);
    setNumberOfFamilies(null);
    setAvailabilities([]);
    setCurrentFamily(null);
    setShowSchedule(false);
  };

  return (
    <>
      {!families && (
        <form>
          <label>
            {numberOfCaregivers}
            <input
              type="number"
              min="1"
              max="7"
              name="numOfFamilies"
              value={numberOfFamilies || ""}
              onChange={e => setNumberOfFamilies(parseInt(e.target.value))}
            />
          </label>
        </form>
      )}
      {numberOfFamilies > 0 &&
        !families && (
          <div
            className="textButton"
            role="button"
            tabIndex="0"
            onClick={() => initializeFamilies()}
            onKeyDown={e => e.keyCode === 13 && initializeFamilies()}
          >{`${next} ->`}</div>
        )}
      <div className="container">
        {numberOfFamilies > 0 &&
          families && (
            <div
              className="textButton"
              role="button"
              tabIndex="0"
              onClick={() => clearFamilies()}
              onKeyDown={e => e.keyCode === 13 && clearFamilies()}
            >{`<- ${previous}`}</div>
          )}
        <div className="familyList">
          {families &&
            families.length &&
            families.map((fam, i) => (
              <div key={i} className="familyItem">
                <input
                  type="text"
                  value={fam.value}
                  onChange={e => {
                    const update = families.reduce((acc, curr) => {
                      if (curr.id === i) {
                        curr.value = e.target.value;
                      }
                      acc.push(curr);
                      return acc;
                    }, []);
                    setFamilies(update);
                    setFamilyNames(update);
                  }}
                />
                <div
                  onClick={() => {
                    setSelectedFamily(fam);
                    setCurrentFamily(fam);
                  }}
                  className={`circleBase color${i + 1}${
                    selectedFamily && selectedFamily.id === i ? " current" : ""
                  }`}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Family;
