function Layout({ children }) {
    try {
        return (
            <div className="d-flex" data-name="layout" data-file="components/Layout.js">
                <Sidebar />
                <div className="main-wrapper">
                    <Header />
                    <div className="main-content">
                        {children}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Layout component error:', error);
        reportError(error);
    }
}
