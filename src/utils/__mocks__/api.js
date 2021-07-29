
const getStudentProfiles = jest.fn(() => {
  return Promise.resolve({
    status: "",
    data: []
  });
});


export default getStudentProfiles;