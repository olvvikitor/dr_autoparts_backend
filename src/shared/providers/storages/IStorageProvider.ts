export interface IStorageProvider{
  upload(file: any):Promise<string>
  get(param: any):Promise<string>
  delete(param: any):Promise<void>
}