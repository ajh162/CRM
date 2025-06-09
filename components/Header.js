function Header() {
    try {
        const user = AuthService.getCurrentUser();
        
        const handleLogout = () => {
            AuthService.logout();
        };
        
        return (
            <header className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center" 
                    data-name="header" data-file="components/Header.js">
                <div>
                    <h5 className="mb-0 text-capitalize">{Router.currentRoute}</h5>
                </div>
                <div className="dropdown">
                    <button className="btn btn-outline-secondary dropdown-toggle" 
                            type="button" data-bs-toggle="dropdown">
                        <i className="fas fa-user me-2"></i>
                        {user?.name || 'Usuario'}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#perfil">
                            <i className="fas fa-user-cog me-2"></i>Perfil
                        </a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
                        </a></li>
                    </ul>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
    }
}
