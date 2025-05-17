import { useState } from 'react';
import type { Category } from '../App';
import ItemList from './ItemList';

interface CategoryCardProps {
  category: Category;
  onAddItem: (categoryId: string, itemName: string) => void;
  onToggleItem: (categoryId: string, itemId: string) => void;
  onDeleteItem: (categoryId: string, itemId: string) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const CategoryCard = ({
  category,
  onAddItem,
  onToggleItem,
  onDeleteItem,
  onDeleteCategory
}: CategoryCardProps) => {
  const [newItemName, setNewItemName] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAddItem(category.id, newItemName.trim());
      setNewItemName('');
    }
  };

  // Calculate completion for this category
  const totalItems = category.items.length;
  const packedItems = category.items.filter(item => item.packed).length;
  const progress = totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  return (
    <div className="card">
      <div 
        className="p-4 bg-indigo-50 border-b border-indigo-100 flex justify-between items-center cursor-pointer category-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-indigo-900">{category.name}</h3>
          {totalItems > 0 && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full progress-bar" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-indigo-700">
                {packedItems} of {totalItems} packed ({progress}%)
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Delete the category "${category.name}" and all its items?`)) {
                onDeleteCategory(category.id);
              }
            }}
            className="p-1.5 text-red-600 rounded-full hover:bg-red-50"
            aria-label="Delete category"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1.5 text-indigo-600 rounded-full hover:bg-indigo-100"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          {/* Add new item form */}
          <form onSubmit={handleAddItem} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Add new item..."
              className="form-input"
            />
            <button
              type="submit"
              className="btn-primary btn-sm whitespace-nowrap"
            >
              Add
            </button>
          </form>
          
          {/* Item list */}
          <ItemList 
            items={category.items}
            categoryId={category.id}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryCard; 