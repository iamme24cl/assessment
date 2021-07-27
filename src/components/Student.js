import React from 'react';
import TagInput from './TagInput';

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayGrades: false
    }
  }

  toggleGrades() {
    this.setState({displayGrades: !this.state.displayGrades})
  }

  render() {
    return (
      <div>
        <div className="flex-container">
          <img className="student-img" src={this.props.student.pic} alt="student-avatar" />
          <div>
            <h2>{this.props.student.firstName} {this.props.student.lastName}</h2>
            <button className="add-btn" onClick={() => this.toggleGrades()}>
              {this.state.displayGrades 
                ? <i className="fa fa-minus"></i>
                : <i className="fa fa-plus"></i>
              }
            </button>
            <ul className="student-info">
              <li>Email: {this.props.student.email}</li>
              <li>Company: {this.props.student.company}</li>
              <li>Skill: {this.props.student.skill}</li>
              <li>Average: {this.props.student.average}</li>
            </ul>
            {this.state.displayGrades
              ? (<ul className="student-grades">
                  {this.props.student.grades.map((grade, index) => {
                    return (
                      <li key={index}>
                        Test {index + 1}: <span style={{marginLeft: "15px"}}>{grade}</span>
                      </li>
                    );
                  })}
              </ul>)
              : null
            }
          <TagInput 
            tags={this.props.student.tags}
            addNewTag={(newTag) => this.props.addProfileTag(this.props.student.id, newTag)}
          />
          </div>
        </div>
        <hr className="line"/>
      </div>
    )
  }
}

export default Student;