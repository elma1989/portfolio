import { inject } from "@angular/core";
import { SkillService } from "../../services/skill.service";
import { Skill } from "./skill";

export class Project {

    name: string;
    id: string;
    projectClass: string;
    desc: {en:string, de:string};
    implementation: {en:string, de:string};
    duration: {en:string, de:string};
    technics: Skill[] = [];
    img: string;
    url: string;
    previous: string | null;
    next: string | null;
    ss: SkillService = inject(SkillService);

    constructor (
        {name, id, projectClass, desc, implementation, duration, technics, img, url, previous, next}:
        {
            name:string,
            id:string,
            projectClass: string,
            desc:{en:string, de:string},
            implementation:{en:string, de:string},
            duration:{en:string, de:string},
            technics:number[],
            img:string,
            url:string,
            previous: string | null,
            next: string | null
        }
    ) {
        this.name = name;
        this.id = id;
        this.projectClass = projectClass;
        this.desc = desc;
        this.implementation = implementation;
        this.duration = duration;
        this.img = img;
        this.url = url;
        this.previous = previous;
        this.next = next;
        this.loadSkills(technics);
    }

    /**
     * Loads Skill Objects from Number-Array.
     * @param technics Indizies of skill set.
     */
    loadSkills(technics:number[]): void {
        for (let i = 0; i < technics.length; i++) {
            this.technics.push(this.ss.skills[technics[i]])
        }
    }
}
