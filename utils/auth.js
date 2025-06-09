const AuthService = {
    currentUser: null,
    
    async login(email, password) {
        try {
            // Simular autenticación local
            if (email === 'admin@crm.com' && password === 'admin123') {
                const user = {
                    id: '1',
                    email: email,
                    name: 'Administrador',
                    role: 'admin'
                };
                
                this.currentUser = user;
                localStorage.setItem('crmUser', JSON.stringify(user));
                return { success: true, user };
            }
            
            return { success: false, message: 'Credenciales inválidas' };
        } catch (error) {
            console.error('Error en login:', error);
            return { success: false, message: 'Error del servidor' };
        }
    },
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('crmUser');
        Router.navigate('login');
    },
    
    getCurrentUser() {
        if (!this.currentUser) {
            const stored = localStorage.getItem('crmUser');
            if (stored) {
                this.currentUser = JSON.parse(stored);
            }
        }
        return this.currentUser;
    },
    
    isAuthenticated() {
        return !!this.getCurrentUser();
    }
};
