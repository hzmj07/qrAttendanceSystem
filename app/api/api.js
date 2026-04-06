const startClassApi = async (studentList) => {
  const res = await fetch("http://192.168.1.119:3666/start-lesson", {
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