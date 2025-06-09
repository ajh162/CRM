function Login() {
    try {
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        const [showPassword, setShowPassword] = React.useState(false);
        
        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');
            
            try {
                const result = await AuthService.login(email, password);
                
                if (result.success) {
                    Router.navigate('dashboard');
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError('Error de conexión');
            } finally {
                setLoading(false);
            }
        };
        
        const fillDemoData = () => {
            setEmail('admin@crm.com');
            setPassword('admin123');
        };
        
        return (
            <div className="login-container d-flex align-items-center justify-content-center" 
                 data-name="login" data-file="pages/Login.js">
                <div className="login-card p-5" style={{width: '450px'}}>
                    <div className="text-center mb-5">
                        <div className="mb-4">
                            <i className="fas fa-chart-line fa-4x text-white mb-3"></i>
                        </div>
                        <h2 className="text-white mb-2">CRM System</h2>
                        <p className="text-white-50">Plataforma de gestión empresarial</p>
                    </div>
                    
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label text-white">Email</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Ingresa tu email"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <label className="form-label text-white">Contraseña</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fas fa-lock"></i>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingresa tu contraseña"
                                    required
                                />
                                <button 
                                    type="button" 
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>
                        
                        <div className="d-grid gap-3 mb-4">
                            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                {loading ? (
                                    <span>
                                        <i className="fas fa-spinner fa-spin me-2"></i>
                                        Iniciando sesión...
                                    </span>
                                ) : (
                                    <span>
                                        <i className="fas fa-sign-in-alt me-2"></i>
                                        Iniciar Sesión
                                    </span>
                                )}
                            </button>
                            
                            <button type="button" className="btn btn-outline-light" onClick={fillDemoData}>
                                <i className="fas fa-user-cog me-2"></i>
                                Usar Datos Demo
                            </button>
                        </div>
                    </form>
                    
                    <div className="text-center">
                        <small className="text-white-50 d-block mb-3">
                            Demo: admin@crm.com / admin123
                        </small>
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-link text-white-50 btn-sm p-0">
                                <i className="fas fa-question-circle me-1"></i>Ayuda
                            </button>
                            <button className="btn btn-link text-white-50 btn-sm p-0">
                                <i className="fas fa-shield-alt me-1"></i>Privacidad
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Login component error:', error);
        reportError(error);
    }
}
