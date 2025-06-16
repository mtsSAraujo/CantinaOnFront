const UnderConstruction = ({ page }: { page?: string }) => {
    return (
        <div className="text-center">
            <div style={{ fontSize: '2.5rem' }}>🚧</div>
            <h2 className="mt-3">{page ? `${page} em construção` : 'Em construção'}</h2>
            <p className="text-muted">
                Estamos trabalhando para disponibilizar essa funcionalidade em breve.
            </p>
        </div>
    );
};

export default UnderConstruction;