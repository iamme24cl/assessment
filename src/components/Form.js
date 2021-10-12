export default function Form(props) {
  return (
    <form>
      <input
        className="search-bar"
        placeholder="Search by name"
        name="student-name"
        onChange={props.handleSearchTerm}
      />
      <br/>
      <hr style={{margin: "0 0 10px", borderTop: "1px solid #c9c7c7"}}/>
      <input
        className="search-bar"
        placeholder="Search by tag"
        name="tag"
        onChange={props.handleSearchTag}
      />
    </form>
  )
}
