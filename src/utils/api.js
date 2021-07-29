import CONSTANTS from './constants';

const { API_ENDPOINTS: { BASE, STUDENT_PROFILES } } = CONSTANTS

const getStudentProfiles = async () => {
  const response = await fetch(`${BASE}${STUDENT_PROFILES}`);
  const data = await response.json();
  const students = data.students;
  const profiles = students.map(student => {
    const average = student.grades.reduce((acc, grade) => {
      return acc + Number(grade);
    }, 0) / student.grades.length;
    return {
      ...student,
      tags: [],
      tagString: '',
      average: average
    };
  });
  return profiles;
}


export default getStudentProfiles;

