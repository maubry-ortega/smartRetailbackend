import request from 'supertest';
import Backend from '../src/config/server.js';

describe('Productos API CRUD completo', () => {
  let productoId;

  // CREATE
  it('POST /api/productos → debe crear un producto', async () => {
    const newProduct = {
      nombre: 'Camiseta Test',
      categoria: 'Ropa',
      genero: 'Hombre',
      talla: 'M',
      precio: 25000,
      stock_actual: 50,
      sucursal_id: 1
    };

    const res = await request(Backend)
      .post('/api/productos')
      .send(newProduct)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    productoId = res.body.id;
  });

  // GET
  it('GET /api/productos/:id → debe obtener el producto creado', async () => {
    const res = await request(Backend).get(`/api/productos/${productoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(productoId);
    expect(res.body.nombre).toBe('Camiseta Test');
  });

  // UPDATE
  it('PUT /api/productos/:id → debe actualizar el producto', async () => {
    const updatedProduct = { nombre: 'Camiseta Actualizada', precio: 30000 };
    const res = await request(Backend)
      .put(`/api/productos/${productoId}`)
      .send(updatedProduct)
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe('Camiseta Actualizada');
    expect(Number(res.body.precio)).toBe(30000);
  });

  // DELETE
  it('DELETE /api/productos/:id → debe eliminar el producto', async () => {
    const res = await request(Backend).delete(`/api/productos/${productoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/eliminado/i);
  });
});
