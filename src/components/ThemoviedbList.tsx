import React, { useEffect, useState } from "react";
import { Detail } from "../App";
import "./themoviedb.css";

interface Props {
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
  title: string;
  fullTitle: string;
  id: number;
  image: string;
}

const ThemoviedbList: React.FC<Props> = (props) => {
  const { title, fullTitle, id, image, viewDetail, setDetail } = props;
  const [isSelected, setSelected] = useState(false);
  useEffect(() => {
    setSelected(id === viewDetail?.id);
  }, [id, viewDetail]);

  const closeDetail = () => {
    setDetail({
      id: 0,
      isOpened: false,
    });
  };
  return (
    <div className="">
      {isSelected ? (
        <section className="themoviedb-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={closeDetail}>
              X
            </p>
            <div className="detail-info">
              <img src={'https://image.tmdb.org/t/p/w200/' + image} alt="themoviedb" className="detail-img" />
              <p className="detail-name">{fullTitle}</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="themoviedb-list-container">
          <img src={'https://image.tmdb.org/t/p/w300/' + image} alt="themoviedb" />
          <p className="themoviedb-name">{title}</p>
        </section>
      )}
    </div>
  );
};

export default ThemoviedbList;
