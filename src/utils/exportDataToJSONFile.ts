export function exportDataToJSONFile() {
  const dataToExport = localStorage.getItem('font-tester');
  if (dataToExport) {
    const jsonData = new Blob([dataToExport], { type: 'application/json' });
    const url = URL.createObjectURL(jsonData);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'font-tester-data.json'; // Nome do arquivo de saída
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
