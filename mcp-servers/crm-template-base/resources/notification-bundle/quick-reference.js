export default `# Notification Bundle - Quick Reference

## Common Notification Patterns Cheat Sheet

### Toast Notification (Sonner)
\`\`\`typescript
import { toast } from 'sonner';
import { IconCheck, IconX } from '@tabler/icons-react';

// Success toast
toast.success('Operation successful', { icon: <IconCheck /> });

// Error toast
toast.error('Something went wrong');

// Loading toast
const toastId = toast.loading('Processing...');
// Later: toast.dismiss(toastId);

// Custom toast
toast.custom((t) => (
  <div className="flex items-center gap-2">
    <IconInfo />
    <span>Custom notification</span>
  </div>
));
\`\`\`

### Notification Badge
\`\`\`typescript
<Button variant="ghost" size="icon" className="relative">
  <Bell className="h-5 w-5" />
  {unreadCount > 0 && (
    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
      {unreadCount}
    </span>
  )}
</Button>
\`\`\`

### Notification Center Layout
\`\`\`typescript
<div className="h-full flex flex-col">
  <div className="p-4 border-b">
    <h2 className="text-lg font-semibold">Notifications</h2>
  </div>
  <ScrollArea className="flex-1">
    <div className="p-4 space-y-2">
      {notifications.map(notification => (
        <NotificationItem key={notification.id} {...notification} />
      ))}
    </div>
  </ScrollArea>
</div>
\`\`\`

### Notification Item
\`\`\`typescript
<div className={\`p-4 rounded-lg border \${notification.read ? 'bg-background' : 'bg-muted'}\`}>
  <div className="flex items-start gap-3">
    <Avatar className="h-8 w-8">
      <AvatarFallback>{notification.initials}</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <p className="text-sm font-medium">{notification.title}</p>
      <p className="text-sm text-muted-foreground">{notification.message}</p>
      <span className="text-xs text-muted-foreground">{notification.time}</span>
    </div>
  </div>
</div>
\`\`\`

### Real-Time Notification Hook
\`\`\`typescript
const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    
    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      // Show toast for new notification
      toast(notification.title, {
        description: notification.message,
      });
    };

    return () => ws.close();
  }, []);

  return { notifications, unreadCount };
};
\`\`\`

## Essential Imports
\`\`\`typescript
import { toast } from 'sonner';
import { Bell, Check, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
\`\`\`

## CSS Classes Quick Reference
- **Badge position**: \`absolute -top-1 -right-1\`
- **Unread state**: \`bg-muted\` vs \`bg-background\`
- **Notification spacing**: \`space-y-2\`
- **Item padding**: \`p-4\`

---

**For detailed patterns**: Request specific components.
`;