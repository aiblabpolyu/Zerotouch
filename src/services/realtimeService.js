class RealtimeService {
  constructor() {
    this.listeners = {};
    this.connected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 2000;
    this.connectionId = null;
    
    this.EVENT_TYPES = {
      MESSAGE_RECEIVED: 'message_received',
      MESSAGE_SENT: 'message_sent',
      CONNECTION_STATE_CHANGED: 'connection_state_changed',
      PROCESSING_STARTED: 'processing_started',
      PROCESSING_COMPLETED: 'processing_completed',
      PROCESSING_STEP_UPDATED: 'processing_step_updated',
      ERROR: 'error'
    };
  }

  connect() {
    if (this.connected) return Promise.resolve(this.connectionId);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.connected = true;
        this.connectionId = `conn_${Date.now()}`;
        this.reconnectAttempts = 0;
        
        this._triggerEvent(this.EVENT_TYPES.CONNECTION_STATE_CHANGED, { 
          connected: true,
          connectionId: this.connectionId
        });
        
        console.log(`[RealtimeService] Connected with ID: ${this.connectionId}`);
        resolve(this.connectionId);
        
        this._setupHeartbeat();
      }, 500);
    });
  }

  disconnect() {
    if (!this.connected) return Promise.resolve();
    
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connected = false;
        
        if (this.heartbeatInterval) {
          clearInterval(this.heartbeatInterval);
          this.heartbeatInterval = null;
        }
        
        this._triggerEvent(this.EVENT_TYPES.CONNECTION_STATE_CHANGED, { 
          connected: false,
          connectionId: this.connectionId
        });
        
        console.log(`[RealtimeService] Disconnected`);
        this.connectionId = null;
        resolve();
      }, 300);
    });
  }

  sendMessage(message, targetPanel) {
    if (!this.connected) {
      return Promise.reject(new Error('Not connected to server'));
    }
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const enhancedMessage = {
          ...message,
          id: message.id || `msg_${Date.now()}`,
          timestamp: message.timestamp || new Date().toISOString(),
          targetPanel: targetPanel
        };
        
        this._triggerEvent(this.EVENT_TYPES.MESSAGE_SENT, enhancedMessage);
        
        console.log(`[RealtimeService] Message sent:`, enhancedMessage);
        resolve(enhancedMessage);
        
        this._simulateServerReceipt(enhancedMessage);
      }, Math.random() * 300 + 100);
    });
  }

  startProcessing(messageId, steps) {
    if (!this.connected) {
      return Promise.reject(new Error('Not connected to server'));
    }
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const processingData = {
          messageId,
          startTime: new Date().toISOString(),
          steps: steps || [],
          currentStep: 0
        };
        
        this._triggerEvent(this.EVENT_TYPES.PROCESSING_STARTED, processingData);
        
        console.log(`[RealtimeService] Processing started for message: ${messageId}`);
        resolve(processingData);
        
        if (steps && steps.length > 0) {
          this._simulateProcessingSteps(messageId, steps);
        }
      }, 200);
    });
  }

  subscribe(eventType, callback) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    
    this.listeners[eventType].push(callback);
    
    return () => {
      this.listeners[eventType] = this.listeners[eventType].filter(cb => cb !== callback);
    };
  }

  _triggerEvent(eventType, data) {
    if (!this.listeners[eventType]) return;
    
    this.listeners[eventType].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`[RealtimeService] Error in event listener for ${eventType}:`, error);
      }
    });
  }

  _setupHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (!this.connected) {
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
        return;
      }
      
      if (Math.random() < 0.05) {
        this._handleConnectionLoss();
      }
    }, 10000);
  }

  _handleConnectionLoss() {
    this.connected = false;
    
    this._triggerEvent(this.EVENT_TYPES.CONNECTION_STATE_CHANGED, { 
      connected: false,
      connectionId: this.connectionId
    });
    
    console.log(`[RealtimeService] Connection lost. Attempting to reconnect...`);
    
    this._attemptReconnect();
  }

  _attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log(`[RealtimeService] Max reconnect attempts reached. Giving up.`);
      
      this._triggerEvent(this.EVENT_TYPES.ERROR, { 
        code: 'MAX_RECONNECT_ATTEMPTS',
        message: 'Failed to reconnect after maximum attempts'
      });
      
      return;
    }
    
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts - 1);
    
    console.log(`[RealtimeService] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
    
    setTimeout(() => {
      this.connect()
        .catch(() => {
          this._attemptReconnect();
        });
    }, delay);
  }

  _simulateServerReceipt(message) {
    setTimeout(() => {
      const receipt = {
        originalMessageId: message.id,
        receiptId: `receipt_${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: 'delivered'
      };
      
      this._triggerEvent(this.EVENT_TYPES.MESSAGE_RECEIVED, receipt);
      
      console.log(`[RealtimeService] Server acknowledged message: ${message.id}`);
    }, Math.random() * 500 + 200);
  }

  _simulateProcessingSteps(messageId, steps) {
    let currentStep = 0;
    
    const processNextStep = () => {
      if (currentStep >= steps.length) {
        this._triggerEvent(this.EVENT_TYPES.PROCESSING_COMPLETED, {
          messageId,
          completionTime: new Date().toISOString(),
          steps: steps
        });
        
        console.log(`[RealtimeService] Processing completed for message: ${messageId}`);
        return;
      }
      
      const stepData = {
        messageId,
        currentStep,
        stepName: steps[currentStep].name,
        stepStatus: 'completed',
        timestamp: new Date().toISOString()
      };
      
      this._triggerEvent(this.EVENT_TYPES.PROCESSING_STEP_UPDATED, stepData);
      
      console.log(`[RealtimeService] Step ${currentStep} (${steps[currentStep].name}) completed for message: ${messageId}`);
      
      currentStep++;
      
      setTimeout(processNextStep, Math.random() * 1000 + 500);
    };
    
    setTimeout(processNextStep, Math.random() * 500 + 200);
  }
}

const realtimeService = new RealtimeService();

export default realtimeService;

export const REALTIME_EVENTS = {
  MESSAGE_RECEIVED: 'message_received',
  MESSAGE_SENT: 'message_sent',
  CONNECTION_STATE_CHANGED: 'connection_state_changed',
  PROCESSING_STARTED: 'processing_started',
  PROCESSING_COMPLETED: 'processing_completed',
  PROCESSING_STEP_UPDATED: 'processing_step_updated',
  ERROR: 'error'
};