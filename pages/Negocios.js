function Negocios() {
    try {
        const [negocios, setNegocios] = React.useState([]);
        const [showModal, setShowModal] = React.useState(false);
        const [filterEtapa, setFilterEtapa] = React.useState('');
        const [formData, setFormData] = React.useState({
            nombre: '', cliente: '', valor: '', etapa: 'prospecto', fechaCierre: '', descripcion: ''
        });
        
        React.useEffect(() => {
            loadNegocios();
        }, []);
        
        const loadNegocios = async () => {
            try {
                const result = await trickleListObjects('negocio', 100, true);
                if (result.items.length === 0) {
                    const dummyData = [
                        { nombre: 'Sistema ERP Corporativo', cliente: 'TechCorp Solutions', valor: 85000, etapa: 'negociacion', fechaCierre: '2024-03-15', descripcion: 'Implementación completa de ERP' },
                        { nombre: 'App Móvil E-commerce', cliente: 'RetailMax', valor: 45000, etapa: 'propuesta', fechaCierre: '2024-02-28', descripcion: 'Desarrollo de aplicación móvil' },
                        { nombre: 'Consultoría IT', cliente: 'StartupHub', valor: 12000, etapa: 'calificado', fechaCierre: '2024-04-10', descripcion: 'Consultoría tecnológica integral' },
                        { nombre: 'Plataforma Web', cliente: 'DigitalCorp', valor: 28000, etapa: 'ganado', fechaCierre: '2024-01-20', descripción: 'Desarrollo de plataforma web' },
                        { nombre: 'Sistema CRM', cliente: 'SalesForce Ltd', valor: 35000, etapa: 'prospecto', fechaCierre: '2024-05-01', descripcion: 'CRM personalizado' }
                    ];
                    
                    for (const negocio of dummyData) {
                        await trickleCreateObject('negocio', negocio);
                    }
                    loadNegocios();
                } else {
                    setNegocios(result.items);
                }
            } catch (error) {
                console.error('Error cargando negocios:', error);
            }
        };
        
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await trickleCreateObject('negocio', formData);
                setShowModal(false);
                setFormData({ nombre: '', cliente: '', valor: '', etapa: 'prospecto', fechaCierre: '', descripcion: '' });
                loadNegocios();
            } catch (error) {
                console.error('Error guardando negocio:', error);
            }
        };
        
        const getEtapaBadge = (etapa) => {
            const badges = {
                'prospecto': 'secondary', 'calificado': 'info', 'propuesta': 'warning',
                'negociacion': 'primary', 'ganado': 'success', 'perdido': 'danger'
            };
            return badges[etapa] || 'secondary';
        };
        
        const filteredNegocios = negocios.filter(negocio => {
            return !filterEtapa || negocio.objectData.etapa === filterEtapa;
        });
        
        return (
            <Layout>
                <div data-name="negocios" data-file="pages/Negocios.js">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2>Pipeline de Ventas</h2>
                            <p className="text-muted">Gestiona tus oportunidades de negocio</p>
                        </div>
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            <i className="fas fa-plus me-2"></i>Nuevo Negocio
                        </button>
                    </div>
                    
                    <div className="filter-section">
                        <div className="row">
                            <div className="col-md-4">
                                <select className="form-select" value={filterEtapa} 
                                        onChange={(e) => setFilterEtapa(e.target.value)}>
                                    <option value="">Todas las etapas</option>
                                    <option value="prospecto">Prospecto</option>
                                    <option value="calificado">Calificado</option>
                                    <option value="propuesta">Propuesta</option>
                                    <option value="negociacion">Negociación</option>
                                    <option value="ganado">Ganado</option>
                                    <option value="perdido">Perdido</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-outline-secondary w-100" 
                                        onClick={() => setFilterEtapa('')}>
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
                                            <th>Nombre</th>
                                            <th>Cliente</th>
                                            <th>Valor</th>
                                            <th>Etapa</th>
                                            <th>Fecha Cierre</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredNegocios.map(negocio => (
                                            <tr key={negocio.objectId}>
                                                <td><strong>{negocio.objectData.nombre}</strong></td>
                                                <td>{negocio.objectData.cliente}</td>
                                                <td><strong>${parseFloat(negocio.objectData.valor || 0).toLocaleString()}</strong></td>
                                                <td>
                                                    <span className={`badge bg-${getEtapaBadge(negocio.objectData.etapa)}`}>
                                                        {negocio.objectData.etapa}
                                                    </span>
                                                </td>
                                                <td>{negocio.objectData.fechaCierre}</td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button className="btn btn-sm btn-outline-info" title="Ver">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-primary" title="Editar">
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-success" title="Avanzar">
                                                            <i className="fas fa-arrow-right"></i>
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
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Nuevo Negocio</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Nombre del Negocio</label>
                                                    <input type="text" className="form-control" 
                                                           value={formData.nombre}
                                                           onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                                           required />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Cliente</label>
                                                    <input type="text" className="form-control" 
                                                           value={formData.cliente}
                                                           onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                                                           required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4 mb-3">
                                                    <label className="form-label">Valor</label>
                                                    <input type="number" step="0.01" className="form-control" 
                                                           value={formData.valor}
                                                           onChange={(e) => setFormData({...formData, valor: e.target.value})}
                                                           required />
                                                </div>
                                                <div className="col-md-4 mb-3">
                                                    <label className="form-label">Etapa</label>
                                                    <select className="form-select" 
                                                            value={formData.etapa}
                                                            onChange={(e) => setFormData({...formData, etapa: e.target.value})}>
                                                        <option value="prospecto">Prospecto</option>
                                                        <option value="calificado">Calificado</option>
                                                        <option value="propuesta">Propuesta</option>
                                                        <option value="negociacion">Negociación</option>
                                                        <option value="ganado">Ganado</option>
                                                        <option value="perdido">Perdido</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-4 mb-3">
                                                    <label className="form-label">Fecha de Cierre</label>
                                                    <input type="date" className="form-control" 
                                                           value={formData.fechaCierre}
                                                           onChange={(e) => setFormData({...formData, fechaCierre: e.target.value})} />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Descripción</label>
                                                <textarea className="form-control" rows="3"
                                                          value={formData.descripcion}
                                                          onChange={(e) => setFormData({...formData, descripcion: e.target.value})}></textarea>
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
        console.error('Negocios component error:', error);
        reportError(error);
    }
}
