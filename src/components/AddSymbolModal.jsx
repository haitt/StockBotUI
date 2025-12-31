import { useState } from 'react';
import './AddSymbolModal.css';

const AddSymbolModal = ({ isOpen, onClose, onAdd, loading, error }) => {
  const [symbolName, setSymbolName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbolName.trim()) {
      onAdd(symbolName.trim().toUpperCase());
      setSymbolName('');
    }
  };

  const handleClose = () => {
    setSymbolName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Symbol</h2>
          <button className="modal-close" onClick={handleClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="symbol">Symbol Name</label>
            <input
              type="text"
              id="symbol"
              value={symbolName}
              onChange={(e) => setSymbolName(e.target.value)}
              placeholder="e.g., ACB"
              required
              disabled={loading}
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button type="button" onClick={handleClose} className="cancel-button" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="add-button" disabled={loading || !symbolName.trim()}>
              {loading ? 'Adding...' : 'Add Symbol'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSymbolModal;

