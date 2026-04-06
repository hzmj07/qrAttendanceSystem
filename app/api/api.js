const startClassApi = async (studentList) => {
  const res = await fetch("http://localhost:5000/start-lesson", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentList),
  });

  if (!res.ok) {
    throw new Error("Backend hatası");
  }

  return res.json();
};
export { startClassApi };