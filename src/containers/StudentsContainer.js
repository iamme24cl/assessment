import React from 'react';
import { api } from '../utils';
import Student from '../components/Student';

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
    api.getStudentProfiles()
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
        student.firstName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        student.tagString.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      );
    });

    return (
      <div className="student-profiles-wrapper">
        <form>
          <input 
            className="search-bar" 
            placeholder="Search by name"
            name="student-name" 
            onChange={this.handleChange}
          />
          <br/>
          <hr style={{margin: "0 0 10px", borderTop: "1px solid #c9c7c7"}}/>
          <input 
            className="search-bar" 
            placeholder="Search by tag"
            name="tag" 
            onChange={this.handleChange}
        />
        </form>
        <hr style={{margin: "0 0 10px", borderTop: "2px solid black"}} />
        <ul>
          {studentList && studentList.map(student => {
            return <Student 
              key={student.id} 
              student={student} 
              addProfileTag={this.addProfileTag}
            />
          })}
        </ul>
       
      </div>
    );
  }
}

export default StudentsContainer;