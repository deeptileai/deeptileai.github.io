import './Header.css';

function Header({ onReset }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">服装印花图案提取工具</h1>
        <p className="header-subtitle">
          AI 驱动的服装抠图、图案提取与四方连续生成
        </p>
        {onReset && (
          <button className="reset-button" onClick={onReset}>
            重新开始
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;

