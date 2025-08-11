import fs from 'fs/promises';
import path from 'path';

const productsPath = path.resolve('src/data/products.json');

export default class ProductManager {
  constructor() {
    this.path = productsPath;
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

  async getProducts() {
    return await this._readFile();
  }

  async getProductById(id) {
    const products = await this._readFile();
    return products.find(p => p.id === id) || null;
  }

  async addProduct(product) {
    const products = await this._readFile();
    const newId = products.length ? Number(products[products.length - 1].id) + 1 : 1;
    const newProduct = { id: newId, status: true, ...product };
    products.push(newProduct);
    await this._writeFile(products);
    return newProduct;
  }

  async updateProduct(id, updateData) {
    const products = await this._readFile();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return null;

    // no permitir cambio de id
    const updated = { ...products[idx], ...updateData, id: products[idx].id };
    products[idx] = updated;
    await this._writeFile(products);
    return updated;
  }

  async deleteProduct(id) {
    const products = await this._readFile();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) return false;
    await this._writeFile(filtered);
    return true;
  }
}