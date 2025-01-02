import { useState } from "react";
import { SearchContext } from "../context/search.context";

export function SearchProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [video, setVideo] = useState<boolean>(false);
  const [sorting, setSorting] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [resume, setResume] = useState<boolean>(false);
  const [salaryTo, setSalaryTo] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [salaryFrom, setSalaryFrom] = useState<string>("");

  const reset = () => {
    setSorting("");
    setCountry("");
    setVideo(false);
    setSalaryTo("");
    setResume(false);
    setSalaryFrom("");
    setExperience("");
  };

  return (
    <SearchContext.Provider
      value={{
        reset,
        country: {
          value: country,
          set: setCountry,
        },
        experience: {
          value: experience,
          set: setExperience,
        },
        sorting: {
          value: sorting,
          set: setSorting,
        },
        salaryTo: {
          value: salaryTo,
          set: setSalaryTo,
        },
        salaryFrom: {
          value: salaryFrom,
          set: setSalaryFrom,
        },
        video: { value: video, set: setVideo },
        resume: { value: resume, set: setResume },
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
