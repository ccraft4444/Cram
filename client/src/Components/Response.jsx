import { useNavigate } from "react-router-dom";

export default function Response({ response }) {
  const navigate = useNavigate();
  return (
    <>
      <h1>Here are your study tools</h1>
      <p>{response}</p>
      <button onClick={() => navigate("/fileupload")}>Create More Tools</button>

      <h1>Upload to quizlet</h1>
      <ls>
        <li>Copy your study tools</li>
        <li>
          Go to{" "}
          <a
            href="https://www.quizlet.com/create-set"
            target="_blank"
            rel="noopener noreferrer"
          >
            quizlet.com/create-set
          </a>
        </li>
        <li>Click the + import button</li>
        <li>Paste your copied tools</li>
        <li>Click the Comma button bellow your data</li>
        <li>Click the import button</li>
      </ls>
    </>
  );
}
