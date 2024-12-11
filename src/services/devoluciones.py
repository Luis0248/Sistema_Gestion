# services/devoluciones.py
from flask import request, jsonify
from sqlalchemy import text
from config.mysql import db
from datetime import datetime
import logging

logging.basicConfig(level=logging.DEBUG)

def registrar_devolucion():
    logging.debug("Iniciando registro de devolución...")
    try:
        data = request.get_json()
        compra_id = data.get('compra_id')
        motivo = data.get('motivo')

        # Validar datos
        if not (compra_id and motivo):
            return jsonify({'error': 'Datos inválidos'}), 400

        # Verificar que la compra exista
        compra_existente = db.session.execute(
            text("SELECT id FROM compras WHERE id = :id"), {'id': compra_id}
        ).fetchone()

        if not compra_existente:
            return jsonify({'error': 'La compra no existe'}), 404

        # Insertar devolución
        sql = text("""
        INSERT INTO devoluciones (compra_id, motivo, fecha)
        VALUES (:compra_id, :motivo, :fecha)
        """)
        db.session.execute(sql, {
            'compra_id': compra_id,
            'motivo': motivo,
            'fecha': datetime.now()
        })
        db.session.commit()

        return jsonify({'message': 'Devolución registrada exitosamente'}), 201

    except Exception as e:
        db.session.rollback()
        logging.error(f"Error en devolución: {e}")
        return jsonify({'error': str(e)}), 500
