function Tickets() {
    try {
        const [tickets, setTickets] = React.useState([]);
        const [showModal, setShowModal] = React.useState(false);
        const [filterEstado, setFilterEstado] = React.useState('');
        const [filterPrioridad, setFilterPrioridad] = React.useState('');
        const [formData, setFormData] = React.useState({
            titulo: '', descripcion: '', prioridad: 'media', estado: 'abierto', cliente: '', categoria: 'soporte'
        });
        
        React.useEffect(() => {
            loadTickets();
        }, []);
        
        const loadTickets = async () => {
            try {
                const result = await trickleListObjects('ticket', 100, true);
                if (result.items.length === 0) {
                    const dummyData = [
                        { titulo: 'Error en sistema de facturación', cliente: 'TechCorp', categoria: 'soporte', prioridad: 'alta', estado: 'abierto', fechaCreacion: '2024-01-15' },
                        { titulo: 'Solicitud nueva funcionalidad', cliente: 'RetailMax', categoria: 'ventas', prioridad: 'media', estado: 'en_progreso', fechaCreacion: '2024-01-14' },
                        { titulo: 'Problema acceso usuarios', cliente: 'StartupHub', categoria: 'soporte', prioridad: 'critica', estado: 'abierto', fechaCreacion: '2024-01-13' },
                        { titulo: 'Consulta sobre precios', cliente: 'DigitalCorp', categoria: 'ventas', prioridad: 'baja', estado: 'resuelto', fechaCreacion: '2024-01-12' },
                        { titulo: 'Integración API externa', cliente: 'SalesForce Ltd', categoria: 'soporte', prioridad: 'media', estado: 'cerrado', fechaCreacion: '2024-01-11' }
                    ];
                    
                    for (const ticket of dummyData) {
                        await trickleCreateObject('ticket', ticket);
                    }
                    loadTickets();
                } else {
                    setTickets(result.items);
                }
            } catch (error) {
                console.error('Error cargando tickets:', error);
            }
        };
        
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await trickleCreateObject('ticket', {
                    ...formData,
                    fechaCreacion: new Date().toISOString().split('T')[0]
                });
                
                setShowModal(false);
                setFormData({ titulo: '', descripcion: '', prioridad: 'media', estado: 'abierto', cliente: '', categoria: 'soporte' });
                loadTickets();
            } catch (error) {
                console.error('Error guardando ticket:', error);
            }
        };
        
        const getPrioridadBadge = (prioridad) => {
            const badges = { 'baja': 'success', 'media': 'warning', 'alta': 'danger', 'critica': 'dark' };
            return badges[prioridad] || 'secondary';
        };
        
        const getEstadoBadge = (estado) => {
            const badges = { 'abierto': 'primary', 'en_progreso': 'warning', 'resuelto': 'success', 'cerrado': 'secondary' };
            return badges[estado] || 'secondary';
        };
        
        const filteredTickets = tickets.filter(ticket => {
            const matchesEstado = !filterEstado || ticket.objectData.estado === filterEstado;
            const matchesPrioridad = !filterPrioridad || ticket.objectData.prioridad === filterPrioridad;
            return matchesEstado && matchesPrioridad;
        });
        
        return (
            <Layout>
                <div data-name="tickets" data-file="pages/Tickets.js">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2>Mesa de Ayuda</h2>
                            <p className="text-muted">Sistema de tickets y soporte</p>
                        </div>
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            <i className="fas fa-plus me-2"></i>Nuevo Ticket
                        </button>
                    </div>
                    
                    <div className="filter-section">
                        <div className="row">
                            <div className="col-md-4">
                                <select className="form-select" value={filterEstado} 
                                        onChange={(e) => setFilterEstado(e.target.value)}>
                                    <option value="">Todos los estados</option>
                                    <option value="abierto">Abierto</option>
                                    <option value="en_progreso">En Progreso</option>
                                    <option value="resuelto">Resuelto</option>
                                    <option value="cerrado">Cerrado</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <select className="form-select" value={filterPrioridad} 
                                        onChange={(e) => setFilterPrioridad(e.target.value)}>
                                    <option value="">Todas las prioridades</option>
                                    <option value="baja">Baja</option>
                                    <option value="media">Media</option>
                                    <option value="alta">Alta</option>
                                    <option value="critica">Crítica</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-outline-secondary w-100" 
                                        onClick={() => {setFilterEstado(''); setFilterPrioridad('');}}>
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
                                            <th>ID</th>
                                            <th>Título</th>
                                            <th>Cliente</th>
                                            <th>Categoría</th>
                                            <th>Prioridad</th>
                                            <th>Estado</th>
                                            <th>Fecha</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTickets.map(ticket => (
                                            <tr key={ticket.objectId}>
                                                <td><strong>#{ticket.objectId.slice(-6)}</strong></td>
                                                <td>{ticket.objectData.titulo}</td>
                                                <td>{ticket.objectData.cliente}</td>
                                                <td>{ticket.objectData.categoria}</td>
                                                <td>
                                                    <span className={`badge bg-${getPrioridadBadge(ticket.objectData.prioridad)}`}>
                                                        {ticket.objectData.prioridad}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`badge bg-${getEstadoBadge(ticket.objectData.estado)}`}>
                                                        {ticket.objectData.estado}
                                                    </span>
                                                </td>
                                                <td>{ticket.objectData.fechaCreacion}</td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button className="btn btn-sm btn-outline-info" title="Ver">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-primary" title="Responder">
                                                            <i className="fas fa-reply"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-success" title="Resolver">
                                                            <i className="fas fa-check-circle"></i>
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
                                        <h5 className="modal-title">Nuevo Ticket</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-8 mb-3">
                                                    <label className="form-label">Título</label>
                                                    <input type="text" className="form-control" 
                                                           value={formData.titulo}
                                                           onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                                                           required />
                                                </div>
                                                <div className="col-md-4 mb-3">
                                                    <label className="form-label">Cliente</label>
                                                    <input type="text" className="form-control" 
                                                           value={formData.cliente}
                                                           onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                                                           required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4 mb-3">
                                                    <label className="form-label">Categoría</label>
                                                    <select className="form-select" 
                                                            value={formData.categoria}
                                                            onChange={(e) => setFormData({...formData, categoria: e.target.value})}>
                                                        <option value="soporte">Soporte Técnico</option>
                                                        <option value="ventas">Ventas</option>
                                                        <option value="facturacion">Facturación</option>
                                                        <option value="general">General</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-4 mb-3">
                                                    <label className="form-label">Prioridad</label>
                                                    <select className="form-select" 
                                                            value={formData.prioridad}
                                                            onChange={(e) => setFormData({...formData, prioridad: e.target.value})}>
                                                        <option value="baja">Baja</option>
                                                        <option value="media">Media</option>
                                                        <option value="alta">Alta</option>
                                                        <option value="critica">Crítica</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-4 mb-3">
                                                    <label className="form-label">Estado</label>
                                                    <select className="form-select" 
                                                            value={formData.estado}
                                                            onChange={(e) => setFormData({...formData, estado: e.target.value})}>
                                                        <option value="abierto">Abierto</option>
                                                        <option value="en_progreso">En Progreso</option>
                                                        <option value="resuelto">Resuelto</option>
                                                        <option value="cerrado">Cerrado</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Descripción</label>
                                                <textarea className="form-control" rows="4"
                                                          value={formData.descripcion}
                                                          onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                                                          required></textarea>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                            <button type="submit" className="btn btn-primary">Crear Ticket</button>
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
        console.error('Tickets component error:', error);
        reportError(error);
    }
}
