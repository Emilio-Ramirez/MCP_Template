/**
 * Responsive Data Table System Implementation Guide
 * 
 * Enhanced table implementation with responsive filter bar pattern,
 * two-group system, dynamic cascading vs static horizontal design,
 * mobile-first patterns, and advanced filtering/pagination.
 * 
 * @category UI Components
 * @complexity Advanced
 * @tags data-tables, responsive-design, filtering, pagination, mobile-first
 */

export const responsiveDataTableSystem = {
  id: "responsive-data-table-system",
  name: "Responsive Data Table System",
  description: "Enhanced table implementation guide with responsive filter bar pattern, two-group system, dynamic cascading for filters vs static horizontal for actions, mobile-first design patterns, and advanced filtering/pagination patterns",
  
  // Core Architecture Overview
  architectureOverview: {
    description: "Comprehensive data table system with responsive design and advanced filtering capabilities",
    coreComponents: [
      "ResponsiveDataTable - Main table container with responsive behavior",
      "FilterBar - Two-group system with cascading filters and horizontal actions",
      "TableHeader - Sortable columns with responsive visibility",
      "TableRow - Mobile-first row design with expandable details",
      "PaginationControls - Advanced pagination with responsive controls",
      "TableActions - Contextual actions with mobile-friendly interfaces"
    ],
    keyFeatures: [
      "Mobile-first responsive design with breakpoint-specific layouts",
      "Two-group filter system: cascading filters vs horizontal actions",
      "Dynamic column visibility based on screen size and priority",
      "Advanced filtering with search, date ranges, and multi-select",
      "Virtualized scrolling for large datasets",
      "Contextual actions with bulk operations support",
      "Export functionality with format options",
      "Real-time data updates with optimistic UI"
    ]
  },

  // Responsive Filter Bar Pattern
  filterBarPattern: {
    description: "Two-group system with dynamic cascading for filters and static horizontal for actions",
    implementation: `// FilterBar Component with Two-Group System
interface FilterConfig {
  id: string;
  type: 'search' | 'select' | 'multiselect' | 'daterange' | 'toggle';
  label: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  priority: 'high' | 'medium' | 'low'; // For responsive visibility
  defaultValue?: any;
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'xl';
}

interface ActionConfig {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
  disabled?: boolean;
  requiresSelection?: boolean;
}

interface FilterBarProps {
  filters: FilterConfig[];
  actions: ActionConfig[];
  selectedRowCount?: number;
  onFilterChange: (filterId: string, value: any) => void;
  filterValues: Record<string, any>;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  actions,
  selectedRowCount = 0,
  onFilterChange,
  filterValues,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleFilters, setVisibleFilters] = useState<FilterConfig[]>([]);
  const [hiddenFilters, setHiddenFilters] = useState<FilterConfig[]>([]);

  // Responsive filter visibility management
  useEffect(() => {
    const updateFilterVisibility = () => {
      const screenWidth = window.innerWidth;
      
      if (screenWidth >= 1024) { // lg breakpoint
        setVisibleFilters(filters);
        setHiddenFilters([]);
      } else if (screenWidth >= 768) { // md breakpoint
        const highPriority = filters.filter(f => f.priority === 'high');
        const others = filters.filter(f => f.priority !== 'high');
        setVisibleFilters(highPriority.slice(0, 3));
        setHiddenFilters([...highPriority.slice(3), ...others]);
      } else { // mobile
        const essential = filters.filter(f => f.priority === 'high').slice(0, 1);
        const others = filters.filter(f => f.id !== essential[0]?.id);
        setVisibleFilters(essential);
        setHiddenFilters(others);
      }
    };

    updateFilterVisibility();
    window.addEventListener('resize', updateFilterVisibility);
    return () => window.removeEventListener('resize', updateFilterVisibility);
  }, [filters]);

  const renderFilter = (filter: FilterConfig) => {
    const commonProps = {
      key: filter.id,
      value: filterValues[filter.id] || filter.defaultValue || '',
      onChange: (value: any) => onFilterChange(filter.id, value),
      className: cn(
        "transition-all duration-200",
        filter.width === 'sm' && "w-32",
        filter.width === 'md' && "w-48", 
        filter.width === 'lg' && "w-64",
        filter.width === 'xl' && "w-80",
        !filter.width && "w-full min-w-0"
      )
    };

    switch (filter.type) {
      case 'search':
        return (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              {...commonProps}
              type="text"
              placeholder={filter.placeholder}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );

      case 'select':
        return (
          <select
            {...commonProps}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">{filter.placeholder || \`Select \${filter.label}\`}</option>
            {filter.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <MultiSelectFilter
            {...commonProps}
            options={filter.options || []}
            placeholder={filter.placeholder}
            label={filter.label}
          />
        );

      case 'daterange':
        return (
          <DateRangeFilter
            {...commonProps}
            placeholder={filter.placeholder}
          />
        );

      case 'toggle':
        return (
          <ToggleFilter
            {...commonProps}
            label={filter.label}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg p-4 space-y-4", className)}>
      {/* Primary Filter Group - Cascading Layout */}
      <div className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-end">
        {/* Visible Filters */}
        <div className="flex-1 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:space-x-3 lg:gap-0">
          {visibleFilters.map(renderFilter)}
        </div>

        {/* Filter Toggle Button - Mobile/Tablet Only */}
        {hiddenFilters.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            More Filters
            <ChevronDown className={cn(
              "w-4 h-4 ml-2 transition-transform",
              isExpanded && "transform rotate-180"
            )} />
          </button>
        )}
      </div>

      {/* Expanded Filters - Mobile/Tablet */}
      {isExpanded && hiddenFilters.length > 0 && (
        <div className="lg:hidden grid grid-cols-1 gap-3 sm:grid-cols-2 pt-3 border-t border-gray-200">
          {hiddenFilters.map(renderFilter)}
        </div>
      )}

      {/* Action Group - Horizontal Layout */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3 sm:items-center sm:justify-between">
        {/* Primary Actions */}
        <div className="flex flex-wrap gap-2">
          {actions
            .filter(action => !action.requiresSelection || selectedRowCount > 0)
            .map(action => (
              <button
                key={action.id}
                onClick={action.onClick}
                disabled={action.disabled}
                className={cn(
                  "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  action.variant === 'primary' && "bg-blue-600 text-white hover:bg-blue-700",
                  action.variant === 'secondary' && "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300",
                  action.variant === 'danger' && "bg-red-600 text-white hover:bg-red-700"
                )}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
                {action.requiresSelection && selectedRowCount > 0 && (
                  <span className="ml-2 bg-white bg-opacity-20 rounded-full px-2 py-0.5 text-xs">
                    {selectedRowCount}
                  </span>
                )}
              </button>
            ))}
        </div>

        {/* Results Summary */}
        <div className="text-sm text-gray-500 whitespace-nowrap">
          {selectedRowCount > 0 && (
            <span className="mr-4 font-medium text-blue-600">
              {selectedRowCount} selected
            </span>
          )}
          <span>Showing results</span>
        </div>
      </div>
    </div>
  );
};`
  },

  // Mobile-First Table Design
  mobileFirstTable: {
    description: "Responsive table implementation with mobile-optimized layouts",
    implementation: `// ResponsiveDataTable Component
interface ColumnConfig {
  id: string;
  header: string;
  accessor: string | ((row: any) => React.ReactNode);
  sortable?: boolean;
  width?: string;
  minWidth?: string;
  priority: 'essential' | 'important' | 'nice-to-have';
  mobileRender?: (row: any) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface ResponsiveDataTableProps {
  data: any[];
  columns: ColumnConfig[];
  loading?: boolean;
  pagination?: PaginationConfig;
  selection?: SelectionConfig;
  actions?: TableActionConfig[];
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  className?: string;
}

export const ResponsiveDataTable: React.FC<ResponsiveDataTableProps> = ({
  data,
  columns,
  loading = false,
  pagination,
  selection,
  actions,
  onSort,
  onSelectionChange,
  className
}) => {
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<ColumnConfig[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive column visibility
  useEffect(() => {
    const updateColumnVisibility = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 768);
      
      if (screenWidth >= 1024) { // Desktop
        setVisibleColumns(columns);
      } else if (screenWidth >= 768) { // Tablet
        setVisibleColumns(columns.filter(col => 
          col.priority === 'essential' || col.priority === 'important'
        ));
      } else { // Mobile
        setVisibleColumns(columns.filter(col => col.priority === 'essential'));
      }
    };

    updateColumnVisibility();
    window.addEventListener('resize', updateColumnVisibility);
    return () => window.removeEventListener('resize', updateColumnVisibility);
  }, [columns]);

  const handleSort = (column: string) => {
    const direction = sortConfig?.column === column && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ column, direction });
    onSort?.(column, direction);
  };

  const handleRowSelection = (rowId: string, selected: boolean) => {
    const newSelection = new Set(selectedRows);
    if (selected) {
      newSelection.add(rowId);
    } else {
      newSelection.delete(rowId);
    }
    setSelectedRows(newSelection);
    onSelectionChange?.(Array.from(newSelection));
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allIds = data.map(row => row.id);
      setSelectedRows(new Set(allIds));
      onSelectionChange?.(allIds);
    } else {
      setSelectedRows(new Set());
      onSelectionChange?.([]);
    }
  };

  if (loading) {
    return <TableSkeleton />;
  }

  // Mobile Card Layout
  if (isMobile) {
    return (
      <div className={cn("space-y-3", className)}>
        {data.map((row, index) => (
          <MobileTableCard
            key={row.id || index}
            row={row}
            columns={columns}
            selected={selectedRows.has(row.id)}
            onSelectionChange={(selected) => handleRowSelection(row.id, selected)}
            actions={actions}
          />
        ))}
        {pagination && <PaginationControls {...pagination} />}
      </div>
    );
  }

  // Desktop/Tablet Table Layout
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selection && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === data.length && data.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              {visibleColumns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",
                    column.sortable && "cursor-pointer hover:bg-gray-100",
                    column.align === 'center' && "text-center",
                    column.align === 'right' && "text-right"
                  )}
                  style={{ width: column.width, minWidth: column.minWidth }}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <SortIcon 
                        direction={sortConfig?.column === column.id ? sortConfig.direction : null}
                      />
                    )}
                  </div>
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <TableRow
                key={row.id || index}
                row={row}
                columns={visibleColumns}
                selected={selectedRows.has(row.id)}
                onSelectionChange={(selected) => handleRowSelection(row.id, selected)}
                actions={actions}
                selection={selection}
              />
            ))}
          </tbody>
        </table>
      </div>
      {pagination && <PaginationControls {...pagination} />}
    </div>
  );
};

// Mobile Card Layout Component
const MobileTableCard: React.FC<{
  row: any;
  columns: ColumnConfig[];
  selected: boolean;
  onSelectionChange: (selected: boolean) => void;
  actions?: TableActionConfig[];
}> = ({ row, columns, selected, onSelectionChange, actions }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const essentialColumns = columns.filter(col => col.priority === 'essential');
  const otherColumns = columns.filter(col => col.priority !== 'essential');

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      {/* Header with Selection and Primary Info */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => onSelectionChange(e.target.checked)}
            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="flex-1 min-w-0">
            {essentialColumns.map((column) => (
              <div key={column.id} className="mb-1">
                {column.mobileRender ? 
                  column.mobileRender(row) : 
                  <div className="font-medium text-gray-900 truncate">
                    {typeof column.accessor === 'function' ? 
                      column.accessor(row) : 
                      row[column.accessor]
                    }
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center space-x-1 ml-2">
          {actions?.filter(action => action.primary).slice(0, 2).map((action) => (
            <button
              key={action.id}
              onClick={() => action.onClick(row)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title={action.label}
            >
              {action.icon}
            </button>
          ))}
          
          {otherColumns.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronDown className={cn(
                "w-4 h-4 transition-transform",
                isExpanded && "transform rotate-180"
              )} />
            </button>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && otherColumns.length > 0 && (
        <div className="pt-3 border-t border-gray-100 space-y-2">
          {otherColumns.map((column) => (
            <div key={column.id} className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                {column.header}:
              </span>
              <span className="text-sm text-gray-900 text-right flex-1 ml-2">
                {typeof column.accessor === 'function' ? 
                  column.accessor(row) : 
                  row[column.accessor]
                }
              </span>
            </div>
          ))}
          
          {/* Additional Actions */}
          {actions && actions.length > 2 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {actions.slice(2).map((action) => (
                <button
                  key={action.id}
                  onClick={() => action.onClick(row)}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                  {action.icon && <span className="mr-1">{action.icon}</span>}
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};`
  },

  // Advanced Filtering System
  advancedFiltering: {
    description: "Sophisticated filtering with search, date ranges, and multi-select capabilities",
    implementation: `// Advanced Filter Components
interface MultiSelectFilterProps {
  options: Array<{ value: string; label: string }>;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  label: string;
  className?: string;
}

export const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  options,
  value,
  onChange,
  placeholder,
  label,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const selectedLabels = options
    .filter(option => value.includes(option.value))
    .map(option => option.label);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <div className="flex items-center justify-between">
          <span className={cn(
            "truncate",
            selectedLabels.length === 0 && "text-gray-500"
          )}>
            {selectedLabels.length === 0 
              ? placeholder || \`Select \${label}\`
              : selectedLabels.length === 1
                ? selectedLabels[0]
                : \`\${selectedLabels.length} selected\`
            }
          </span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search options..."
                className="w-full pl-8 pr-3 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No options found</div>
            ) : (
              filteredOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={value.includes(option.value)}
                    onChange={() => handleToggleOption(option.value)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900">{option.label}</span>
                </label>
              ))
            )}
          </div>

          {/* Action Buttons */}
          {value.length > 0 && (
            <div className="p-2 border-t border-gray-200 flex justify-between">
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => onChange(options.map(o => o.value))}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                Select All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Date Range Filter Component
interface DateRangeFilterProps {
  value: { start?: string; end?: string };
  onChange: (value: { start?: string; end?: string }) => void;
  placeholder?: string;
  className?: string;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  value,
  onChange,
  placeholder = "Select date range",
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formatDateRange = () => {
    if (value.start && value.end) {
      return \`\${format(new Date(value.start), 'MMM d')} - \${format(new Date(value.end), 'MMM d')}\`;
    } else if (value.start) {
      return \`From \${format(new Date(value.start), 'MMM d')}\`;
    } else if (value.end) {
      return \`Until \${format(new Date(value.end), 'MMM d')}\`;
    }
    return placeholder;
  };

  const handleApply = () => {
    onChange(tempRange);
    setIsOpen(false);
  };

  const handleClear = () => {
    const emptyRange = { start: undefined, end: undefined };
    setTempRange(emptyRange);
    onChange(emptyRange);
    setIsOpen(false);
  };

  const quickRanges = [
    { label: 'Today', getValue: () => ({ start: format(new Date(), 'yyyy-MM-dd'), end: format(new Date(), 'yyyy-MM-dd') }) },
    { label: 'Last 7 days', getValue: () => ({ start: format(subDays(new Date(), 7), 'yyyy-MM-dd'), end: format(new Date(), 'yyyy-MM-dd') }) },
    { label: 'Last 30 days', getValue: () => ({ start: format(subDays(new Date(), 30), 'yyyy-MM-dd'), end: format(new Date(), 'yyyy-MM-dd') }) },
    { label: 'This month', getValue: () => ({ start: format(startOfMonth(new Date()), 'yyyy-MM-dd'), end: format(endOfMonth(new Date()), 'yyyy-MM-dd') }) }
  ];

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <div className="flex items-center justify-between">
          <span className={cn(
            "truncate",
            (!value.start && !value.end) && "text-gray-500"
          )}>
            {formatDateRange()}
          </span>
          <Calendar className="w-4 h-4 text-gray-400" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4 min-w-80">
          {/* Quick Range Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickRanges.map((range) => (
              <button
                key={range.label}
                type="button"
                onClick={() => setTempRange(range.getValue())}
                className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={tempRange.start || ''}
                onChange={(e) => setTempRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={tempRange.end || ''}
                onChange={(e) => setTempRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear
            </button>
            <div className="space-x-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};`
  },

  // Advanced Pagination System
  paginationSystem: {
    description: "Sophisticated pagination with responsive controls and customizable page sizes",
    implementation: `// Advanced Pagination Component
interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showPageInfo?: boolean;
  showQuickJumper?: boolean;
}

export const PaginationControls: React.FC<PaginationConfig> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  showPageSizeSelector = true,
  showPageInfo = true,
  showQuickJumper = true
}) => {
  const [jumpPage, setJumpPage] = useState('');

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Calculate range
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    // Add first page
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // Add middle pages
    rangeWithDots.push(...range);

    // Add last page
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((item, index, arr) => {
      // Remove duplicate 1s or totalPages
      if (item === 1) return index === 0 || arr[index - 1] !== 1;
      if (item === totalPages) return index === arr.length - 1 || arr[index + 1] !== totalPages;
      return true;
    });
  };

  const handleQuickJump = () => {
    const page = parseInt(jumpPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setJumpPage('');
    }
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 px-6 py-3 bg-white border-t border-gray-200">
      {/* Results Info & Page Size Selector */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
        {showPageInfo && (
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to{' '}
            <span className="font-medium">{endItem}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </div>
        )}
        
        {showPageSizeSelector && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Show:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-700">per page</span>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
        {/* Quick Jump */}
        {showQuickJumper && totalPages > 10 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Go to:</span>
            <input
              type="text"
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleQuickJump()}
              placeholder="Page"
              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleQuickJump}
              disabled={!jumpPage || parseInt(jumpPage) < 1 || parseInt(jumpPage) > totalPages}
              className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Go
            </button>
          </div>
        )}

        {/* Page Navigation */}
        <nav className="flex items-center space-x-1">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Numbers */}
          <div className="hidden sm:flex">
            {getVisiblePages().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => onPageChange(page as number)}
                    className={cn(
                      "px-3 py-2 text-sm font-medium border-t border-b border-gray-300 transition-colors",
                      currentPage === page
                        ? "bg-blue-50 text-blue-600 border-blue-500"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Page Info */}
          <div className="sm:hidden px-3 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300">
            {currentPage} of {totalPages}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </div>
  );
};`
  },

  // Performance Optimizations
  performanceOptimizations: {
    description: "Virtualization and optimization techniques for large datasets",
    implementation: `// Virtualized Table Implementation
import { VariableSizeList as List } from 'react-window';
import { AutoSizer } from 'react-virtualized-auto-sizer';

interface VirtualizedTableProps extends ResponsiveDataTableProps {
  itemHeight?: (index: number) => number;
  overscanCount?: number;
  onItemsRendered?: (params: {
    overscanStartIndex: number;
    overscanStopIndex: number;
    visibleStartIndex: number;
    visibleStopIndex: number;
  }) => void;
}

export const VirtualizedDataTable: React.FC<VirtualizedTableProps> = ({
  data,
  columns,
  itemHeight = () => 60,
  overscanCount = 5,
  onItemsRendered,
  ...props
}) => {
  const listRef = useRef<List>(null);
  const [visibleColumns, setVisibleColumns] = useState<ColumnConfig[]>([]);

  // Memoized row renderer
  const Row = useMemo(() => {
    return ({ index, style }: { index: number; style: React.CSSProperties }) => (
      <div style={style}>
        <TableRow
          row={data[index]}
          columns={visibleColumns}
          {...props}
        />
      </div>
    );
  }, [data, visibleColumns, props]);

  return (
    <div className="h-96"> {/* Fixed height required for virtualization */}
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            height={height}
            width={width}
            itemCount={data.length}
            itemSize={itemHeight}
            overscanCount={overscanCount}
            onItemsRendered={onItemsRendered}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

// Optimized Data Fetching Hook
export const useTableData = <T,>(
  endpoint: string,
  options: {
    pageSize: number;
    filters: Record<string, any>;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    enabled?: boolean;
  }
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounced fetch function
  const debouncedFetch = useMemo(
    () => debounce(async (fetchOptions: typeof options & { page: number }) => {
      if (!fetchOptions.enabled) return;

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: fetchOptions.page.toString(),
          pageSize: fetchOptions.pageSize.toString(),
          ...Object.entries(fetchOptions.filters).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
              acc[key] = Array.isArray(value) ? value.join(',') : value.toString();
            }
            return acc;
          }, {} as Record<string, string>)
        });

        if (fetchOptions.sortBy) {
          params.append('sortBy', fetchOptions.sortBy);
          params.append('sortDirection', fetchOptions.sortDirection || 'asc');
        }

        const response = await fetch(\`\${endpoint}?\${params}\`);
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        const result = await response.json();
        setData(result.data || []);
        setTotalCount(result.totalCount || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    }, 300),
    [endpoint]
  );

  // Effect to trigger data fetching
  useEffect(() => {
    debouncedFetch({ ...options, page: currentPage });
  }, [debouncedFetch, options, currentPage]);

  const refetch = useCallback(() => {
    debouncedFetch({ ...options, page: currentPage });
  }, [debouncedFetch, options, currentPage]);

  return {
    data,
    loading,
    error,
    totalCount,
    currentPage,
    setCurrentPage,
    refetch,
    totalPages: Math.ceil(totalCount / options.pageSize)
  };
};

// Memoized Components for Performance
export const MemoizedTableHeader = React.memo<{
  columns: ColumnConfig[];
  sortConfig: { column: string; direction: 'asc' | 'desc' } | null;
  onSort: (column: string) => void;
}>(({ columns, sortConfig, onSort }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((column) => (
          <th
            key={column.id}
            className={cn(
              "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",
              column.sortable && "cursor-pointer hover:bg-gray-100"
            )}
            onClick={() => column.sortable && onSort(column.id)}
          >
            <div className="flex items-center space-x-1">
              <span>{column.header}</span>
              {column.sortable && (
                <SortIcon 
                  direction={sortConfig?.column === column.id ? sortConfig.direction : null}
                />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
});

export const MemoizedTableRow = React.memo<{
  row: any;
  columns: ColumnConfig[];
  selected: boolean;
  onSelectionChange: (selected: boolean) => void;
}>(({ row, columns, selected, onSelectionChange }) => {
  return (
    <tr className={cn(
      "hover:bg-gray-50 transition-colors",
      selected && "bg-blue-50"
    )}>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onSelectionChange(e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </td>
      {columns.map((column) => (
        <td key={column.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {typeof column.accessor === 'function' ? column.accessor(row) : row[column.accessor]}
        </td>
      ))}
    </tr>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.row.id === nextProps.row.id &&
    prevProps.selected === nextProps.selected &&
    JSON.stringify(prevProps.row) === JSON.stringify(nextProps.row)
  );
});`
  },

  // Integration Examples
  integrationExamples: {
    description: "Complete implementation examples for common scenarios",
    examples: [
      {
        title: "Complete Data Table Setup",
        code: `// Example: Client Management Table
import { useState } from 'react';
import { ResponsiveDataTable, FilterBar } from './components/ResponsiveDataTable';

export const ClientManagementTable = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    region: [],
    dateRange: { start: undefined, end: undefined }
  });

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filterConfig: FilterConfig[] = [
    {
      id: 'search',
      type: 'search',
      label: 'Search',
      placeholder: 'Search clients...',
      priority: 'high',
      width: 'lg'
    },
    {
      id: 'status',
      type: 'select',
      label: 'Status',
      placeholder: 'All statuses',
      priority: 'high',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' }
      ]
    },
    {
      id: 'region',
      type: 'multiselect',
      label: 'Region',
      placeholder: 'All regions',
      priority: 'medium',
      options: [
        { value: 'north', label: 'North' },
        { value: 'south', label: 'South' },
        { value: 'east', label: 'East' },
        { value: 'west', label: 'West' }
      ]
    },
    {
      id: 'dateRange',
      type: 'daterange',
      label: 'Date Range',
      placeholder: 'Select date range',
      priority: 'low'
    }
  ];

  const actionConfig: ActionConfig[] = [
    {
      id: 'add',
      label: 'Add Client',
      icon: <Plus className="w-4 h-4" />,
      variant: 'primary',
      onClick: () => console.log('Add client')
    },
    {
      id: 'export',
      label: 'Export',
      icon: <Download className="w-4 h-4" />,
      variant: 'secondary',
      onClick: () => console.log('Export data')
    },
    {
      id: 'delete',
      label: 'Delete Selected',
      icon: <Trash className="w-4 h-4" />,
      variant: 'danger',
      requiresSelection: true,
      onClick: () => console.log('Delete selected', selectedRows)
    }
  ];

  const columns: ColumnConfig[] = [
    {
      id: 'name',
      header: 'Client Name',
      accessor: 'name',
      sortable: true,
      priority: 'essential',
      mobileRender: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.name}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      )
    },
    {
      id: 'email',
      header: 'Email',
      accessor: 'email',
      priority: 'important'
    },
    {
      id: 'status',
      header: 'Status',
      accessor: (row) => (
        <span className={cn(
          "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
          row.status === 'active' && "bg-green-100 text-green-800",
          row.status === 'inactive' && "bg-red-100 text-red-800",
          row.status === 'pending' && "bg-yellow-100 text-yellow-800"
        )}>
          {row.status}
        </span>
      ),
      priority: 'essential'
    },
    {
      id: 'region',
      header: 'Region',
      accessor: 'region',
      priority: 'nice-to-have'
    },
    {
      id: 'created',
      header: 'Created',
      accessor: (row) => format(new Date(row.createdAt), 'MMM d, yyyy'),
      priority: 'nice-to-have'
    }
  ];

  const { data, loading, totalCount, currentPage, setCurrentPage, totalPages } = useTableData(
    '/api/clients',
    {
      pageSize: 25,
      filters,
      enabled: true
    }
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Client Management</h1>
      </div>

      <FilterBar
        filters={filterConfig}
        actions={actionConfig}
        selectedRowCount={selectedRows.length}
        onFilterChange={(filterId, value) => {
          setFilters(prev => ({ ...prev, [filterId]: value }));
        }}
        filterValues={filters}
      />

      <ResponsiveDataTable
        data={data}
        columns={columns}
        loading={loading}
        selection={{
          selectedRows,
          onSelectionChange: setSelectedRows
        }}
        pagination={{
          currentPage,
          totalPages,
          pageSize: 25,
          totalItems: totalCount,
          onPageChange: setCurrentPage,
          onPageSizeChange: (size) => console.log('Page size changed', size)
        }}
      />
    </div>
  );
};`
      }
    ]
  },

  // Best Practices
  bestPractices: {
    description: "Production-ready implementation guidelines",
    guidelines: [
      {
        category: "Performance",
        practices: [
          "Use virtualization for tables with >1000 rows",
          "Implement proper memoization for table components",
          "Debounce filter changes to prevent excessive API calls",
          "Use server-side pagination and filtering",
          "Implement proper loading states and skeletons"
        ]
      },
      {
        category: "Responsive Design",
        practices: [
          "Follow mobile-first design principles",
          "Implement progressive enhancement for larger screens",
          "Use appropriate breakpoints (768px, 1024px, 1280px)",
          "Prioritize columns based on importance",
          "Provide expandable details for mobile cards"
        ]
      },
      {
        category: "Accessibility",
        practices: [
          "Implement proper ARIA labels and roles",
          "Support keyboard navigation",
          "Ensure sufficient color contrast",
          "Provide screen reader friendly content",
          "Use semantic HTML elements"
        ]
      },
      {
        category: "User Experience",
        practices: [
          "Show clear loading states",
          "Provide meaningful empty states",
          "Implement optimistic UI updates",
          "Offer bulk actions for efficiency",
          "Include export functionality"
        ]
      }
    ]
  }
};

export default responsiveDataTableSystem;