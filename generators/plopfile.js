// eslint-disable-next-line no-undef
module.exports = (plop)=>{
  plop.setWelcomeMessage('Bem vindo ao gerador de componentes!');
  plop.setGenerator('crud',{
      description:'Cria os arquivos básicos para gerar o CRUD',
      prompts:[
        {
          type:'input',
          name:'name',
          message:'Digite o nome do módulo? (São válidos nomes com subpastas - Ex.: exemplo/Exemplo ou pastaRaiz/nomeModulo/NomeModulo)',
        },
      ],
      actions:[
        '------------------------------',
        '.Generando o novo component...',
        '------------------------------',
        {
          type:'add',
          path:'../src/pages/{{getPath name}}/index.tsx',
          templateFile:'templates/component.tsx.hbs',
        },
        {
          type:'add',
          path:'../src/pages/{{getPath name}}/styles.ts',
          templateFile:'templates/styles.ts.hbs',
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