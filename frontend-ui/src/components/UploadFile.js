import { useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import '../App.css';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

function UploadFile() {

  const [fileValues, setFileValues] = useState({
    selectFile: "",
    respFromServer: []
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
      ...fileValues, respFromServer:resp2.result
    })
    console.log(Object.values(fileValues.respFromServer))
  }

  const columns = [
    {
      dataField: "Dropout",
      text: "Dropout",
      sort: true
    },
    {
      dataField: "Graduate",
      text: "Graduate",
      sort: true
    },
    {
      dataField: "Enrolled",
      text: "Enrolled",
      sort: true
    }
  ]

  
  return (
    <div className="UploadFile">
      <form onSubmit={handleUpload}>
        <input type="file" name='selectFile' onChange={handleSubmit}></input>
        <input type="submit" value="submit"></input>
      </form>
      <div>
      {Object.values(fileValues.respFromServer).length > 0 && <BootstrapTable
        bootstrap4
        keyField="Graduate"
        data={Object.values(fileValues.respFromServer)}
        columns={columns}
        pagination={paginationFactory({ sizePerPage: 5 })}>
        </BootstrapTable>}
      </div>
    </div>
  );
}

export default UploadFile;

