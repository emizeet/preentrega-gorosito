import fs from 'fs/promises';
import path from 'path';

const cartsPath = path.resolve('src/data/carts.json');

export default class CartManager {
  constructor() {
    this.path = cartsPath;
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  async _writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async getCarts() {
    return await this._readFile();
  }

  async getCartById(id) {
    const carts = await this._readFile();
    return carts.find(c => c.id === id) || null;
  }

  async createCart() {
    const carts = await this._readFile();
    const newId = carts.length ? Number(carts[carts.length - 1].id) + 1 : 1;
    const newCart = { id: newId, products: [] };
    carts.push(newCart);
    await this._writeFile(carts);
    return newCart;
  }

  async addProductToCart(cid, pid) {
    const carts = await this._readFile();
    const cartIndex = carts.findIndex(c => c.id === cid);
    if (cartIndex === -1) return null;

    const productIndex = carts[cartIndex].products.findIndex(p => p.product === pid);
    if (productIndex === -1) {
      carts[cartIndex].products.push({ product: pid, quantity: 1 });
    } else {
      carts[cartIndex].products[productIndex].quantity++;
    }

    await this._writeFile(carts);
    return carts[cartIndex];
  }
}