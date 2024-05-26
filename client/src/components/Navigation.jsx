import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div className="pl-8 bg-[#111827] py-3 text-white">
      <div>
        <h1 className="text-3xl font-bold mb-4">BASIC CRUD APP</h1>
      </div>
      <div className="text-lg">
        <ul className="flex">
          <li className="px-3 hover:text-gray-400">
            <Link to={'/topics'}>Topics</Link>
          </li>
          <li className="hover:text-gray-400">
            <Link to={'/teachers'}>Teachers</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
