import { useState, useEffect } from "react";

function TarjetaOferta({ nombre, precio, descuento, agregar }) {
    const valorDescuento = precio * descuento / 100;
    const precioFinal = precio - valorDescuento;
    const iva = precioFinal * 0.15;
    const precioFinalIva = precioFinal + iva;


    function agregarProducto() {
        agregar(nombre, precioFinalIva);
    }

    return (
        <div className="card shadow-sm" style={{ width: "18rem" }}>

            <div className="card-body">
                <h5 className="card-title">{nombre}</h5>

                <span className={`badge ${descuento ? "bg-danger" : "bg-secondary"}`}>
                    {descuento>=0.1  ? "Gran Oferta" : "Oferta"}
                </span>

                <p className="mt-3 mb-1">Antes: ${precio.toFixed(2)}</p>
                <p className="mb-1">Descuento: {descuento.toFixed(2)}% (-${valorDescuento.toFixed(2)})</p>
                <p className="mb-1">Ahora: ${precioFinal.toFixed(2)}</p>
                <p className="fw-semibold mb-3">
                    CON IVA: ${precioFinalIva.toFixed(2)}
                </p>
            </div>

            
                <div className="d-flex gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={agregarProducto}
                    >
                        Agregar
                    </button>
                </div>
        </div>
    );
}

export default TarjetaOferta;