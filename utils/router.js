const Router = {
    currentRoute: 'login',
    routes: {},
    
    init() {
        window.addEventListener('hashchange', this.handleRouteChange.bind(this));
        this.handleRouteChange();
    },
    
    handleRouteChange() {
        const hash = window.location.hash.slice(1) || 'login';
        this.currentRoute = hash;
        this.render();
    },
    
    navigate(route) {
        window.location.hash = route;
    },
    
    register(route, component) {
        this.routes[route] = component;
    },
    
    render() {
        const component = this.routes[this.currentRoute];
        if (component) {
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(React.createElement(component));
        }
    }
};
