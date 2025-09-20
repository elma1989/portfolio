export class Project {

    name: string;
    desc: {en:string, de:string};
    implementation: {en:string, de:string};
    duration: {en:string, de:string};
    technics: number[];
    img: string;
    url: string;
    previous: string | null;
    next: string | null;


    constructor ({name, desc, implementation, duration, technics, img, url, previous, next}:
        {
            name:string,
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
        this.desc = desc;
        this.implementation = implementation;
        this.duration = duration;
        this.technics = technics;
        this.img = img;
        this.url = url;
        this.previous = previous;
        this.next = next;
    }
}
