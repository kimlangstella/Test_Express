import { MovieRepo } from "../database/repoteries/repostery";
import { Options } from "../routes/types/userRoute";
export class MovieServices {
  private MovieRepo: MovieRepo;
  // for instand data from userrepo
  constructor() {
    this.MovieRepo = new MovieRepo();
  }
  async createMovie(movie: object) {
    return await this.MovieRepo.createMovie(movie);
  }
  async getMovieById(id: string) {
    return await this.MovieRepo.getMovieById(id);
  }
  async getMovie() {
    return await this.MovieRepo.getMovie();
  }
  async updateMovieById(id: string, movie: object) {
    return await this.MovieRepo.updateMovieById(id, movie);
  }
  async deleteMovieById(id: string) {
    return await this.MovieRepo.deleteMovieById(id);
  }
}
