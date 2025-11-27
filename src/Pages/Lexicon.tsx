import { useEffect, useState } from "react";

export function Lexicon() {
  const [components, setComponents] = useState([]);

  const fetchComponents = async () => {
    try {
      const res = await fetch("http://localhost:3000");
      const data = await res.json();
      setComponents(data);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  return (
    <>
      <div>
        <table>
          {components.map((component) => (
            <tr key={component}>
                <td>{component}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}
