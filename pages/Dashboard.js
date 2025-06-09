function Dashboard() {
    try {
        const [stats, setStats] = React.useState({
            totalContactos: 0,
            totalNegocios: 0,
            totalCompras: 0,
            ticketsAbiertos: 0
        });
        
        React.useEffect(() => {
            loadStats();
        }, []);
        
        const loadStats = async () => {
            try {
                const contactos = await trickleListObjects('contacto', 100, true);
                const negocios = await trickleListObjects('negocio', 100, true);
                const compras = await trickleListObjects('compra', 100, true);
                const tickets = await trickleListObjects('ticket', 100, true);
                
                setStats({
                    totalContactos: contactos.items.length,
                    totalNegocios: negocios.items.length,
                    totalCompras: compras.items.length,
                    ticketsAbiertos: tickets.items.filter(t => t.objectData.estado === 'abierto').length
                });
            } catch (error) {
                console.error('Error cargando estadísticas:', error);
            }
        };
        
        const statCards = [
            { title: 'Contactos', value: stats.totalContactos, icon: 'fas fa-users', color: 'primary', route: 'contactos' },
            { title: 'Negocios', value: stats.totalNegocios, icon: 'fas fa-handshake', color: 'success', route: 'negocios' },
            { title: 'Compras', value: stats.totalCompras, icon: 'fas fa-shopping-cart', color: 'info', route: 'compras' },
            { title: 'Tickets', value: stats.ticketsAbiertos, icon: 'fas fa-ticket-alt', color: 'warning', route: 'tickets' }
        ];
        
        return (
            <Layout>
                <div data-name="dashboard" data-file="pages/Dashboard.js">
                    <div className="row mb-5">
                        <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h2 className="mb-2">Panel de Control</h2>
                                    <p className="text-muted">Gestiona tu CRM de manera eficiente</p>
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-outline-primary">
                                        <i className="fas fa-download me-2"></i>Exportar
                                    </button>
                                    <button className="btn btn-primary">
                                        <i className="fas fa-plus me-2"></i>Nuevo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row mb-5">
                        {statCards.map((card, index) => (
                            <div key={index} className="col-lg-3 col-md-6 mb-4">
                                <div className="card stat-card h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h6 className="text-muted mb-2">{card.title}</h6>
                                                <h2 className={`text-${card.color} mb-0`}>{card.value}</h2>
                                            </div>
                                            <div className={`text-${card.color}`}>
                                                <i className={`${card.icon} fa-2x`}></i>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <a href={`#${card.route}`} className={`btn btn-${card.color} btn-sm flex-fill`}>
                                                <i className="fas fa-eye me-1"></i>Ver
                                            </a>
                                            <button className={`btn btn-outline-${card.color} btn-sm`}>
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Acciones Rápidas</h5>
                                    <button className="btn btn-sm btn-outline-primary">
                                        <i className="fas fa-cog"></i>
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <a href="#contactos" className="btn btn-outline-primary w-100">
                                                <i className="fas fa-user-plus d-block mb-2 fa-2x"></i>
                                                <small>Nuevo Contacto</small>
                                            </a>
                                        </div>
                                        <div className="col-6">
                                            <a href="#negocios" className="btn btn-outline-success w-100">
                                                <i className="fas fa-handshake d-block mb-2 fa-2x"></i>
                                                <small>Nuevo Negocio</small>
                                            </a>
                                        </div>
                                        <div className="col-6">
                                            <a href="#compras" className="btn btn-outline-info w-100">
                                                <i className="fas fa-shopping-cart d-block mb-2 fa-2x"></i>
                                                <small>Nueva Compra</small>
                                            </a>
                                        </div>
                                        <div className="col-6">
                                            <a href="#tickets" className="btn btn-outline-warning w-100">
                                                <i className="fas fa-ticket-alt d-block mb-2 fa-2x"></i>
                                                <small>Nuevo Ticket</small>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="mb-0">Herramientas</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-grid gap-3">
                                        <button className="btn btn-primary">
                                            <i className="fas fa-chart-bar me-2"></i>Generar Reportes
                                        </button>
                                        <button className="btn btn-success">
                                            <i className="fas fa-file-export me-2"></i>Exportar Datos
                                        </button>
                                        <button className="btn btn-info">
                                            <i className="fas fa-sync me-2"></i>Sincronizar
                                        </button>
                                        <button className="btn btn-warning">
                                            <i className="fas fa-cogs me-2"></i>Configuración
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    } catch (error) {
        console.error('Dashboard component error:', error);
        reportError(error);
    }
}
