import { observable, action, makeObservable } from "mobx";
import { api } from "../api/axiosConfig";


class ReportStore {
  isOpen: boolean;
  whomTypeArray: Array<'USER' | 'SONG' | 'PLAYLIST'>;
  contentTypeArray: Array<'NAME' | 'AVATAR' | 'PROFILE_HEADER' | 'DESCRIPTION' | 'CONTENT'>;
  content_type_name: string;
  whom_name: string;
  whom_type: 'USER' | 'SONG' | 'PLAYLIST' | null;
  content_type: 'NAME' | 'AVATAR' | 'PROFILE_HEADER' | 'DESCRIPTION' | 'CONTENT' | null;

  constructor() {
    this.whomTypeArray = ['USER', 'SONG', 'PLAYLIST'];
    this.contentTypeArray = ['NAME', 'AVATAR', 'PROFILE_HEADER', 'DESCRIPTION', 'CONTENT'];
    this.content_type_name = '';
    this.whom_name = '';
    this.content_type = null;
    this.whom_type = null;
    this.isOpen = false;

    makeObservable(this, {
      isOpen: observable,
      whomTypeArray: observable,
      contentTypeArray: observable,
      content_type_name: observable,
      content_type: observable,
      whom_name: observable,
      whom_type: observable,
      sendReport: action.bound,
      setWhomType: action,
      setContentType: action,
      setContentTypeName: action,
      setWhomName: action,
      setIsOpen: action,
      setContentTypeArray: action
    });
  }

  setContentTypeArray(arg: 'USER' | 'SONG' | 'PLAYLIST') {
    this.whom_type = arg;
    
    if(arg === 'USER') {
      this.contentTypeArray = ['AVATAR', 'DESCRIPTION', 'PROFILE_HEADER', 'NAME'];
    }else if(arg === 'SONG') {
      this.contentTypeArray = ['AVATAR', 'NAME', 'CONTENT'];
    }else{
      this.contentTypeArray = ['AVATAR', 'CONTENT', 'NAME'];
    }
  }

  setIsOpen(arg: boolean) {
    this.isOpen = arg;
  }

  setWhomType(index: number) {
    this.whom_type = this.whomTypeArray[index];
  }

  setContentType(index: number) {
    this.content_type = this.contentTypeArray[index];
  }

  setContentTypeName(value: string) {
    this.content_type_name = value;
  }

  setWhomName(value: string) {
    this.whom_name = value;
  }

  async sendReport() {
    const isValuesNotNull = this.whom_type && this.content_type && this.content_type_name && this.whom_name;

    try {
      if(isValuesNotNull) {
        await api.post('/reports', {
          whomType: this.whom_type,
          contentType: this.content_type,
          // content name (song | playlist | user):
          contentTypeName: this.content_type_name,
          // username:
          whomName: this.whom_name
        });

        console.log('Report send success');
      }
    }catch(error: any) {
      console.error(error);
    }
  }
}

export const reportStore = new ReportStore();