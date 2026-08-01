/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RotateCcw, Trash2 } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  props: Props;
  state: State = {
    hasError: false,
    error: null,
  };

  constructor(props: Props) {
    super(props);
    this.props = props;
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleClearStorageAndReload = () => {
    if (window.confirm('Isso irá limpar o progresso da sessão ativa para restaurar o aplicativo. O histórico salvo não será apagado. Deseja continuar?')) {
      try {
        localStorage.removeItem('gym_active_session_A');
        localStorage.removeItem('gym_active_session_B');
        localStorage.removeItem('gym_active_session_C');
      } catch (e) {
        console.error('Error clearing localStorage:', e);
      }
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-[#f0f0f0] flex items-center justify-center p-4 font-sans antialiased select-none">
          <div className="w-full max-w-md bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 shadow-3xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mx-auto flex items-center justify-center text-red-500">
              <AlertOctagon size={36} />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-display font-black tracking-tight text-white uppercase">
                Ops! Ocorreu um erro na interface
              </h2>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Detectamos uma falha inesperada. Você pode recarregar a tela ou limpar o estado ativo para restaurar o funcionamento do aplicativo sem perder o seu histórico.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-[#111] p-3 rounded-lg border border-[#222] text-left text-[11px] font-mono text-red-400 overflow-x-auto max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full py-3 rounded-xl font-display text-xs font-black uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw size={14} />
                <span>Recarregar Aplicativo</span>
              </button>

              <button
                type="button"
                onClick={this.handleClearStorageAndReload}
                className="w-full py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider bg-[#111] text-zinc-400 hover:text-red-400 border border-[#222] hover:border-red-500/30 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={14} />
                <span>Limpar Sessão Ativa e Recarregar</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
