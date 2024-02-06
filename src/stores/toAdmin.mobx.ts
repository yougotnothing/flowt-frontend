import { makeObservable, observable, action, runInAction } from "mobx";
import { IReportDTO, IUserSearch, IVerifyRequest } from "../types/props";
import { api } from "../api/axiosConfig";

class AdminStore {
  input: string;
  user: IUserSearch | null;
  users: IUserSearch[] | null;
  message: string;
  reports: IReportDTO[];
  type: 'USER' | 'SONG' | 'PLAYLIST';
  report_mail: string;
  isOpen: boolean;
  verify_artists_list: IVerifyRequest[];
  page: number;

  constructor() {
    this.verify_artists_list = [];
    this.input = '';
    this.user = null;
    this.users = null;
    this.message = '';
    this.reports = [];
    this.type = 'USER';
    this.report_mail = '';
    this.isOpen = false;
    this.page = 0;

    makeObservable(this, {
      verify_artists_list: observable,
      input: observable,
      isOpen: observable,
      report_mail: observable,
      type: observable,
      reports: observable,
      user: observable,
      users: observable,
      message: observable,
      setMessage: action,
      getUsers: action.bound,
      setInput: action,
      setUser: action,
      setUsers: action,
      getReports: action.bound,
      setIsOpen: action,
      getVerifyArtists: action.bound
    });
  }

  async getVerifyArtists() {
    try {
      const response = await api.get('/moderator/artist/requests', {
        params: {
          page: this.page
        }
      });
      runInAction(() => {
        this.verify_artists_list = response.data.artistVerifyRequests;
      });
      console.log(response.data);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  async applyArtist(username: string | null) {
    try {
      const response = await api.patch(`/moderator/artist/${username}`);
      console.log(response.data);
      console.log('artist verifyed');
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  setIsOpen(value: boolean) {
    runInAction(() => {
      this.isOpen = value;
    });
  }

  setType(value: 'USER' | 'SONG' | 'PLAYLIST') {
    runInAction(() => {
      this.type = value;
    });
  }

  setReportMail(value: string) {
    runInAction(() => {
      this.report_mail = value;
    });
  }

  setMessage(value: string) {
    runInAction(() => {
      this.message = value;
    });
  }

  setUsers(value: IUserSearch[] | null) {
    runInAction(() => {
      this.users = value;
    });
  }

  setUser(user: IUserSearch) {
    runInAction(() => {
      this.user = user;
    });
  }

  setInput(value: string) {
    runInAction(() => {
      this.input = value.trim();
    });
  }

  setPage(value: number) {
    runInAction(() => {
      this.page = value;
    });
  }

  async getUsers() {
    try {
      const response = await api.get('/search/users', {
        params: {
          page: this.page,
          substring: this.input
        }
      });

      if(response.data.users.length === 0) {
        this.setMessage(`Cannot find data by ${this.input}`);
      }else{
        this.setMessage('');
      }

      runInAction(() => {
        this.users = response.data.users;
      });

      console.log(this.users);
    }catch(error: any) {
      console.log(error);
    }
  }

  parseData() {
    const options = { day: 'numeric', month: 'long', year: 'numeric' } as Intl.DateTimeFormatOptions;
    const formattedDate = new Intl.DateTimeFormat('en-EN', options);
 
    for(let index = 0; index <= this.reports.length; index++) {
      if(this.reports[index]) {
        const createdAtObject = new Date(this.reports[index].createdAt);
        const checkedAtObject = new Date(this.reports[index].createdAt);

        this.reports[index].createdAt = formattedDate.format(createdAtObject);

        if(this.reports[index].checkedAt) {
          this.reports[index].checkedAt = formattedDate.format(checkedAtObject);
        }else{
          this.reports[index].checkedAt = 'Report is not checked now.';
        }
      }
    }
  }

  async getReports() {
    try {
      const response = await api.get(`/reports/${this.type}`, {
        params: {
          page: this.page
        }
      });

      runInAction(() => {
        const uniqueReports: Set<IReportDTO> = new Set(
          response.data.reports.filter((existingReport: IReportDTO) =>
            !this.reports.some((report: IReportDTO) => existingReport.id === report.id)
          )
        );

        this.reports.push(...Array.from(uniqueReports));
        this.parseData();
      });

      if(response.data.reports.length === 0) {
        this.setReportMail(`Have no reports of ${this.type.toLowerCase()}`);
      }else{
        this.setReportMail('');
      }
    }catch(error: any) {
      throw new Error(error);
    }
  }

  async declineReport(id: number) {
    try {
      await api.delete(`/reports/${id}`);
      console.log('report deleted');
      await this.getReports();
    }catch(error: any) {
      console.error(error);
    }
  }

  async sendReport(id: number) {
    try {
      await api.patch(`/reports/${id}`);
      console.log('report send');
      await this.getReports();
    }catch(error: any) {
      console.error(error);
    }
  }
}

export const adminStore = new AdminStore();