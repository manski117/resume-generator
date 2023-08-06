"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
import { BulletListFormTextarea } from "./BulletTextArea";

type Bio = {
  name: string;
  location: string;
  phoneNumber: string;
  email: string;
  personalWebsite1: string;
  personalWebsite2: string;
  personalSummary: string;
};

export type School = {
  name: string;
  major: string;
  gpa: string;
  dateGraduated: string;
  degree: string; 
  additionalInfo: string;
};

export type Job = {
  companyName: string;
  title: string;
  dates: string;
  duties: string[];
};

export type Project = {
  projectName: string;
  dates: string;
  details: string[];
};

type SkillList = {
  skillList: string[];
}

interface ResumeContextValue {
  bio: Bio;
  setBio: React.Dispatch<React.SetStateAction<Bio>>;
  schools: School[];
  setSchools: React.Dispatch<React.SetStateAction<School[]>>;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  skills: SkillList;
  setSkills: React.Dispatch<React.SetStateAction<SkillList>>;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
};

export function ResumeForm() {
  const [bio, setBio] = useState<Bio>({
    name: "",
    location: "",
    phoneNumber: "",
    email: "",
    personalWebsite1: "",
    personalWebsite2: "",
    personalSummary: "",
  });

  const [schools, setSchools] = useState<School[]>([
    {
      name: "",
      major: "",
      gpa: "",
      dateGraduated: "",
      degree: "",
      additionalInfo: "",
    },
  ]);
  const [jobs, setJobs] = useState<Job[]>([
    {
      companyName: "",
      title: "",
      dates: "",
      duties: [],
    },
  ]);
  const [projects, setProjects] = useState<Project[]>([
    {
      projectName: "",
      dates: "",
      details: [],
    },
  ]);
  const [skills, setSkills] = useState<SkillList>(
    {
      skillList:[]
    },
  );

  const value = { bio, setBio, schools, setSchools, jobs, setJobs, projects, setProjects, skills, setSkills };

  useEffect(() => {
    console.log("Schools:", schools);
    console.log("Jobs:", jobs);
    console.log("Projects:", projects);
    console.log("Skills:", skills);
    console.log("Bio:", bio);
    console.log("Jobs:", jobs);
  }, [bio, schools, jobs, projects, skills]);

  function logData() {
    //logs data and attempts to save it to local storage
    console.log(bio, schools, jobs, projects, skills);
    saveToLocalStorage(bio, schools, jobs, projects, skills);
  }
  
  //saves state to local storage
  function saveToLocalStorage(bio: Bio, schools: School[], jobs: Job[], projects: Project[], skills: SkillList) {
    const dataToSave = {
      bio,
      schools,
      jobs,
      projects,
      skills,
    };
    localStorage.setItem("resumeData", JSON.stringify(dataToSave));
  }

  //looks to see if any resume data is saved to local storage. If so, it sets the state with it.
  //to be used in a on-mount useEffect hook later.
  function loadFromLocalStorage(
    setBio: React.Dispatch<React.SetStateAction<Bio>>,
    setSchools: React.Dispatch<React.SetStateAction<School[]>>,
    setJobs: React.Dispatch<React.SetStateAction<Job[]>>,
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    setSkills: React.Dispatch<React.SetStateAction<SkillList>>
  ) {
    const storedData = localStorage.getItem("resumeData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
  
        if (parsedData.bio) {
          setBio(parsedData.bio);
        }
        if (parsedData.schools) {
          setSchools(parsedData.schools);
        }
        if (parsedData.jobs) {
          setJobs(parsedData.jobs);
        }
        if (parsedData.projects) {
          setProjects(parsedData.projects);
        }
        if (parsedData.skills) {
          setSkills(parsedData.skills);
        }
      } catch (error) {
        console.error("Error parsing data from local storage:", error);
      }
    }
  }

  function loadData(){
    //callback function to test local storage strat
    loadFromLocalStorage(setBio, setSchools, setJobs, setProjects, setSkills);
  }
  
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
  }

  return (
    <ResumeContext.Provider value={value}>
      <BioForm />
      <SchoolForm />
      <JobForm />
      <ProjectForm />
      <SkillsForm />
      {/* Other child components */}
      <button className="btn mt-4 mx-auto" onClick={logData}>
        Log and save
      </button>
      <button className="btn mt-4 mx-auto" onClick={loadData}>
        Load from LS 
      </button>
      <button className="btn mt-4 mx-auto" onClick={logFromLocalStorage}>
        LOG from LS 
      </button>
      
    </ResumeContext.Provider>
  );
}

