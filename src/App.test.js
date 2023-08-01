import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter as Router } from "react-router-dom";

test("Render App component", () => {
  render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );
  const linkElement = screen.getByText(/Indusgame/i);
  expect(linkElement).toBeInTheDocument();
});
