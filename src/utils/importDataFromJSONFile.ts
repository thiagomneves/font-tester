import { FontTesterData } from "../types/FontTesterData";

interface Res {
  status: boolean
  json: string
}

export function importDataFromJSONFileHelper(file: File): Promise<Res> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      try {
        if (event.target && event.target.result) {
          const jsonData: string = event.target.result as string;
          const parsedData: FontTesterData = JSON.parse(jsonData);

          if (isValidJSONStructure(parsedData)) {
            resolve({
              status: true,
              json: jsonData
            });
          } else {
            // O JSON não possui a estrutura esperada
            console.error('JSON inválido: a estrutura não corresponde.');
            resolve({
              status: false,
              json: ''
            });
          }
        }
      } catch (error) {
        console.error('Erro durante a importação:', error);
        resolve({
          status: false,
          json: ''
        });
      }
    };

    reader.readAsText(file);

    reader.onerror = function() {
      // Lidar com erros de leitura do arquivo
      console.error('Erro de leitura do arquivo.');
      resolve({
        status: false,
        json: ''
      });
    };
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidJSONStructure(data: any): data is FontTesterData {
  if (typeof data !== 'object' || !Array.isArray(data.dados)) {
    return false;
  }

  for (const item of data.dados) {
    if (
      typeof item !== 'object' ||
      typeof item.id !== 'string' ||
      typeof item.principal !== 'object' ||
      typeof item.secundario !== 'object' ||
      typeof item.fundo !== 'object' ||
      typeof item.principal.label !== 'string' ||
      typeof item.principal.fonte !== 'object' ||
      typeof item.principal.fonte.label !== 'string' ||
      typeof item.principal.fonte.tipo !== 'string' ||
      typeof item.principal.fonte.classe !== 'string' ||
      typeof item.principal.fonte.variantes !== 'object' ||
      typeof item.principal.tamanho !== 'number' ||
      typeof item.principal.cor !== 'string' ||
      typeof item.secundario.label !== 'string' ||
      typeof item.secundario.fonte !== 'object' ||
      typeof item.secundario.fonte.label !== 'string' ||
      typeof item.secundario.fonte.tipo !== 'string' ||
      typeof item.secundario.fonte.classe !== 'string' ||
      typeof item.secundario.fonte.variantes !== 'object' ||
      typeof item.secundario.tamanho !== 'number' ||
      typeof item.secundario.cor !== 'string' ||
      typeof item.fundo.cor !== 'string'
    ) {
      return false;
    }
  }

  return true;
}
