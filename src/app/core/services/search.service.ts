import { Injectable } from '@angular/core';

export type SortDirection = 'asc' | 'desc';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  /**
   * Search through array of objects by multiple fields
   * @param data Array of objects to search through
   * @param searchTerm Search term to filter by
   * @param searchFields Array of field names to search in
   * @returns Filtered array
   */
  search<T>(data: T[], searchTerm: string, searchFields: string[]): T[] {
    const searchValue = searchTerm.toLowerCase().trim();
    
    if (searchValue === '') {
      return [...data];
    }

    return data.filter(item => {
      return searchFields.some(field => {
        const value = this.getNestedProperty(item, field);
        return value && value.toString().toLowerCase().includes(searchValue);
      });
    });
  }

  /**
   * Search with custom filter function
   * @param data Array of objects to search through
   * @param searchTerm Search term to filter by
   * @param customFilter Custom filter function
   * @returns Filtered array
   */
  searchWithCustomFilter<T>(data: T[], searchTerm: string, customFilter: (item: T, searchTerm: string) => boolean): T[] {
    const searchValue = searchTerm.toLowerCase().trim();
    
    if (searchValue === '') {
      return [...data];
    }

    return data.filter(item => customFilter(item, searchValue));
  }

  /**
   * Get nested property value from object using dot notation
   * @param obj Object to get property from
   * @param path Property path (e.g., 'user.name')
   * @returns Property value
   */
  private getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  /**
   * Highlight search term in text
   * @param text Original text
   * @param searchTerm Term to highlight
   * @param highlightClass CSS class to apply
   * @returns HTML string with highlighted term
   */
  highlightSearchTerm(text: string, searchTerm: string, highlightClass: string = 'bg-yellow-200'): string {
    if (!searchTerm || !text) {
      return text;
    }

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, `<span class="${highlightClass}">$1</span>`);
  }

  /**
   * Debounce search input
   * @param func Function to debounce
   * @param delay Delay in milliseconds
   * @returns Debounced function
   */
  debounce(func: Function, delay: number = 300): (...args: any[]) => void {
    let timeoutId: any;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  /**
   * Sort array by column
   * @param data Array to sort
   * @param column Column name to sort by
   * @param direction Sort direction ('asc' or 'desc')
   * @returns Sorted array
   */
  sort<T>(data: T[], column: string, direction: SortDirection): T[] {
    return [...data].sort((a, b) => {
      const aValue = this.getNestedProperty(a, column) || '';
      const bValue = this.getNestedProperty(b, column) || '';

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  /**
   * Toggle sort direction
   * @param currentColumn Current sorted column
   * @param newColumn New column to sort
   * @param currentDirection Current sort direction
   * @returns New sort direction
   */
  toggleSortDirection(currentColumn: string, newColumn: string, currentDirection: SortDirection): SortDirection {
    if (currentColumn === newColumn) {
      return currentDirection === 'asc' ? 'desc' : 'asc';
    }
    return 'asc';
  }

  /**
   * Paginate data
   * @param data Array to paginate
   * @param page Current page number (1-based)
   * @param pageSize Items per page
   * @returns Paginated data
   */
  paginate<T>(data: T[], page: number, pageSize: number): T[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }

  /**
   * Calculate total pages
   * @param totalItems Total number of items
   * @param pageSize Items per page
   * @returns Total number of pages
   */
  getTotalPages(totalItems: number, pageSize: number): number {
    return Math.ceil(totalItems / pageSize);
  }

  /**
   * Get pagination info
   * @param totalItems Total number of items
   * @param page Current page
   * @param pageSize Items per page
   * @returns Pagination information
   */
  getPaginationInfo(totalItems: number, page: number, pageSize: number): {
    startIndex: number;
    endIndex: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  } {
    const startIndex = (page - 1) * pageSize + 1;
    const endIndex = Math.min(page * pageSize, totalItems);
    const totalPages = this.getTotalPages(totalItems, pageSize);
    
    return {
      startIndex,
      endIndex,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1
    };
  }
}
