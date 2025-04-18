import React, { useState, useEffect } from "react";

function QuestionForm({ onAddQuestion, setPage }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });
  const [loading, setLoading] = useState(false); // To track if the fetch request is in progress

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "correctIndex" ? parseInt(value) : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { prompt, answer1, answer2, answer3, answer4, correctIndex } =
      formData;

    const newQuestion = {
      prompt,
      answers: [answer1, answer2, answer3, answer4],
      correctIndex,
    };

    setLoading(true); // Set loading to true when the request starts
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isMountedRef.current) return; // Check if the component is still mounted
        onAddQuestion(data);
        setFormData({
          prompt: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: "",
          correctIndex: 0,
        });

        // Navigate back to "View Questions" tab after adding
        if (setPage) {
          setPage("List");
        }
      })
      .catch((err) => {
        if (!isMountedRef.current) return; // Check if the component is still mounted
        console.error("Error adding question:", err);
      })
      .finally(() => {
        if (!isMountedRef.current) return; // Check if the component is still mounted
        setLoading(false); // Set loading to false when the request finishes
      });
  }

  // Use a useRef to track the mounted state of the component
  const isMountedRef = React.useRef(true);

  useEffect(() => {
    // This cleanup function will run when the component unmounts
    return () => {
      isMountedRef.current = false;
    };
  }, []); // Empty dependency array ensures this runs only once on unmount

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            disabled={loading} // Disable input while loading
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
            disabled={loading}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
            disabled={loading}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
            disabled={loading}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
            disabled={loading}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="0">{formData.answer1}</option>
            <option value="1">{formData.answer2}</option>
            <option value="2">{formData.answer3}</option>
            <option value="3">{formData.answer4}</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Question"}
        </button>
      </form>
    </section>
  );
}

export default QuestionForm;
