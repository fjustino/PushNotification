<h1 align="center">
    ☁ Salesforce MarketCloud Custom Activity
</h1>

<h4 align="center">
    ☕ Code and coffee
</h4>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/lennonalvesdias/journey-builder-custom-activity.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/lennonalvesdias/journey-builder-custom-activity.svg">
  
  <a href="https://github.com/lennonalvesdias/cli/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lennonalvesdias/journey-builder-custom-activity.svg">
  </a>

  <a href="https://github.com/lennonalvesdias/cli/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/lennonalvesdias/journey-builder-custom-activity.svg">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

<p align="center">
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-usar">Como usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

## 💻 Projeto

Com o [Salesforce MarketCloud](https://www.salesforce.com/br/products/marketing-cloud/platform/) Custom Activity você pode criar componentes customizados para a sua jornada. Caso queira seguir um template para criar o seu próprio componente, você pode navegar até a branch `template` e desenvolver de acordo com a sua necessidade. Também temos algumas funcionalidades já desenvolvidas, que você pode encontrar na sessão abaixo (`funcionalidades`).

### 🚀 Funcionalidades

* 📄 [Template (by devsutd)](https://github.com/lennonalvesdias/journey-builder-custom-activity/tree/template)
* 📲 [Disparo de WhatsApp HSM](https://github.com/lennonalvesdias/journey-builder-custom-activity/tree/whatsapp-hsm)

## 👨‍🏫 Como usar

### Configure seu web service

- Faça um fork desse repositório
- Realize login no [Heroku](https://heroku.com/)
- Clique em `New` > `Create new app`
- Nomeie a aplicação e clique em `Create App`
- Escolha o seu método preferido de *deployment* (Github, Heroku Cli)
- Clique em `Deploy branch`
- Assim que finalizar o `deploy`, clique no botão `View` e verifique se você vê a mensagem de boas-vindas

### Configura seu pacote no Marketing Cloud

- Entre no `Marketing Cloud` e navegue para `Administration` > `Account` > `Installed Packages`
- Clique em `New` e insira o nome e a descrição do seu pacote
- Copie o valor do `JWT Secret` da `Summary page` e salve para utilizar mais tarde
- Clique em `Add Component`, selecione `Journey Builder Activity` e clique em `next`
- Insira a informação sobre a `activity`, insira o *endpoint* da sua aplicação
- Clique em salve
- Copie a `Unique Key` do `Journey Builder Activity` e salve para utilizar mais tarde

### Configurar a Activity

- No `/public/config.json`
    - Atualizar a chave `applicationExtensionKey` com o valor da `Unique Key`
    - Substituir os valores das chaves de `url` com o *endpoint* da sua aplicação

### Configurar o Heroku

- Entre na sua *dashboard* do Heroku
- Clique em `Settings`
- Clique em `Reveal config vars`
- Adicione uma nova variavel chamada `jwtSecret` e copie o valor do seu `JWT Secret` obtido no `Marketing Cloud`.

### Teste a sua atividade

- Realize login no `Marketing Cloud` e navegue em `Journey Builder`
- Você poderá visualizar a sua `Custom Activity` e arraste para a tela

## 🤔 Como contribuir

- Faça um fork desse repositório
- Cria uma branch com a sua feature: `git checkout -b minha-feature`
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`
- Faça push para a sua branch: `git push origin minha-feature`

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

[lennonalves.com.br](https://lennonalves.com.br/)