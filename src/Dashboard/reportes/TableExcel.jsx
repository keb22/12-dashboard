import { DownloadTableExcel } from "react-export-table-to-excel";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { Button, Col } from "reactstrap";

export default function TableExcel({name, tableRef , data}){
  return(
    <Col className="py-2 d-flex justify-content-center align-items-end" xs="auto">
      <DownloadTableExcel
        filename='Reporte Museo Prehistórico'
        sheet={name}
        currentTableRef={tableRef.current}
      >
        <Button className='fw-semibold d-flex flex-row ' outline color='primary'>
         <HiOutlineDocumentDownload className='m-auto ' style={{height:'20px',width:'20px'}} />
          Descargar 
        </Button>
      </DownloadTableExcel>

     <table className='d-none table table-striped fs-6' style={{boxSizing:'border-box'}} ref={tableRef} >
     <thead>
     <tr>
       <th>Fecha</th>
       <th>Total</th>
      
     </tr>
     </thead>
     <tbody>
      {data.map(registro=>(
        <tr key={registro.total}>
         <td>{registro.fecha}</td>
         <td>{registro.total}</td>
       </tr>
      ))}
      </tbody>
     </table>
    </Col>
  )
}