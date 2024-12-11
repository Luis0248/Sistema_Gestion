from flask import Blueprint, request
from flask import request, jsonify
from services.reportes import obtener_reporte_devoluciones

gestion = Blueprint('gestion', __name__)

# Endpoint para reporte de devoluciones
@gestion.route('/reporte-devoluciones', methods=['GET'])
def reporte_devoluciones_route():
    mes = request.args.get('mes', type=int)
    anio = request.args.get('anio', type=int)

    if not (mes and anio):
        return jsonify({'error': 'Debe proporcionar mes y año como parámetros'}), 400

    return obtener_reporte_devoluciones(mes, anio)
