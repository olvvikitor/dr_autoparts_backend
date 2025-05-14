import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {  Model } from '@prisma/client';
import { CreateModeloDto } from '../dto/create-modelo-dto';
import { ModelRepository } from '../repository/model.repository';
import { ConflictExceptions } from 'src/shared/errors/ConflicExeption';
import { NotFoundExceptionHandler } from 'src/shared/errors/NotFoundExpetion';

@Injectable()
export class ModeloService {
  constructor(
    private modelRepository: ModelRepository,
  ) {}

  async createNewModel(data: CreateModeloDto): Promise<void> {
    const categoryExist = await this.findModelByNome(data.nome);
    if (categoryExist) {
      throw new ConflictException(
        'Já existe um modelo com esse nome cadastrado',
      );
    }
    await this.modelRepository.createNewModel(data);
  }

  async findModelByNome(name: string): Promise<Model> {
    return await this.modelRepository.findModelByNome(name);
  }

  async findAllModels(): Promise<Array<Model>> {
    return await this.modelRepository.findAllModels();
  }

  async findModelById(id: number): Promise<Model> {
    return await this.modelRepository.findModelById(id);
  }
  async deleteModel(id: number): Promise<Model> {
    return await this.modelRepository.deleteModel(id);
  }
  async updateModel(id: number, data: CreateModeloDto): Promise<Model> {
    const modelExists = await this.modelRepository.findModelById(id);
    if (!modelExists) {
      throw new NotFoundExceptionHandler('Model', 'id', id);
    }
    const existsName = await this.modelRepository.findModelByNome(data.nome);
    if (existsName) {
      if (existsName.name === data.nome) {
        throw new ConflictExceptions('Model', 'name', data.nome);
      }
    }
    return await this.modelRepository.updateModel(id, data);
  }
}
