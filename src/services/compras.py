from flask import request, jsonify
from config.mysql import db
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text
from datetime import datetime
import logging

logging.basicConfig(level=logging.DEBUG)

def registrar_compra():
    logging.debug("Iniciando registro de compra...")

    try:
        # Parsear datos de la solicitud
        data = request.get_json()
        logging.debug(f"Datos recibidos: {data}")

        cliente_id = data.get('cliente_id')
        producto_id = data.get('producto_id')
        cantidad = data.get('cantidad')

        # Validaciones básicas
        if not (cliente_id and producto_id and cantidad):
            logging.error("Datos inválidos. Faltan parámetros.")
            return jsonify({'error': 'Datos inválidos'}), 400

        if not isinstance(cantidad, int) or cantidad <= 0:
            logging.error("Cantidad no válida.")
            return jsonify({'error': 'Cantidad debe ser un número positivo'}), 400

        # Validar producto existente y stock
        producto_existente = db.session.execute(
    text("SELECT id, stock FROM productos WHERE id = :id"),
    {'id': producto_id}
).fetchone()

        if not producto_existente:
            logging.error("Producto no encontrado.")
            return jsonify({'error': 'Producto no existe'}), 404

        if producto_existente.stock < cantidad:
            logging.error("Stock insuficiente.")
            return jsonify({'error': 'Stock insuficiente'}), 400

        # Validar cliente existente
        cliente_existente = db.session.execute(
            text("SELECT id FROM clientes WHERE id = :id"),
            {'id': cliente_id}
        ).fetchone()

        if not cliente_existente:
            logging.error("Cliente no encontrado.")
            return jsonify({'error': 'Cliente no existe'}), 404

        # Registrar compra
        sql = text("""
        INSERT INTO compras (cliente_id, producto_id, cantidad, fecha)
        VALUES (:cliente_id, :producto_id, :cantidad, :fecha)
        """)

        db.session.execute(sql, {
            'cliente_id': cliente_id,
            'producto_id': producto_id,
            'cantidad': cantidad,
            'fecha': datetime.now()
        })
        db.session.commit()

        logging.info("Compra registrada exitosamente.")
        return jsonify({'message': 'Compra registrada exitosamente'}), 201

    except SQLAlchemyError as e:
        db.session.rollback()
        logging.error(f"Error en la base de datos: {str(e)}")
        return jsonify({'error': 'Error interno en la base de datos'}), 500

