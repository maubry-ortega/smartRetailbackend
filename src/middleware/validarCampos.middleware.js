export function validarCamposRequeridos(camposRequeridos) {
  return (req, res, next) => {
    const camposFaltantes = camposRequeridos.filter(campo => !req.body[campo]);

    if (camposFaltantes.length > 0) {
      const errores = camposFaltantes.map(campo => `${campo} es requerido`);
      return res.status(400).json({ 
        error: 'La solicitud es incorrecta. Faltan parámetros', 
        errores 
      });
    }

    next();
  };
}
