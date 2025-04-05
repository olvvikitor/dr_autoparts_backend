export interface IStorageProvider{
  get(param: any):Promise<string>
  delete(param: any):Promise<void>
}