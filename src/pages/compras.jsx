import { useState } from 'react';

const TASA_ICE = 0.10;

function Compras({ lista, guardarCompra }) {
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [genero, setGenero] = useState('');
    const [factura, setFactura] = useState(null);

    const edadCliente = Number(edad);
    const edadValida = Number.isInteger(edadCliente) && edadCliente >= 1;
    const esMenor = edadValida && edadCliente < 18;

    let tasaIva = 0;

    if (edadValida && !esMenor) {
        tasaIva = edadCliente > 65 ? 0.08 : 0.15;
    }

    const productosFacturables = esMenor
        ? lista.filter(producto => producto.categoria !== 'licores')
        : lista;

    const licoresExcluidos = lista.length - productosFacturables.length;

    let subtotal = 0;
    let subtotalLicores = 0;

    for (const producto of productosFacturables) {
        subtotal += producto.precio;

        if (producto.categoria === 'licores') {
            subtotalLicores += producto.precio;
        }
    }

    const iva = subtotal * tasaIva;
    const ice = edadValida ? subtotalLicores * TASA_ICE : 0;
    const total = subtotal + iva + ice;

    function generarFactura(evento) {
        evento.preventDefault();

        if (!edadValida || !nombre.trim() || productosFacturables.length === 0) {
            return;
        }

        setFactura({
            nombre: nombre.trim(),
            edad: edadCliente,
            ciudad,
            genero,
            productos: [...productosFacturables],
            subtotal,
            tasaIva,
            iva,
            ice,
            total
        });
    }

    return (
        <section className="container py-4 py-md-5">
            <header className="mb-4">
                <h1 className="h2 fw-bold mb-1">Mis compras</h1>
                <p className="text-muted mb-0">
                    Productos seleccionados: <strong>{lista.length}</strong>
                </p>
            </header>

            <form className="row g-4" onSubmit={generarFactura}>
                <div className="col-12 col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 mb-4">
                        <div className="card-body p-4">
                            <h2 className="h5 mb-3">Datos del cliente</h2>

                            <div className="row g-3">
                                <div className="col-12 col-md-8">
                                    <label htmlFor="nombre" className="form-label">
                                        Nombre del cliente
                                    </label>
                                    <input
                                        id="nombre"
                                        type="text"
                                        className="form-control"
                                        value={nombre}
                                        onChange={evento => setNombre(evento.target.value)}
                                        pattern=".*\S.*"
                                        required
                                    />
                                </div>

                                <div className="col-12 col-md-4">
                                    <label htmlFor="edad" className="form-label">
                                        Edad
                                    </label>
                                    <input
                                        id="edad"
                                        type="number"
                                        className="form-control"
                                        min="1"
                                        step="1"
                                        value={edad}
                                        onChange={evento => setEdad(evento.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-12 col-md-6">
                                    <label htmlFor="ciudad" className="form-label">
                                        Ciudad
                                    </label>
                                    <select
                                        id="ciudad"
                                        className="form-select"
                                        value={ciudad}
                                        onChange={evento => setCiudad(evento.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona una ciudad</option>
                                        <option value="Ibarra">Ibarra</option>
                                        <option value="Quito">Quito</option>
                                        <option value="Otavalo">Otavalo</option>
                                        <option value="Cotacachi">Cotacachi</option>
                                    </select>
                                </div>

                                <div className="col-12 col-md-6">
                                    <label htmlFor="genero" className="form-label">
                                        Género
                                    </label>
                                    <select
                                        id="genero"
                                        className="form-select"
                                        value={genero}
                                        onChange={evento => setGenero(evento.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Otro">Otro</option>
                                        <option value="Prefiero no indicarlo">
                                            Prefiero no indicarlo
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="card-header bg-light px-4 py-3">
                            <h2 className="h5 mb-0">Productos seleccionados</h2>
                        </div>

                        {lista.length === 0 ? (
                            <p className="text-muted text-center p-4 mb-0">
                                Tu lista de compras está vacía.
                            </p>
                        ) : (
                            <ul className="list-group list-group-flush">
                                {lista.map((producto, indice) => {
                                    const excluido = esMenor && producto.categoria === 'licores';

                                    return (
                                        <li
                                            key={indice}
                                            className="list-group-item d-flex justify-content-between align-items-center gap-3 px-4 py-3"
                                        >
                                            <span>{producto.nombre}</span>

                                            {excluido ? (
                                                <span className="badge bg-warning text-dark">
                                                    Fuera de la factura
                                                </span>
                                            ) : (
                                                <strong>${producto.precio.toFixed(2)}</strong>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="card bg-dark text-white border-0 shadow rounded-4">
                        <div className="card-body p-4">
                            <h2 className="h5 mb-4">Resumen de compra</h2>

                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span>{edadValida ? `IVA (${tasaIva * 100} %)` : 'IVA'}</span>
                                <span>{edadValida ? `$${iva.toFixed(2)}` : 'Pendiente'}</span>
                            </div>

                            <div className="d-flex justify-content-between">
                                <span>ICE</span>
                                <span>{edadValida ? `$${ice.toFixed(2)}` : 'Pendiente'}</span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center gap-3 border-top border-secondary mt-3 pt-3">
                                <strong>Total a pagar</strong>
                                <strong className="fs-4 text-warning">
                                    {edadValida ? `$${total.toFixed(2)}` : 'Pendiente'}
                                </strong>
                            </div>

                            {licoresExcluidos > 0 && (
                                <p className="alert alert-warning mt-3 mb-0" role="status">
                                    Se excluyeron {licoresExcluidos} productos de la
                                    categoría de licores porque el cliente es menor de edad.
                                </p>
                            )}

                            <button
                                type="submit"
                                className="btn btn-warning fw-semibold w-100 mt-4"
                                disabled={!edadValida || productosFacturables.length === 0}
                            >
                                Generar factura
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-light w-100 mt-2"
                                onClick={guardarCompra}
                                disabled={lista.length === 0}
                            >
                                Guardar compra
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {factura && (
                <section className="card border-0 shadow-sm rounded-4 overflow-hidden mt-4">
                    <div className="card-header bg-success text-white px-4 py-3">
                        <h2 className="h5 mb-0">Factura de compra</h2>
                    </div>

                    <div className="card-body p-4">
                        <div className="row mb-3">
                            <p className="col-12 col-md-6 mb-2">
                                <strong>Cliente:</strong> {factura.nombre}
                            </p>
                            <p className="col-12 col-md-6 mb-2">
                                <strong>Edad:</strong> {factura.edad} años
                            </p>
                            <p className="col-12 col-md-6 mb-2">
                                <strong>Ciudad:</strong> {factura.ciudad}
                            </p>
                            <p className="col-12 col-md-6 mb-2">
                                <strong>Género:</strong> {factura.genero}
                            </p>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-striped align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Producto</th>
                                        <th scope="col" className="text-end">Precio</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {factura.productos.map((producto, indice) => (
                                        <tr key={indice}>
                                            <td>{producto.nombre}</td>
                                            <td className="text-end">
                                                ${producto.precio.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                                <tfoot>
                                    <tr>
                                        <th scope="row">Subtotal</th>
                                        <td className="text-end">
                                            ${factura.subtotal.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">IVA ({factura.tasaIva * 100} %)</th>
                                        <td className="text-end">
                                            ${factura.iva.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">ICE</th>
                                        <td className="text-end">
                                            ${factura.ice.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className="table-success fw-bold">
                                        <th scope="row">Total a pagar</th>
                                        <td className="text-end">
                                            ${factura.total.toFixed(2)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </section>
            )}
        </section>
    );
}

export default Compras;