import React from 'react';
import './StockCard.css';

const StockCard = ({ stock, removingId, onRemove }) => {
  const handleNameClick = (e) => {
    e.preventDefault();
    window.open(`https://finance.vietstock.vn/${stock.name}/technical-analysis.htm`, '_blank');
  };

  const getLabels = () => {
    const labels = [];
    
    if (stock.is_low_price === 1) {
      labels.push({ text: 'Giá thấp', color: '#f1c40f' });
    }
    if (stock.percentage_of_change && stock.percentage_of_change !== 0 && stock.percentage_of_change !== '0') {
      labels.push({ 
        text: `Giá thấp hơn ${stock.percentage_of_change}% TB năm`, 
        color: '#f39c12' 
      });
    }
    if (stock.is_not_change_much_price === 1) {
      labels.push({ text: 'Giá ít dao động', color: '#e67e22' });
    }
    if (stock.is_not_change_much_close_price === 1) {
      labels.push({ text: 'Giá đi ngang', color: '#d35400' });
    }
    if (stock.is_low_volume === 1) {
      labels.push({ text: 'Thanh khoản thấp', color: '#1abc9c' });
    }
    if (stock.is_increase_low_volume === 1) {
      labels.push({ text: 'Thanh khoản thấp dần', color: '#16a085' });
    }
    if (stock.is_very_low_volume === 1) {
      labels.push({ text: 'Thanh khoản rất thấp', color: '#3498db' });
    }
    if (stock.is_very_very_low_volume === 1) {
      labels.push({ text: 'Thanh khoản cạn kiệt', color: '#2980b9' });
    }
    
    return labels;
  };

  const labels = getLabels();

  return (
    <div className="stock-card">
      <div className="stock-card-header">
        <div className="stock-header-left">
          {/* <div className="stock-id">ID: {stock.id}</div> */}
          <a 
            href={`https://finance.vietstock.vn/${stock.name}/technical-analysis.htm`}
            onClick={handleNameClick}
            className="stock-name-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {stock.name}
          </a>
        </div>
        <button
          onClick={() => onRemove(stock.id)}
          className="remove-button"
          disabled={removingId === stock.id}
          title="Remove symbol"
        >
          {removingId === stock.id ? '...' : '−'}
        </button>
      </div>
      {labels.length > 0 && (
        <div className="stock-labels">
          {labels.map((label, index) => (
            <span 
              key={index} 
              className="stock-label"
              style={{ backgroundColor: label.color }}
            >
              {label.text}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockCard;

