export interface Themoviedb {
    id: number;
    title: string;
    backdrop_path: string;
  }

export interface ThemoviedbDetail extends Themoviedb {
  backdrop_path: string;
}  