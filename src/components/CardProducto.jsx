import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Cambia a "react-router" solo si usas v7

function CardProducto({
  id,
  nombre,
  categoria,
  precio,
  disponible,
  stock,
  imagen,
  agregar,
  onTotalChange,
}) {
  const [contador, setContador] = useState(0);

  const iva = precio * 0.15;
  const totalUnidad = precio + iva;
  const totalCantidad = totalUnidad * contador;

  function mostrarProducto() {
    if (contador < stock) {
      setContador((contadorAnterior) => contadorAnterior + 1);
    }
  }

  function agregarProducto() {
    if (agregar) {
      agregar(nombre, precio, categoria);
    }
  }

  useEffect(() => {
    if (onTotalChange) {
      onTotalChange(nombre, totalCantidad);
    }
  }, [nombre, totalCantidad, onTotalChange]);

  return (
    <div className="card shadow-sm" style={{ width: "18rem" }}>
      {imagen && (
        <img
          src={imagen}
          alt={nombre}
          className="card-img-top bg-light"
          style={{ height: "180px", objectFit: "contain" }}
          loading="lazy"
        />
      )}

      <div className="card-body">
        <h5 className="card-title">{nombre}</h5>

        <div className="d-flex flex-wrap gap-1 align-items-center">
          <span className={`badge ${disponible ? "bg-success" : "bg-danger"}`}>
            {disponible ? `${stock} disponibles` : "Agotado"}
          </span>

          {disponible && stock < 10 && (
            <span className="badge bg-warning text-dark">
              ¡Últimas unidades!
            </span>
          )}
        </div>
        <p className="mt-3 mb-1">Precio: ${precio.toFixed(2)}</p>
        <p className="mb-1">IVA (15 %): ${iva.toFixed(2)}</p>
        <p className="fw-semibold mb-3">
          Precio por unidad con IVA: ${totalUnidad.toFixed(2)}
        </p>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={mostrarProducto}
            disabled={!disponible || contador >= stock}
          >
            Agregar
          </button>

          {id && (
            <Link to={"/producto/" + id} className="btn btn-link btn-sm w-100">
              Ver detalle
            </Link>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={agregarProducto}
            disabled={!disponible}
          >
            Comprar
          </button>
        </div>

        <div className="border-top mt-3 pt-3">
          <p className="mb-1">Cantidad: {contador}</p>
          <p className="fw-bold mb-0">
            Total por cantidad: ${totalCantidad.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardProducto;
