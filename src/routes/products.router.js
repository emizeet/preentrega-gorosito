import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const pid = Number(req.params.pid);
  const product = await productManager.getProductById(pid);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
});

router.post('/', async (req, res) => {
  const body = req.body;
  // aquí podrías validar campos obligatorios
  const newProduct = await productManager.addProduct(body);
  res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
  const pid = Number(req.params.pid);
  const updated = await productManager.updateProduct(pid, req.body);
  if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(updated);
});

router.delete('/:pid', async (req, res) => {
  const pid = Number(req.params.pid);
  const deleted = await productManager.deleteProduct(pid);
  if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json({ message: 'Producto eliminado' });
});

export default router;