function Compras() {
    try {
        const [compras, setCompras] = React.useState([]);
        const [showModal, setShowModal] = React.useState(false);
        const [filterEstado, setFilterEstado] = React.useState('');
        const [filterProveedor, setFilterProveedor] = React.useState('');
        const [formData, setFormData] = React.useState({
            proveedor: '', producto: '', cantidad: '', precio: '', estado: 'pendiente'
        });
        
        React.useEffect(() => {
            loadCompras();
        }, []);
        
        const loadCompras = async () => {
            try {
                const result = await trickleListObjects('compra', 100, true);
                if (result.items.length === 0) {
                    const dummyData = [
                        { proveedor: 'TechSupply Co.', producto: 'Laptops Dell', cantidad: 10, precio: 850.00, estado: 'completada', total: 8500.00 },
                        { proveedor: 'Office Solutions', producto: 'Sillas Ergonómicas', cantidad: 25, precio: 180.00, estado: 'pendiente', total: 4500.00 },
                        { proveedor: 'Digital World', producto: 'Monitores 4K', cantidad: 15, precio: 320.00, estado: 'completada', total: 4800.00 },
                        { proveedor: 'Furniture Plus', producto: 'Escritorios', cantidad: 8, precio: 450.00, estado: 'cancelada', total: 3600.00 },
                        { proveedor: 'Tech Accessories', producto: 'Teclados Mecánicos', cantidad: 30, precio: 95.00, estado: 'pendiente', total: 2850.00 }
                    ];
                    
                    for (const compra of dummyData) {
                        await trickleCreateObject('compra', compra);
                    }
                    loadCompras();
                } else {
                    setCompras(result.items);
                }
            } catch (error) {
                console.error('Error cargando compras:', error);
            }
        };
        
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await trickleCreateObject('compra', {
                    ...formData,
                    total: parseFloat(formData.cantidad) * parseFloat(formData.precio)
                });
                setShowModal(false);
                setFormData({ proveedor: '', producto: '', cantidad: '', precio: '', estado: 'pendiente' });
                loadCompras();
            } catch (error) {
                console.error('Error guardando compra:', error);
            }
        };
        
        const getEstadoBadge = (estado) => {
            const badges = { 'pendiente': 'warning', 'completada': 'success', 'cancelada': 'danger' };
            return badges[estado] || 'secondary';
        };
        
        const filteredCompras = compras.filter(compra => {
            const matchesEstado = !filterEstado || compra.objectData.estado === filterEstado;
            const matchesProveedor = !filterProveedor || compra.objectData.proveedor === filterProveedor;
            return matchesEstado && matchesProveedor;
        });
        
        const proveedores = [...new Set(compras.map(c => c.objectData.proveedor).filter(Boolean))];
        
        return (
            <Layout>
                <div data-name="compras" data-file="pages/Compras.js">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2>Gestión de Compras</h2>
                            <p className="text-muted">Administra tus órdenes de compra</p>
                        </div>
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            <i className="fas fa-plus me-2"></i>Nueva Compra
                        </button>
                    </div>
                    
                    <div className="filter-section">
                        <div className="row">
                            <div className="col-md-4">
                                <select className="form-select" value={filterEstado} 
                                        onChange={(e) => setFilterEstado(e.target.value)}>
                                    <option value="">Todos los estados</option>
                                    <option value="pendiente">Pendiente</option>
                                    <option value="completada">Completada</option>
                                    <option value="cancelada">Cancelada</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <select className="form-select" value={filterProveedor} 
                                        onChange={(e) => setFilterProveedor(e.target.value)}>
                                    <option value="">Todos los proveedores</option>
                                    {proveedores.map(proveedor => (
                                        <option key={proveedor} value={proveedor}>{proveedor}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-outline-secondary w-100" 
                                        onClick={() => {setFilterEstado(''); setFilterProveedor('');}}>
                                    <i className="fas fa-times me-1"></i>Limpiar
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Proveedor</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio Unit.</th>
                                            <th>Total</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCompras.map(compra => (
                                            <tr key={compra.objectId}>
                                                <td><strong>{compra.objectData.proveedor}</strong></td>
                                                <td>{compra.objectData.producto}</td>
                                                <td>{compra.objectData.cantidad}</td>
                                                <td>${compra.objectData.precio}</td>
                                                <td><strong>${compra.objectData.total?.toFixed(2)}</strong></td>
                                                <td>
                                                    <span className={`badge bg-${getEstadoBadge(compra.objectData.estado)}`}>
                                                        {compra.objectData.estado}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button className="btn btn-sm btn-outline-info" title="Ver">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-primary" title="Editar">
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-success" title="Aprobar">
                                                            <i className="fas fa-check"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    {showModal && (
                        <div className="modal show d-block" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Nueva Compra</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Proveedor</label>
                                                    <input type="text" className="form-control" 
                                                           value={formData.proveedor}
                                                           onChange={(e) => setFormData({...formData, proveedor: e.target.value})}
                                                           required />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Producto</label>
                                                    <input type="text" className="form-control" 
                                                           value={formData.producto}
                                                           onChange={(e) => setFormData({...formData, producto: e.target.value})}
                                                           required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4 mb-3">
                                                    <label className="form-label">Cantidad</label>
                                                    <input type="number" className="form-control" 
                                                           value={formData.cantidad}
                                                           onChange={(e) => setFormData({...formData, cantidad: e.target.value})}
                                                           required />
                                                </div>
                                                <div className="col-md-4 mb-3">
                                                    <label className="form-label">Precio</label>
                                                    <input type="number" step="0.01" className="form-control" 
                                                           value={formData.precio}
                                                           onChange={(e) => setFormData({...formData, precio: e.target.value})}
                                                           required />
                                                </div>
                                                <div className="col-md-4 mb-3">
                                                    <label className="form-label">Estado</label>
                                                    <select className="form-select" 
                                                            value={formData.estado}
                                                            onChange={(e) => setFormData({...formData, estado: e.target.value})}>
                                                        <option value="pendiente">Pendiente</option>
                                                        <option value="completada">Completada</option>
                                                        <option value="cancelada">Cancelada</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                            <button type="submit" className="btn btn-primary">
                                                <i className="fas fa-save me-2"></i>Guardar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        );
    } catch (error) {
        console.error('Compras component error:', error);
        reportError(error);
    }
}
