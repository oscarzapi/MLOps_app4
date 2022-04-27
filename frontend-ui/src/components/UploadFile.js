import { useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import '../App.css';

function UploadFile() {

  const [fileValues, setFileValues] = useState({
    selectFile: "",
    respFromServer: [],
    data :{},
    columns : [
      {
        label: 'id',
          field: 'id',
          sort: 'asc'
      },
      {
        label: 'Dropout',
          field: 'Dropout',
          sort: 'asc'
      },
      {
        label: 'Graduate',
          field: 'Graduate',
          sort: 'asc'
      },
      {
        label: 'Enrolled',
          field: 'Enrolled',
          sort: 'asc',
      }
    ]
  })

  const handleSubmit = (event) => {

    setFileValues({
      ...fileValues, [event.target.name]:event.target.files[0]
    })
  }

  const handleUpload = async (event) => {
    event.preventDefault()
    const url = "http://localhost:8000/scoreFile"
    const formData = new FormData()
    formData.append('filePath', fileValues.selectFile, fileValues.selectFile.name)

    const reqOpt = {method:"POST", body:formData}

    const resp = await fetch(url, reqOpt)
    const resp2 = await resp.json()

    setFileValues({
      ...fileValues, respFromServer:resp2.result, data: {'columns':fileValues.columns, 'rows':Object.values(resp2.result)}
    })
    console.log(Object.values(fileValues.respFromServer))
  }

  

  
  return (
    <div className="UploadFile">
      <form onSubmit={handleUpload}>
        <input type="file" name='selectFile' onChange={handleSubmit}></input>
        <input type="submit" value="submit"></input>
      </form>
      <div>
      {Object.values(fileValues.respFromServer).length > 0 && 
        <MDBDataTable
        bordered
        hover
        data={fileValues.data}
      />
        }
      </div>
    </div>
  );
}

export default UploadFile;

