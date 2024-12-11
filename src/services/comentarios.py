from config.mongodb import mongo
from datetime import datetime

def registrar_comentario(cliente_id, producto_id, comentario, calificacion):
    comentario_doc = {
        'cliente_id': cliente_id,
        'producto_id': producto_id,
        'comentario': comentario,
        'calificacion': calificacion,
        'fecha': datetime.now()
    }
    mongo.db.comentarios.insert_one(comentario_doc)
    return {'message': 'Comentario registrado exitosamente'}

def obtener_comentarios(cliente_id=None, producto_id=None):
    query = {}
    if cliente_id:
        query['cliente_id'] = cliente_id
    if producto_id:
        query['producto_id'] = producto_id

    comentarios = mongo.db.comentarios.find(query)
    return [
        {
            'cliente_id': c['cliente_id'],
            'producto_id': c['producto_id'],
            'comentario': c['comentario'],
            'calificacion': c['calificacion'],
            'fecha': c['fecha']
        }
        for c in comentarios
    ]
