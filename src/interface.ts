export interface Themoviedb {
    id: number;
    title: string;
    backdrop_path: string;
    vote_average: number;
  }

export interface ThemoviedbDetail extends Themoviedb {
  backdrop_path: string;
}  