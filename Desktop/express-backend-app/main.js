const express = require("express");
const app = express();
const port = 3000;

let users = [];
let questions = [];
let submissions = [];

// Middleware to parse JSON request body
app.use(express.json());

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ error: "Username already exists" });
  }

  // Create a new user object and add it to the array
  const newUser = { username, password };
  users.push(newUser);

  // Respond with a success message or any relevant data
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);

  if (!user || user.password != password) {
    res.status(401).json({ message: "Invalid username or password" });
  }

  res.status(200).json({ message: "Login was successful" });
});

app.post("/question", (req, res) => {
  const {
    id,
    title,
    description,
    difficulty,
    category,
    tags,
    examples,
    solutions,
    hints,
    timeLimit,
    spaceLimit,
  } = req.body;

  const newQuestion = {
    id,
    title, // String: The title or name of the question
    description, // String: The description or prompt of the question
    difficulty, // String: The difficulty level of the question (e.g., "Easy", "Medium", "Hard")
    category, // String: The category or topic of the question (e.g., "Arrays", "Strings", "Graphs")
    tags, // Array: Additional tags or labels associated with the question
    examples, // Array: Example test cases or input/output scenarios for the question
    solutions, // Array: Possible solutions or approaches to the question
    hints, // Array: Optional hints or tips for solving the question
    timeLimit, // Number: The maximum allowed execution time for the question (in milliseconds)
    spaceLimit, // Number: The maximum allowed memory usage for the question (in bytes)
  };

  questions.push(newQuestion);
  res.status(201).json({ message: "Question was added successfully" });
});

app.get("/questions", (req, res) => {
  res.status(200).json(questions);
});

app.post("/submission", (req, res) => {
  const { questionId, code, language } = req.body;

  // Find the question based on the questionId
  const question = questions.find((q) => q.id === questionId);

  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  const newSubmission = { questionId, code, language };

  submissions.push(newSubmission);

  // Return the result of the submission
  res.status(201).json("Question submitted successfully");
});

app.get("/submissions", (req, res) => {
  res.status(200).json(submissions);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
