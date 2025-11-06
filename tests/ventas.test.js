import request from 'supertest';
import Backend from '../src/config/server.js';
import pool from '../src/config/database.js';

describe('API SmartRetail - Ventas', () => {
  let ventaId = null; // Guardaremos el ID de la venta creada
  const testVenta = {
    sucursal_id: 1,   // Debe existir en DB
    usuario_id: 1,    // Debe existir en DB
    metodo_pago: 'Efectivo',
    total: 0
  };



  // ======================
  // CREATE (POST)
  // ======================
  it('POST /api/ventas → debe crear una venta', async () => {
    const res = await request(Backend)
      .post('/api/ventas')
      .send(testVenta)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.metodo_pago).toBe(testVenta.metodo_pago);

    ventaId = res.body.id; // Guardamos ID para los siguientes tests
  });

  // ======================
  // READ (GET)
  // ======================
  it('GET /api/ventas → debe devolver un array de ventas', async () => {
    const res = await request(Backend).get('/api/ventas');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('metodo_pago');
    }
  });

  it('GET /api/ventas/:id → debe devolver una venta específica', async () => {
    const res = await request(Backend).get(`/api/ventas/${ventaId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', ventaId);
    expect(res.body).toHaveProperty('metodo_pago', testVenta.metodo_pago);
  });

  // ======================
  // UPDATE (PUT)
  // ======================
  it('PUT /api/ventas/:id → debe actualizar la venta', async () => {
    const updatedData = { metodo_pago: 'Tarjeta' };

    const res = await request(Backend)
      .put(`/api/ventas/${ventaId}`)
      .send(updatedData)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', ventaId);
    expect(res.body.metodo_pago).toBe(updatedData.metodo_pago);
  });

  // ======================
  // DELETE (DELETE)
  // ======================
  it('DELETE /api/ventas/:id → debe eliminar la venta', async () => {
    const res = await request(Backend).delete(`/api/ventas/${ventaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message'); // Mensaje de confirmación
  });

});
