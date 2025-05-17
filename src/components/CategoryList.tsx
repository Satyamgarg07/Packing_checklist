import type { Category } from '../App';
import CategoryCard from './CategoryCard';

interface CategoryListProps {
  categories: Category[];
  onAddItem: (categoryId: string, itemName: string) => void;
  onToggleItem: (categoryId: string, itemId: string) => void;
  onDeleteItem: (categoryId: string, itemId: string) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const CategoryList = ({
  categories,
  onAddItem,
  onToggleItem,
  onDeleteItem,
  onDeleteCategory
}: CategoryListProps) => {
  // Calculate overall packing progress
  const totalItems = categories.reduce((sum, category) => sum + category.items.length, 0);
  const packedItems = categories.reduce(
    (sum, category) => sum + category.items.filter(item => item.packed).length,
    0
  );
  
  const progress = totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  return (
    <div>
      {totalItems > 0 && (
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Packing Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
            <div
              className="bg-green-500 h-6 rounded-full transition-all duration-500 ease-out progress-bar"
              style={{ width: `${progress}%` }}
            >
              <div className="flex items-center justify-center h-full text-xs font-semibold text-white">
                {progress}%
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            {packedItems} of {totalItems} items packed
          </p>
        </div>
      )}

      <div className="space-y-6">
        {categories.length === 0 ? (
          <div className="text-center py-8 card">
            <p className="text-lg text-gray-600">No categories yet. Add one to get started!</p>
          </div>
        ) : (
          categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              onAddItem={onAddItem}
              onToggleItem={onToggleItem}
              onDeleteItem={onDeleteItem}
              onDeleteCategory={onDeleteCategory}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList; 