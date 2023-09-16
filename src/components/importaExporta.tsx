import { FileUploadOutlined, FileDownloadOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { ChangeEvent, useContext } from 'react'
import { LocalStorageContext } from '../contexts/LocalStorageContext'
import styled from 'styled-components'
import { importDataFromJSONFileHelper } from '../utils/importDataFromJSONFile'
import { exportDataToJSONFile } from '../utils/exportDataToJSONFile'

const IconsContainer = styled.div`
  text-align: right;
`

export default function ImportaExporta() {
  const { setLocalStorageData } = useContext(LocalStorageContext)

  const handleImportar = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        try {
          const res = await importDataFromJSONFileHelper(file);
          if (res.status) {
            setLocalStorageData(JSON.parse(res.json)) 
          }
        } catch (error) {
          console.error('Erro geral durante a importação:', error);
        }
      } else {
        alert('O arquivo não está no formato JSON. Selecione um arquivo JSON válido.');
      }
    }
  }
  
  
  const handleExportar = () => {
    exportDataToJSONFile()
  }

  return (
    <IconsContainer>
      <input
        type="file"
        id="fileInput"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleImportar}
      />
      <label htmlFor="fileInput">
        <Tooltip title="Importar de um arquivo">
          <IconButton component="span">
            <FileUploadOutlined />
          </IconButton>
        </Tooltip>
      </label>

      <Tooltip onClick={handleExportar} title="Exportar para um arquivo">
        <IconButton>
          <FileDownloadOutlined />
        </IconButton>
      </Tooltip>
    </IconsContainer>
  )
}
