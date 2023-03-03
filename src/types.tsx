export type stateType = {
  formData: {
    [key: string]: {
      value: string;
      error: boolean;
      required:boolean,
      type:string,
      files?: FileList|null;
      fileType?: string;
      fileSizeLimits?: { upper: number; lower: number };
      url?:string
    }
  };
  details:{
      name:string,
      age:number|string,
      qualification:string,
      image:string,
      idProof:string,
  }
};
