"use client";
import React from "react";
import { Job, School, Project } from "~/components/ResumeForm";

export default function PrintResume(){

  function logFromLocalStorage() {
    const storedData = localStorage.getItem("resumeData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log("Data found in local storage:");
        console.log(parsedData);
      } catch (error) {
        console.error("Error parsing data from local storage:", error);
      }
    } else {
      console.log("No data found in local storage.");
    }

    // activate render fucntions here for now
    renderBio();
  }

  function renderBio() {
    const storedData = localStorage.getItem("resumeData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const { bio } = parsedData;
        const { name, personalSummary, email, phoneNumber, location, personalWebsite1, personalWebsite2 } = bio;
  
        return (
          <section className="bio-wrapper" >
            <div className="flex flex-col justify-center items-center mb-4">
                <h1 className="text-3xl border-b-2 border-b-black w-full text-center">{name}</h1>
                
                <div className="contact-wrapper w-full flex flex-row flex-wrap items-center text-xs gap-x-8 gap-y-1">
                  <p className="w-fit">{location}</p>
                  <p className="w-fit">{phoneNumber}</p>
                  <p className="w-fit">{email}</p>
                  <p className="w-fit">{personalWebsite1}</p>
                  <p className="w-fit">{personalWebsite2}</p>
                </div>
                {/* <div className="websites-wrapper contact-wrapper flex flex-row justify-between items-center text-sm gap-6">
                </div> */}
            </div>
            <div className="mb-4" >
                <h2 className="text-lg font-bold border-b border-black" >
                  Summary
                </h2>
                <h3 className="text-sm italic">{personalSummary}</h3>
            </div>
            
          </section>
        );
      } catch (error) {
        console.error("Error parsing data from local storage:", error);
      }
    } else {
      console.log("No data found in local storage.");
    }
  }

  function renderJobs() {
    const storedData = localStorage.getItem("resumeData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const { jobs } = parsedData;
        return (
          <div className="flex flex-col w-full h-fit mt-2 mb-4 gap-3">
            <h2 className="text-lg font-bold border-b border-black" >
              Work Experience
            </h2>
            {jobs.map((job: Job, index: number) => (
              <div className="flex flex-col h-fit" key={index} id={`job-${index}`}>
                <span className="flex flex-row h-fit w-full justify-between items-center">
                  <h3 className="text-base font-semibold">
                      {job.companyName}
                  </h3>
                  <p className="text-base">{job.dates}</p>
                </span>
                <h4 className="text-sm" >{job.title}</h4>
                <ul className="list-disc pl-5 text-xs">
                  {job.duties.map((duty, dutyIndex) => (
                    <li key={dutyIndex}>{duty}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      } catch (error) {
        console.error("Error parsing data from local storage:", error);
      }
    } else {
      console.log("No data found in local storage.");
      return null; // Return null to render nothing when no data is available
    }
  }
  function renderProjects() {
    const storedData = localStorage.getItem("resumeData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const { projects } = parsedData;
        return (
          <div className="flex flex-col w-full h-fit my-2 mb-4 gap-3">
            <h2 className="text-lg font-bold border-b border-black">
              Projects
            </h2>
            {projects.map((project: Project, index: number) => (
              <div className="flex flex-col h-fit" key={index} id={`project-${index}`}>
                <span className="flex flex-row w-full justify-between items-center mb-1" >
                    <h3 className="text-base font-semibold">
                      {project.projectName}
                    </h3>
                    <p className="text-base">{project.dates}</p>
                </span>
                <ul className="list-disc pl-5 text-xs">
                  {project.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      } catch (error) {
        console.error("Error parsing data from local storage:", error);
      }
    } else {
      console.log("No data found in local storage.");
      return null; // Return null to render nothing when no data is available
    }
  }
  function renderSchools() {
    const storedData = localStorage.getItem("resumeData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const { schools } = parsedData;
        return (
          <div className="flex flex-col w-full h-fit mt-2 mb-4 gap-3">
            <h2 className="text-lg font-bold border-b border-black">Education</h2>
            {schools.map((school: School, index: number) => (
              <div className="flex flex-col h-fit" key={index} id={`school-${index}`}>
                <span className="flex flex-row h-fit w-full justify-between items-center">
                  <h3 className="text-base font-semibold">{school.name}</h3>
                  <p className="text-base">{school.dateGraduated}</p>
                </span>
                {/* Updated the field here */}
                
                <span className="flex flex-row h-fit w-full gap-1 items-center">
                  <h4 className="text-sm">{school.degree}</h4>
                  <h4 className="text-sm">{school.major} |</h4>
                  <h4 className="text-sm">GPA: {school.gpa}</h4>
                </span>
                <p className="text-sm">{school.additionalInfo}</p>
              </div>
            ))}
          </div>
        );
      } catch (error) {
        console.error("Error parsing data from local storage:", error);
      }
    } else {
      console.log("No data found in local storage.");
      return null; // Return null to render nothing when no data is available
    }
  }
  function renderSkills() {
    const storedData = localStorage.getItem("resumeData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const { skills } = parsedData;
        const { skillList } = skills;
  
        if (skillList.length === 0) {
          // Return null if there are no skills to render
          console.log("No skills found in resumeData.");
          return null;
        }
  
        const skillsString = skillList.join(", ");
  
        return (
          <div className="flex flex-col w-full h-fit mt-2 mb-4 gap-3">
            <h2 className="text-lg font-bold border-b border-black">Skills</h2>
            <p id="skills-list" className="text-xs">
              {skillsString}
            </p>
          </div>
        );
      } catch (error) {
        console.error("Error parsing data from local storage:", error);
      }
    } else {
      console.log("No data found in local storage.");
      return null; // Return null to render nothing when no data is available
    }
  }
  

    return (
        <main className="w-[90vw] lg:w-full overflow-hidden overflow-scroll" >
            <div className="w-[860px] h-fit min-h-[1060px] bg-white text-gray-800 font-serif pt-16 px-16 pb-16">
      {/* Conditionally call renderBio() if localStorage is available */}
      {typeof window !== 'undefined' && window.localStorage ? renderBio() : null}
      {/* Conditionally call renderBio() if localStorage is available */}
      {typeof window !== 'undefined' && window.localStorage ? renderJobs() : null}
      {/* Conditionally call renderBio() if localStorage is available */}
      {typeof window !== 'undefined' && window.localStorage ? renderProjects() : null}
      {/* Conditionally call renderBio() if localStorage is available */}
      {typeof window !== 'undefined' && window.localStorage ? renderSchools() : null}
      {/* Conditionally call renderBio() if localStorage is available */}
      {typeof window !== 'undefined' && window.localStorage ? renderSkills() : null}
            </div>
            
        </main>
    )
}



