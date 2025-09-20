import { Injectable } from '@angular/core';
import { Project } from '../classes/models/project';
import  projectdata  from './projects.json';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = [];

  constructor() { 
    this.loadProjects();
  }

  loadProjects(): void {
    projectdata.forEach(project => {
      this.projects.push(
        new Project({
          name: project.name,
          desc: project.desc,
          implementation: project.implementation,
          duration: project.duration,
          technics: project.technics,
          img: project.img,
          url: project.url,
          previous: project.previous,
          next: project.next
        })
      );
    });
  }
}
