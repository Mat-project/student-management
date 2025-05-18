import axios from 'axios';
import { toast } from 'react-toastify';

// Create a global loading state
let loadingCallbacks = [];

export function registerLoadingCallback(callback) {
  loadingCallbacks.push(callback);
  return () => {
    loadingCallbacks = loadingCallbacks.filter(cb => cb !== callback);
  };
}

function setLoading(isLoading) {
  loadingCallbacks.forEach(callback => callback(isLoading));
}

export function getStudents() {
  setLoading(true);
  return axios.get('http://127.0.0.1:8000/student/')
    .then(response => {
      setLoading(false);
      return response.data;
    })
    .catch(error => {
      setLoading(false);
      toast.error('Failed to fetch students');
      throw error;
    });
}

export function deleteStudents(studentId) {
  setLoading(true);
  return axios.delete('http://127.0.0.1:8000/student/' + studentId + '/', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      setLoading(false);
      toast.success('Student deleted successfully');
      return response.data;
    })
    .catch(error => {
      setLoading(false);
      toast.error('Failed to delete student');
      throw error;
    });
}

export function addStudents(student) {
  setLoading(true);
  return axios.post('http://127.0.0.1:8000/student/', {
    studentId: null,
    FirstName: student.FirstName.value,
    LastName: student.LastName.value,
    RegisterNo: student.RegisterNo.value,
    Email: student.Email.value,
    Course: student.Course.value
  })
    .then(response => {
      setLoading(false);
      toast.success('Student added successfully');
      return response.data;
    })
    .catch(error => {
      setLoading(false);
      toast.error('Failed to add student');
      throw error;
    });
}

export function updateStudent(stuid, student) {
  setLoading(true);
  return axios.put('http://127.0.0.1:8000/student/' + stuid + '/', {
    FirstName: student.FirstName,
    LastName: student.LastName,
    RegisterNo: student.RegisterNo,
    Email: student.Email,
    Course: student.Course
  })
    .then(response => {
      setLoading(false);
      toast.success('Student updated successfully');
      return response.data;
    })
    .catch(error => {
      setLoading(false);
      toast.error('Failed to update student');
      throw error;
    });
}
