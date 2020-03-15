import React, { useState } from "react";

const Family = ({ setAvailabilities, setCurrentFamily }) => {
  const [families, setFamilies] = useState(null);
  const [numberOfFamilies, setNumberOfFamilies] = useState(null);
  const [selectedFamily, setSelectedFamily] = useState(
    families ? families[0] : null
  );

  return (
    <>
      {!families && (
        <form>
          <label>
            How many caregivers?
            <input
              type="number"
              min="1"
              max="7"
              name="numOfFamilies"
              onChange={e => setNumberOfFamilies(parseInt(e.target.value))}
            />
          </label>
        </form>
      )}
      {numberOfFamilies > 0 &&
        !families && (
          <div
            onClick={() => {
              const availabilities = [];
              const fams = [];
              for (let i = 0; i < numberOfFamilies; i++) {
                fams.push({ id: i, value: `family #${i + 1}` });
                availabilities.push([]);
              }
              setFamilies(fams);
              setAvailabilities(availabilities);
            }}
          >{`GO ->`}</div>
        )}
      <div className="container">
        {numberOfFamilies > 0 &&
          families && (
            <div
              onClick={() => {
                setFamilies(null);
                setNumberOfFamilies(null);
              }}
            >{`<- BACK`}</div>
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
                    setFamilies(
                      families.reduce((acc, curr) => {
                        if (curr.id === i) {
                          curr.value = e.target.value;
                        }
                        acc.push(curr);
                        return acc;
                      }, [])
                    );
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
