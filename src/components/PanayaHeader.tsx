import './PanayaHeader.css';

export function PanayaHeader() {
  return (
    <header className="panaya-header">
      <div className="panaya-header-container">
        <div className="panaya-logo-container">
          <img 
            src="/panaya-logo.svg" 
            alt="Panaya" 
            className="panaya-logo"
            onError={(e) => {
              // Fallback to text if logo not found
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              if (!target.nextElementSibling) {
                const textLogo = document.createElement('span');
                textLogo.className = 'panaya-logo-text';
                textLogo.textContent = 'Panaya';
                target.parentElement?.appendChild(textLogo);
              }
            }}
          />
          <span className="panaya-logo-text" style={{ display: 'none' }}>Panaya</span>
        </div>
      </div>
    </header>
  );
}

