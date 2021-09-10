// eslint-disable-next-line no-undef
module.exports = (plop)=>{
  plop.setWelcomeMessage('Bem vindo ao gerador de componentes!');
  plop.setGenerator('crud',{
      description:'Cria os arquivos básicos para gerar o CRUD',
      prompts:[
        {
          type:'input',
          name:'name',
          message:'Digite o nome do módulo? (São válidos nomes com subpastas - Ex.: nomeModulo/NomeModulo',
        },
      ],
      actions:[
        '------------------------------',
        '.Generando o novo component...',
        '------------------------------',
        {
          type:'add',
          path:'../src/domain/types/I{{pascalCase (getName name)}}.ts',
          templateFile:'templates/type.ts.hbs',
        },
        {
          type:'add',
          path:'../src/pages/{{pascalCase (getName name)}}/index.tsx',
          templateFile:'templates/component.tsx.hbs',
          force:true,
          
        },
        {
          type:'add',
          path:'../src/pages/{{pascalCase (getName name)}}/styles.ts',
          templateFile:'templates/styles.ts.hbs',
        },
        {
          type:'add',
          path:'../src/services/{{pascalCase (getName name)}}Service/{{getPasta name}}Service.ts',
          templateFile:'templates/service.ts.hbs',
        },
        {
          type:'add',
          path:'../src/stores/{{pascalCase (getName name)}}Store.ts',
          templateFile:'templates/store.ts.hbs',
        },
        // {
        //   type:'append',
        //   path:'../src/stores/appStore.ts',
        //   pattern:'{',
        //   templateFile:'templates/addLinhaStore.ts.hbs',
        // },
        // {
        //   type:'append',
        //   path:'../src/stores/appStore.ts',
        //   pattern:';',
        //   templateFile:'templates/addImportStore.ts.hbs',
        // },
        '--------------------------------------------------',
        '🤲 Componente gerando com sucesso! Luan é foda 🤲',
        '--------------------------------------------------',
      ],
  });
  
  plop.setHelper('getPath', namePath => {
    let path = '/';
    const directories = namePath.split('/');

    if (directories.length > 1) {
      directories.pop();
      path += directories.join('/');
    }

    return path;
  });


  plop.setHelper('getImportPath', namePath => {
    const defaultValue = 2;
    let path = Array(defaultValue)
      .fill()
      .map(() => '..')
      .join('/');

    const directories = namePath.split('/');

    if (directories.length > defaultValue) {
      path = directories.map(() => '..').join('/');
    }

    return path;
  });

  plop.setHelper('getReferencePath', namePath => {
    const defaultValue = 1;
    let path = Array(defaultValue)
      .fill()
      .map(() => '..')
      .join('/');

    const directories = namePath.split('/');

    if (directories.length > defaultValue) {
      directories.pop();
      path = directories.map(() => '..').join('/');
    }

    return path;
  });

  plop.setHelper('getName', namePath => namePath.split('/').pop());
  plop.setHelper('getPasta', namePath => namePath.split('/').shift());
}