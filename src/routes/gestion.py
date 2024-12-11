from flask import Blueprint, request, jsonify
from services.compras import registrar_compra
from services.devoluciones import registrar_devolucion
from services.sucursales import sucursal_mas_cercana
from services.reportes import obtener_reporte_devoluciones
from config.mysql import db
from sqlalchemy import text
from services.comentarios import registrar_comentario, obtener_comentarios

gestion = Blueprint('gestion', __name__)

@gestion.route('/compras', methods=['POST'])
def registrar_compra_route():
    return registrar_compra()

@gestion.route('/compras', methods=['GET'])
def obtener_compras_route():
    try:
        cliente_id = request.args.get('cliente_id', type=int)
        producto_id = request.args.get('producto_id', type=int)
        fecha_inicio = request.args.get('fecha_inicio')  # formato: YYYY-MM-DD
        fecha_fin = request.args.get('fecha_fin')  # formato: YYYY-MM-DD

        # Construir query dinámico
        query = "SELECT * FROM compras WHERE 1=1"
        params = {}

        if cliente_id:
            query += " AND cliente_id = :cliente_id"
            params['cliente_id'] = cliente_id
        if producto_id:
            query += " AND producto_id = :producto_id"
            params['producto_id'] = producto_id
        if fecha_inicio and fecha_fin:
            query += " AND fecha BETWEEN :fecha_inicio AND :fecha_fin"
            params['fecha_inicio'] = fecha_inicio
            params['fecha_fin'] = fecha_fin

        compras = db.session.execute(text(query), params).fetchall()

        # Formatear el resultado
        resultado = [
            {
                'id': compra.id,
                'cliente_id': compra.cliente_id,
                'producto_id': compra.producto_id,
                'cantidad': compra.cantidad,
                'fecha': compra.fecha.isoformat()
            }
            for compra in compras
        ]

        return jsonify(resultado), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@gestion.route('/devoluciones', methods=['POST'])
def registrar_devolucion_route():
    return registrar_devolucion()

@gestion.route('/sucursal-cercana/<int:cliente_id>', methods=['GET'])
def sucursal_mas_cercana_route(cliente_id):
    return sucursal_mas_cercana(cliente_id)

@gestion.route('/reporte-devoluciones', methods=['GET'])
def reporte_devoluciones_route():
    mes = request.args.get('mes', type=int)
    anio = request.args.get('anio', type=int)

    if not (mes and anio):
        return jsonify({'error': 'Debe proporcionar mes y año como parámetros'}), 400

    return obtener_reporte_devoluciones(mes, anio)


@gestion.route('/comentarios', methods=['POST'])
def registrar_comentario_route():
    data = request.get_json()
    cliente_id = data.get('cliente_id')
    producto_id = data.get('producto_id')
    comentario = data.get('comentario')
    calificacion = data.get('calificacion')

    if not (cliente_id and producto_id and comentario and calificacion):
        return jsonify({'error': 'Datos inválidos'}), 400

    return jsonify(registrar_comentario(cliente_id, producto_id, comentario, calificacion)), 201

@gestion.route('/comentarios', methods=['GET'])
def obtener_comentarios_route():
    cliente_id = request.args.get('cliente_id', type=int)
    producto_id = request.args.get('producto_id', type=int)
    return jsonify(obtener_comentarios(cliente_id, producto_id)), 200

@gestion.route('/detalle-cliente/<int:cliente_id>', methods=['GET'])
def detalle_cliente(cliente_id):
    try:
        # Obtener compras
        compras = db.session.execute(
            text("SELECT * FROM compras WHERE cliente_id = :cliente_id"),
            {'cliente_id': cliente_id}
        ).fetchall()
        compras_result = [
            {
                'id': compra.id,
                'producto_id': compra.producto_id,
                'cantidad': compra.cantidad,
                'fecha': compra.fecha.isoformat()
            } for compra in compras
        ]

        # Obtener devoluciones
        devoluciones = db.session.execute(
            text("SELECT * FROM devoluciones WHERE cliente_id = :cliente_id"),
            {'cliente_id': cliente_id}
        ).fetchall()
        devoluciones_result = [
            {
                'id': devolucion.id,
                'producto_id': devolucion.producto_id,
                'cantidad': devolucion.cantidad,
                'fecha': devolucion.fecha.isoformat()
            } for devolucion in devoluciones
        ]

        # Obtener comentarios
        comentarios_result = obtener_comentarios(cliente_id=cliente_id)

        return jsonify({
            'compras': compras_result,
            'devoluciones': devoluciones_result,
            'comentarios': comentarios_result
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

