import request from 'supertest' ;
import Backend from '../src/config/server.js';

describe('API SmartRetail', () => {
  // Prueba GET productos
  it('GET /api/productos → debe devolver un array de productos', async () => {
    const res = await request(Backend).get('/api/productos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('nombre');
      expect(res.body[0]).toHaveProperty('precio');
    }
  });

  // Prueba POST producto
  it('POST /api/productos → debe crear un producto', async () => {
    const newProduct = {
      nombre: 'Pantalón',
      categoria: 'Ropa',
      genero: 'Hombre',
      talla: 'L',
      precio: 30000,
      stock_actual: 50,
      sucursal_id: 1
    };

    const res = await request(Backend)
      .post('/api/productos')
      .send(newProduct)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nombre).toBe(newProduct.nombre);
  });

  // Prueba GET usuarios
  it('GET /api/usuarios → debe dar acceso no autorizado si no hay token', async () => {
    const res = await request(Backend).get('/api/usuarios');
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Acceso no autorizado');
  });
});
