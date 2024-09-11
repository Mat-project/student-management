import { useEffect ,useState} from "react";
import React from 'react';
import { getStudents } from '../services/Api';
import { Table } from 'react-bootstrap';

const Students = () => {

    const [student,setStudent]=useState([]);
    useEffect(()=>{
      let mounted=true
      getStudents()
          .then((data)=>{
            if (mounted) {
              setStudent(data)
            }
          })
      return () => mounted=false
    },[])
    
    return(
      <div className="container-fluid side-container">
      <div className="row side-row" >
       <p id="before-table"></p>
           <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
           <thead>
               <tr>
               <th>ID</th>
               <th>First Name</th>
               <th>Last Name</th>
               <th>Registration No</th>
               <th>Email</th>
               <th>Course</th>
               </tr>
           </thead>
           <tbody>
               {student.map((stu) =>
               <tr key={stu.studentId}>
                   <td>{stu.studentId}</td>
                   <td>{stu.FirstName}</td>
                   <td>{stu.LastName}</td>
                   <td>{stu.RegisterNo}</td>
                   <td>{stu.Email}</td>
                   <td>{stu.Course}</td>
               </tr>)}
           </tbody>
       </Table>
       </div>
     </div>
    )
}

export default Students