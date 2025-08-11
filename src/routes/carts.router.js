import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
  const cart = await cartManager.createCart();
  res.status(201).json(cart);
});

router.get('/:cid', async (req, res) => {
  const cid = Number(req.params.cid);
  const cart = await cartManager.getCartById(cid);
  if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
  res.json(cart);
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cid = Number(req.params.cid);
  const pid = Number(req.params.pid);
  const updatedCart = await cartManager.addProductToCart(cid, pid);
  if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
  res.json(updatedCart);
});

export default router;