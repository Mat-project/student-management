import axios from 'axios';

export function getStudents() {
    return axios.get('http://127.0.0.1:8000/student/')
        .then(response => response.data)
}

export function deleteStudents(studentId) {
    return axios.delete('http://127.0.0.1:8000/student/' + studentId + '/', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.data)
}

export function addStudents(student) {
    return axios.post('http://127.0.0.1:8000/student/', {
        studentId:null,
        FirstName: student.FirstName.value,
        LastName: student.LastName.value,
        RegisterNo: student.RegisterNo.value,
        Email: student.Email.value,
        Course: student.Course.value
    })
    .then(response => response.data)
}


export function updateStudent(stuid, student) {
    return axios.put('http://127.0.0.1:8000/student/' + stuid + '/', {
            FirstName: student.FirstName,
            LastName: student.LastName,
            RegisterNo: student.RegisterNo,
            Email: student.Email,
            Course: student.Course
        })
        .then(response => response.data)
}
