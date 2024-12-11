from sqlalchemy import text
from flask import jsonify
from config.mysql import db

def sucursal_mas_cercana(cliente_id):
    try:
        # Obtener coordenadas del cliente
        cliente = db.session.execute(
            text("SELECT ST_AsText(coordenadas) AS coordenadas FROM clientes WHERE id = :id"),
            {'id': cliente_id}
        ).fetchone()

        if not cliente:
            return jsonify({'error': 'Cliente no encontrado'}), 404

        lat, lon = map(float, cliente.coordenadas[6:-1].split())  # Extraer lat y lon del formato POINT

        # Buscar sucursal más cercana
        query = text("""
            SELECT 
                id, 
                nombre, 
                ST_Distance_Sphere(coordenadas, ST_GeomFromText(:punto)) AS distancia
            FROM sucursales
            ORDER BY distancia ASC
            LIMIT 1;
        """)
        sucursal = db.session.execute(query, {'punto': f'POINT({lon} {lat})'}).fetchone()

        if not sucursal:
            return jsonify({'error': 'No hay sucursales registradas'}), 404

        return jsonify({
            'sucursal_mas_cercana': {
                'id': sucursal.id,
                'nombre': sucursal.nombre,
                'distancia': sucursal.distancia
            }
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
