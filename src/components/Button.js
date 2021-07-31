export default function Button({onClick, displayGrades}) {
  return (
    <button className="add-btn" onClick={onClick}>
      {displayGrades 
        ? <i className="fa fa-minus"></i>
        : <i className="fa fa-plus"></i>
      }
    </button>
  );
}