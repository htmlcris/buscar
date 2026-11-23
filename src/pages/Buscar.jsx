import { useState } from "react";
import CardProducto from "../components/CardProducto.jsx";

function Buscar({ agregar }) {
  const [texto, setTexto] = useState("");
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [buscado, setBuscado] = useState(false);

  function buscar(e) {
    e.preventDefault();
    if (texto.trim() === "") {
      return;
    }

    setCargando(true);
    fetch("https://dummyjson.com/products/search?q=" + texto)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos.products);
        setCargando(false);
        setBuscado(true);
      });
  }

  function limpiar() {
    setTexto("");
    setProductos([]);
    setBuscado(false);
  }

  return (
    <div>
      <h2 className="mb-3">Buscar Productos</h2>

      <form className="d-flex gap-2 mb-4" onSubmit={buscar}>
        <input
          className="form-control"
          placeholder="Ejemplo: phone, laptop, perfume"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={limpiar}
        >
          Limpiar
        </button>
      </form>

      {cargando ? <p className="alert alert-info">Buscando...</p> : null}

      {buscado && !cargando ? (
        productos.length === 0 ? (
          <p className="text-danger fw-bold">
            No hay productos que coincidan
          </p>
        ) : (
          <p className="text-muted">
            Se encontraron {productos.length} productos para "{texto}"
          </p>
        )
      ) : null}

      <div className="d-flex flex-wrap gap-3">
        {productos.map((p) => (
          <CardProducto
            key={p.id}
            id={p.id}
            nombre={p.title}
            categoria={p.category}
            precio={p.price}
            disponible={p.stock > 0}
            stock={p.stock}
            imagen={p.thumbnail}
            agregar={agregar}
          />
        ))}
      </div>
    </div>
  );
}

export default Buscar;