export default `# Chat Bundle - Quick Reference

## Most Common Chat Patterns Cheat Sheet

### Split-Panel Layout Structure
\`\`\`typescript
<div className="flex h-full">
  {/* Left Panel - Conversations List */}
  <div className="w-80 border-r flex flex-col">
    <ConversationHeader />
    <ConversationList />
  </div>
  
  {/* Right Panel - Chat Area */}
  <div className="flex-1 flex flex-col">
    <ChatHeader />
    <MessageArea />
    <InputArea />
  </div>
</div>
\`\`\`

### Message Bubble Pattern
\`\`\`typescript
// Sent message (right aligned)
<div className="flex justify-end mb-4">
  <div className="max-w-sm bg-primary text-primary-foreground rounded-lg px-4 py-2">
    <p className="text-sm">{message.content}</p>
    <span className="text-xs opacity-70">{timestamp}</span>
  </div>
</div>

// Received message (left aligned)
<div className="flex justify-start mb-4">
  <div className="max-w-sm bg-muted rounded-lg px-4 py-2">
    <p className="text-sm font-semibold">{sender.name}</p>
    <p className="text-sm">{message.content}</p>
    <span className="text-xs text-muted-foreground">{timestamp}</span>
  </div>
</div>
\`\`\`

### Chat Input Area
\`\`\`typescript
<div className="border-t p-4">
  <form onSubmit={handleSend} className="flex gap-2">
    <Input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type a message..."
      className="flex-1"
    />
    <Button type="submit" size="icon">
      <Send className="h-4 w-4" />
    </Button>
  </form>
</div>
\`\`\`

### Real-Time Hook Pattern
\`\`\`typescript
const useChat = (conversationId) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // WebSocket connection
    const ws = new WebSocket(WS_URL);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        setMessages(prev => [...prev, data.message]);
      } else if (data.type === 'typing') {
        setIsTyping(data.isTyping);
      }
    };

    return () => ws.close();
  }, [conversationId]);

  return { messages, isTyping };
};
\`\`\`

### Conversation List Item
\`\`\`typescript
<div className="p-3 hover:bg-accent cursor-pointer border-b">
  <div className="flex items-start space-x-3">
    <Avatar className="h-10 w-10">
      <AvatarImage src={conversation.avatar} />
      <AvatarFallback>{conversation.initials}</AvatarFallback>
    </Avatar>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline">
        <h4 className="text-sm font-semibold truncate">{conversation.name}</h4>
        <span className="text-xs text-muted-foreground">{conversation.time}</span>
      </div>
      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
    </div>
    {conversation.unread > 0 && (
      <Badge variant="default" className="ml-2">
        {conversation.unread}
      </Badge>
    )}
  </div>
</div>
\`\`\`

### Notification Badge Pattern
\`\`\`typescript
<Button variant="ghost" size="icon" className="relative">
  <Bell className="h-5 w-5" />
  {unreadCount > 0 && (
    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
      {unreadCount > 99 ? '99+' : unreadCount}
    </span>
  )}
</Button>
\`\`\`

### Typing Indicator
\`\`\`typescript
{isTyping && (
  <div className="flex items-center space-x-1 text-muted-foreground p-2">
    <span className="text-sm">{typingUser} is typing</span>
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100" />
      <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200" />
    </div>
  </div>
)}
\`\`\`

## Essential Imports
\`\`\`typescript
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, Send, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
\`\`\`

## CSS Classes Quick Reference
- **Split panel**: \`flex h-full\`, \`w-80 border-r\`, \`flex-1\`
- **Message alignment**: \`justify-end\` (sent), \`justify-start\` (received)
- **Message bubbles**: \`max-w-sm rounded-lg px-4 py-2\`
- **Hover states**: \`hover:bg-accent\`
- **Truncate text**: \`truncate\`

## Mobile Responsive Classes
- **Hide panel**: \`hidden md:flex\`
- **Full width mobile**: \`w-full md:w-80\`
- **Stack layout**: \`flex-col md:flex-row\`

---

**For detailed patterns**: Request specific components like \`message-components\`, \`real-time-patterns\`, etc.
`;