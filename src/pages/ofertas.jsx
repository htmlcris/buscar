import { useState, useEffect } from 'react';
import TarjetaOferta from "../components/TarjetaOferta.jsx";

function ofertas({agregar}) {
  const [cargando, setCargando] = useState(true);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=8")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error en la respuesta");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos.products);
        setCargando(false);
      })
      .catch(() => {
        setError("No se cargaron los datos");
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando ofertas...</p>;
  }

  if (error !== "") {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
    <h3>Cantidad de ahorro:</h3>
    <p>Si compras uno de cada producto, ahorras $0.00</p>
    <div className="d-flex flex-wrap gap-3">
      {productos.map((item) => (
        <TarjetaOferta
        key={item.id}
        nombre={item.title}
        precio = {item.price}
        imagen = {item.thumbnail}
        descuento={item.discountPercentage}
        agregar={agregar}
        />
      ))}
    </div>
    </div>
  );
}

export default ofertas;


