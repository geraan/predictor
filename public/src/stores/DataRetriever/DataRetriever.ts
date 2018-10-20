import axios, {AxiosResponse} from 'axios';
import {observable} from 'mobx';
import {IRetriever, IRetrieverProps} from '../../@types';

export class DataRetriever implements IRetriever {
  public url: string;
  @observable public isLoaded: boolean = false;
  @observable public data: any;

  constructor(props: IRetrieverProps) {
    this.url = props.url;
    this.fetchList();
  }

  private fetchList() {
    axios.get(this.url)
      .then((res: AxiosResponse) => {
        this.data = Array.isArray(res.data) ? [...res.data] : {...res.data};
        this.isLoaded = true;
      });
  }
}
