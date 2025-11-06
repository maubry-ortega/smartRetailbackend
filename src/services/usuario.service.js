import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { listaNegraService } from './ListaNegraService.js';
import 'dotenv/config';
import pool from '../config/database.js';



export const usuarioService = {

  listarUsuarios: async () => {
    const res = await pool.query('SELECT * FROM usuarios');
    return res.rows;
  },

  listarUsuarioPorId: async (id) => {
    const res = await pool.query('SELECT * FROM usuarios WHERE id=$1', [id]);
    return res.rows[0];
  },

  crearUsuario: async (data) => {
    const { username, email, password, rol_id } = data;
    if (!username || !email || !password || !rol_id)
      throw new Error('Todos los campos son requeridos');

    const password_hash = await bcrypt.hash(password, 10);
    const res = await pool.query(
      `INSERT INTO usuarios (username, email, password_hash, rol_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, email, password_hash, rol_id]
    );
    return res.rows[0];
  },

  actualizarUsuario: async (id, data) => {
    const { username, email, password, rol_id, activo } = data;
    const password_hash = password ? await bcrypt.hash(password, 10) : undefined;

    const fields = [];
    const values = [];
    let query = 'UPDATE usuarios SET ';

    if (username) fields.push(`username='$${fields.length + 1}'`);
    if (email) fields.push(`email='$${fields.length + 1}'`);
    if (password_hash) fields.push(`password_hash='$${fields.length + 1}'`);
    if (rol_id) fields.push(`rol_id=$${fields.length + 1}`);
    if (activo !== undefined) fields.push(`activo=$${fields.length + 1}`);

    fields.forEach((field, index) => {
      query += field + (index < fields.length - 1 ? ', ' : '');
    });

    query += ` WHERE id=$${fields.length + 1} RETURNING *`;

    const allValues = [...values, id];
    if (username) allValues.splice(values.length, 0, username);
    if (email) allValues.splice(values.length, 0, email);
    if (password_hash) allValues.splice(values.length, 0, password_hash);
    if (rol_id) allValues.splice(values.length, 0, rol_id);
    if (activo !== undefined) allValues.splice(values.length, 0, activo);

    const res = await pool.query(query, allValues);
    return res.rows[0];
  },

  eliminarUsuario: async (id) => {
    const res = await pool.query('DELETE FROM usuarios WHERE id=$1 RETURNING *', [id]);
    return res.rows[0];
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM usuarios WHERE email=$1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '3h' });
    res.status(200).json({ token, user: { id: user.id, email: user.email, username: user.username } });
  },

  logout: async (token) => {
    await listaNegraService.agregarToken(token);
  }

};