export function BioForm() {
  const { bio, setBio } = useResumeContext();

  const updateBio = (field: keyof Bio, value: string) => {
    setBio((prevBio) => ({ ...prevBio, [field]: value }));
  };

  return (
    <div className="bio-form-wrapper bg-base-200 w-full p-4 lg:p-6 pb-[4rem] lg:pb-[4rem]">
      <span className="w-full p-1 m-1 flex flex-row gap-3 items-center">
        <img
          className="w-[30px] h-[30px]"
          src="https://img.icons8.com/ios/50/FFFFFF/meeting.png"
          alt=""
        />
        <h2 className="text-3xl">Personal Introduction</h2>
      </span>
      <div className="my-5">
        <div className="form-control w-full ">
          <label className="label items-end">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={bio.name}
            onChange={(e) => updateBio("name", e.target.value)}
            className="input input-bordered w-full "
          />
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Personal Summary</span>
          </label>
          <textarea
            placeholder="Professional, energetic, and personable salesperson with experience completing sales, helping customers, and operating cash registers in a fast-paced environment."
            value={bio.personalSummary}
            onChange={(e) => updateBio("personalSummary", e.target.value)}
            className="input input-bordered w-full h-[125px] "
          />
        </div>

        <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="johndoe@example.com"
              value={bio.email}
              onChange={(e) => updateBio("email", e.target.value)}
              className="input input-bordered w-full "
            />
          </div>

        <div className="flex flex-row w-full gap-2">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              placeholder="New York, USA"
              value={bio.location}
              onChange={(e) => updateBio("location", e.target.value)}
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              placeholder="555-1234"
              value={bio.phoneNumber}
              onChange={(e) => updateBio("phoneNumber", e.target.value)}
              className="input input-bordered w-full "
            />
          </div>
        </div>

        <div className="flex flex-row w-full gap-2">
          {/* This div splits inputs into a right and left half on same line */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Personal Website 1</span>
            </label>
            <input
              type="text"
              placeholder="https://www.example.com"
              value={bio.personalWebsite1}
              onChange={(e) => updateBio("personalWebsite1", e.target.value)}
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Personal Website 2</span>
            </label>
            <input
              type="text"
              placeholder="https://www.example.com"
              value={bio.personalWebsite2}
              onChange={(e) => updateBio("personalWebsite2", e.target.value)}
              className="input input-bordered w-full "
            />
          </div>
        </div>


      </div>
    </div>
  );
}

export function SchoolForm() {
  const { schools, setSchools } = useResumeContext();

  const addSchool = () => {
    setSchools([
      ...schools,
      {
        name: "",
        major: "",
        gpa: "",
        dateGraduated: "",
        degree: "",
        additionalInfo: "",
      },
    ]);
  };

  const deleteSchool = (index: number) => {
    const newSchools = [...schools];
    newSchools.splice(index, 1);
    setSchools(newSchools);
  };

  const updateSchool = (
    index: number,
    field: keyof School,
    value: string
  ) => {
    const newSchools = [...schools];
    newSchools[index][field] = value;
    setSchools(newSchools);
  };
  function logSchoolData() {
    console.log(schools);
  }

  return (
    <div className="school-form-wrapper bg-base-200 w-full p-4 lg:p-6 pb-[4rem] lg:pb-[4rem]">
      <span className="w-full p-1 m-1 flex flex-row gap-3 items-center">
        <img className="w-[30px] h-[30px]" src="https://img.icons8.com/pastel-glyph/64/FFFFFF/student-male--v1.png" alt="" />
        <h2 className="text-3xl">Education</h2>
      </span>
      {schools.map((school, index) => (
        <div className="my-5" key={index}>

          <div className="form-control w-full ">
            <label className="label items-end">
              <span className="label-text">School Name</span>
              {index !== 0 && (
            <button
              className="btn my-2 bg-base-100 rounded-full w-[30px] h-[30px] p-0 float-right m-0 min-h-0"
              onClick={() => deleteSchool(index)}
              title="Delete School"
            >
                <img
                  src="https://img.icons8.com/glyph-neue/64/FFFFFF/trash.png"
                  alt="delete icon"
                  className="w-[20px] h-[20px]"
                />
            </button>
          )}
            </label>
            <input
              type="text"
              placeholder="Armstrong State University"
              value={school.name}
              onChange={(e) => updateSchool(index, "name", e.target.value)}
              className="input input-bordered w-full "
            />
          </div>

          <div className="flex flex-row w-full gap-2">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Major</span>
                {/* <span className="label-text-alt">Top Right label</span> */}
              </label>
              <input
                type="text"
                placeholder="Economics"
                value={school.major}
                onChange={(e) => updateSchool(index, "major", e.target.value)}
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">GPA</span>
                {/* <span className="label-text-alt">Top Right label</span> */}
              </label>
              <input
                type="text"
                placeholder="4.0"
                value={school.gpa}
                onChange={(e) => updateSchool(index, "gpa", e.target.value)}
                className="input input-bordered w-full "
              />
            </div>
          </div>

          <div className="flex flex-row w-full gap-2">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Degree</span>
            </label>
            <input
              type="text"
              placeholder="Bachelor of Science in Economics"
              value={school.degree}
              onChange={(e) => updateSchool(index, "degree", e.target.value)}
              className="input input-bordered w-full "
            />
          </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Date Graduated</span>
                {/* <span className="label-text-alt">Top Right label</span> */}
              </label>
              <input
                type="text"
                placeholder="May, 2016"
                value={school.dateGraduated}
                onChange={(e) =>
                  updateSchool(index, "dateGraduated", e.target.value)
                }
                className="input input-bordered w-full "
              />
            </div>
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Additional Information</span>
              {/* <span className="label-text-alt">Top Right label</span> */}
            </label>
            <textarea
              placeholder="Minored in writing, graduated suma cum laude with honors."
              value={school.additionalInfo}
              onChange={(e) =>
                updateSchool(index, "additionalInfo", e.target.value)
              }
              className="input input-bordered w-full h-[75px] "
            />
          </div>

          
        </div>
      ))}
      <button onClick={addSchool} className="btn bg-base-100 my-1 rounded-full w-[150px] float-right">
        <span className="flex  flex-row items-center justify-between w-full">
          <img
            src="https://img.icons8.com/android/24/FFFFFF/plus.png"
            alt="plus icon"
            className="w-[20px] h-[20px]"
          />
          <p>Add School</p>
        </span>
      </button>
    </div>
  );
}

export function JobForm() {
  const { jobs, setJobs } = useResumeContext();

  const addJob = () => {
    setJobs([
      ...jobs,
      {
        companyName: "",
        title: "",
        dates: "",
        duties: [],
      },
    ]);
  };

  const deleteJob = (index: number) => {
    const newJobs = [...jobs];
    newJobs.splice(index, 1);
    setJobs(newJobs);
  };

  const updateJob = (index: number, field: keyof Job, value: string | string[]) => {
    const newJobs = [...jobs];
    if (field === "duties") {
      if (Array.isArray(value)) {
        newJobs[index][field] = value;
      } else {
        // If it's a single string, convert it into an array with one element
        newJobs[index][field] = [value];
      }
    } else {
      newJobs[index][field] = value as string; // Leave other fields unchanged
    }
    setJobs(newJobs);
  };
  
  function logJobData() {
    console.log(jobs);
  }

  return (
    <div className="job-form-wrapper bg-base-200 w-full p-4 lg:p-6 pb-[4rem] lg:pb-[4rem]">
      <span className="w-full p-1 m-1 flex flex-row gap-3 items-center">
        <img className="w-[30px] h-[30px]" src="https://img.icons8.com/ios/50/FFFFFF/permanent-job.png" alt="" />
        <h2 className="text-3xl">Work Experience</h2>
      </span>
      {jobs.map((job, index) => (
        <div className="my-5" key={index}>

          <div className="form-control w-full ">
            <label className="label items-end">
              <span className="label-text">Company or Organization</span>
              {/* button to delete only shows up if not last job on page */}
              {index !== 0 && (
                <button
                  className="btn my-2 bg-base-100 rounded-full w-[30px] h-[30px] p-0 float-right m-0 min-h-0"
                  onClick={() => deleteJob(index)}
                  title="Delete Job"
                >
                    <img
                      src="https://img.icons8.com/glyph-neue/64/FFFFFF/trash.png"
                      alt="delete icon"
                      className="w-[20px] h-[20px]"
                    />
                </button>
              )}
            </label>
            <input
              type="text"
              placeholder="The Business Factory"
              value={job.companyName}
              onChange={(e) => updateJob(index, "companyName", e.target.value)}
              className="input input-bordered w-full "
            />
          </div>

          <div className="flex flex-row w-full gap-2 mb-2">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Job Title</span>
              </label>
              <input
                type="text"
                placeholder="Senior Sales Lead"
                value={job.title}
                onChange={(e) => updateJob(index, "title", e.target.value)}
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Dates</span>
              </label>
              <input
                type="text"
                placeholder="July 2016 - Present"
                value={job.dates}
                onChange={(e) => updateJob(index, "dates", e.target.value)}
                className="input input-bordered w-full "
              />
            </div>
          </div>

          <div className="form-control w-full ">
            {/* no label needed for BulletListTextarea as it has its own lab */}
            {/* edit this label style on line 28 of BulletTextArea.tsx */}
            <BulletListFormTextarea
              label="Job Duties"
              formName="duties"
              formValue={job.duties}
              placeholder="- Spearheaded an exhaustive training platform for over 20 sales supervisors that increased their confidence and sales pitches by 30% two months after the training session."
              onChange={(name, value) => updateJob(index, name, value)}
            />
          </div>

          
        </div>
      ))}
      <button onClick={addJob} className="btn bg-base-100 my-1 rounded-full w-[120px] float-right">
        <span className="flex  flex-row items-center justify-between w-full">
          <img
            src="https://img.icons8.com/android/24/FFFFFF/plus.png"
            alt="plus icon"
            className="w-[20px] h-[20px]"
          />
          <p>Add Job</p>
        </span>
      </button>
    </div>
  );
}

export function ProjectForm() {
  const { projects, setProjects } = useResumeContext();

  const addProject = () => {
    setProjects([
      ...projects,
      {
        projectName: "",
        dates: "",
        details: [],
      },
    ]);
  };

  const deleteProject = (index: number) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    const newProjects = [...projects];
    if (field === "details") {
      if (Array.isArray(value)) {
        newProjects[index][field] = value;
      } else {
        // If it's a single string, convert it into an array with one element
        newProjects[index][field] = [value];
      }
    } else {
      newProjects[index][field] = value as string; // Leave other fields unchanged
    }
    setProjects(newProjects);
  };
  
  function logProjectData() {
    console.log(projects);
  }

  return (
    <div className="project-form-wrapper bg-base-200 w-full p-4 lg:p-6 pb-[4rem] lg:pb-[4rem]">
      <span className="w-full p-1 m-1 flex flex-row gap-3 items-center">
        <img className="w-[30px] h-[30px]" src="https://img.icons8.com/external-nawicon-detailed-outline-nawicon/64/FFFFFF/external-Portfolio-recruitment-nawicon-detailed-outline-nawicon.png" alt="" />
        <h2 className="text-3xl">Projects</h2>
      </span>
      {projects.map((project, index) => (
        <div className="my-5" key={index}>

          <div className="form-control w-full ">
            <label className="label items-end">
              <span className="label-text">Project Name</span>
              {/* button to delete only shows up if not the last project on page */}
              {index !== 0 && (
                <button
                  className="btn my-2 bg-base-100 rounded-full w-[30px] h-[30px] p-0 float-right m-0 min-h-0"
                  onClick={() => deleteProject(index)}
                  title="Delete Project"
                >
                    <img
                      src="https://img.icons8.com/glyph-neue/64/FFFFFF/trash.png"
                      alt="delete icon"
                      className="w-[20px] h-[20px]"
                    />
                </button>
              )}
            </label>
            <input
              type="text"
              placeholder="My Big Project"
              value={project.projectName}
              onChange={(e) => updateProject(index, "projectName", e.target.value)}
              className="input input-bordered w-full "
            />
          </div>

          <div className="form-control w-full mb-2">
              <label className="label">
                <span className="label-text">Dates</span>
                {/* <span className="label-text-alt">Top Right label</span> */}
              </label>
              <input
                type="text"
                placeholder="October 3, 2018"
                value={project.dates}
                onChange={(e) => updateProject(index, "dates", e.target.value)}
                className="input input-bordered w-full "
              />
            </div>

          <div className="form-control w-full ">
            {/* no label needed for BulletListTextarea as it has its own lab */}
            {/* edit this label style on line 28 of BulletTextArea.tsx */}
            <BulletListFormTextarea
              label="Project Details"
              formName="details"
              formValue={project.details}
              placeholder="- Project made to solve problems X, Y, and Z."
              onChange={(name, value) => updateProject(index, name, value)}
            />
          </div>
          
        </div>
      ))}
      <button onClick={addProject} className="btn bg-base-100 my-1 rounded-full w-[150px] float-right">
        <span className="flex  flex-row items-center justify-between w-full">
          <img
            src="https://img.icons8.com/android/24/FFFFFF/plus.png"
            alt="plus icon"
            className="w-[20px] h-[20px]"
          />
          <p>Add Project</p>
        </span>
      </button>
    </div>
  );
}


export function SkillsForm() {
  const { skills, setSkills } = useResumeContext();

  const updateSkillsList = (value: string[]) => {
    setSkills({
      skillList: value,
    });
  };

  return (
    <div className="skills-form-wrapper bg-base-200 w-full p-4 lg:p-6 pb-[4rem] lg:pb-[4rem]">
      <span className="w-full p-1 m-1 flex flex-row gap-3 items-center">
        <img
          className="w-[30px] h-[30px]"
          src="https://img.icons8.com/ios/50/FFFFFF/admin-settings-male.png"
          alt=""
        />
        <h2 className="text-3xl">Skills</h2>
      </span>

      <div className="my-5">
        <div className="form-control w-full">
          {/* no label needed for BulletListTextarea as it has its own label */}
          {/* edit this label style on line 28 of BulletTextArea.tsx */}
          <BulletListFormTextarea
            label="Skills List"
            formName="skills"
            formValue={skills.skillList}
            placeholder="- JavaScript\n- React\n- TypeScript"
            onChange={(name, value) => updateSkillsList(value)}
          />
        </div>
      </div>
    </div>
  );
}
