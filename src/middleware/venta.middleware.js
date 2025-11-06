export const validarObtenerVentaPorId = (req, res, next) => {
  const { idVenta } = req.params;
  if (!idVenta) {
    return res.status(400).json({ mensaje: `La venta con id = ${idVenta} no existe!` });
  }
  next();
};

export const validarCrearVenta = (req, res, next) => {
  const { usuario_id, fecha_venta, total } = req.body;
  if (!usuario_id || !fecha_venta || !total) {
    return res.status(400).json({ error: 'Todos los campos son requeridos para crear una venta' });
  }
  next();
};

export const validarActualizarVenta = (req, res, next) => {
  const { idVenta } = req.params;
  const { usuario_id, fecha_venta, total } = req.body;

  if (!idVenta || !usuario_id || !fecha_venta || !total) {
    return res.status(400).json({ error: 'Todos los campos son requeridos para actualizar una venta' });
  }
  next();
};

export const validarEliminarVenta = (req, res, next) => {
  const { idVenta } = req.params;
  if (!idVenta) {
    return res.status(400).json({ error: 'El ID de la venta es requerido para eliminar' });
  }
  next();
};
