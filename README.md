# 🏋️ Workout Tracker - Guia e Painel de Treino

Aplicativo web moderno, rápido e responsivo para acompanhamento de fichas de treino na academia, registro de cargas, tempo de descanso e histórico de evolução.

---

## 🌟 Principais Funcionalidades

### 📋 Fichas de Treino Organizadas (Séries A, B e C)
* **Série A**: Posterior, Coxas e Puxada (Costas).
* **Série B**: Anterior, Pernas e Empurrar (Peito/Ombro).
* **Série C**: Treino Personalizado (Puxada, Peito & Braços).

### ⚡ Marcador de Séries & Cargas Inteligente
* **Controle por Séries (Dots)**: Clique rápido para marcar cada série concluída com preenchimento sequencial.
* **Carga Atual & Anterior**: Exibição da última carga registrada no histórico para motivar a progressão de carga.
* **Modo Cardio**: Suporte automatizado a exercícios aeróbicos (registro em minutos ao invés de kg).

### ⏱️ Cronômetro de Descanso Flutuante (Rest Timer)
* **Presets de Tempo**: Opções de 30s, 60s, 90s, 120s e 180s, com botões para ajustar (+10s / -10s).
* **Alertas**: Alerta visual ("Treinar!"), vibração no dispositivo e sincronização precisa para não sobrepor séries.
* **Modo Minimizado**: Pode ser minimizado como um indicador flutuante na tela enquanto você navega pelos exercícios.

### 📖 Guia de Execução & Aparelhos
* **Detalhamento do Aparelho**: Exibição de imagem do equipamento a ser utilizado.
* **Instruções Passo a Passo**: Dicas de postura, músculos focados e execução correta do movimento.

### 📊 Histórico & Progresso
* **Painel de Progresso**: Barra de progresso percentual e alertas de conquista ao atingir marcos do treino.
* **Volume Total de Carga**: Cálculo do volume total de peso levantado ao finalizar cada treino.
* **Histórico Completo**: Visualização detalhada de sessões anteriores por data e ficha realizada.

### 💾 Privacidade & Backup de Dados
* **Persistência Local**: Todos os dados ficam salvos com segurança no `localStorage` do seu próprio navegador.
* **Exportar & Importar JSON**: Ferramenta integrada de backup para exportar ou restaurar seus dados a qualquer momento.

---

## 🛠️ Tecnologias Utilizadas

* **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
* **Build Tool**: [Vite 6](https://vitejs.dev/)
* **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Componentes & Animações**: [Motion](https://motion.dev/), [Lucide React](https://lucide.dev/) (Ícones)
* **Testes**: [Vitest](https://vitest.dev/), [@testing-library/react](https://testing-library.com/)

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js (versão 18 ou superior)
* npm

### Passos

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/rbrenelli/workout-tracker-aistudio.git
   cd workout-tracker-aistudio
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação no seu navegador pelo endereço `http://localhost:3000`.

---

## 📜 Scripts Disponíveis

* `npm run dev` - Inicia o servidor de desenvolvimento com Vite.
* `npm run build` - Compila a aplicação para produção na pasta `dist/`.
* `npm run preview` - Visualiza a versão de produção localmente.
* `npm test` - Executa os testes unitários com Vitest.
* `npm run lint` - Executa a verificação de tipos com o TypeScript compiler (`tsc --noEmit`).

---

## 📦 Deploy (GitHub Pages)

O projeto está configurado para deploy automático no **GitHub Pages** via GitHub Actions sempre que um push for feito no branch `main`.

Para build manual de produção:
```bash
npm run build
```

---

## 📄 Licença

Este projeto está sob a licença Apache-2.0.
