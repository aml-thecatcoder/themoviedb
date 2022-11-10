import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import ThemoviedbColection from "./components/ThemoviedbColection";
import { Themoviedb } from "./interface";

interface Themoviedbs {
  id: number;
  title: string;
  url: string;
}

export interface Detail {
  id: number;
  isOpened: boolean;
}

const App: React.FC = () => {
  const baseURL = "https://api.themoviedb.org";
  const apiKey = "b649fbe0c4c1cfd8d1ad939a45e7d213";
  const [Themoviedbs, setThemoviedbs] = useState<Themoviedb[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  });
  useEffect(() => {
    const getThemoviedb = async () => {
      const res = await axios.get(
        `${baseURL}/3/movie/popular?api_key=${apiKey}&language=en-US&page=${1}`
      );
      res.data.results.forEach(async (themoviedb: Themoviedbs) => {
        const tmdb = await axios.get(
          `${baseURL}/3/movie/${themoviedb.id}?api_key=${apiKey}&language=en-US`
        );
        setThemoviedbs((p) => [...p, tmdb.data]);
        setLoading(false);
      });
    };
    getThemoviedb();
  }, []);

  const nextPage = async () => {
    setLoading(true);

    const nxtPage = page + 1;
    setPage(nxtPage);
    let res = await axios.get(
      `${baseURL}/3/movie/popular?api_key=${apiKey}&language=en-US&page=${nxtPage}`
    );
    res.data.results.forEach(async (themoviedb: Themoviedbs) => {
      const tmdb = await axios.get(
        `${baseURL}/3/movie/${themoviedb.id}?api_key=${apiKey}&language=en-US`
      );
      setThemoviedbs((p) => [...p, tmdb.data]);
      setLoading(false);
    });
  };

  return (
    <div className="App">
      <div className="container">
        <header className="themoviedb-header">
          {" "}
          Themoviedb API Favorite List{" "}
        </header>
        <ThemoviedbColection
          themoviedbs={Themoviedbs}
          viewDetail={viewDetail}
          setDetail={setDetail}
        />
        {!viewDetail.isOpened && (
          <div className="btn loadable">
            <button onClick={nextPage}>
              {loading ? "Loading..." : "Load more"}{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
