import { ChatResponse } from '../types/chat';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'; 

export class HuggingFaceService {
  private sessionId: string | null = null;

  public isConfigured(): boolean {
    return true; // Le backend gère la config
  }

  public resetConversation(): void {
    this.sessionId = null;
  }

  public async processQuery(query: string): Promise<ChatResponse> {
    try {
      await this.ensureReady();
      
      if (!this.sessionId) {
        throw new Error('Session non initialisée');
      }

      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: this.sessionId,
          message: query,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        const errorMsg = error?.detail || 'Erreur du serveur backend';
        throw new Error(errorMsg);
      }

      const result = await response.json();

      return {
        response: result.reponse || 'Pas de réponse',
        error: null,
        confidence: 0.95,
      };
    } catch (err) {
      console.error('[HuggingFaceService]', err);
      const msg = err instanceof Error ? err.message : String(err);
      return {
        response: `❌ Erreur: ${msg}`,
        error: msg,
        confidence: 0,
      };
    }
  }

  private async ensureReady(): Promise<void> {
    if (!this.sessionId) {
      // Créer une nouvelle session
      const response = await fetch(`${BACKEND_URL}/session/nouvelle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Impossible de créer une session');
      }

      const data = await response.json();
      this.sessionId = data.session_id;
    }
  }
}
