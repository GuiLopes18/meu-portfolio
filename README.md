# Portfólio — Guilherme Pereira

Portfólio pessoal desenvolvido com **HTML, CSS e JavaScript**, sem framework ou etapa de compilação. Apresenta trajetória profissional, projetos, habilidades, certificações e um formulário de contato integrado ao EmailJS.

## Estrutura do projeto

```text
meu-portfolio/
├── index.html          # Conteúdo e estrutura das seções
├── style.css           # Temas, componentes e layout responsivo
├── script.js           # Dados, criação de cartões e interações
├── assets/
│   ├── imagens/        # Fotografia exibida em Sobre mim
│   └── certificados/   # Arquivos PDF acessados pelos cartões
└── README.md           # Instruções de manutenção e publicação
```

## Executar localmente

1. Abra a pasta no **Visual Studio Code**.
2. Abra `index.html` com a extensão **Live Server**.
3. Teste os temas, os filtros, o carrossel, o menu em telas pequenas e o formulário.

Não é necessário `npm install` ou `npm run dev` nesta versão.

## Onde alterar o conteúdo

| O que deseja mudar | Arquivo | Localização |
| --- | --- | --- |
| Apresentação, texto Sobre mim e contatos | `index.html` | Seções com os respectivos IDs |
| Histórico profissional | `script.js` | Array `experiencias` |
| Projetos e tecnologias de filtro | `script.js` | Array `projetos` |
| Habilidades e ícones | `script.js` | Array `habilidades` e `iconesHabilidades` |
| Certificados, ordem e links PDF | `script.js` | Array `certificacoes` |
| Cores dos temas | `style.css` | `:root` e `:root.tema-claro` |
| Ajustes para tablets e celulares | `style.css` | Seção **RESPONSIVIDADE** |
| Contato por e-mail | `script.js` | Seção **FORMULÁRIO DE CONTATO** |

**Exemplos práticos:**

- Para adicionar um projeto, inclua um novo objeto no array `projetos`. As tecnologias declaradas nele também aparecerão nos filtros.
- Para trocar a ordem das certificações, altere o atributo `ordem`. **Não** é preciso renumerar `id`.
- Para incluir uma experiência, adicione um objeto ao array `experiencias`, com `cargo`, `empresa`, `periodo` e `atividades`.

## Formulário de contato

O envio é feito pelo **EmailJS** no navegador. Os identificadores públicos `SERVICE_ID`, `TEMPLATE_ID` e `PUBLIC_KEY` estão no início da seção **FORMULÁRIO DE CONTATO** de `script.js`.

O template da conta EmailJS deve ter as variáveis:

```text
{{from_name}}
{{reply_to}}
{{message}}
```

- Não coloque senhas, tokens privados ou chaves secretas no HTML ou no JavaScript público.
- No painel EmailJS, configure restrições de domínio e recursos antispam conforme a disponibilidade do plano.
- Após mudar o domínio ou publicar o site, realize um **novo envio real** para conferir a entrega.

## Publicar no GitHub e na Vercel

1. Revise os dados pessoais nos arquivos PDF de `assets/certificados/`: esses documentos ficarão públicos no repositório e no site.
2. Crie um repositório Git e publique os arquivos desta pasta, preservando seus caminhos relativos.
3. Na Vercel, importe o repositório como site **estático**; o projeto não possui comando de build nem pasta de saída gerada.
4. Verifique a versão publicada no celular e no computador; confira foto, certificados, formulário e navegação.

## Funcionalidades

- Tema claro/escuro com preferência salva no navegador.
- Menu responsivo com navegação por âncoras.
- Histórico profissional renderizado a partir de dados JavaScript.
- Projetos com filtros combináveis por tecnologia.
- Habilidades e certificações geradas por JavaScript.
- Carrossel responsivo para certificados.
- Formulário de contato com validação, contador de caracteres e EmailJS.
- Animações ao rolar e botão para voltar ao topo.
- Suporte à preferência por redução de movimentos.

## Manutenção

Os arquivos mantêm seções numeradas para facilitar a busca no editor. Os comentários explicam as decisões e comportamentos menos evidentes; instruções simples ficam sem comentário para evitar ruído.
