from flask import jsonify
from sqlalchemy import text
from config.mysql import db

def obtener_reporte_devoluciones(mes, anio):
    try:
        query = text("CALL reporte_devoluciones(:mes, :anio)")
        devoluciones = db.session.execute(query, {'mes': mes, 'anio': anio}).fetchall()

        return jsonify([
            {'producto_id': devolucion.producto_id, 'total_devoluciones': devolucion.total_devoluciones}
            for devolucion in devoluciones
        ]), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
