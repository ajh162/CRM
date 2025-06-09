function Sidebar() {
    try {
        const [activeRoute, setActiveRoute] = React.useState(Router.currentRoute);
        
        React.useEffect(() => {
            const handleRouteChange = () => setActiveRoute(Router.currentRoute);
            window.addEventListener('hashchange', handleRouteChange);
            return () => window.removeEventListener('hashchange', handleRouteChange);
        }, []);
        
        const menuItems = [
            { route: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
            { route: 'compras', icon: 'fas fa-shopping-cart', label: 'Compras' },
            { route: 'contactos', icon: 'fas fa-users', label: 'Contactos' },
            { route: 'negocios', icon: 'fas fa-handshake', label: 'Negocios' },
            { route: 'tickets', icon: 'fas fa-ticket-alt', label: 'Tickets' }
        ];
        
        return (
            <div className="sidebar" data-name="sidebar" data-file="components/Sidebar.js">
                <div className="p-3">
                    <h4 className="text-white mb-4">
                        <i className="fas fa-chart-line me-2"></i>CRM System
                    </h4>
                    <nav className="nav flex-column">
                        {menuItems.map(item => (
                            <a
                                key={item.route}
                                href={`#${item.route}`}
                                className={`nav-link ${activeRoute === item.route ? 'active' : ''}`}
                            >
                                <i className={`${item.icon} me-2`}></i>
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Sidebar component error:', error);
        reportError(error);
    }
}
