"use client";

import React, { useState } from "react";
import ProjectVisual from "./ProjectVisual";
import ProjectInfo from "./ProjectInfo";
import { cn } from "@/lib/utils";
import { cascadeDelay } from "@/lib/animations";

export default function ProjectsSection({ projects, isFromPage }) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);
  const [displayedProject, setDisplayedProject] = useState(projects[0]);
  const [isProjectTransition, setIsProjectTransition] = useState(false);
  const [isInfoTransition, setIsInfoTransition] = useState(false);

  const handleProjectChange = (index) => {
    if (index === null) {
      setCurrentProjectIndex(null);
      return;
    }

    setIsProjectTransition(true);
    setIsInfoTransition(true);

    setTimeout(() => {
      setDisplayedProject(projects[index]);
      setCurrentProjectIndex(index);
      setIsProjectTransition(false);
      setIsInfoTransition(false);
    }, 400);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
      <div className="md:col-span-1">
        <ProjectInfo
          project={projects[currentProjectIndex]}
          displayedProject={displayedProject}
          isFromPage={isFromPage}
          isInfoTransition={isInfoTransition}
          isMobile={false}
        />
      </div>
      <div className="md:col-span-4">
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                !isFromPage && "animate-fade-in",
                `[--animation-delay:${cascadeDelay(index + 2)}]`
              )}
            >
              <ProjectVisual
                project={project}
                displayedProject={displayedProject}
                isProjectTransition={isProjectTransition}
                isFromPage={isFromPage}
                isMobile={false}
                index={index}
                setCurrentProjectIndex={handleProjectChange}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
