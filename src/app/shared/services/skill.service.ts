import { Injectable } from '@angular/core';
import { Skill } from '../classes/models/skill';
import skillData from './skills.json';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  skills: Skill[] = [];

  constructor() { 
    this.loadSkills();
  }

  loadSkills(): void {
    skillData.forEach(skill => {
      this.skills.push(new Skill(skill.name, skill.img));
    });
  }
}
