# Robo TikTok Internacional

Sistema automatico de criacao de conteudo TikTok para mercados internacionais (EUA, Europa, Asia).

## O que faz
- Gera scripts em ingles com IA (Claude)
- Busca clips de video gratuitos no Pixabay
- Preview do video no formato TikTok 9:16
- Exporta pacote completo (script + caption + hashtags)

## Deploy no Vercel (5 minutos)

### 1. Suba para o GitHub
- Crie um repositorio no github.com
- Faca upload de todos os arquivos desta pasta

### 2. Conecte ao Vercel
- Acesse vercel.com e faca login com o GitHub
- Clique em "New Project" e selecione o repositorio
- Clique em "Deploy"

### 3. Configure as variaveis de ambiente
No painel do Vercel, va em Settings > Environment Variables e adicione:

```
ANTHROPIC_API_KEY = sua_chave_aqui
PIXABAY_API_KEY = sua_chave_pixabay_aqui
```

- Chave Anthropic: console.anthropic.com
- Chave Pixabay: pixabay.com/api/docs (gratis)

### 4. Acesse o sistema
Apos o deploy, o Vercel vai gerar um link como:
`https://tiktok-robo.vercel.app`

Pronto! O sistema funciona 24/7 automaticamente.

## Fluxo completo
1. Script IA -> gera roteiro em ingles
2. Buscar Videos -> clips gratuitos do Pixabay
3. Montar Video -> preview + capa PNG
4. Exportar -> pacote para CapCut + Buffer
5. Buffer agenda no TikTok automaticamente

## Links uteis
- buffer.com - agendar posts
- capcut.com - montar video
- clickbank.com - afiliados em dolares
- protonvpn.com - VPN gratis
