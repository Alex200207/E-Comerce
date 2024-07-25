import { useEffect, useState } from 'react';
import { API_URL } from '../constants/index.ts';

const IndexPage = () => {
  const [productCount, setProductCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await fetch(`${API_URL}/productos/count`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProductCount(data.count);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la cantidad de productos:', error);
        setError('No se pudo obtener la cantidad de productos');
        setLoading(false);
      }
    };

    fetchProductCount();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card rounded-4">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-around flex-wrap gap-4 p-4">
                <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                  <a
                    href="#"
                    className="mb-2 wh-48 bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center">
                    <i className="material-icons-outlined">shopping_cart</i>
                  </a>
                  <h3 className="mb-0">{productCount !== null ? productCount : 'Cargando...'}</h3>
                  <p className="mb-0">Productos</p>
                </div>
                {/*despues agrego mas*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
