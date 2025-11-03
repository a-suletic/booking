import { useContext } from 'react';
import { SearchContext, type SearchContextType } from './SearchContextType';

const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      'useSearchContext must be used within a SearchContextProvider'
    );
  }
  return context as SearchContextType;
};
export default useSearchContext;
