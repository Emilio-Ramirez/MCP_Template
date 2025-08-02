/**
 * Notifications System Implementation Guide
 * 
 * Complete notifications architecture with tabbed interface, real-time badge system,
 * state management, approval workflows, TypeScript type safety, and performance optimizations.
 * 
 * @category UI Components
 * @complexity Advanced
 * @tags notifications, real-time, state management, typescript, performance
 */

export const notificationsSystem = {
  id: "notifications-system",
  name: "Notifications System Implementation",
  description: "Complete notifications architecture with tabbed interface, real-time badge system, state management, approval workflows, TypeScript type safety, and performance optimizations",
  
  // Core Architecture Patterns
  architecturePatterns: {
    systemOverview: {
      description: "Enterprise-grade notifications system with real-time updates and sophisticated state management",
      coreComponents: [
        "NotificationCenter - Main container with tabbed interface",
        "NotificationBadge - Real-time badge system with counts",
        "NotificationItem - Individual notification rendering",
        "NotificationProvider - Context-based state management",
        "NotificationAPI - Backend integration layer"
      ],
      keyFeatures: [
        "Real-time badge updates with WebSocket/SSE integration",
        "Tabbed interface for categorizing notifications",
        "Approval workflow notifications for client/user management",
        "TypeScript discriminated unions for type safety",
        "Performance optimizations with virtualization",
        "Offline-capable with sync on reconnection"
      ]
    },
    
    stateManagement: {
      description: "Comprehensive state management using React Context and reducers",
      implementation: `// Notification Types with Discriminated Unions
type BaseNotification = {
  id: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  userId: string;
};

type ApprovalNotification = BaseNotification & {
  type: 'approval';
  approvalType: 'client' | 'user' | 'role' | 'permission';
  requestId: string;
  requestorName: string;
  requestorEmail: string;
  approvalData: {
    clientName?: string;
    userData?: UserApprovalData;
    roleData?: RoleApprovalData;
    permissionData?: PermissionApprovalData;
  };
  actions: Array<'approve' | 'reject' | 'requestInfo'>;
};

type SystemNotification = BaseNotification & {
  type: 'system';
  systemType: 'maintenance' | 'update' | 'alert' | 'info';
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
};

type WorkflowNotification = BaseNotification & {
  type: 'workflow';
  workflowType: 'lwr' | 'tlwr' | 'vlwr' | 'micro-production';
  workflowId: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed';
  assignedTo?: string;
  dueDate?: Date;
};

type NotificationType = ApprovalNotification | SystemNotification | WorkflowNotification;

// State Management with useReducer
interface NotificationState {
  notifications: NotificationType[];
  unreadCounts: {
    total: number;
    approval: number;
    system: number;
    workflow: number;
  };
  activeTab: 'all' | 'approval' | 'system' | 'workflow';
  loading: boolean;
  error: string | null;
  lastSync: Date | null;
}

type NotificationAction = 
  | { type: 'LOAD_NOTIFICATIONS'; payload: NotificationType[] }
  | { type: 'ADD_NOTIFICATION'; payload: NotificationType }
  | { type: 'MARK_READ'; payload: { id: string } }
  | { type: 'MARK_ALL_READ'; payload: { tab?: string } }
  | { type: 'DELETE_NOTIFICATION'; payload: { id: string } }
  | { type: 'UPDATE_COUNTS'; payload: NotificationState['unreadCounts'] }
  | { type: 'SET_ACTIVE_TAB'; payload: NotificationState['activeTab'] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SYNC_COMPLETE'; payload: { timestamp: Date } };

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'LOAD_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
        loading: false,
        error: null,
        lastSync: new Date()
      };
      
    case 'ADD_NOTIFICATION':
      const newNotifications = [action.payload, ...state.notifications];
      return {
        ...state,
        notifications: newNotifications,
        unreadCounts: calculateUnreadCounts(newNotifications)
      };
      
    case 'MARK_READ':
      const updatedNotifications = state.notifications.map(notification =>
        notification.id === action.payload.id
          ? { ...notification, read: true }
          : notification
      );
      return {
        ...state,
        notifications: updatedNotifications,
        unreadCounts: calculateUnreadCounts(updatedNotifications)
    };
    
    case 'MARK_ALL_READ':
      const allReadNotifications = state.notifications.map(notification => {
        if (action.payload.tab && action.payload.tab !== 'all') {
          return notification.type === action.payload.tab
            ? { ...notification, read: true }
            : notification;
        }
        return { ...notification, read: true };
      });
      return {
        ...state,
        notifications: allReadNotifications,
        unreadCounts: calculateUnreadCounts(allReadNotifications)
      };
      
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload
      };
      
    default:
      return state;
  }
}

// Helper function to calculate unread counts
function calculateUnreadCounts(notifications: NotificationType[]) {
  const unread = notifications.filter(n => !n.read);
  return {
    total: unread.length,
    approval: unread.filter(n => n.type === 'approval').length,
    system: unread.filter(n => n.type === 'system').length,
    workflow: unread.filter(n => n.type === 'workflow').length
  };
}`
    }
  },

  // Tabbed Interface Implementation
  tabbedInterface: {
    description: "Sophisticated tabbed interface with badge counts and filtering",
    implementation: `// NotificationTabs Component
interface NotificationTabsProps {
  activeTab: NotificationState['activeTab'];
  unreadCounts: NotificationState['unreadCounts'];
  onTabChange: (tab: NotificationState['activeTab']) => void;
}

export const NotificationTabs: React.FC<NotificationTabsProps> = ({
  activeTab,
  unreadCounts,
  onTabChange
}) => {
  const tabs = [
    { 
      id: 'all' as const, 
      label: 'All', 
      count: unreadCounts.total,
      icon: <Bell className="w-4 h-4" />
    },
    { 
      id: 'approval' as const, 
      label: 'Approvals', 
      count: unreadCounts.approval,
      icon: <CheckCircle className="w-4 h-4" />,
      priority: 'high'
    },
    { 
      id: 'workflow' as const, 
      label: 'Workflows', 
      count: unreadCounts.workflow,
      icon: <GitBranch className="w-4 h-4" />
    },
    { 
      id: 'system' as const, 
      label: 'System', 
      count: unreadCounts.system,
      icon: <Settings className="w-4 h-4" />
    }
  ];

  return (
    <div className="flex border-b border-gray-200 bg-white">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
            "hover:text-blue-600 hover:border-blue-200",
            activeTab === tab.id
              ? "text-blue-600 border-blue-600 bg-blue-50"
              : "text-gray-500 border-transparent"
          )}
        >
          {tab.icon}
          <span>{tab.label}</span>
          {tab.count > 0 && (
            <NotificationBadge 
              count={tab.count} 
              priority={tab.priority}
              size="sm"
            />
          )}
        </button>
      ))}
    </div>
  );
};`
  },

  // Real-time Badge System
  badgeSystem: {
    description: "Real-time badge system with priority-based styling and animations",
    implementation: `// NotificationBadge Component with Priority Styling
interface NotificationBadgeProps {
  count: number;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  animate?: boolean;
  showZero?: boolean;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  priority = 'medium',
  size = 'md',
  animate = true,
  showZero = false
}) => {
  if (count === 0 && !showZero) return null;

  const sizeClasses = {
    xs: 'text-xs px-1.5 py-0.5 min-w-[16px] h-4',
    sm: 'text-xs px-2 py-1 min-w-[20px] h-5',
    md: 'text-sm px-2.5 py-1 min-w-[24px] h-6',
    lg: 'text-base px-3 py-1.5 min-w-[28px] h-7'
  };

  const priorityClasses = {
    low: 'bg-gray-500 text-white',
    medium: 'bg-blue-500 text-white',
    high: 'bg-orange-500 text-white',
    urgent: 'bg-red-500 text-white animate-pulse'
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        "leading-none whitespace-nowrap",
        sizeClasses[size],
        priorityClasses[priority],
        animate && count > 0 && "animate-in fade-in zoom-in duration-200",
        "transition-all duration-200"
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
};

// Real-time Badge Updates Hook
export const useNotificationBadge = () => {
  const { state } = useNotificationContext();
  const [previousCounts, setPreviousCounts] = useState(state.unreadCounts);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    // Detect new notifications
    if (state.unreadCounts.total > previousCounts.total) {
      setHasNewNotifications(true);
      
      // Auto-clear the "new" indicator after 3 seconds
      const timer = setTimeout(() => {
        setHasNewNotifications(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    setPreviousCounts(state.unreadCounts);
  }, [state.unreadCounts, previousCounts]);

  return {
    counts: state.unreadCounts,
    hasNewNotifications,
    clearNewIndicator: () => setHasNewNotifications(false)
  };
};`
  },

  // Approval Workflows Integration
  approvalWorkflows: {
    description: "Specialized approval workflow notifications with action buttons",
    implementation: `// ApprovalNotificationItem Component
interface ApprovalNotificationItemProps {
  notification: ApprovalNotification;
  onAction: (action: string, notificationId: string) => Promise<void>;
}

export const ApprovalNotificationItem: React.FC<ApprovalNotificationItemProps> = ({
  notification,
  onAction
}) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleAction = async (action: string) => {
    setIsLoading(action);
    try {
      await onAction(action, notification.id);
    } finally {
      setIsLoading(null);
    }
  };

  const getApprovalContent = () => {
    switch (notification.approvalType) {
      case 'client':
        return {
          title: 'New Client Registration',
          subtitle: \`\${notification.requestorName} has requested to register \${notification.approvalData.clientName}\`,
          icon: <Building className="w-5 h-5 text-blue-600" />
        };
      case 'user':
        return {
          title: 'User Account Approval',
          subtitle: \`\${notification.requestorName} (\${notification.requestorEmail}) requires account approval\`,
          icon: <User className="w-5 h-5 text-green-600" />
        };
      case 'role':
        return {
          title: 'Role Assignment Request',
          subtitle: \`Role update requested for \${notification.requestorName}\`,
          icon: <Shield className="w-5 h-5 text-purple-600" />
        };
      case 'permission':
        return {
          title: 'Permission Change Request',
          subtitle: \`Permission modification requested by \${notification.requestorName}\`,
          icon: <Key className="w-5 h-5 text-orange-600" />
        };
    }
  };

  const content = getApprovalContent();

  return (
    <div className={cn(
      "p-4 border-l-4 bg-white hover:bg-gray-50 transition-colors",
      notification.priority === 'urgent' ? "border-red-500" : "border-blue-500",
      !notification.read && "bg-blue-50"
    )}>
      <div className="flex items-start gap-3">
        {content.icon}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">
              {content.title}
            </h4>
            <time className="text-xs text-gray-500">
              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
            </time>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {content.subtitle}
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-3">
            {notification.actions.map((action) => (
              <button
                key={action}
                onClick={() => handleAction(action)}
                disabled={isLoading !== null}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  action === 'approve' && "bg-green-100 text-green-700 hover:bg-green-200",
                  action === 'reject' && "bg-red-100 text-red-700 hover:bg-red-200",
                  action === 'requestInfo' && "bg-blue-100 text-blue-700 hover:bg-blue-200"
                )}
              >
                {isLoading === action ? (
                  <Loader className="w-3 h-3 animate-spin" />
                ) : (
                  getActionLabel(action)
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Approval Action Handlers
export const useApprovalActions = () => {
  const { dispatch } = useNotificationContext();

  const handleApprovalAction = async (action: string, notificationId: string) => {
    try {
      const response = await fetch(\`/api/notifications/\${notificationId}/approve\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error('Failed to process approval');
      }

      // Mark notification as read after action
      dispatch({ type: 'MARK_READ', payload: { id: notificationId } });
      
      // Show success toast
      toast.success(\`\${action} action completed successfully\`);
      
    } catch (error) {
      console.error('Approval action failed:', error);
      toast.error('Failed to process approval action');
      throw error;
    }
  };

  return { handleApprovalAction };
};`
  },

  // Performance Optimizations
  performanceOptimizations: {
    description: "Advanced performance patterns for large notification lists",
    implementation: `// Virtual Scrolling for Large Notification Lists
import { FixedSizeList as List } from 'react-window';
import { useMemo } from 'react';

interface VirtualizedNotificationListProps {
  notifications: NotificationType[];
  height: number;
  itemHeight: number;
  onNotificationAction: (action: string, id: string) => Promise<void>;
}

export const VirtualizedNotificationList: React.FC<VirtualizedNotificationListProps> = ({
  notifications,
  height,
  itemHeight = 120,
  onNotificationAction
}) => {
  const ItemRenderer = useMemo(() => {
    return ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const notification = notifications[index];
      
      return (
        <div style={style}>
          <NotificationItem
            notification={notification}
            onAction={onNotificationAction}
          />
        </div>
      );
    };
  }, [notifications, onNotificationAction]);

  if (notifications.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500">
        <div className="text-center">
          <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No notifications</p>
        </div>
      </div>
    );
  }

  return (
    <List
      height={height}
      itemCount={notifications.length}
      itemSize={itemHeight}
      overscanCount={5}
    >
      {ItemRenderer}
    </List>
  );
};

// Memoized Notification Components
export const MemoizedNotificationItem = React.memo<NotificationItemProps>(
  ({ notification, onAction }) => {
    // Component implementation based on notification type
    switch (notification.type) {
      case 'approval':
        return <ApprovalNotificationItem notification={notification} onAction={onAction} />;
      case 'system':
        return <SystemNotificationItem notification={notification} onAction={onAction} />;
      case 'workflow':
        return <WorkflowNotificationItem notification={notification} onAction={onAction} />;
      default:
        return null;
    }
  },
  (prevProps, nextProps) => {
    // Custom comparison function for optimization
    return (
      prevProps.notification.id === nextProps.notification.id &&
      prevProps.notification.read === nextProps.notification.read &&
      prevProps.notification.timestamp === nextProps.notification.timestamp
    );
  }
);

// Notification Batching and Debouncing
export const useNotificationBatching = (delay: number = 1000) => {
  const [batchedNotifications, setBatchedNotifications] = useState<NotificationType[]>([]);
  const { dispatch } = useNotificationContext();

  const addNotificationToBatch = useCallback(
    debounce((notifications: NotificationType[]) => {
      notifications.forEach(notification => {
        dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
      });
      setBatchedNotifications([]);
    }, delay),
    [dispatch, delay]
  );

  const batchNotification = useCallback((notification: NotificationType) => {
    setBatchedNotifications(prev => {
      const updated = [...prev, notification];
      addNotificationToBatch(updated);
      return updated;
    });
  }, [addNotificationToBatch]);

  return { batchNotification, batchedCount: batchedNotifications.length };
};`
  },

  // Real-time Integration
  realTimeIntegration: {
    description: "WebSocket and Server-Sent Events integration for real-time updates",
    implementation: `// Real-time Notification Hook with WebSocket
export const useRealTimeNotifications = () => {
  const { dispatch } = useNotificationContext();
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout;

    const connect = () => {
      setConnectionStatus('connecting');
      ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/notifications');

      ws.onopen = () => {
        setConnectionStatus('connected');
        console.log('Notification WebSocket connected');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'NEW_NOTIFICATION':
              dispatch({ type: 'ADD_NOTIFICATION', payload: data.notification });
              break;
            case 'NOTIFICATION_READ':
              dispatch({ type: 'MARK_READ', payload: { id: data.notificationId } });
              break;
            case 'BULK_UPDATE':
              dispatch({ type: 'LOAD_NOTIFICATIONS', payload: data.notifications });
              break;
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.onclose = () => {
        setConnectionStatus('disconnected');
        // Reconnect after 3 seconds
        reconnectTimeout = setTimeout(connect, 3000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('disconnected');
      };
    };

    connect();

    return () => {
      if (ws) {
        ws.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [dispatch]);

  return { connectionStatus };
};

// Server-Sent Events Alternative
export const useSSENotifications = () => {
  const { dispatch } = useNotificationContext();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource('/api/notifications/stream');

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.addEventListener('notification', (event) => {
      const notification = JSON.parse(event.data);
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    });

    eventSource.addEventListener('notification_read', (event) => {
      const { notificationId } = JSON.parse(event.data);
      dispatch({ type: 'MARK_READ', payload: { id: notificationId } });
    });

    eventSource.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      eventSource.close();
    };
  }, [dispatch]);

  return { isConnected };
};`
  },

  // Implementation Best Practices
  bestPractices: {
    description: "Production-ready implementation guidelines and patterns",
    guidelines: [
      {
        category: "Performance",
        practices: [
          "Use React.memo for notification items to prevent unnecessary re-renders",
          "Implement virtual scrolling for lists with >100 notifications",
          "Batch real-time updates to avoid overwhelming the UI",
          "Use debounced API calls for mark-as-read operations",
          "Implement proper cleanup for WebSocket connections"
        ]
      },
      {
        category: "User Experience",
        practices: [
          "Show loading states during async operations",
          "Provide visual feedback for user actions",
          "Implement keyboard navigation for accessibility",
          "Use appropriate ARIA labels and roles",
          "Support both light and dark themes"
        ]
      },
      {
        category: "Error Handling",
        practices: [
          "Gracefully handle network failures",
          "Provide retry mechanisms for failed operations",
          "Show meaningful error messages to users",
          "Log errors for debugging without exposing sensitive data",
          "Implement fallback UI for offline scenarios"
        ]
      },
      {
        category: "Security",
        practices: [
          "Validate notification data on both client and server",
          "Sanitize HTML content in notifications",
          "Implement rate limiting for notification endpoints",
          "Use HTTPS for all notification-related communications",
          "Validate user permissions before showing sensitive notifications"
        ]
      }
    ]
  },

  // Usage Examples
  usageExamples: {
    description: "Complete implementation examples for common scenarios",
    examples: [
      {
        title: "Basic Notification Center Setup",
        code: `// App.tsx - Main application setup
import { NotificationProvider } from './components/notifications/NotificationProvider';
import { NotificationCenter } from './components/notifications/NotificationCenter';

export default function App() {
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold">ERP System</h1>
              </div>
              <div className="flex items-center">
                <NotificationCenter />
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Your app content */}
        </main>
      </div>
    </NotificationProvider>
  );
}`
      },
      {
        title: "Custom Approval Workflow Integration",
        code: `// Custom hook for client approval workflow
export const useClientApprovalWorkflow = () => {
  const { addNotification } = useNotificationContext();
  
  const requestClientApproval = async (clientData: ClientApprovalData) => {
    const notification: ApprovalNotification = {
      id: generateId(),
      type: 'approval',
      approvalType: 'client',
      timestamp: new Date(),
      read: false,
      priority: 'high',
      userId: 'admin', // Or get from auth context
      requestId: clientData.requestId,
      requestorName: clientData.requestorName,
      requestorEmail: clientData.requestorEmail,
      approvalData: {
        clientName: clientData.clientName
      },
      actions: ['approve', 'reject', 'requestInfo']
    };
    
    // Send to server
    await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification)
    });
    
    // Add to local state for immediate UI update
    addNotification(notification);
  };
  
  return { requestClientApproval };
};`
      }
    ]
  },

  // Integration Points
  integrationPoints: {
    description: "Integration with existing ERP components and systems",
    integrations: [
      {
        component: "Role-Based Access Control",
        description: "Filter notifications based on user roles and permissions",
        implementation: "Use role context to determine which notifications to show and which actions are available"
      },
      {
        component: "Multi-Step Forms",
        description: "Send notifications when forms are submitted, approved, or rejected",
        implementation: "Integrate with form state to trigger workflow notifications automatically"
      },
      {
        component: "CRUD Operations",
        description: "Show notifications for data changes and system events",
        implementation: "Hook into CRUD operations to send relevant notifications to affected users"
      },
      {
        component: "Configuration System",
        description: "Allow administrators to configure notification settings",
        implementation: "Provide configuration interface for notification preferences and delivery methods"
      }
    ]
  },

  // Testing Strategies
  testingStrategies: {
    description: "Comprehensive testing approaches for notification system",
    strategies: [
      {
        type: "Unit Tests",
        description: "Test individual components and hooks",
        examples: [
          "Test notification reducer with various actions",
          "Test badge count calculations",
          "Test notification filtering and sorting",
          "Test WebSocket connection handling"
        ]
      },
      {
        type: "Integration Tests",
        description: "Test component interactions and API integration",
        examples: [
          "Test approval workflow end-to-end",
          "Test real-time updates with WebSocket mocking",
          "Test notification persistence and loading",
          "Test error handling and recovery"
        ]
      },
      {
        type: "E2E Tests",
        description: "Test complete user workflows",
        examples: [
          "Test receiving and acting on approval notifications",
          "Test notification badge updates across browser tabs",
          "Test offline/online behavior",
          "Test accessibility features"
        ]
      }
    ]
  }
};

export default notificationsSystem;