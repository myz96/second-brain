# Second Brain

Second Brain is an application designed to store, organise and facilitate creativity around your ideas. It works similarly to how a brain connects different ideas. By using the GPT API, it generates tags and displays them as a graph that connects different ideas together.

## Table of Contents

- [Second Brain](#second-brain)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Features](#features)
  - [Next Steps](#next-steps)
  - [Demo](#Link)

## Tech Stack

The following technologies are used in this project:

- MongoDB
- Express
- Node.js
- React
- Chakra-UI
- React-Graph-Vis
- Vis.js

## Features

- **Idea Storage**: Save your valuable ideas in a secure and structured way.
- **Idea Organisation**: Connect and cluster your ideas in intuitive ways.
- **Creativity Enhancement**: Use the tool to generate new idea connections and aid creative thinking.
- **Tag Generation**: Leverages the GPT API to generate relevant tags for each idea.
- **Graphical Visualisation**: Displays your ideas as a connected graph, providing a visual overview of your thought process.

## Next Steps

There are several enhancements planned for future development:

- Make nodes grow in size the more connections it has
- The more times an existing connection is repeated, the edge should become thicker
- Make the insert idea a modal that allows you to add an idea when you double click the graph
- Implement express-session: Currently, when you reload, private routes still redirect even though the user session is returning something.
- Improve node interaction: Make the full text description appear as a pop up when you click a node.
- Semantic analysis: Turn ideas into vectors that inherently represent the semantic meaning.

## Demo
[Link to Demo](https://secondbrain-gptgraph.onrender.com/) 
Test Account Details:
Username: michael.yj.zhao@gmail.com
Password: testtest
