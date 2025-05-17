import type { Item } from '../App';

interface ItemListProps {
  items: Item[];
  categoryId: string;
  onToggleItem: (categoryId: string, itemId: string) => void;
  onDeleteItem: (categoryId: string, itemId: string) => void;
}

const ItemList = ({ items, categoryId, onToggleItem, onDeleteItem }: ItemListProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No items in this category. Add your first item!</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {items.map(item => (
        <li key={item.id} className="py-3 flex items-center justify-between group item-row">
          <div className="flex items-center checkbox-container">
            <input
              type="checkbox"
              checked={item.packed}
              onChange={() => onToggleItem(categoryId, item.id)}
              id={`item-${item.id}`}
            />
            <label 
              htmlFor={`item-${item.id}`}
              className={`ml-3 ${
                item.packed ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {item.name}
            </label>
          </div>
          
          <button
            onClick={() => onDeleteItem(categoryId, item.id)}
            className="opacity-0 group-hover:opacity-100 p-1 text-red-500 rounded-full hover:bg-red-50 transition-opacity focus:opacity-100"
            aria-label="Delete item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList; 