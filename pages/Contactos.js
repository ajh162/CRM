import Tabs1 from '../components/Tabs1';


function Contactos() {
    try {
        const [contactos, setContactos] = React.useState([]);
        const [showModal, setShowModal] = React.useState(false);
        const [searchTerm, setSearchTerm] = React.useState('');
        const [filterEmpresa, setFilterEmpresa] = React.useState('');
        const [formData, setFormData] = React.useState({
            nombre: '', email: '', telefono: '', empresa: '', cargo: ''
        });
        
        React.useEffect(() => {
            loadContactos();
        }, []);
        
        const loadContactos = async () => {
            try {
                const result = await trickleListObjects('contacto', 100, true);
                if (result.items.length === 0) {
                    // Crear datos ficticios
                    const dummyData = [
                        { nombre: 'Ana García', email: 'ana@techcorp.com', telefono: '+1-555-0101', empresa: 'TechCorp', cargo: 'CEO' },
                        { nombre: 'Carlos López', email: 'carlos@innovate.com', telefono: '+1-555-0102', empresa: 'Innovate Inc', cargo: 'CTO' },
                        { nombre: 'María Rodríguez', email: 'maria@startup.io', telefono: '+1-555-0103', empresa: 'StartupIO', cargo: 'Marketing Manager' },
                        { nombre: 'Juan Martínez', email: 'juan@solutions.net', telefono: '+1-555-0104', empresa: 'Solutions Net', cargo: 'Sales Director' },
                        { nombre: 'Laura Fernández', email: 'laura@digital.com', telefono: '+1-555-0105', empresa: 'Digital Corp', cargo: 'Product Manager' }
                    ];
                    
                    for (const contact of dummyData) {
                        await trickleCreateObject('contacto', contact);
                    }
                    loadContactos();
                } else {
                    setContactos(result.items);
                }
            } catch (error) {
                console.error('Error cargando contactos:', error);
            }
        };
        
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await trickleCreateObject('contacto', formData);
                setShowModal(false);
                setFormData({ nombre: '', email: '', telefono: '', empresa: '', cargo: '' });
                loadContactos();
            } catch (error) {
                console.error('Error guardando contacto:', error);
            }
        };
        
        const getAvatarUrl = (nombre) => {
            const initial = nombre?.charAt(0).toLowerCase() || 'u';
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre || 'Usuario')}&background=667eea&color=fff&size=40`;
        };
        
        const filteredContactos = contactos.filter(contacto => {
            const matchesSearch = contacto.objectData.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                contacto.objectData.email?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesEmpresa = !filterEmpresa || contacto.objectData.empresa === filterEmpresa;
            return matchesSearch && matchesEmpresa;
        });
        
        const empresas = [...new Set(contactos.map(c => c.objectData.empresa).filter(Boolean))];
        
        return (
            <Layout>
                <div data-name="contactos" data-file="pages/Contactos.js">
                    
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2>Gestión de Contactos</h2>
                            <p className="text-muted">Administra tu base de contactos</p>
                        </div>
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            <i className="fas fa-plus me-2"></i>Nuevo Contacto
                        </button>
                    </div>
                    
                    <div className="filter-section">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fas fa-search"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Buscar contactos..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <select className="form-select" value={filterEmpresa} 
                                        onChange={(e) => setFilterEmpresa(e.target.value)}>
                                    <option value="">Todas las empresas</option>
                                    {empresas.map(empresa => (
                                        <option key={empresa} value={empresa}>{empresa}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-outline-secondary w-100" 
                                        onClick={() => {setSearchTerm(''); setFilterEmpresa('');}}>
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
                                            <th>Contacto</th>
                                            <th>Email</th>
                                            <th>Teléfono</th>
                                            <th>Empresa</th>
                                            <th>Cargo</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredContactos.map(contacto => (
                                            <tr key={contacto.objectId}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img src={getAvatarUrl(contacto.objectData.nombre)} 
                                                             alt="Avatar" className="avatar me-3" />
                                                        <div>
                                                            <div className="fw-bold">{contacto.objectData.nombre}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{contacto.objectData.email}</td>
                                                <td>{contacto.objectData.telefono}</td>
                                                <td>
                                                    <span className="badge bg-primary">{contacto.objectData.empresa}</span>
                                                </td>
                                                <td>{contacto.objectData.cargo}</td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button className="btn btn-sm btn-outline-info" title="Ver">
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-success" title="Email">
                                                            <i className="fas fa-envelope"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-warning" title="Llamar">
                                                            <i className="fas fa-phone"></i>
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
                                        <h5 className="modal-title">Nuevo Contacto</h5>
                                        <button type="button" className="btn-close" 
                                                onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Nombre</label>
                                                    <input type="text" className="form-control" 
                                                           value={formData.nombre}
                                                           onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                                           required />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input type="email" className="form-control" 
                                                           value={formData.email}
                                                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                           required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Teléfono</label>
                                                    <input type="tel" className="form-control" 
                                                           value={formData.telefono}
                                                           onChange={(e) => setFormData({...formData, telefono: e.target.value})} />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Empresa</label>
                                                    <input type="text" className="form-control" 
                                                           value={formData.empresa}
                                                           onChange={(e) => setFormData({...formData, empresa: e.target.value})} />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Cargo</label>
                                                <input type="text" className="form-control" 
                                                       value={formData.cargo}
                                                       onChange={(e) => setFormData({...formData, cargo: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" 
                                                    onClick={() => setShowModal(false)}>Cancelar</button>
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
        console.error('Contactos component error:', error);
        reportError(error);
    }
}
