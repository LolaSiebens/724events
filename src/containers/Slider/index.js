import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  // Ajout du condition ternaire sur focus pour éviter l'erreur
  const byDateAsc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) - new Date(evtB.date)
  );

  const nextCard = () => {
    // Modif mise a jour index
    setCurrentIndex(currentIndex + 1 === byDateAsc?.length ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    // Move setInterval to useEffect
    const intervalId = setInterval(nextCard, 5000);
    return () => {
      clearInterval(intervalId);
    }
  }, [currentIndex]);

  const handleRadioChange = (radioIdx) => {
    setCurrentIndex(radioIdx);
  };

  // structure de données temporaire où nous ajoutons une propriété id à chaque événement en utilisant l'index de l'événement dans le tableau byDateDesc
  const eventsWithKeys = byDateAsc?.map((event, index) => ({
    ...event,
    id: index,
  }));

  return (
    <div className="SlideCardList">

      <div className="SlideCardList__container">
        {byDateAsc?.map((event, index) => (
          <div
            key={event.title}
            className={`SlideCard SlideCard--${index === currentIndex ? 'display' : 'hide'}`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {eventsWithKeys?.map((_, radioIdx) => (
            <input
              key={`${radioIdx + 1}`}
              type="radio"
              name="radio-button"
              checked={radioIdx === currentIndex}
              onChange={() => handleRadioChange(radioIdx)}
            />
          ))}
        </div>
      </div>

    </div >
  );
};

export default Slider;