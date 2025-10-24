import { useEffect } from 'react'
import { showInfo } from './NotificationSystem'

const KeyboardShortcuts = ({ onClearMessages, onToggleSettings, onFocusInput }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey
      const isShift = event.shiftKey
      const isAlt = event.altKey

      const isInputFocused = ['INPUT', 'TEXTAREA'].includes(event.target.tagName)
      
      if (isCtrlOrCmd && event.key === 'k' && !isInputFocused) {
        event.preventDefault()
        onClearMessages()
        showInfo('All messages cleared', { duration: 2000 })
        return
      }

      if (isCtrlOrCmd && event.key === ',' && !isInputFocused) {
        event.preventDefault()
        onToggleSettings()
        return
      }

      if (isCtrlOrCmd && event.key === '/' && !isInputFocused) {
        event.preventDefault()
        showShortcutsHelp()
        return
      }

      if (isCtrlOrCmd && event.key === '1' && !isInputFocused) {
        event.preventDefault()
        onFocusInput('problem')
        return
      }

      if (isCtrlOrCmd && event.key === '3' && !isInputFocused) {
        event.preventDefault()
        onFocusInput('solution')
        return
      }

      if (event.key === 'Escape') {
        const modals = document.querySelectorAll('[data-modal]')
        modals.forEach(modal => {
          if (modal.style.display !== 'none') {
            modal.style.display = 'none'
          }
        })
        return
      }

      if (event.key === 'F1') {
        event.preventDefault()
        showShortcutsHelp()
        return
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClearMessages, onToggleSettings, onFocusInput])

  return null
}

const showShortcutsHelp = () => {
  const shortcuts = [
    { key: 'Ctrl/Cmd + K', description: 'Clear all messages' },
    { key: 'Ctrl/Cmd + ,', description: 'Open settings' },
    { key: 'Ctrl/Cmd + /', description: 'Show shortcuts help' },
    { key: 'Ctrl/Cmd + 1', description: 'Focus left input (customer)' },
    { key: 'Ctrl/Cmd + 3', description: 'Focus right input (solution)' },
    { key: 'Esc', description: 'Cancel current action' },
    { key: 'F1', description: 'Show help' }
  ]

  const helpText = shortcuts
    .map(s => `${s.key}: ${s.description}`)
    .join('\n')

  const modal = document.createElement('div')
  modal.setAttribute('data-modal', 'shortcuts-help')
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
  modal.innerHTML = `
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h3>
        <button class="text-gray-400 hover:text-gray-600" onclick="this.closest('[data-modal]').remove()">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="space-y-3">
        ${shortcuts.map(s => `
          <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <span class="text-sm text-gray-600">${s.description}</span>
            <kbd class="px-2 py-1 text-xs font-mono bg-gray-100 rounded border">${s.key}</kbd>
          </div>
        `).join('')}
      </div>
      <div class="mt-6 text-center">
        <button 
          class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          onclick="this.closest('[data-modal]').remove()"
        >
          Close
        </button>
      </div>
    </div>
  `

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })

  document.body.appendChild(modal)

  setTimeout(() => {
    if (document.body.contains(modal)) {
      modal.remove()
    }
  }, 10000)
}

export default KeyboardShortcuts