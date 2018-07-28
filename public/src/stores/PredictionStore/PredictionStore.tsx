import axios, {AxiosResponse} from 'axios';
import {observable} from 'mobx';
import {parse} from 'query-string';
import {IPredictionStore, ISportEvent} from '../../@types';

export class PredictionStore implements IPredictionStore {
  @observable public matches: ISportEvent[] = [];
  @observable public isLoaded: boolean = false;
  @observable public isSuccessSubmit: boolean = false;
  public filter: any;
  // public today: string = PredictionStore.getTodayDate;

  constructor(props: {
    filter?: string;
  }) {
    this.filter = parse(props.filter);
    this.fetchTodayMatches();
  }

  public handleSubmit(e: any): void {
    e.preventDefault();
    const validatedMatches = this.matches.filter((match: ISportEvent) => {
      return match.competitors[0].userPrediction >= 0 && match.competitors[1].userPrediction >= 0;
    }).map((match) => {
      return {
        awayScore: match.competitors[1].userPrediction,
        awayTeam: match.competitors[1].name,
        homeScore: match.competitors[0].userPrediction,
        homeTeam: match.competitors[0].name,
        id: match.id,
      };
    });
    axios.post('/predictions', validatedMatches).then(() => {
      this.isSuccessSubmit = true;
    });
  }

  public handleChange(index: number, compIndex: number, e: any): void {
    this.matches[index].competitors[compIndex].userPrediction = +e.target.value;
  }

  private fetchTodayMatches() {
    const baseUrl = '/available-predictions';
    const {tournament_id} = this.filter;
    const url = tournament_id ? `${baseUrl}?tournament_id=${tournament_id}` : baseUrl;
    axios.get(url)
      .then((res: AxiosResponse) => {
        this.matches = res.data;
        this.isLoaded = true;
      });
  }

  // public static get getTodayDate(): string {
  //   const today: Date = new Date();
  //   const year = today.getFullYear();
  //   const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
  //   const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  //   return `${year}-${month}-${day}`;
  // }
}
