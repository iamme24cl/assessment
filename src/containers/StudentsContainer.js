import React from 'react';
import {getStudentProfiles} from '../utils';
import Student from '../components/Student';
import Form from '../components/Form';

class StudentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      filteredStudents: [],
      searchTerm: "",
      isFetching: true,
      hasErrorFetching: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.addProfileTag = this.addProfileTag.bind(this);
  } 

  handleChange(e) {
    this.setState({ searchTerm: e.target.value })
  }

  addProfileTag(sId, tag) {
    const studentProfiles = this.state.students.map(student => {
      let tags = student.tags;
      if (student.id === sId && !(tag in tags)) {
        tags.push(tag.toLowerCase())
      }
      return {
        ...student,
        tags,
        tagString: tags.join(',')
      }
    })
    this.setState({  students: studentProfiles })
  }

  componentDidMount() {
    getStudentProfiles()
    .then(profiles => this.setState({ students: profiles }))
    .catch(() => {
      this.setState({ hasErrorFetching: true })
    }).then(() => {
      this.setState({  isFetching: false })
    })
  }

  render() {
    if (this.state.hasErrorFetching) {
      return <h3 className="error">Error Loading Profiles...</h3>
    } 
    if (this.state.isFetching) {
      return <h3 className="fetching">Loading Profiles...</h3>
    }

    let studentList = !this.state.searchTerm 
    ? this.state.students
    : this.state.students.filter(student => {
      return (
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        student.tagString.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      );
    });

    return (
      <div className="main-container">
        <div className="student-profiles-wrapper">
          <Form handleChange={this.handleChange}/>
          <hr style={{margin: "0 0 10px", borderTop: "2px solid black"}} />
          <ul>
            {studentList && studentList.map(student => {
              return (
                <Student 
                  key={student.id} 
                  student={student} 
                  addProfileTag={this.addProfileTag}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default StudentsContainer;