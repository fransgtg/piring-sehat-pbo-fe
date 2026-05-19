import { useState } from 'react'
import RetroButton from '../ui/RetroButton'
import RetroInput from '../ui/RetroInput'
import RetroTextarea from '../ui/RetroTextarea'

export default function CommunityForum() {
  const [activeView, setActiveView] = useState('list') // 'list' | 'compose'
  
  // ─── Compose State (DTO-Ready) ───
  const [composePayload, setComposePayload] = useState({
    title: '',
    content: '',
  })

  // ─── Local State for Threads ───
  const [threads, setThreads] = useState([])
  const [statusMessage, setStatusMessage] = useState('Connected to Server')

  // ─── Post Handler ───
  const handlePost = (e) => {
    e.preventDefault()
    if (!composePayload.title || !composePayload.content) return

    const newThread = {
      id: Date.now(),
      title: composePayload.title,
      content: composePayload.content,
      author: 'CurrentUser', // Mock for now
      replies: 0,
      timestamp: new Date().toLocaleString(),
    }

    setThreads([newThread, ...threads])
    
    // TODO: Replace with actual API call → POST /api/forum/threads
    console.log('[FORUM] Create thread payload:', composePayload)
    
    setComposePayload({ title: '', content: '' })
    setActiveView('list')
    setStatusMessage('Message posted successfully.')
  }

  return (
    <div className="flex flex-col h-full gap-2">
      {/* Toolbar */}
      <div className="flex gap-2 mb-1">
        <RetroButton 
          onClick={() => setActiveView('list')} 
          primary={activeView === 'list'}
        >
          📁 View Threads
        </RetroButton>
        <RetroButton 
          onClick={() => setActiveView('compose')}
          primary={activeView === 'compose'}
        >
          📝 New Post
        </RetroButton>
        <RetroButton onClick={() => setStatusMessage('Refreshing... (API Call)')}>
          🔄 Refresh
        </RetroButton>
      </div>

      {/* Main Content Area */}
      <div className="retro-groupbox flex-1 flex flex-col mt-0">
        <span className="retro-groupbox-label">
          {activeView === 'list' ? '🌐 Message Board' : '✉️ Compose Message'}
        </span>

        {activeView === 'list' ? (
          <div className="retro-scroll-area flex-1">
            {threads.length === 0 ? (
              <p className="text-gray-500 text-center p-4 text-[11px]">
                No threads available. Be the first to post!
              </p>
            ) : (
              <table className="retro-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th style={{ width: '100px' }}>Author</th>
                    <th style={{ width: '60px' }}>Replies</th>
                    <th style={{ width: '120px' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {threads.map((thread) => (
                    <tr key={thread.id} className="cursor-pointer">
                      <td className="font-bold text-[#000080] underline">{thread.title}</td>
                      <td>{thread.author}</td>
                      <td className="text-center">{thread.replies}</td>
                      <td className="text-[10px]">{thread.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <form onSubmit={handlePost} className="flex flex-col gap-3 flex-1">
            <RetroInput
              label="Subject:"
              id="forum-title"
              value={composePayload.title}
              onChange={(e) => setComposePayload({ ...composePayload, title: e.target.value })}
              required
            />
            <div className="flex-1 flex flex-col">
              <RetroTextarea
                label="Message:"
                id="forum-content"
                value={composePayload.content}
                onChange={(e) => setComposePayload({ ...composePayload, content: e.target.value })}
                required
                className="flex-1"
                style={{ height: '100%', minHeight: '150px' }}
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <RetroButton type="submit" primary>Send Message</RetroButton>
              <RetroButton type="button" onClick={() => setActiveView('list')}>Cancel</RetroButton>
            </div>
          </form>
        )}
      </div>

      {/* Status Bar */}
      <div className="retro-statusbar mt-auto">
        <div className="retro-statusbar-section">{statusMessage}</div>
        {activeView === 'list' && (
          <div className="retro-statusbar-section" style={{ flex: 'none', width: 120 }}>
            Threads: {threads.length}
          </div>
        )}
      </div>
    </div>
  )
}
