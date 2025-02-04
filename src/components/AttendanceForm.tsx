"use client";
import Link from "next/link";
import SignatureComponent from "@/components/Form/Signature";
import { useState, ChangeEvent } from "react";
import FormField from "./Form/FormField";
// import { getDateTime } from "@/utils/functions";

interface AttendanceFormProps {
  title?: string;
  data?: {
    course: string;
    venue: string;
  };
}

export default function AttendanceForm({ title, data }: AttendanceFormProps) {
  const [name, setName] = useState("");
  // const time = getDateTime();

  const hasCourse = data && data.course;
  const hasVenue = data && data.venue;

  // TODO: Only save when button is clicked.
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const renderTitle = () => {
    if (!title) {
      return null;
    }
    return (
      <div className="flex justify-start bg-purple-700 shadow-md text-white items-center md:max-w-xl max-w-md mx-auto px-5 py-4 rounded-t-lg">
        <div className="break-all">
          <span className="text-3xl font-semibold">{title}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="md:mt-12">
      {renderTitle()}
      <form
        className={`flex flex-col gap-2 p-6 bg-white shadow-md rounded-b-lg md:max-w-xl max-w-md mx-auto ${
          !title ? "rounded-t-lg" : ""
        }`}
      >
        {hasCourse && (
          <p className="font-semibold">
            Course:&nbsp;
            <span className="font-normal break-all">{data.course}</span>
          </p>
        )}
        {hasCourse && hasVenue && (
          <p className="font-semibold">
            Venue:&nbsp;
            <span className="font-normal break-all">{data.venue}</span>
          </p>
        )}

        <FormField
          id="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          onChangeHandler={handleNameChange}
        />

        {/* TODO: Get course and venue data from routeParams */}
        {!data && (
          <>
            <FormField
              id="course"
              label="Course"
              type="text"
              placeholder="Enter the course name"
            />

            <FormField
              id="venue"
              label="Venue"
              type="text"
              placeholder="Enter the venue"
            />
          </>
        )}

        <SignatureComponent name={name} />
        <Link
          href="/submit"
          type="submit"
          className="w-full bg-purple-500 text-white text-center font-semibold py-2 px-4 rounded-md hover:bg-purple-600 transition duration-200"
        >
          Submit
        </Link>
      </form>
    </div>
  );
}
