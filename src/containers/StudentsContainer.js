import React from 'react';
import {getStudentProfiles} from '../utils';
import Student from '../components/Student';
import Form from '../components/Form';

class StudentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      searchTerm: "",
      searchTag: "",
      isFetching: true,
      hasErrorFetching: false,
    };
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
    this.handleSearchTag = this.handleSearchTag.bind(this);
    this.addProfileTag = this.addProfileTag.bind(this);
  }

  handleSearchTerm(e) {
    this.setState({ searchTerm: e.target.value })
  }

  handleSearchTag(e) {
    this.setState({ searchTag: e.target.value })
  }

  addProfileTag(sId, tag) {
    const students = this.state.students.map(student => {
      let tags = student.tags;
      if (student.id === sId && !(tag in tags)) {
        tags.push(tag.toLowerCase())
      }
      return {...student, tags};
    })
    this.setState({ students: students })
  }

  componentDidMount() {
    getStudentProfiles()
    .then(profiles => this.setState({ students: profiles }))
    .catch(() => {
      this.setState({ hasErrorFetching: true })
    }).then(() => {
      this.setState({ isFetching: false })
    })
  }

  render() {
    if (this.state.hasErrorFetching) {
      return <h3 className="error">Error Loading Profiles...</h3>
    }
    if (this.state.isFetching) {
      return <h3 className="fetching">Loading Profiles...</h3>
    }

    let studentProfiles;
    let term = this.state.searchTerm;
    let tag = this.state.searchTag;

    if (!term && !tag) {
      studentProfiles = this.state.students
    } else if (term && !tag) {
      studentProfiles = this.state.students.filter(student => {
        return (
          `${student.firstName} ${student.lastName}`.toLowerCase().includes(
            term.toLowerCase()
          )
        )
      });
    } else if (!term && tag) {
      studentProfiles = this.state.students.filter(student => {
        return (
          student.tags.join("").toLowerCase().includes(
            tag.toLowerCase()
          )
        )
      });
    } else if (term && tag) {
      studentProfiles = this.state.students.filter(student => {
        return (
          `${student.firstName} ${student.lastName}`.toLowerCase().includes(term.toLowerCase()) ||
          student.tags.join("").toLowerCase().includes(term.toLowerCase())
        );
      });
    }

    return (
      <div className="main-container">
        <div className="student-profiles-wrapper">
          <Form
            handleSearchTerm={this.handleSearchTerm}
            handleSearchTag={this.handleSearchTag}
          />
          <hr style={{margin: "0 0 10px", borderTop: "2px solid black"}} />
          <ul>
            {studentProfiles && studentProfiles.map(student => {
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
