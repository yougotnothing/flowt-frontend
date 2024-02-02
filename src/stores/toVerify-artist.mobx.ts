import { action, makeObservable, observable, runInAction } from "mobx";
import { IPersonalData } from "../types/props";
import { api } from "../api/axiosConfig";

type ISetPersonalData = 'name' | 'surname' | 'sex' | 'birth date' | 'country' | 'passport number' | 'link';

class VerifyArtistStore {
  personalData: IPersonalData;
  links: { url: string }[];

  constructor() {
    this.personalData = {
      name: '',
      surname: '',
      sex: '',
      birthDate: '',
      passportNumber: '',
      country: ''
    };
    this.links = [];

    makeObservable(this, {
      personalData: observable,
      links: observable,
      setPersonalData: action,
      getData: action
    });
  }

  getData() {
    const date = new Date();
    if(date.getDate() < 10) {
      this.personalData.birthDate = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth()}.${date.getFullYear()}`;
    }
  }

  setPersonalData(type: ISetPersonalData, value: string) {
    switch(type) {
      case 'name':
        const updatedName = value.charAt(0).toUpperCase() + value.slice(1);
        this.personalData.name = updatedName;
        break;
      case 'surname':
        const updatedSurname = value.charAt(0).toUpperCase() + value.slice(1);
        this.personalData.surname = updatedSurname;
        break;
      case 'sex':
        this.personalData.sex = value;
        break;
      case 'birth date':
        this.personalData.birthDate = value;
        break;
      case 'country':
        this.personalData.country = value;
        break;
      case 'passport number':
        this.personalData.passportNumber = value;
        break;
      case 'link':
        for(let index = 0; index < this.links.length; index++) {
          if(this.links[index].url !== value || this.links.length === 0) {
            runInAction(() => {
              this.links.push({ url: value });
            })
          }else{
            return;
          }
        }
        break;
    }
  }

  addLink(arg: { url: string }) {
    runInAction(() => {
      for(let index = 0; index < this.links.length; index++) {
        if(this.links[index].url !== arg.url || this.links.length === 0) {
          this.links.push(arg);
          console.log(this.links);
        }else{
          return;
        }
      }
    });
  }

  addLinks(arg: Array<{ url: string }>) {
    runInAction(() => {
      this.links = arg;
    });
  }

  async verifyArtist() {
    try {
      const response = await api.post('/verify/artist', {
        personalDataDto: {
          name: this.personalData.name,
          surname: this.personalData.surname,
          birthDate: this.personalData.birthDate,
          sex: this.personalData.sex,
          country: this.personalData.country,
          passportNumber: this.personalData.passportNumber
        },
        links: this.links
      });

      localStorage.removeItem('isVerifyed');
      localStorage.setItem('artist verifyed', 'true');
      console.log(response.status, 'response success');
    }catch(error: any) {
      console.error(error);
      return;
    }
  }
}

export const verifyArtist = new VerifyArtistStore();

verifyArtist.getData();