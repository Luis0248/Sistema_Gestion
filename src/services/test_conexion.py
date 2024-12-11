from services.test_conexion import test_conexion
from routes.gestion import gestion
@gestion.route('/test-conexion', methods=['GET'])
def test_conexion_route():
    return test_conexion()
