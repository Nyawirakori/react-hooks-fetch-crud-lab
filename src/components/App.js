import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  function handleAddQuestion(newQuestion) {
    setQuestions((prev) => [...prev, newQuestion]);
  }

  function handleDelete(id) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  function handleUpdate(updatedQuestion) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          setQuestions={setQuestions}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </main>
  );
}

export default App;
