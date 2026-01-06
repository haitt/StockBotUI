import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getWatchLists, addSymbol, removeSymbol } from '../services/api';
import AddSymbolModal from '../components/AddSymbolModal';
import StockCard from '../components/StockCard';
import './WatchListsPage.css';

const WatchListsPage = () => {
  const { logout } = useAuth();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    fetchWatchLists();
  }, []);

  const fetchWatchLists = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getWatchLists();
      console.log(data);
      setStocks(data);
    } catch (err) {
      setError(err.message || 'Failed to load watch lists');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSymbol = async (symbolName) => {
    try {
      setModalLoading(true);
      setModalError('');
      await addSymbol(symbolName);
      setIsModalOpen(false);
      await fetchWatchLists(); // Refresh the list
    } catch (err) {
      setModalError(err.message || 'Failed to add symbol');
    } finally {
      setModalLoading(false);
    }
  };

  const handleRemoveSymbol = async (id) => {
    try {
      setRemovingId(id);
      await removeSymbol(id);
      await fetchWatchLists(); // Refresh the list
    } catch (err) {
      setError(err.message || 'Failed to remove symbol');
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="watch-lists-container">
      <header className="watch-lists-header">
        <h1>Watch Lists</h1>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </header>

      <main className="watch-lists-content">
        {!loading && !error && (
          <div className="content-header">
            <button onClick={() => setIsModalOpen(true)} className="add-button">
              + Add More
            </button>
          </div>
        )}

        {loading && <div className="loading">Loading watch lists...</div>}
        
        {error && (
          <div className="error-message">
            {error}
            <button onClick={fetchWatchLists} className="retry-button">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {stocks.length === 0 ? (
              <div className="empty-state">
                <p>No watch lists found.</p>
                <button onClick={() => setIsModalOpen(true)} className="add-button">
                  Add Your First Symbol
                </button>
              </div>
            ) : (
              <div className="stocks-grid">
                {stocks.map((stock) => (
                  <StockCard
                    key={stock.id}
                    stock={stock}
                    removingId={removingId}
                    onRemove={handleRemoveSymbol}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <AddSymbolModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setModalError('');
        }}
        onAdd={handleAddSymbol}
        loading={modalLoading}
        error={modalError}
      />
    </div>
  );
};

export default WatchListsPage;

