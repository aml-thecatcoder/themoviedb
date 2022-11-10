import React from "react";
import { ThemoviedbDetail } from "../interface";
import ThemoviedbList from "./ThemoviedbList";
import "./themoviedb.css";
import { Detail } from "../App";

interface Props {
  themoviedbs: ThemoviedbDetail[];
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const ThemoviedbColection: React.FC<Props> = (props) => {
  const { themoviedbs, viewDetail, setDetail } = props;
  const selectThemoviedb = (id: number) => {
    if (!viewDetail.isOpened) {
      setDetail({
        id: id,
        isOpened: true,
      });
    }
  };
  return (
    <>
      <section
        className={
          viewDetail.isOpened
            ? "collection-container-active"
            : "collection-container"
        }
      >
        {viewDetail.isOpened ? (
          <div className="overlay"></div>
        ) : (
          <div className=""></div>
        )}
        {themoviedbs.map((themoviedb) => {
          return (
            <div className="movie" onClick={() => selectThemoviedb(themoviedb.id)}>
              <ThemoviedbList
                viewDetail={viewDetail}
                setDetail={setDetail}
                key={themoviedb.id}
                title={themoviedb.title.length > 15 ?
                  `${themoviedb.title.substring(0, 15)}...` : themoviedb.title
                }
                fullTitle={themoviedb.title}
                id={themoviedb.id}
                image={themoviedb.backdrop_path}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default ThemoviedbColection;
