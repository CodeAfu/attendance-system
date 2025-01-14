"use client";
import Link from "next/link";
import SignatureComponent from "./Signature";
import { useState } from "react";

interface AttendanceFormProps {
  title?: string;
}

export default function AttendanceForm({ title }: AttendanceFormProps) {
  const [name, setName] = useState("");

  // TODO: Only save when button is clicked.
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const renderTitle = () => {
    if (!title) {
      return null;
    }
    return (
      <div className="max-w-md flex justify-center items-center mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
      </div>
    );
  };

  const renderField = (
    id: string,
    label: string,
    type: "text" | "date",
    placeholder?: string,
    divArgs?: string,
    onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    if (!id || !label || !type) {
      return null;
    }
    return (
      <div className={divArgs}>
        <label htmlFor={id} className="block text-gray-700 font-semibold mb-1">
          {label}:
        </label>
        <input
          type={type}
          id={id}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder ?? ""}
          onChange={onChangeHandler}
        />
      </div>
    );
  };

  return (
    <div className="md:mt-12">
      {renderTitle()}
      <form className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg md:max-w-xl max-w-md mx-auto">
        {renderField(
          "name",
          "Name",
          "text",
          "Enter your name",
          undefined,
          handleNameChange
        )}
        {/* TODO: Automate gatherin data from the following 3 fields */}
        {renderField("venue", "Venue", "text", "Enter the venue (temp)")}
        {renderField(
          "courseName",
          "Course Name",
          "text",
          "Enter the course name (temp)"
        )}
        {renderField("signInDate", "Sign-in Date", "date", "")}

        <SignatureComponent name={name} />
        <Link
          href="/submit"
          type="submit"
          className="w-full bg-blue-500 text-white text-center font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </Link>
      </form>
    </div>
  );
}
