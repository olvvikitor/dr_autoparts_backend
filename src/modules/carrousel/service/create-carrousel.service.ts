import { Inject, Injectable } from '@nestjs/common';
import { CarrouselRepository } from '../repository/carrousel.repository';
import { IStorageProvider } from 'src/shared/providers/storages/IStorageProvider';


@Injectable()
export class CarrouselService{
  constructor (
  @Inject() private carrouselRepository:CarrouselRepository,
  @Inject('IStorageProvider') private storageService:IStorageProvider){
  }

  async create(images: Express.Multer.File[]):Promise<void>{

    const active = await this.carrouselRepository.getActive()

    if(active){
      await this.carrouselRepository.updateForDasactivate(active.id)
    }

    const arrayUrlImg = await Promise.all(images.map( async(image) => {
      const url = await this.storageService.upload(image)
      return url
    }))

    await this.carrouselRepository.save(arrayUrlImg)


  }
  async get():Promise<any>{
    return await this.carrouselRepository.getActive()
  }
}