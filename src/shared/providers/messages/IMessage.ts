export interface IMessage{
  sendMessage(message:string, para:string):Promise<any>
}