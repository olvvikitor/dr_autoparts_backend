/**
 * Serviço responsável por adicionar itens ao carrinho de compras.
 * 
 * Este serviço verifica se o usuário já possui um carrinho ativo. Se não existir,
 * cria um novo carrinho. Depois, verifica se o item já existe no carrinho. Caso exista,
 * apenas atualiza a quantidade do item. Se não existir, adiciona um novo item ao carrinho.
 */

import { Inject, Injectable } from '@nestjs/common';
import { CartRepository } from 'src/modules/cart/repositories/cart.repository';
import { CartItemRepository } from 'src/modules/cartItem/repositories/cartItem.repository';
import { AddItemCartDto } from '../dtos/add-item-cart.dto';

@Injectable()
export class AddItemCartService {
  constructor (
    private cartRepository: CartRepository,
    @Inject() private cartItemRepository: CartItemRepository
  ) {}

  /**
   * Adiciona um item ao carrinho do usuário.
   * 
   * @param {AddItemCartDto} data - Dados do item a ser adicionado (ID do produto e quantidade).
   * @param {number} userId - ID do usuário dono do carrinho.
   * 
   * @returns {Promise<void>}
   */
  async addItemCart(data: AddItemCartDto, userId: number): Promise<void> {
    // Verifica se o carrinho do usuário já existe
    const cartExists = await this.cartRepository.findCart(userId);

    // Se não existir, cria um novo carrinho
    if (!cartExists) {
      await this.cartRepository.createNewCart(userId);
    }

    // Verifica se o item já está no carrinho
    const existItemInCart = await this.cartItemRepository.findCartItemByUser(userId, data.productId);

    if (existItemInCart) {
      // Se o item já existe no carrinho, apenas soma a quantidade
      const somaQtd = existItemInCart.quantity + data.quantity;
      await this.cartItemRepository.updateCart(existItemInCart.id, somaQtd);
    } else {
      // Se não existir, adiciona o item ao carrinho
      await this.cartItemRepository.addCartItem({
        cartId: cartExists.id,
        productId: data.productId,
        quantity: data.quantity
      });
    }
  }
}
