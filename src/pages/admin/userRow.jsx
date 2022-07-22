import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../store/details";
import getBgColor from "../../utils/getBgColor";

export default function UserRow({ user }) {
  const { updateUserPoints, updateUserData } = useContext(UserContext);

  return (
    <>
      <div className="justify-between flex gap-4 items-center">
        <Input
          defaultValue={user.name}
          inputName="Name"
          spanStyles="flex-1 text-lg font-bold"
          inputStyles="text-lg font-bold"
          onChangeCb={(value) =>
            updateUserData(user.team, user.name, "name", value)
          }
          inputProps={{
            placeholder: "Enter name",
          }}
        />
        <Dropdown
          defaultOption={user.team}
          options={["green", "red", "blue"]}
          name="team"
          onChangeCb={
            (_) => {}
            // updateUserData(user.team, user.name, "team", value)
          }
        />
        <Input
          defaultValue={user?.points}
          inputName="Points"
          spanStyles="flex-1 text-center font-bold text-2xl"
          onChangeCb={(value) => {
            updateUserPoints(user.team, user.name, value);
          }}
          inputStyles="text-center font-bold text-2xl"
          inputProps={{
            type: "number",
          }}
        />
      </div>
      <hr />
    </>
  );
}

function Input({
  defaultValue,
  spanStyles,
  inputName,
  inputStyles,
  inputProps,
  onChangeCb,
}) {
  const [value, setValue] = useState(defaultValue);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    editing && inputRef.current?.focus();
  }, [editing]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        setEditing(false);
        onChangeCb && onChangeCb(inputRef.current?.value);
      }
    },
    [inputRef.current]
  );

  return editing ? (
    <input
      value={value}
      ref={inputRef}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => setEditing(false)}
      placeholder={`Enter ${inputName}`}
      onKeyDown={onKeyDown}
      className={
        "flex-1 focus:bg-accent focus:bg-opacity-40 focus:outline-none focus:shadow-md " +
        inputStyles
      }
      {...inputProps}
    />
  ) : (
    <span onDoubleClick={() => setEditing(true)} className={spanStyles}>
      {value}
    </span>
  );
}

function Dropdown({ defaultOption, options, name, onChangeCb }) {
  const [currentOption, setCurrentOption] = useState(defaultOption);
  const ref = useRef(null);
  const [editing, setEditing] = useState(false);
  return editing ? (
    <select
      name={name}
      ref={ref}
      onChange={(e) => {
        setCurrentOption(e.target.value);
        onChangeCb && onChangeCb(currentOption);
        ref.current?.blur();
      }}
      value={currentOption}
      onBlur={() => setEditing(false)}
      className="flex-1 text-center p-2 capitalize"
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
          className="capitalize"
          onBlur={() => setEditing(false)}
        >
          {option}
        </option>
      ))}
    </select>
  ) : (
    <span
      onDoubleClick={() => setEditing(true)}
      className={`${getBgColor(
        currentOption
      )} flex-1 p-2 text-center font-medium text-lg capitalize`}
    >
      {currentOption}
    </span>
  );
}
