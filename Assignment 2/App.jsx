
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useParams
} from "react-router-dom";

const students = [
  { id: 1, name: "Ruthika", course: "CSE" },
  { id: 2, name: "Rahul", course: "ECE" },
  { id: 3, name: "Priya", course: "IT" }
];

function Home() {
  return <h2>Welcome to Home Page</h2>;
}

function About() {
  return <h2>About Us</h2>;
}

function Students() {
  return (
    <div>
      <h2>Students List</h2>
      {students.map((student) => (
        <p key={student.id}>
          <Link to={`/students/${student.id}`}>
            {student.name}
          </Link>
        </p>
      ))}
      <Outlet />
    </div>
  );
}

function StudentDetails() {
  const { id } = useParams();

  const student = students.find(
    (s) => s.id === Number(id)
  );

  if (!student) {
    return <h2>Student Not Found</h2>;
  }

  return (
    <div>
      <h3>Student Details</h3>
      <p>ID: {student.id}</p>
      <p>Name: {student.name}</p>
      <p>Course: {student.course}</p>
    </div>
  );
}

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/students">Students</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/students" element={<Students />}>
          <Route path=":id" element={<StudentDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
