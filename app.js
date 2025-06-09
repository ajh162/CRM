function App() {
    try {
        React.useEffect(() => {
            // Verificar autenticación al cargar
            const checkAuth = () => {
                if (!AuthService.isAuthenticated() && Router.currentRoute !== 'login') {
                    Router.navigate('login');
                }
            };
            
            checkAuth();
            
            // Escuchar cambios de ruta
            window.addEventListener('hashchange', checkAuth);
            
            return () => {
                window.removeEventListener('hashchange', checkAuth);
            };
        }, []);
        
        // Registrar todas las rutas
        Router.register('login', Login);
        Router.register('dashboard', Dashboard);
        Router.register('contactos', Contactos);
        Router.register('compras', Compras);
        Router.register('negocios', Negocios);
        Router.register('tickets', Tickets);
        
        // Inicializar el router
        Router.init();
        
        return null; // El router maneja el renderizado
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

// Inicializar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
