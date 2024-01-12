import { useRef, useState, KeyboardEvent, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import useClickOutsider from "./hooks/useClickOutsider";
import useDebounce from "./hooks/useDebounce";
import "./style.scss";

type Item = {
  id: string;
  title: string;
  selected: boolean;
};

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [list, setList] = useState<Item[]>([]);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [input, setInput] = useState<string>("");

  const listRef = useClickOutsider(() => {
    setIsOpen(false);
  });

  const debouncedKeyword = useDebounce(input);

  const memoizedList = useMemo(() => {
    const filteredList = list.filter((item) =>
      item.title.toLowerCase().includes(debouncedKeyword.toLowerCase())
    );
    return filteredList;
  }, [list, debouncedKeyword]);

  useEffect(() => {
    setFilteredList(memoizedList);
  }, [memoizedList, setFilteredList]);

  const handleClick = () => {
    setIsOpen(!isOpen);
    inputRef.current?.focus();
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const listItem = { id: uuidv4(), title: input, selected: false };
      setList([...list, listItem]);
      setFilteredList([...list, listItem]);
      setInput("");
    }
  };

  const handleItemClick = (itemId: string) => {
    const selectedItems = list.map((item) => {
      if (item.id === itemId) item.selected = !item.selected;
      return item;
    });
    setList(selectedItems);
  };

  return (
    <div className="dropdown-container" ref={listRef}>
      <div className="dropdown-input">
        <input
          placeholder="Add or search item"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
          onClick={() => setIsOpen(true)}
        />
        <i
          className={`arrow ${isOpen ? "up" : "down"}`}
          onClick={handleClick}
        ></i>
      </div>
      {!!filteredList.length && isOpen && (
        <div className="list-content">
          <ul>
            {filteredList.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={item.selected ? "item-selected" : undefined}
                >
                  <span className="item-title">{item.title}</span>
                  {item.selected && <span>&#10003;</span>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
